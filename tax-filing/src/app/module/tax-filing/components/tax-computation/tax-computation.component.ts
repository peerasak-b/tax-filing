import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatNumber, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/th';
import { TaxAdditionalLateFilingComponent } from '../tax-additional-late-filing/tax-additional-late-filing.component';
import { Standard, TaxAddLateDocument, TaxComputationDocument, TaxFilingDocument } from '../../models/tax-filing.model';
registerLocaleData(localeFr, 'th');

@Component({
  selector: 'app-tax-computation',
  templateUrl: './tax-computation.component.html',
  styleUrls: ['./tax-computation.component.scss']
})
export class TaxComputationComponent implements OnInit {
  @Input() filingType?: Standard;
  @Input() status= "create";
  @Input() taxData?: TaxFilingDocument;
  @Output() taxComputationEvent = new EventEmitter<TaxComputationDocument>();
  @ViewChild(TaxAdditionalLateFilingComponent) taxAddLateFilingComponent: TaxAdditionalLateFilingComponent = new TaxAdditionalLateFilingComponent(this.cdRef);
  public valueDisplay = 0.00;
  public taxForm: FormGroup = new FormGroup({});
  public saleAmount = 0;
  public taxAmount = 0;
  public taxAddLate?: TaxAddLateDocument;
  public taxComputation?: TaxComputationDocument;
  public taxDataDocument?: TaxFilingDocument;
  get formGroup() {
    return this.taxForm.controls;
  } 

  constructor(private cdRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.createTaxFilingForm();
    if (this.filingType) {
      this.filingType.code == '1';
    }
  }

  ngOnChanges(): void {
    if(this.status == 'confirm') {
      this.setTaxDataToDocument();
    }
  }

  ngAfterContentChecked() {
    if (this.filingType) {
      this.filingType.code == '1';
    }
    this.cdRef.detectChanges();
  }
  
  createTaxFilingForm() {
      this.taxForm = new FormGroup({
        saleAmount: new FormControl(0,[Validators.required, Validators.pattern("^[0-9]*$")]),
        taxAmount: new FormControl(0,[Validators.required, Validators.pattern("^[0-9]*$")]),
    });
  }

  isAdditionalFiling(): boolean {
    return this.filingType?.code == '2';
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
    excludeVat = this.formGroup['saleAmount'].value * 0.07;
    this.formGroup['taxAmount'].setValue(excludeVat.toFixed(2));
    this.saleAmount = this.formGroup['saleAmount'].value;
    this.taxAmount = excludeVat;
    this.emitComputation();
  }

  onInputValue(event: any) {
    const value = this.filterNonNumeric(event.target.value);
    event.target.value = value;
  }

  onClick(event: any) {
    if (event.target.value == 0) {
      event.target.value = '';
    }
  }

  filterNonNumeric(value: string): string {
    return value.replace(/[^0-9]/g, '');
  }

  prepareDataEmitToDocument(taxAddLate: TaxAddLateDocument) {
    this.taxAddLate =  new TaxAddLateDocument({
      surcharge: taxAddLate.surcharge,
      penalty: taxAddLate.penalty,
      totalVat: taxAddLate.totalVat
    });
  }

  emitComputation() {
    if (this.filingType?.code === '1') {
      this.taxComputation = new TaxComputationDocument({
        saleAmount:  this.saleAmount,
        taxAmount: this.taxAmount,
        taxAddLateAmount: new TaxAddLateDocument({
          surcharge: 0,
          penalty: 0,
          totalVat: 0
        })
      });
    } else {
      this.taxComputation = new TaxComputationDocument({
        saleAmount:  this.saleAmount,
        taxAmount: this.taxAmount,
        taxAddLateAmount: new TaxAddLateDocument({
          surcharge: this.taxAddLate?.surcharge === undefined ? 0 : this.taxAddLate.surcharge,
          penalty:  this.taxAddLate?.penalty === undefined ? 0 : this.taxAddLate.penalty,
          totalVat:  this.taxAddLate?.totalVat === undefined ? 0 : this.taxAddLate.totalVat
        })
      });
    }
    this.taxComputationEvent.emit(this.taxComputation);
  }

  setTaxDataToDocument() {
    this.taxDataDocument = new TaxFilingDocument({
      saleAmount: this.taxData?.saleAmount,
      taxAmount: this.taxData?.taxAmount,
      surcharge: this.taxData?.surcharge,
      penalty:  this.taxData?.penalty,
      totalVat:  this.taxData?.totalVat
      
    });
  }

  public emitTaxAddLate() {
    this.taxAddLateFilingComponent.initAddLateFilingForm();
    this.emitComputation();
  }
}

