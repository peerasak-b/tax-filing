import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Standard, TaxFilingDocument, VatMonthYearDocument } from '../../models/tax-filing.model';

@Component({
  selector: 'app-vat-month',
  templateUrl: './vat-month.component.html',
  styleUrls: ['./vat-month.component.scss']
})

export class VatMonthComponent implements OnInit {
  @Input() filingType?: Standard;
  @Input() status= '';
  @Input() taxData?: TaxFilingDocument;
  @Output() vatMonthEvent  = new EventEmitter<VatMonthYearDocument>();
  public vatMonthForm: FormGroup = new FormGroup({});
  public vatMonth = "";
  public vatYear = "";
  public type = "";
  public icon = faCaretDown;
  public vatMonthDocument?: VatMonthYearDocument;
  public taxDataDocument?: TaxFilingDocument;
  public months = [
    { code : '01', name : 'January'},
    { code : '02', name : 'February'},
    { code : '03', name : 'March'},
    { code : '04', name : 'April'},
    { code : '05', name : 'May'},
    { code : '06', name : 'June'},
    { code : '07', name : 'July'},
    { code : '08', name : 'August'},
    { code : '09', name : 'September'},
    { code : '10', name : 'October'},
    { code : '11', name : 'November'},
    { code : '12', name : 'December'}
  ];
  public years = [
    { code : '2020', name : '2020'},
    { code : '2021', name : '2021'},
    { code : '2022', name : '2022'},
    { code : '2023', name : '2023'},
  ];
  public types = [
    { code : '1', name : 'One-Time'},
  ];
  filterMonth = this.months; 

  get formGroup() {
      return this.vatMonthForm.controls;
  }
  ngOnInit(): void {
    this.createVatMonthForm();
  }

  ngOnChanges(): void{
    console.log(this.taxData);
    if(this.status == 'confirm') {
      this.setTaxDataToDocument();
    }
  }
  createVatMonthForm() {
      this.vatMonthForm = new FormGroup({
        month: new FormControl(null,[Validators.required]),
        year: new FormControl(null,[Validators.required]),
        type: new FormControl(null)
    });
  }

  onYearChange() {
    if (this.formGroup['month'].value) {
      this.formGroup['month'].setValue(null);
    }

    if (this.formGroup['year'].value == '2023') {
      this.filterMonth = this.months.filter(index => Number(index.code) <= new Date().getMonth());
    } else {
      this.filterMonth = this.months;
    }
    this.vatYear = this.formGroup['year'].value;
    if (this.isCheckedValue()) {
        this.emitVatMonth();
    }
  }

  onMonthChange() {
    this.vatMonth = this.formGroup['month'].value;
    if (this.isCheckedValue()) {
      this.emitVatMonth();
    }
  }

  public setValidation(formControlsNames: string[]) {
    if (this.isAdditionalFiling()) {
      this.formGroup['type'].addValidators([Validators.required]);
      this.formGroup['type'].updateValueAndValidity();
    } else {
      this.formGroup['type'].addValidators([]);
      this.formGroup['type'].updateValueAndValidity();
    }
    formControlsNames.forEach((name: string) => {
        this.vatMonthForm.controls[name].markAsTouched();
        this.vatMonthForm.controls[name].updateValueAndValidity();
    });
}

/**
 * @description validate field
 */
public validVatMothForm() {
    this.setValidation([
        'month',
        'year',
        'type',
    ]);
    return this.vatMonthForm.valid;
}

  onTypeChange() {
    this.type = this.formGroup['type'].value;
    if (this.isCheckedValue()) {
      this.emitVatMonth();
    }
  }

  isAdditionalFiling(): boolean {
    return this.filingType?.code == '2';
  }
  
  emitVatMonth() {
    this.vatMonthDocument = new VatMonthYearDocument({
      vatMonth: new Standard({
        code: this.vatMonth,
        name: this.months.find(c => c.code == this.vatMonth)?.name,
      }),
      vatYear: new Standard({
        code: this.vatYear,
        name: this.years.find(c => c.code == this.vatYear)?.name,
      }),
      type: new Standard({
        code: this.type,
        name: this.types.find(c => c.code == this.type)?.name,
      }),
    });
    this.vatMonthEvent.emit(this.vatMonthDocument);

  }

  isCheckedValue(): boolean {
    let checked = true;
    if (!this.formGroup['month'].value && !this.formGroup['year'].value) {
        checked = false;
    }
    if (this.filingType?.code === '2' && !this.formGroup['type'].value)  {
        checked = false;
    }
    return checked;
  }

  setTaxDataToDocument() {
    this.taxDataDocument = new TaxFilingDocument({
      vatMonth: new Standard({
        code: this.taxData?.vatMonth?.code,
        name: this.taxData?.vatMonth?.name
      }),
      vatYear: new Standard({
        code: this.taxData?.vatYear?.code,
        name: this.taxData?.vatYear?.name
      }),
    })
  }
}
