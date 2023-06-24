import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaxFillingModule } from './module/tax-filling/tax-filling.module';
import { SharedModule } from './shared/shared.module';
import { TaxFillingComponent } from './module/tax-filling/components/tax-filling.component';

@NgModule({
  declarations: [
    AppComponent,
    TaxFillingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TaxFillingModule,
    SharedModule
  ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
