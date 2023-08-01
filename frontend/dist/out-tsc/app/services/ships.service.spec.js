import { TestBed } from '@angular/core/testing';
import { ShipsService } from './ships.service';
describe('ShipsService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ShipsService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=ships.service.spec.js.map