import { Input, OnInit, Output, Component } from '@angular/core';

@Component({
  selector: 'app-tax-filing',
  templateUrl: './tax-filing.component.html',
  styleUrls: ['./tax-filing.component.scss']
})
export class TaxFilingComponent {
  @Input() filingType = "";
  @Input() vatMonth = ""; 
  @Input() vatYear = "";
}
