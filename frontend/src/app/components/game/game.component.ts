import { Component } from '@angular/core';
import { Cell } from '../map/map.component';
import { InitialisegameService } from 'src/app/services/initialisegame.service';
import { AICell } from '../aiplacement/aiplacement.component';

enum AIMode {
  Hunt,
  Target,
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  grid: Cell[][] = [];
  AIgrid: AICell[][] = [];
  display = true;
  isPlayerTurn = true;
  aiMode: AIMode = AIMode.Hunt;
  rows = Array.from({ length: 10 }, (_, i) => i);
  cols = Array.from({ length: 10 }, (_, i) => i);

  constructor(private initialiseGameService: InitialisegameService) {
    this.grid = this.initialiseGameService.getMapData();
    this.AIgrid = this.initialiseGameService.getAIMapData();
    this.display = true;
    console.log(this.grid);
    console.log(this.AIgrid);
  }

  checkState(row: number, col: number): void {
    if (this.isPlayerTurn) {
      const cell = this.AIgrid[row][col];
      if (!cell.attacked) {
        cell.attacked = true;
        if (cell.value === 1) {
          cell.backgroundColor = 'var(--attacked)';
          cell.value = null;
          console.log(cell.value);
        } else {
          cell.backgroundColor = 'var(--miss)';
          console.log(cell.value);
        }

        const allAIShipsSunk = this.AIgrid.every((row) => {
          row.every((cell) => {
            cell.value !== 1;
          });
        });
        if (allAIShipsSunk) {
          console.log('Player wins');
          // figure out
        }

        this.isPlayerTurn = false;
        this.aiAttack();
      }
    }
  }

  aiAttack() {
    if (this.aiMode === AIMode.Hunt) {
      const availableCells: { row: number; col: number }[] = [];
      for (let i = 0; i < this.rows.length; i++) {
        for (let j = 0; j < this.cols.length; j++) {
          const cell = this.grid[i][j];
        }
      }
    }
  }
}
