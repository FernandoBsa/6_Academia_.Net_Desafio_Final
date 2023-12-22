import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-cadastro-produto-modal',
  templateUrl: './cadastro-produto-modal.component.html',
  styleUrl: './cadastro-produto-modal.component.scss'
})
export class CadastroProdutoModalComponent {
  constructor(public bsModalRef: BsModalRef) {}
}
