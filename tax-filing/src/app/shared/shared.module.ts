import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper/stepper.component';
// import { StepperComponent } from './component/stepper/stepper.component';



@NgModule({
  declarations: [
    // StepperComponent
  
    StepperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StepperComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
