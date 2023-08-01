import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
export let AiplacementComponent = class AiplacementComponent {
    getOriginalShipsCopy() {
        return this.originalShips.map((ship) => ({ ...ship }));
    }
    constructor(shipService, initialiseGameService) {
        this.shipService = shipService;
        this.initialiseGameService = initialiseGameService;
        this.shipSelected = [];
        this.shipArray = [];
        this.rows = Array.from({ length: 10 }, (_, i) => i);
        this.cols = Array.from({ length: 10 }, (_, i) => i);
        this.originalShips = [];
        this.grid = [];
        this.maxPlacementRetries = 50;
        this.display = false;
        this.gridEmitter = new EventEmitter();
    }
    ngOnInit() {
        this.originalShips = this.shipService.getAll();
        this.shipArray = this.getOriginalShipsCopy();
        console.log(this.shipArray);
        for (let i = 0; i < this.rows.length; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.cols.length; j++) {
                this.grid[i][j] = {
                    value: null,
                    backgroundColor: 'var(--secondary)',
                    attacked: false,
                    checked: false,
                }; // Represents an empty cell
            }
        }
        for (let i = 0; i < 5; i++) {
            const randomShipCount = this.shipArray[Math.floor(Math.random() * this.shipArray.length)];
            const shipCopy = { ...randomShipCount }; //need this copy so that original array isnt affected
            shipCopy.alowedNumberOfShips--;
            const chosenOrientation = Math.floor(Math.random() * 2);
            //console.log(chosenOrientation);
            if (chosenOrientation === 0) {
                randomShipCount.orientation = 'Horizontal';
            }
            else if (chosenOrientation === 1) {
                randomShipCount.orientation = 'Vertical';
            }
            this.shipSelected.push(shipCopy);
            this.shipSelected.sort((a, b) => b.shipLength - a.shipLength);
            console.log(this.shipSelected);
            // console.log(randomShipCount.orientation);
            // console.log(randomShipCount);
            // console.log(this.shipSelected);
        }
        this.placeRandomShips();
    }
    placeRandomShips() {
        for (const ship of this.shipSelected) {
            let placed = false;
            let retries = 0;
            while (!placed && retries < this.maxPlacementRetries) {
                const row = Math.floor(Math.random() * this.rows.length);
                const col = Math.floor(Math.random() * this.cols.length);
                if (this.canPlaceShip(ship, row, col)) {
                    this.placeShip(ship, row, col);
                    placed = true;
                    //console.log(placed);
                }
                retries++;
                console.log(retries);
            }
            if (!placed) {
                this.resetGrid();
                this.resetShipPlacement();
                this.placeRandomShips();
                return;
            }
            this.gridEmitter.emit(this.grid);
            this.initialiseGameService.setAIMapData(this.grid);
            this.display = false;
        }
    }
    resetGrid() {
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.cols.length; j++) {
                this.grid[i][j] = {
                    value: null,
                    backgroundColor: 'var(--secondary)',
                    attacked: false,
                    checked: false,
                };
            }
        }
    }
    resetShipPlacement() {
        this.originalShips = this.shipService.getAll();
        const originalShipsCopy = this.getOriginalShipsCopy();
        this.shipSelected.forEach((ship) => {
            const originalShip = originalShipsCopy.find((originalShip) => originalShip.id === ship.id);
            if (originalShip) {
                ship.alowedNumberOfShips = originalShip.alowedNumberOfShips;
            }
        });
    }
    canPlaceShip(ship, row, col) {
        if ((ship.orientation === 'Horizontal' &&
            col + ship.shipLength > this.cols.length) ||
            (ship.orientation === 'Vertical' &&
                row + ship.shipLength > this.rows.length)) {
            return false;
        }
        if (ship.orientation === 'Horizontal') {
            for (let i = 0; i < ship.shipLength; i++) {
                if (this.grid[row][col + i].value !== null) {
                    return false;
                }
            }
        }
        if (ship.orientation === 'Vertical') {
            for (let i = 0; i < ship.shipLength; i++) {
                if (this.grid[row + i][col].value !== null) {
                    return false;
                }
            }
        }
        return true;
    }
    placeShip(ship, row, col) {
        // Place the ship on the grid
        if (ship.orientation === 'Horizontal') {
            for (let i = 0; i < ship.shipLength; i++) {
                this.grid[row][col + i].value = 1;
                this.grid[row][col + i].backgroundColor = 'var(--secondary)';
            }
        }
        else {
            for (let i = 0; i < ship.shipLength; i++) {
                this.grid[row + i][col].value = 1;
                this.grid[row + i][col].backgroundColor = 'var(--secondary)';
            }
        }
    }
};
__decorate([
    Output()
], AiplacementComponent.prototype, "gridEmitter", void 0);
AiplacementComponent = __decorate([
    Component({
        selector: 'app-aiplacement',
        templateUrl: './aiplacement.component.html',
        styleUrls: ['./aiplacement.component.scss'],
    })
], AiplacementComponent);
//# sourceMappingURL=aiplacement.component.js.map