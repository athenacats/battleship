import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
describe('HeaderComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent]
        });
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=header.component.spec.js.map