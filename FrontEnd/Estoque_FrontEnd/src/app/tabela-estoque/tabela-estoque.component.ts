import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CadastroProdutoModalComponent } from './cadastro-produto-modal/cadastro-produto-modal.component'
import { EntradaProdutoModalComponent } from './entrada-produto-modal/entrada-produto-modal.component';
import { SaidaProdutoModalComponent } from './saida-produto-modal/saida-produto-modal.component';
@Component({
  selector: 'app-tabela-estoque',
  templateUrl: './tabela-estoque.component.html',
  styleUrl: './tabela-estoque.component.scss'
})
export class TabelaEstoqueComponent {
  modalRef: BsModalRef | undefined;

  constructor(private modalService: BsModalService) { }

  abrirModalCadastroProduto() {
    this.modalRef = this.modalService.show(CadastroProdutoModalComponent);
  }

  abrirModalEntradaProduto() {
    this.modalRef = this.modalService.show(EntradaProdutoModalComponent);
  }

  abrirModalSaidaProduto() {
    this.modalRef = this.modalService.show(SaidaProdutoModalComponent);
  }
}
