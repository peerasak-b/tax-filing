import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingTypeComponent } from './filing-type.component';

describe('TaxFilingComponent', () => {
  let component: FilingTypeComponent;
  let fixture: ComponentFixture<FilingTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilingTypeComponent]
    });
    fixture = TestBed.createComponent(FilingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
