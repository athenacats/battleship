import { Component, OnInit } from '@angular/core';
import { Ships } from 'src/app/data/shipdata';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  rows = Array.from({ length: 10 }, (_, i) => i);
  cols = Array.from({ length: 10 }, (_, i) => i);
  grid: unknown[][] = [];
  selectedShips: Ships[] = [];

  ngOnInit(): void {
    for (let i = 0; i < this.rows.length; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.cols.length; j++) {
        this.grid[i][j] = null; // Represents an empty cell
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  placeShip(row: number, col: number) {}
}
