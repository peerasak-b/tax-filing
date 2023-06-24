import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaxFilingModule } from './module/tax-filing/tax-filing.module';
import { SharedModule } from './shared/shared.module';
import { TaxFilingComponent } from './module/tax-filing/components/tax-filing.component';

@NgModule({
  declarations: [
    AppComponent,
    TaxFilingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TaxFilingModule,
    SharedModule
  ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
