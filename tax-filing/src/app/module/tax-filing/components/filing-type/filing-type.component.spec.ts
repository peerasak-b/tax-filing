import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxFilingDetailComponent } from './filing-type.component';

describe('TaxFilingComponent', () => {
  let component: TaxFilingDetailComponent;
  let fixture: ComponentFixture<TaxFilingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxFilingDetailComponent]
    });
    fixture = TestBed.createComponent(TaxFilingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
