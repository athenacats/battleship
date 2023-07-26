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
    if (!currentShip || currentShip.alowedNumberOfShips === 0) {
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
          this.grid[row][col + i].backgroundColor = 'var(--primaryT)';
        }
      }
      currentShip.alowedNumberOfShips -= 1;
      console.log(currentShip.alowedNumberOfShips);

      // Add the placed ship to the selectedShips array
      this.shipArray.push(currentShip);
      console.log(this.shipArray);

      // Remove the placed ship from the available ships list (assuming you have a ships list)
      // this.availableShips = this.availableShips.filter((s) => s.id !== ship.id);

      // Optionally, you can update the UI to visually display the placed ship on the grid
    } else {
      // Display an error message or provide feedback to the user that the ship cannot be placed here
    }
  }

  canPlaceShip(ship: Ships, grid: Cell[][], row: number, col: number): boolean {
    console.log(row, col);
    console.log(ship.shipLength);
    // Check if the ship can be placed at the specified position (row, col)
    if (
      (ship.orientation === 'Horizontal' && col + ship.shipLength > 10) ||
      (ship.orientation === 'Vertical' && row + ship.shipLength > 10)
    ) {
      // Ship goes out of bounds
      console.log('yes');
      return false;
    }

    if (ship.orientation === 'Horizontal') {
      for (let i = 0; i < ship.shipLength; i++) {
        if (grid[row][col + i].value !== null) {
          console.log('yes');
          // Cell is already occupied by another ship
          return false;
        }
      }
    } else {
      for (let i = 0; i < ship.shipLength; i++) {
        if (grid[row + i][col].value !== 0) {
          console.log('yes');
          // Cell is already occupied by another ship
          return false;
        }
      }
    }

    console.log('yes');
    return true; // Ship can be placed at the specified position
  }
}
