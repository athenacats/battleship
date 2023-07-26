import { Component, OnInit } from '@angular/core';
import { Ships } from 'src/app/data/shipdata';
import { SelectedshipService } from 'src/app/services/selectedship.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  rows = Array.from({ length: 10 }, (_, i) => i);
  cols = Array.from({ length: 10 }, (_, i) => i);
  grid: any[][] = [];
  selectedShip!: Ships;

  ngOnInit(): void {
    for (let i = 0; i < this.rows.length; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.cols.length; j++) {
        this.grid[i][j] = null; // Represents an empty cell
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

  /*placeShip(ship: Ships) {
    if (this.canPlaceShip(ship, this.grid, row, col)) {
      // Update the grid to mark ship positions (assuming shipLength and orientation are set)
      if (ship.orientation === 'horizontal') {
        for (let i = 0; i < ship.shipLength; i++) {
          this.grid[row][col + i] = 1;
        }
      } else {
        for (let i = 0; i < ship.shipLength; i++) {
          this.grid[row + i][col] = 1;
        }
      }

      // Add the placed ship to the selectedShips array
      this.selectedShips.push(ship);

      // Remove the placed ship from the available ships list (assuming you have a ships list)
      // this.availableShips = this.availableShips.filter((s) => s.id !== ship.id);

      // Optionally, you can update the UI to visually display the placed ship on the grid
    } else {
      // Display an error message or provide feedback to the user that the ship cannot be placed here
    }
  }

  canPlaceShip(ship: Ships, grid: number[][], row: number, col: number): boolean {
    // Check if the ship can be placed at the specified position (row, col)
    if (
      row < 0 ||
      col < 0 ||
      (ship.orientation === 'horizontal' && col + ship.shipLength > 10) ||
      (ship.orientation === 'vertical' && row + ship.shipLength > 10)
    ) {
      // Ship goes out of bounds
      return false;
    }

    if (ship.orientation === 'horizontal') {
      for (let i = 0; i < ship.shipLength; i++) {
        if (grid[row][col + i] !== 0) {
          // Cell is already occupied by another ship
          return false;
        }
      }
    } else {
      for (let i = 0; i < ship.shipLength; i++) {
        if (grid[row + i][col] !== 0) {
          // Cell is already occupied by another ship
          return false;
        }
      }
    }

    return true; // Ship can be placed at the specified position
  }*/
}
