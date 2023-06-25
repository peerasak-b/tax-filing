import { Input, OnInit, Output, Component, ViewChild } from '@angular/core';
import { FilingTypeComponent } from '../filing-type/filing-type.component';
import { VatMonthComponent } from '../vat-month/vat-month.component';

@Component({
  selector: 'app-tax-filing',
  templateUrl: './tax-filing.component.html',
  styleUrls: ['./tax-filing.component.scss']
})
export class TaxFilingComponent implements OnInit {
  @Input() filingType = "";
  @Input() saleAmount = 0;
  @Input() vatMonth = ""; 
  @Input() vatYear = "";

  @ViewChild(FilingTypeComponent) filingTypeComponent: FilingTypeComponent = new FilingTypeComponent();
  @ViewChild(VatMonthComponent) vatMonthComponent: VatMonthComponent = new VatMonthComponent();

  ngOnInit(): void {
  }

  setFilingType(typeCode: string) {
    this.filingType = typeCode;
  }

  setTaxConputation(sale: number, ) {
    this.saleAmount = sale;
  }
}
