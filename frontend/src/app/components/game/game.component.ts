import { Component } from '@angular/core';
import { Cell } from '../map/map.component';
import { InitialisegameService } from 'src/app/services/initialisegame.service';
import { AICell } from '../aiplacement/aiplacement.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  grid: Cell[][] = [];
  AIgrid: AICell[][] = [];
  display = true;

  constructor(private initialiseGameService: InitialisegameService) {
    this.grid = this.initialiseGameService.getMapData();
    this.AIgrid = this.initialiseGameService.getAIMapData();
    this.display = true;
    console.log(this.grid);
    console.log(this.AIgrid);
  }
}
