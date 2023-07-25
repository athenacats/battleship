/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Ships } from '../data/shipdata';
import { Ship } from '../data/shipdescription';

@Injectable({
  providedIn: 'root',
})
export class ShipsService {
  constructor() {}

  getAll(): Ships[] {
    return Ship;
  }
}
