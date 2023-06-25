import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VatMonthComponent } from './components/vat-month/vat-month.component';
import { FilingTypeComponent } from './components/filing-type/filing-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaxFilingComponent } from './components/tax-filing/tax-filing.component';
import { TaxComputationComponent } from './components/tax-computation/tax-computation.component';



@NgModule({
  declarations: [
    FilingTypeComponent,
    VatMonthComponent,
    TaxFilingComponent,
    TaxComputationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
})
export class TaxFilingModule { }
