import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxComputationComponent } from './tax-computation.component';

describe('TaxComputationComponent', () => {
  let component: TaxComputationComponent;
  let fixture: ComponentFixture<TaxComputationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxComputationComponent]
    });
    fixture = TestBed.createComponent(TaxComputationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
