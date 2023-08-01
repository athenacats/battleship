import { TestBed } from '@angular/core/testing';
import { SelectedshipService } from './selectedship.service';
describe('SelectedshipService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SelectedshipService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=selectedship.service.spec.js.map