import { Input, OnInit, Output, Component, ViewChild } from '@angular/core';
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
  // @Input() filingType = "";
  // @Input() vatMonth = ""; 
  // @Input() vatYear = "";
  // @Input() type = "";

  @ViewChild(FilingTypeComponent) filingTypeComponent: FilingTypeComponent = new FilingTypeComponent();
  @ViewChild(VatMonthComponent) vatMonthComponent: VatMonthComponent = new VatMonthComponent();
  @ViewChild(TaxComputationComponent) taxComputationComponent: TaxComputationComponent = new TaxComputationComponent();
  public taxComputation?: TaxComputationDocument;
  public taxVatMonth?: VatMonthYearDocument;
  public taxfiling?: TaxFilingDocument;
  public filingType?: Standard
  ngOnInit(): void {
  }

  setFilingType(typeCode: Standard) {
    console.log(typeCode);
    this.filingType = new Standard({
      code: typeCode.code,
      name: typeCode.name
    });
    console.log(this.filingType);
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
    console.log(this.taxfiling);
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
    console.log(this.taxfiling);
  }

  prepareDataToDocument() {
    this.taxfiling = new TaxFilingDocument({
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
    console.log(this.taxfiling);
    
  }
}
