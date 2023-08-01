import { __decorate } from "tslib";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, EventEmitter, Output } from '@angular/core';
export let MapComponent = class MapComponent {
    ngOnInit() {
        this.originalShips = this.shipService.getAll();
        for (let i = 0; i < this.rows.length; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.cols.length; j++) {
                this.grid[i][j] = {
                    value: null,
                    backgroundColor: 'var(--table)',
                    attacked: false,
                    checked: false,
                }; // Represents an empty cell
            }
        }
    }
    constructor(selectedShipService, shipService, router, initialiseGameService) {
        this.selectedShipService = selectedShipService;
        this.shipService = shipService;
        this.router = router;
        this.initialiseGameService = initialiseGameService;
        this.rows = Array.from({ length: 10 }, (_, i) => i);
        this.cols = Array.from({ length: 10 }, (_, i) => i);
        this.grid = [];
        this.selectedShip = null;
        this.shipArray = [];
        this.showAlertMessage = false;
        this.originalShips = [];
        this.startDisplay = false;
        this.gridEmitter = new EventEmitter();
        this.selectedShipService.getSelectedShip().subscribe((ship) => {
            this.selectedShip = ship;
        });
    }
    orientation() {
        if (!this.selectedShip) {
            return;
        }
        if (this.selectedShip.orientation === 'Horizontal') {
            return (this.selectedShip.orientation = 'Vertical');
        }
        else {
            return (this.selectedShip.orientation = 'Horizontal');
        }
    }
    placeShip(row, col) {
        const currentShip = this.selectedShip;
        if (!currentShip) {
            this.alertMessage = 'Select a ship below first!';
            this.showAlertMessage = true;
            setTimeout(() => {
                this.showAlertMessage = false;
            }, 2000);
            return;
        }
        if (currentShip.alowedNumberOfShips === 0) {
            this.alertMessage =
                "You've already placed the maximum number of ships of this kind!";
            this.showAlertMessage = true;
            setTimeout(() => {
                this.showAlertMessage = false;
            }, 2000);
            return; // No ship selected, do nothing
        }
        if (this.canPlaceShip(currentShip, this.grid, row, col)) {
            if (currentShip.orientation === 'Horizontal') {
                for (let i = 0; i < currentShip.shipLength; i++) {
                    this.grid[row][col + i].value = 1;
                    this.grid[row][col + i].backgroundColor = 'var(--primaryT)';
                }
            }
            else {
                for (let i = 0; i < currentShip.shipLength; i++) {
                    this.grid[row + i][col].value = 1;
                    this.grid[row + i][col].backgroundColor = 'var(--primaryT)';
                }
            }
            const originalShip = this.originalShips.find((originalShipItem) => originalShipItem.id === currentShip.id);
            if (originalShip) {
                originalShip.alowedNumberOfShips--;
            }
            this.shipArray.push(currentShip);
            this.gridEmitter.emit(this.grid);
            console.log(this.shipArray);
            if (this.shipArray.length === 5) {
                this.startDisplay = true;
            }
        }
        else {
            this.showAlertMessage = true;
            setTimeout(() => {
                this.showAlertMessage = false;
            }, 2000);
        }
    }
    canPlaceShip(ship, grid, row, col) {
        if ((ship.orientation === 'Horizontal' && col + ship.shipLength > 10) ||
            (ship.orientation === 'Vertical' && row + ship.shipLength > 10)) {
            this.alertMessage = 'You cannot place a ship here';
            return false;
        }
        if (ship.orientation === 'Horizontal') {
            for (let i = 0; i < ship.shipLength; i++) {
                if (grid[row][col + i].value !== null) {
                    this.alertMessage = 'A ship already occupies this space';
                    return false;
                }
            }
        }
        if (ship.orientation === 'Vertical') {
            for (let i = 0; i < ship.shipLength; i++) {
                if (grid[row + i][col].value !== null) {
                    this.alertMessage = 'A ship already occupies this space';
                    return false;
                }
            }
        }
        if (this.shipArray.length === 5) {
            this.startDisplay = true;
            this.alertMessage = "You've already placed 5 ships! Start the Game!";
            return false;
        }
        console.log('yes');
        return true; // Ship can be placed at the specified position
    }
    clearMap() {
        window.location.reload();
    }
    startGame() {
        this.initialiseGameService.setMapData(this.grid);
        this.router.navigateByUrl('/game');
    }
};
__decorate([
    Output()
], MapComponent.prototype, "gridEmitter", void 0);
MapComponent = __decorate([
    Component({
        selector: 'app-map',
        templateUrl: './map.component.html',
        styleUrls: ['./map.component.scss'],
    })
], MapComponent);
//# sourceMappingURL=map.component.js.map