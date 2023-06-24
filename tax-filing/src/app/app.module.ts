import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaxFilingModule } from './module/tax-filing/tax-filing.module';
import { SharedModule } from './shared/shared.module';
import { TaxFilingComponent } from './module/tax-filing/components/tax-filing/tax-filing.component';
import { FilingTypeComponent } from './module/tax-filing/components/filing-type/filing-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    TaxFilingComponent,
    FilingTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TaxFilingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
