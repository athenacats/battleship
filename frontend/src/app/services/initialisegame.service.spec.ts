import { TestBed } from '@angular/core/testing';

import { InitialisegameService } from './initialisegame.service';

describe('InitialisegameService', () => {
  let service: InitialisegameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialisegameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
