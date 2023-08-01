import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
export let InitialisegameService = class InitialisegameService {
    constructor() {
        this.myMapData = [];
        this.aiMapData = [];
    }
    setMapData(data) {
        this.myMapData = data;
    }
    setAIMapData(data) {
        this.aiMapData = data;
    }
    getMapData() {
        return this.myMapData;
    }
    getAIMapData() {
        return this.aiMapData;
    }
};
InitialisegameService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], InitialisegameService);
//# sourceMappingURL=initialisegame.service.js.map