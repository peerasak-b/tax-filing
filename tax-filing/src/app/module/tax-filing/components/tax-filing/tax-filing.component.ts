import { Input, OnInit, Output, Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FilingTypeComponent } from '../filing-type/filing-type.component';
import { VatMonthComponent } from '../vat-month/vat-month.component';
import { Standard, TaxAddLateDocument, TaxComputationDocument, TaxFilingDocument, VatMonthYearDocument } from '../../models/tax-filing.model';
import { TaxComputationComponent } from '../tax-computation/tax-computation.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PopupComponent } from 'src/app/shared/popup/popup.component';

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
  public modalRef?: BsModalRef;

  constructor(public cdRef: ChangeDetectorRef,
    private modalService: BsModalService,) {}
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
      saleAmount: Number(this.taxComputation?.saleAmount),
      taxAmount: this.taxComputation?.taxAmount,
      surcharge: this.taxComputation?.taxAddLateAmount.surcharge,
      penalty: this.taxComputation?.taxAddLateAmount.penalty,
      totalVat: this.taxComputation?.taxAddLateAmount.totalVat,
    });
    this.status = 'confirm';
  }

   onClickNextToSubmit() {
    if (this.filingType?.code === '2') {
      this.taxComputationComponent.emitTaxAddLate();
    }
    if (this.validFormAllChild()) {
      console.log('test');
      
      this.prepareDataToDocument();
    }
  }

  public validFormAllChild(): boolean{
    this.vatMonthComponent.vatMonthForm.markAllAsTouched();
    return this.vatMonthComponent.validVatMothForm() && 
            this.taxComputationComponent.validForm();
  }

  public openModal(): void {
      const initData = { title: 'Success', content:JSON.stringify(this.taxData) };
      this.modalRef = this.modalService?.show(PopupComponent,
          { ignoreBackdropClick: true, initialState: initData }
      );
  }
  
}
