import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatNumber, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/th';
import { TaxAdditionalLateFilingComponent } from '../tax-additional-late-filing/tax-additional-late-filing.component';
registerLocaleData(localeFr, 'th');

@Component({
  selector: 'app-tax-computation',
  templateUrl: './tax-computation.component.html',
  styleUrls: ['./tax-computation.component.scss']
})
export class TaxComputationComponent implements OnInit {
  @Input() filingType = '';
  @Output() taxComputationEvent = new EventEmitter<string>();
  public valueDisplay = 0.00;
  public taxForm: FormGroup = new FormGroup({});
  public saleAmount = 0;
  public taxAmount = 0;
  get formGroup() {
    return this.taxForm.controls;
  }

  ngOnInit(): void {
    this.createTaxFilingForm();
  }

  createTaxFilingForm() {
      this.taxForm = new FormGroup({
        saleAmount: new FormControl(0,[Validators.required, Validators.pattern("^[0-9]*$")]),
        taxAmount: new FormControl(0,[Validators.required, Validators.pattern("^[0-9]*$")]),
    });
  }

  isAdditionalFiling(): boolean {
    return this.filingType == '2';
  }

  validForm() {
      this.setValidation([
          'saleAmount',
          'taxAmount',
      ]);
      return this.taxForm.valid;
  }

  setValidation(formControlsNames: string[]) {
    formControlsNames.forEach((name: string) => {
        this.taxForm.controls[name].markAsTouched();
        this.taxForm.controls[name].updateValueAndValidity();
    });
  }

  onChangeValue() {
    let excludeVat = 0;
    const pattern = new RegExp('^[0-9]*$')
    if (pattern.test(this.formGroup['saleAmount'].value)) {
      excludeVat = this.formGroup['saleAmount'].value * 0.07;
      this.formGroup['taxAmount'].setValue(excludeVat.toFixed(2));
      this.saleAmount = this.formGroup['saleAmount'].value;
      this.taxAmount = excludeVat;
    } else {
      this.formGroup['saleAmount'].setValue(0);
      this.formGroup['taxAmount'].setValue(0);
      this.saleAmount = 0;
      this.taxAmount = 0;
    }
  }

  emitComputation(value: string) {
    this.taxComputationEvent.emit(value);
  }
}

