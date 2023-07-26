import { Injectable } from '@angular/core';
import { Ships } from '../data/shipdata';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedshipService {
  private selectedShipSubject = new Subject<Ships>();
  private selectedShip$: Observable<Ships> =
    this.selectedShipSubject.asObservable();

  setSelectedShip(ship: Ships) {
    this.selectedShipSubject.next(ship);
  }

  getSelectedShip(): Observable<Ships> {
    return this.selectedShip$;
  }
}
