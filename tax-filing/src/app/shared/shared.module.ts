import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper/stepper.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
  
    StepperComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StepperComponent,
    NavbarComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
