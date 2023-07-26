import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ships } from 'src/app/data/shipdata';
import { SelectedshipService } from 'src/app/services/selectedship.service';
import { ShipsService } from 'src/app/services/ships.service';

@Component({
  selector: 'app-shipdisplay',
  templateUrl: './shipdisplay.component.html',
  styleUrls: ['./shipdisplay.component.scss'],
})
export class ShipdisplayComponent implements OnInit {
  ships!: Ships[];
  selectedShip!: Ships;

  @Output() itemIsClicked = new EventEmitter<Ships>();

  constructor(
    private selectedShipService: SelectedshipService,
    private shipService: ShipsService,
  ) {}

  ngOnInit(): void {
    this.ships = this.shipService.getAll();
  }

  mapping(ship: Ships) {
    console.log(ship);
    this.selectedShip = ship;
    console.log(this.selectedShip);
    this.selectedShipService.setSelectedShip(ship);
  }
}
