import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-saida-produto-modal',
  templateUrl: './saida-produto-modal.component.html',
  styleUrl: './saida-produto-modal.component.scss'
})
export class SaidaProdutoModalComponent {
  constructor(public bsModalRef: BsModalRef) {}
}
