import { Injectable } from '@angular/core';
import { Cell } from '../components/map/map.component';
import { AICell } from '../components/aiplacement/aiplacement.component';

@Injectable({
  providedIn: 'root',
})
export class InitialisegameService {
  private myMapData: Cell[][] = [];
  private aiMapData: AICell[][] = [];

  setMapData(data: Cell[][]): void {
    this.myMapData = data;
  }

  setAIMapData(data: AICell[][]): void {
    this.aiMapData = data;
  }

  getMapData(): Cell[][] {
    return this.myMapData;
  }

  getAIMapData(): AICell[][] {
    return this.aiMapData;
  }
}
