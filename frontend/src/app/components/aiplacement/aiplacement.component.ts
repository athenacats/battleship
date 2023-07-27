import { Component, OnInit } from '@angular/core';
import { Ships } from 'src/app/data/shipdata';
import { ShipsService } from 'src/app/services/ships.service';

@Component({
  selector: 'app-aiplacement',
  templateUrl: './aiplacement.component.html',
  styleUrls: ['./aiplacement.component.scss'],
})
export class AiplacementComponent implements OnInit {
  ships!: Ships[];
  shipID: number[] = [];
  shipArray: Ships[] = [];

  constructor(private shipService: ShipsService) {
    this.ships = this.shipService.getAll();
    this.ships.forEach((ship) => {
      this.shipArray.push(ship);
      this.shipID.push(ship.id);
    });
  }
  ngOnInit(): void {
    console.log(this.shipArray);
    const randomShipCount =
      this.shipArray[Math.floor(Math.random() * this.shipArray.length)];
    console.log(randomShipCount);
  }
  /*selectRandomShips() {
    const randomShipCount = Math.floor(this.shipArray.length * 0.5);
    console.log(randomShipCount);
  }*/
}
