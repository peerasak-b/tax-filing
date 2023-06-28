import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper/stepper.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PopupComponent } from './popup/popup.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
  
    StepperComponent,
    NavbarComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [
    StepperComponent,
    NavbarComponent,
    PopupComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
