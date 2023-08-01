import { TestBed } from '@angular/core/testing';
import { ShipdisplayComponent } from './shipdisplay.component';
describe('ShipdisplayComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ShipdisplayComponent]
        });
        fixture = TestBed.createComponent(ShipdisplayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=shipdisplay.component.spec.js.map