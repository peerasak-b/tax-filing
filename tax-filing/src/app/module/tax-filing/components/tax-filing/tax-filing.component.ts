import { Input, OnInit, Output, Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FilingTypeComponent } from '../filing-type/filing-type.component';
import { VatMonthComponent } from '../vat-month/vat-month.component';
import { Standard, TaxAddLateDocument, TaxComputationDocument, TaxFilingDocument, VatMonthYearDocument } from '../../models/tax-filing.model';
import { TaxComputationComponent } from '../tax-computation/tax-computation.component';

@Component({
  selector: 'app-tax-filing',
  templateUrl: './tax-filing.component.html',
  styleUrls: ['./tax-filing.component.scss']
})
export class TaxFilingComponent implements OnInit {
  @ViewChild(FilingTypeComponent) filingTypeComponent: FilingTypeComponent = new FilingTypeComponent();
  @ViewChild(VatMonthComponent) vatMonthComponent: VatMonthComponent = new VatMonthComponent();
  @ViewChild(TaxComputationComponent) taxComputationComponent: TaxComputationComponent = new TaxComputationComponent(this.cdRef);
  public taxComputation?: TaxComputationDocument;
  public taxVatMonth?: VatMonthYearDocument;
  public taxData?: TaxFilingDocument;
  public filingType?: Standard
  public status = 'create';

  constructor(public cdRef: ChangeDetectorRef) {}
  ngOnInit(): void {
  }

  setFilingType(typeCode: Standard) {
    this.filingType = new Standard({
      code: typeCode.code,
      name: typeCode.name
    });
  }

  setTaxConputation(compute: TaxComputationDocument) {
    this.taxComputation = new TaxComputationDocument({
      saleAmount: compute.saleAmount,
      taxAmount: compute.taxAmount,
      taxAddLateAmount: new TaxAddLateDocument({
        surcharge: compute.taxAddLateAmount.surcharge,
        penalty: compute.taxAddLateAmount.penalty,
        totalVat: compute.taxAddLateAmount.totalVat,
      })
    });
  }

  setVatMonth(vat: VatMonthYearDocument) {
    this.taxVatMonth = new VatMonthYearDocument({
      vatMonth:  new Standard({
        code: vat.vatMonth?.code,
        name: vat.vatMonth?.name,
      }),
      vatYear: new Standard({
        code: vat.vatYear?.code,
        name: vat.vatYear?.name,
      }),
      type: new Standard({
        code: vat.type?.code,
        name: vat.type?.name,
      }),
    });
  }

  prepareDataToDocument() {
    this.taxData = new TaxFilingDocument({
      filingType: this.filingType,
      vatMonth: this.taxVatMonth?.vatMonth,
      vatYear: this.taxVatMonth?.vatYear,
      type: this.taxVatMonth?.type,
      saleAmount: this.taxComputation?.saleAmount,
      taxAmount: this.taxComputation?.taxAmount,
      surcharge: this.taxComputation?.taxAddLateAmount.surcharge,
      penalty: this.taxComputation?.taxAddLateAmount.penalty,
      totalVat: this.taxComputation?.taxAddLateAmount.totalVat,
    });
    this.status = 'confirm';
    console.log(this.taxData, this.status);
  }

   onClickNextToSubmit() {
    if (this.validFormAllChild()) {
      this.prepareDataToDocument();
    }
  }

  public validFormAllChild(): boolean{
    this.vatMonthComponent.vatMonthForm.markAllAsTouched();
    return this.vatMonthComponent.validVatMothForm() || 
            this.taxComputationComponent.validForm();
  }
}
