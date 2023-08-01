import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
export let ShipdisplayComponent = class ShipdisplayComponent {
    constructor(selectedShipService, shipService) {
        this.selectedShipService = selectedShipService;
        this.shipService = shipService;
        this.itemIsClicked = new EventEmitter();
    }
    ngOnInit() {
        this.ships = this.shipService.getAll();
    }
    mapping(ship) {
        console.log(ship);
        this.selectedShip = ship;
        console.log(this.selectedShip);
        this.selectedShipService.setSelectedShip(ship);
    }
};
__decorate([
    Output()
], ShipdisplayComponent.prototype, "itemIsClicked", void 0);
ShipdisplayComponent = __decorate([
    Component({
        selector: 'app-shipdisplay',
        templateUrl: './shipdisplay.component.html',
        styleUrls: ['./shipdisplay.component.scss'],
    })
], ShipdisplayComponent);
//# sourceMappingURL=shipdisplay.component.js.map