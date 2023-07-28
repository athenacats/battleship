import { Component } from '@angular/core';
import { Cell } from '../map/map.component';
import { InitialisegameService } from 'src/app/services/initialisegame.service';
import { AICell } from '../aiplacement/aiplacement.component';

enum AIMode {
  Hunt,
  Target,
}

enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
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
  targetRow!: number;
  targetCol!: number;
  lastHitDirection: Direction = Direction.Up;
  lastHitRow = -1;
  lastHitCol = -1;
  targetFound = false;

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
          if (!cell.attacked) {
            availableCells.push({ row: i, col: j });
          }
        }
      }
      if (availableCells.length > 0) {
        const random = Math.floor(Math.random() * availableCells.length);
        const randomCellIndex = availableCells[random];
        const cell = this.grid[randomCellIndex.row][randomCellIndex.col];
        cell.attacked = true;
        if (cell.value === 1) {
          this.aiMode = AIMode.Target;
          this.targetRow = randomCellIndex.row;
          this.targetCol = randomCellIndex.col;
          cell.backgroundColor = 'var(--attacked)';
          cell.value = null;
          console.log(cell.value);
        } else {
          cell.backgroundColor = 'var(--miss)';
          console.log(cell.value);
        }
      }
    } else if (this.aiMode === AIMode.Target) {
      const directionsToTry = [
        Direction.Up,
        Direction.Down,
        Direction.Left,
        Direction.Right,
      ];

      for (const direction of directionsToTry) {
        const { row, col } = this.getTargetInDirection(direction);
        if (row !== -1 && col !== -1) {
          const cell = this.grid[row][col];
          if (cell.value === null) {
            cell.attacked = true;
            cell.backgroundColor = 'var(--miss)';
          } else if (cell.value === 1) {
            cell.value = null;
            cell.attacked = true;
            cell.backgroundColor = 'var(--attacked)';
            this.lastHitRow = row;
            this.lastHitCol = col;
            this.lastHitDirection = direction;
            this.targetFound = true;
            break;
          }
        }
      }
      if (!this.targetFound) {
        this.aiMode = AIMode.Hunt;
        this.lastHitRow = -1;
        this.lastHitCol = -1;
        Direction.Up;
      }
    }
    const allPlayerShipsSunk = this.grid.every((row) => {
      row.every((cell) => {
        cell.value !== 1;
      });
    });
    if (allPlayerShipsSunk) {
      console.log('AI wins');
      // figure out
    }
    this.isPlayerTurn = false;
  }

  getTargetInDirection(direction: Direction): {
    row: number;
    col: number;
  } {
    const { lastHitRow, lastHitCol } = this;
    let targetRow = lastHitRow;
    let targetCol = lastHitCol;

    switch (direction) {
      case Direction.Up:
        targetRow--;
        break;
      case Direction.Down:
        targetRow++;
        break;
      case Direction.Left:
        targetCol--;
        break;
      case Direction.Right:
        targetCol++;
        break;
      default:
        break;
    }
    if (
      targetRow >= 0 &&
      targetRow < this.rows.length &&
      targetCol >= 0 &&
      targetCol < this.cols.length
    ) {
      return { row: targetRow, col: targetCol };
    } else {
      return { row: -1, col: -1 }; // Target is outside the grid boundaries
    }
  }
}
