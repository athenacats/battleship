/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ships } from 'src/app/data/shipdata';
import { SelectedshipService } from 'src/app/services/selectedship.service';
import { ShipsService } from 'src/app/services/ships.service';
import { Router } from '@angular/router';
import { InitialisegameService } from 'src/app/services/initialisegame.service';

export interface Cell {
  checked: boolean;
  value: number | null;
  backgroundColor: string;
  attacked: boolean;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  rows = Array.from({ length: 10 }, (_, i) => i);
  cols = Array.from({ length: 10 }, (_, i) => i);
  grid: Cell[][] = [];
  selectedShip: Ships | null = null;
  shipArray: Ships[] = [];
  showAlertMessage = false;
  alertMessage!: string;
  originalShips: Ships[] = [];
  startDisplay = false;
  @Output() gridEmitter = new EventEmitter<Cell[][]>();

  ngOnInit(): void {
    this.originalShips = this.shipService.getAll();
    for (let i = 0; i < this.rows.length; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.cols.length; j++) {
        this.grid[i][j] = {
          value: null,
          backgroundColor: 'var(--table)',
          attacked: false,
          checked: false,
        }; // Represents an empty cell
      }
    }
  }

  constructor(
    private selectedShipService: SelectedshipService,
    private shipService: ShipsService,
    private router: Router,
    private initialiseGameService: InitialisegameService,
  ) {
    this.selectedShipService.getSelectedShip().subscribe((ship: Ships) => {
      this.selectedShip = ship;
    });
  }

  orientation() {
    if (!this.selectedShip) {
      return;
    }
    if (this.selectedShip.orientation === 'Horizontal') {
      return (this.selectedShip.orientation = 'Vertical');
    } else {
      return (this.selectedShip.orientation = 'Horizontal');
    }
  }

  placeShip(row: number, col: number): void {
    const currentShip = this.selectedShip;
    if (!currentShip) {
      this.alertMessage = 'Select a ship below first!';
      this.showAlertMessage = true;
      setTimeout(() => {
        this.showAlertMessage = false;
      }, 2000);
      return;
    }

    if (currentShip.alowedNumberOfShips === 0) {
      this.alertMessage =
        "You've already placed the maximum number of ships of this kind!";
      this.showAlertMessage = true;
      setTimeout(() => {
        this.showAlertMessage = false;
      }, 2000);
      return; // No ship selected, do nothing
    }

    if (this.canPlaceShip(currentShip, this.grid, row, col)) {
      if (currentShip.orientation === 'Horizontal') {
        for (let i = 0; i < currentShip.shipLength; i++) {
          this.grid[row][col + i].value = 1;
          this.grid[row][col + i].backgroundColor = 'var(--primaryT)';
        }
      } else {
        for (let i = 0; i < currentShip.shipLength; i++) {
          this.grid[row + i][col].value = 1;
          this.grid[row + i][col].backgroundColor = 'var(--primaryT)';
        }
      }
      const originalShip = this.originalShips.find(
        (originalShipItem) => originalShipItem.id === currentShip.id,
      );
      if (originalShip) {
        originalShip.alowedNumberOfShips--;
      }
      this.shipArray.push(currentShip);
      this.gridEmitter.emit(this.grid);
      console.log(this.shipArray);
      if (this.shipArray.length === 5) {
        this.startDisplay = true;
      }
    } else {
      this.showAlertMessage = true;
      setTimeout(() => {
        this.showAlertMessage = false;
      }, 2000);
    }
  }

  canPlaceShip(ship: Ships, grid: Cell[][], row: number, col: number): boolean {
    if (
      (ship.orientation === 'Horizontal' && col + ship.shipLength > 10) ||
      (ship.orientation === 'Vertical' && row + ship.shipLength > 10)
    ) {
      this.alertMessage = 'You cannot place a ship here';
      return false;
    }

    if (ship.orientation === 'Horizontal') {
      for (let i = 0; i < ship.shipLength; i++) {
        if (grid[row][col + i].value !== null) {
          this.alertMessage = 'A ship already occupies this space';
          return false;
        }
      }
    }
    if (ship.orientation === 'Vertical') {
      for (let i = 0; i < ship.shipLength; i++) {
        if (grid[row + i][col].value !== null) {
          this.alertMessage = 'A ship already occupies this space';
          return false;
        }
      }
    }
    if (this.shipArray.length === 5) {
      this.startDisplay = true;
      this.alertMessage = "You've already placed 5 ships! Start the Game!";
      return false;
    }

    console.log('yes');
    return true; // Ship can be placed at the specified position
  }

  clearMap(): void {
    window.location.reload();
  }

  startGame() {
    this.initialiseGameService.setMapData(this.grid);
    this.router.navigateByUrl('/game');
  }
}
