import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    FontAwesomeModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
})
export class TaxFilingModule { }
