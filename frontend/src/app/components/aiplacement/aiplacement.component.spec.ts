import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiplacementComponent } from './aiplacement.component';

describe('AiplacementComponent', () => {
  let component: AiplacementComponent;
  let fixture: ComponentFixture<AiplacementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AiplacementComponent],
    });
    fixture = TestBed.createComponent(AiplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
