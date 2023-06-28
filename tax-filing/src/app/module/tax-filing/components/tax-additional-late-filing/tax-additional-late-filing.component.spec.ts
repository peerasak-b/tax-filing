import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxAdditionalLateFilingComponent } from './tax-additional-late-filing.component';

describe('TaxAdditionalLateFilingComponent', () => {
  let component: TaxAdditionalLateFilingComponent;
  let fixture: ComponentFixture<TaxAdditionalLateFilingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxAdditionalLateFilingComponent]
    });
    fixture = TestBed.createComponent(TaxAdditionalLateFilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
