import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ships } from 'src/app/data/shipdata';
import { InitialisegameService } from 'src/app/services/initialisegame.service';
import { ShipsService } from 'src/app/services/ships.service';

export interface AICell {
  value: number | null;
  backgroundColor: string;
  attacked: boolean;
  checked: boolean;
}

@Component({
  selector: 'app-aiplacement',
  templateUrl: './aiplacement.component.html',
  styleUrls: ['./aiplacement.component.scss'],
})
export class AiplacementComponent implements OnInit {
  ships!: Ships[];
  shipSelected: Ships[] = [];
  shipArray: Ships[] = [];
  rows = Array.from({ length: 10 }, (_, i) => i);
  cols = Array.from({ length: 10 }, (_, i) => i);
  originalShips: Ships[] = [];
  grid: AICell[][] = [];
  maxPlacementRetries = 50;
  display = false;

  @Output() gridEmitter = new EventEmitter<AICell[][]>();

  private getOriginalShipsCopy(): Ships[] {
    return this.originalShips.map((ship) => ({ ...ship }));
  }

  constructor(
    private shipService: ShipsService,
    private initialiseGameService: InitialisegameService,
  ) {}

  ngOnInit(): void {
    this.originalShips = this.shipService.getAll();
    this.shipArray = this.getOriginalShipsCopy();
    console.log(this.shipArray);
    for (let i = 0; i < this.rows.length; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.cols.length; j++) {
        this.grid[i][j] = {
          value: null,
          backgroundColor: 'var(--secondary)',
          attacked: false,
          checked: false,
        }; // Represents an empty cell
      }
    }
    for (let i = 0; i < 5; i++) {
      const randomShipCount =
        this.shipArray[Math.floor(Math.random() * this.shipArray.length)];
      const shipCopy = { ...randomShipCount }; //need this copy so that original array isnt affected
      shipCopy.alowedNumberOfShips--;
      const chosenOrientation = Math.floor(Math.random() * 2);
      //console.log(chosenOrientation);
      if (chosenOrientation === 0) {
        randomShipCount.orientation = 'Horizontal';
      } else if (chosenOrientation === 1) {
        randomShipCount.orientation = 'Vertical';
      }
      this.shipSelected.push(shipCopy);

      this.shipSelected.sort((a, b) => b.shipLength - a.shipLength);
      console.log(this.shipSelected);
      // console.log(randomShipCount.orientation);
      // console.log(randomShipCount);
      // console.log(this.shipSelected);
    }
    this.placeRandomShips();
  }

  placeRandomShips(): void {
    for (const ship of this.shipSelected) {
      let placed = false;
      let retries = 0;
      while (!placed && retries < this.maxPlacementRetries) {
        const row = Math.floor(Math.random() * this.rows.length);
        const col = Math.floor(Math.random() * this.cols.length);

        if (this.canPlaceShip(ship, row, col)) {
          this.placeShip(ship, row, col);
          placed = true;
          //console.log(placed);
        }
        retries++;
        console.log(retries);
      }
      if (!placed) {
        this.resetGrid();
        this.resetShipPlacement();
        this.placeRandomShips();
        return;
      }
      this.gridEmitter.emit(this.grid);
      this.initialiseGameService.setAIMapData(this.grid);
      this.display = false;
    }
  }

  resetGrid(): void {
    for (let i = 0; i < this.rows.length; i++) {
      for (let j = 0; j < this.cols.length; j++) {
        this.grid[i][j] = {
          value: null,
          backgroundColor: 'var(--secondary)',
          attacked: false,
          checked: false,
        };
      }
    }
  }

  resetShipPlacement(): void {
    this.originalShips = this.shipService.getAll();
    const originalShipsCopy = this.getOriginalShipsCopy();

    this.shipSelected.forEach((ship) => {
      const originalShip = originalShipsCopy.find(
        (originalShip) => originalShip.id === ship.id,
      );
      if (originalShip) {
        ship.alowedNumberOfShips = originalShip.alowedNumberOfShips;
      }
    });
  }

  private canPlaceShip(ship: Ships, row: number, col: number): boolean {
    if (
      (ship.orientation === 'Horizontal' &&
        col + ship.shipLength > this.cols.length) ||
      (ship.orientation === 'Vertical' &&
        row + ship.shipLength > this.rows.length)
    ) {
      return false;
    }
    if (ship.orientation === 'Horizontal') {
      for (let i = 0; i < ship.shipLength; i++) {
        if (this.grid[row][col + i].value !== null) {
          return false;
        }
      }
    }
    if (ship.orientation === 'Vertical') {
      for (let i = 0; i < ship.shipLength; i++) {
        if (this.grid[row + i][col].value !== null) {
          return false;
        }
      }
    }
    return true;
  }

  private placeShip(ship: Ships, row: number, col: number): void {
    // Place the ship on the grid
    if (ship.orientation === 'Horizontal') {
      for (let i = 0; i < ship.shipLength; i++) {
        this.grid[row][col + i].value = 1;
        this.grid[row][col + i].backgroundColor = 'var(--secondary)';
      }
    } else {
      for (let i = 0; i < ship.shipLength; i++) {
        this.grid[row + i][col].value = 1;
        this.grid[row + i][col].backgroundColor = 'var(--secondary)';
      }
    }
  }
}
