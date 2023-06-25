import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vat-month',
  templateUrl: './vat-month.component.html',
  styleUrls: ['./vat-month.component.scss']
})

export class VatMonthComponent implements OnInit {
  @Input() filingType = '';
  public vatMonthForm: FormGroup = new FormGroup({});
  public icon = faCaretDown;
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

  createVatMonthForm() {
      this.vatMonthForm = new FormGroup({
        month: new FormControl(null,[Validators.required]),
        year: new FormControl(null,[Validators.required]),
        type: new FormControl(null)
    });
  }

  onYearSelect() {
    console.log(this.filingType);
    if (this.formGroup['month'].value) {
      this.formGroup['month'].setValue(null);
    }

    if (this.formGroup['year'].value == '2023') {
      this.filterMonth = this.months.filter(index => Number(index.code) <= new Date().getMonth());
    } else {
      this.filterMonth = this.months;
    }
    
  }

  isAdditionalFiling(): boolean {
    return this.filingType == '2';
  }


}
