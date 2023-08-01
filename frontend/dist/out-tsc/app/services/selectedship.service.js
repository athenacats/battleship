import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export let SelectedshipService = class SelectedshipService {
    constructor() {
        this.selectedShipSubject = new Subject();
        this.selectedShip$ = this.selectedShipSubject.asObservable();
    }
    setSelectedShip(ship) {
        this.selectedShipSubject.next(ship);
    }
    getSelectedShip() {
        return this.selectedShip$;
    }
};
SelectedshipService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], SelectedshipService);
//# sourceMappingURL=selectedship.service.js.map