import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-tax-additional-late-filing',
  templateUrl: './tax-additional-late-filing.component.html',
  styleUrls: ['./tax-additional-late-filing.component.scss']
})
export class TaxAdditionalLateFilingComponent implements OnInit{
  @Input() saleAmount = 0;
  @Input() taxAmount = 0;
  public taxAdditionalForm: FormGroup = new FormGroup({});
  public icon = faCircleQuestion;
  public surcharge = 0;
  public penalty = 200;
  public totalVat = 0;


  get formGroup() {
    return this.taxAdditionalForm.controls;
  }

  ngOnInit(): void {
    this.createAddLateFilingForm();
    this.disabledField();
  }

  ngOnChanges():void {
    this.createAddLateFilingForm();
    this.initAddLateFilingForm();
    this.disabledField()
  }

  createAddLateFilingForm() {
    this.taxAdditionalForm = new FormGroup({
      surcharge: new FormControl(0),
      penalty: new FormControl(200),
      totalVat: new FormControl(0)
    });
  }
  
  disabledField() {
    this.formGroup['surcharge'].disable();
    this.formGroup['penalty'].disable();
    this.formGroup['totalVat'].disable();
  }

  initAddLateFilingForm() {
    let surcharge = 0;
    let totalVat = 0;
    surcharge = this.taxAmount * 0.01;
    totalVat = this.taxAmount + surcharge + this.formGroup['penalty'].value;
    this.formGroup['surcharge'].setValue(surcharge.toFixed(2));
    this.formGroup['totalVat'].setValue(totalVat.toFixed(2));
    this.surcharge = surcharge;
    this.totalVat = totalVat;
  }
}
