import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { TaxFilingDocument } from 'src/app/module/tax-filing/models/tax-filing.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit{
  @Input() title = '';
  @Input() content= '';

  constructor(
    private modalService: BsModalService,
    private options: ModalOptions,
    public sanitizer?: DomSanitizer,
  ){}

  ngOnInit(): void {
    JSON.parse(this.content);
  }
  closeModal() {
    console.log(this.title);
    this.modalService.hide();
  }
  
}
