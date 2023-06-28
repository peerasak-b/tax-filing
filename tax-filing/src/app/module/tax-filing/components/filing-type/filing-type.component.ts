import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Standard, TaxFilingDocument } from '../../models/tax-filing.model';

@Component({
  selector: 'app-filing-type',
  templateUrl: './filing-type.component.html',
  styleUrls: ['./filing-type.component.scss']
})
export class FilingTypeComponent  implements OnInit {
  @Input() status= '';
  @Input() taxData?: TaxFilingDocument;
  @Output() filingTypeEvent = new EventEmitter<Standard>();
  public taxFilingTypeForm: FormGroup = new FormGroup({});
  public taxFilingType = [
    {code: '1', name: 'Ordinary Filing'},
    {code: '2', name: 'Additional Filing'}
  ]
  public icon = faCircleQuestion;
  public taxDataDocument?: TaxFilingDocument;
  get formGroup() {
    return this.taxFilingTypeForm.controls;
}
  ngOnInit(): void {
    this.createTaxFilingForm();
    this.onSelect();
    if(this.status == 'confirm') {
      this.setTaxDataToDocument()
    }
  }
  ngOnChanges(): void{
    if(this.status == 'confirm') {
      this.setTaxDataToDocument()
    }
  }

  createTaxFilingForm() {
      this.taxFilingTypeForm = new FormGroup({
        taxFilingType: new FormControl('1',[Validators.required]),
    });
  }

  onSelect()  {
    const taxType = new Standard({
      code: this.formGroup['taxFilingType'].value,
      name: this.taxFilingType.find(c => c.code === this.formGroup['taxFilingType'].value)?.name
    })
    this.emitFilingType(taxType)
  } 

  emitFilingType(value: Standard) {
    this.filingTypeEvent.emit(value);
  }

  setTaxDataToDocument() {
    this.taxDataDocument = new TaxFilingDocument({
      filingType: new Standard({
        code: this.taxData?.filingType?.code,
        name: this.taxData?.filingType?.name
      })
    })
  }
}
