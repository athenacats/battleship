import { Component, OnInit } from '@angular/core';
import { Ships } from 'src/app/data/shipdata';
import { ShipsService } from 'src/app/services/ships.service';

interface Cell {
  value: number | null;
  backgroundColor: string;
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
  grid: Cell[][] = [];

  constructor(private shipService: ShipsService) {
    this.ships = this.shipService.getAll();
    this.ships.forEach((ship) => {
      this.shipArray.push(ship);
    });
  }

  ngOnInit(): void {
    this.originalShips = this.shipService.getAll();
    for (let i = 0; i < this.rows.length; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.cols.length; j++) {
        this.grid[i][j] = { value: null, backgroundColor: 'var(--table)' }; // Represents an empty cell
      }
    }
    for (let i = 0; i < 5; i++) {
      const randomShipCount =
        this.shipArray[Math.floor(Math.random() * this.shipArray.length)];
      randomShipCount.alowedNumberOfShips--;
      this.shipSelected.push(randomShipCount);
      console.log(randomShipCount);
      console.log(this.shipSelected);
    }
  }
  /*selectRandomShips() {
    const randomShipCount = Math.floor(this.shipArray.length * 0.5);
    console.log(randomShipCount);
  }*/
}
