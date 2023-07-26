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
  grid: unknown[][] = [];
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  placeShip(row: number, col: number) {}
}
