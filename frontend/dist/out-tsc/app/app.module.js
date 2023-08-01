import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShipdisplayComponent } from './components/shipdisplay/shipdisplay.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { AiplacementComponent } from './components/aiplacement/aiplacement.component';
import { GameComponent } from './components/game/game.component';
export let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [AppComponent, ShipdisplayComponent, HeaderComponent, HomeComponent, MapComponent, AiplacementComponent, GameComponent],
        imports: [
            BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            ToastrModule.forRoot(),
        ],
        providers: [],
        bootstrap: [AppComponent],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map