import { __decorate } from "tslib";
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Ship } from '../data/shipdescription';
export let ShipsService = class ShipsService {
    constructor() { }
    getAll() {
        return Ship;
    }
};
ShipsService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], ShipsService);
//# sourceMappingURL=ships.service.js.map