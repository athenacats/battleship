import { Component } from '@angular/core';
import { Cell } from '../map/map.component';
import { InitialisegameService } from 'src/app/services/initialisegame.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  grid: Cell[][] = [];

  constructor(private initialiseGameService: InitialisegameService) {
    this.grid = this.initialiseGameService.getMapData();
    console.log(this.grid);
  }
}
