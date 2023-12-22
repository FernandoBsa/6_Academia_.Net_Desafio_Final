import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-entrada-produto-modal',
  templateUrl: './entrada-produto-modal.component.html',
  styleUrl: './entrada-produto-modal.component.scss'
})
export class EntradaProdutoModalComponent {
  constructor(public bsModalRef: BsModalRef) {}
}
