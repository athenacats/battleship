import { Component } from '@angular/core';
import { Ships } from 'src/app/data/shipdata';
import { ShipsService } from 'src/app/services/ships.service';

@Component({
  selector: 'app-aiplacement',
  templateUrl: './aiplacement.component.html',
  styleUrls: ['./aiplacement.component.scss'],
})
export class AiplacementComponent {
  ships!: Ships[];
  shipArray: number[] = [];

  constructor(private shipService: ShipsService) {
    this.ships = this.shipService.getAll();
    this.ships.forEach((ship) => {
      return this.shipArray.push(ship.id);
    });
  }
}
