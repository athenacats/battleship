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
        }

        const allAIShipsSunk = this.AIgrid.every((row) => {
          return row.every((cell) => {
            return cell.value !== 1;
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
    console.log('attacking');
    if (this.aiMode === AIMode.Hunt) {
      console.log(this.aiMode);
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
        console.log(cell);
        cell.attacked = true;
        if (cell.value === 1) {
          this.aiMode = AIMode.Target;
          console.log(this.aiMode);
          this.targetRow = randomCellIndex.row;
          this.targetCol = randomCellIndex.col;
          console.log(this.targetCol);
          cell.backgroundColor = 'var(--attacked)';
          cell.value = null;
          console.log(cell.value);
        } else {
          cell.backgroundColor = 'var(--miss)';
          console.log(cell.value);
        }
      }
      this.isPlayerTurn = true;
    } else if (this.aiMode === AIMode.Target) {
      console.log(this.aiMode);
      const directionsToTry = [
        Direction.Up,
        Direction.Down,
        Direction.Left,
        Direction.Right,
      ];

      let targetFoundInDirection = false;

      for (const direction of directionsToTry) {
        const { row, col } = this.getTargetInDirection(direction);
        console.log(this.getTargetInDirection(direction));
        if (row !== -1 && col !== -1) {
          const cell = this.grid[row][col];
          console.log(cell);
          if (cell.attacked) {
            console.log(cell.attacked);
            continue;
          }
          if (cell.value === null) {
            cell.attacked = true;
            cell.backgroundColor = 'var(--miss)';
            this.isPlayerTurn = true;
            break;
          } else if (cell.value === 1) {
            cell.value = null;
            cell.attacked = true;
            cell.backgroundColor = 'var(--attacked)';
            this.targetRow = row;
            this.targetCol = col;
            this.lastHitDirection = direction;
            targetFoundInDirection = true;
            this.targetFound = true;
            this.isPlayerTurn = true;
            break;
          }
        }
      }
      if (targetFoundInDirection) {
        this.aiMode = AIMode.Hunt;
        this.targetRow = -1;
        this.targetCol = -1;
        this.isPlayerTurn = true;
      }
    }
    const allPlayerShipsSunk = this.grid.every((row) => {
      return row.every((cell) => {
        return cell.value !== 1;
      });
    });
    if (allPlayerShipsSunk) {
      console.log('AI wins');
      // figure out
      this.isPlayerTurn = true;
    }
  }

  getTargetInDirection(direction: Direction): {
    row: number;
    col: number;
  } {
    let targetRow = this.targetRow;
    let targetCol = this.targetCol;
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
      return { row: -1, col: -1 };
    }
  }
}
