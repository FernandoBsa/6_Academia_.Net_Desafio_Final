import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-editar-produto-modal',
  templateUrl: './editar-produto-modal.component.html',
  styleUrl: './editar-produto-modal.component.scss'
})
export class EditarProdutoModalComponent {
  constructor(public bsModalRef: BsModalRef) {}
}
