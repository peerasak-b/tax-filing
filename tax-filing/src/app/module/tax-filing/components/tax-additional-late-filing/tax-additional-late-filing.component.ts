import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Standard, TaxAddLateDocument, TaxFilingDocument } from '../../models/tax-filing.model';
@Component({
  selector: 'app-tax-additional-late-filing',
  templateUrl: './tax-additional-late-filing.component.html',
  styleUrls: ['./tax-additional-late-filing.component.scss']
})
export class TaxAdditionalLateFilingComponent implements OnInit{
  @Input() saleAmount = 0;
  @Input() taxAmount = 0;
  @Input() status = '';
  @Input() taxData?: TaxFilingDocument;
  @Output() taxAddLateFilingEvent = new EventEmitter<TaxAddLateDocument>();
  public taxAdditionalForm: FormGroup = new FormGroup({});
  public icon = faCircleQuestion;
  public surcharge = 0;
  public penalty = 200;
  public totalVat = 0;
  public taxAddLateDocument?: TaxAddLateDocument;
  public taxDataDocument?: TaxFilingDocument;

  get formGroup() {
    return this.taxAdditionalForm.controls;
  }
  constructor(private cdRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.createAddLateFilingForm();
    this.disabledField();
  }

  ngOnChanges():void {
    this.createAddLateFilingForm();
    this.formGroup['surcharge'].setValue(0, { emitEvent: false });
    this.formGroup['penalty'].setValue(200, { emitEvent: false });
    this.formGroup['totalVat'].setValue(0, { emitEvent: false });
    this.initAddLateFilingForm();
    this.disabledField();
    if(this.status == 'confirm') {
      this.setTaxDataToDocument();
    }
  }

  createAddLateFilingForm() {
    this.taxAdditionalForm = new FormGroup({
      surcharge: new FormControl(null,),
      penalty: new FormControl(null),
      totalVat: new FormControl(null)
    });
  }
  
  disabledField() {
    this.formGroup['surcharge'].disable({emitEvent:false});
    this.formGroup['penalty'].disable({emitEvent:false});
    this.formGroup['totalVat'].disable({emitEvent:false});
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
    this.emitTaxAddLateFiling();

  }

  emitTaxAddLateFiling() {
    this.taxAddLateDocument = new TaxAddLateDocument({
      surcharge: this.surcharge,
      penalty: this.penalty,
      totalVat: this.totalVat
    });
    this.taxAddLateFilingEvent.emit(this.taxAddLateDocument);
  }

  setTaxDataToDocument() {
    this.taxDataDocument = new TaxFilingDocument({
      surcharge: this.taxData?.surcharge,
      penalty: this.taxData?.penalty,
      totalVat: this.taxData?.totalVat
    });
  }

  onChangeValue() {
    this.cdRef.detectChanges();
  }
}
