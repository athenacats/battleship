import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ships } from 'src/app/data/shipdata';
import { ShipsService } from 'src/app/services/ships.service';

@Component({
  selector: 'app-shipdisplay',
  templateUrl: './shipdisplay.component.html',
  styleUrls: ['./shipdisplay.component.scss'],
})
export class ShipdisplayComponent implements OnInit {
  ships!: Ships[];

  @Output() itemIsClicked = new EventEmitter<Ships>();

  constructor(private shipService: ShipsService) {}

  ngOnInit(): void {
    this.ships = this.shipService.getAll();
  }

  mapping(ship: Ships) {
    console.log(this.ships[0]);
    this.itemIsClicked.emit(ship);
  }
}
