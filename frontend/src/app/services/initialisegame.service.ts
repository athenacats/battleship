import { Injectable } from '@angular/core';
import { Cell } from '../components/map/map.component';

@Injectable({
  providedIn: 'root',
})
export class InitialisegameService {
  private myMapData: Cell[][] = [];

  setMapData(data: Cell[][]): void {
    this.myMapData = data;
  }

  getMapData(): Cell[][] {
    return this.myMapData;
  }
}
