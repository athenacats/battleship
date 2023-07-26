/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { Ships } from 'src/app/data/shipdata';
import { SelectedshipService } from 'src/app/services/selectedship.service';

interface Cell {
  value: number | null;
  backgroundColor: string;
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
  selectedShip!: Ships;
  shipArray: Ships[] = [];
  showAlertMessage = false;
  alertMessage!: string;

  ngOnInit(): void {
    for (let i = 0; i < this.rows.length; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.cols.length; j++) {
        this.grid[i][j] = { value: null, backgroundColor: 'var(--table)' }; // Represents an empty cell
      }
    }
  }

  constructor(private selectedShipService: SelectedshipService) {
    this.selectedShipService.getSelectedShip().subscribe((ship: Ships) => {
      this.selectedShip = ship; // Update the selected ship variable when the service emits a new ship
    });
  }

  orientation() {
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
      // Update the grid to mark ship positions (assuming shipLength and orientation are set)
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
      currentShip.alowedNumberOfShips -= 1;

      // Add the placed ship to the selectedShips array
      this.shipArray.push(currentShip);
      console.log(this.shipArray);

      // Remove the placed ship from the available ships list (assuming you have a ships list)
      // this.availableShips = this.availableShips.filter((s) => s.id !== ship.id);

      // Optionally, you can update the UI to visually display the placed ship on the grid
    } else {
      this.showAlertMessage = true;
      setTimeout(() => {
        this.showAlertMessage = false;
      }, 2000);
    }
  }

  canPlaceShip(ship: Ships, grid: Cell[][], row: number, col: number): boolean {
    // Check if the ship can be placed at the specified position (row, col)
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
      this.alertMessage = "You've already placed 5 ships!";
      return false;
    }

    console.log('yes');
    return true; // Ship can be placed at the specified position
  }
}
