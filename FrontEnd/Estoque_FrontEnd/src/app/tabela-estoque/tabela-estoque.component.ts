import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CadastroProdutoModalComponent } from './cadastro-produto-modal/cadastro-produto-modal.component'
import { EntradaProdutoModalComponent } from './entrada-produto-modal/entrada-produto-modal.component';
import { SaidaProdutoModalComponent } from './saida-produto-modal/saida-produto-modal.component';
import { EstoqueService } from '../services/estoque.service';
import { EstoqueViewModel } from '../model/estoqueviewmodel';
import { EditarProdutoModalComponent } from './editar-produto-modal/editar-produto-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';


@Component({
  selector: 'app-tabela-estoque',
  templateUrl: './tabela-estoque.component.html',
  styleUrl: './tabela-estoque.component.scss'
})
export class TabelaEstoqueComponent {
  modalRef: BsModalRef | undefined;
  produtos: EstoqueViewModel[] = [];
  idProduto: number = 0

  constructor(
    private modalService: BsModalService, 
    private estoqueService: EstoqueService, 
    private modalServiceConfirmacao: NgbModal, 
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.estoqueService.consultarTodosProdutos().subscribe({
      next: (response) => {
        this.produtos = response;
      },
      error: (error) => { console.log('Erro ao obeter produtos', error) }
    }
    );
  }

  excluirProduto(produtoId: number): void {
    this.estoqueService.excluirProduto(produtoId).subscribe({
      next: (response) => {
        this.toastr.success(response.success);
        this.modalServiceConfirmacao.dismissAll();
      },
        error: (error) => {
        this.toastr.error(error.error.error)
        this.modalServiceConfirmacao.dismissAll();     
    }
    });
  }

  excluir() {
    this.excluirProduto(this.idProduto)
  }

  openConfirmacao(content: any, id: number) {
    this.idProduto = id;
    this.modalServiceConfirmacao.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result: any) => {
      this.idProduto = 0;
      this.carregarProdutos();
    }).catch((reason: any) => {
      this.idProduto = 0;
      this.carregarProdutos();
    });
  }


  abrirModalCadastroProduto() {
    this.modalRef = this.modalService.show(CadastroProdutoModalComponent);
  }

  abrirModalEntradaProduto() {
    this.modalRef = this.modalService.show(EntradaProdutoModalComponent);
  }

  abrirModalSaidaProduto() {
    this.modalRef = this.modalService.show(SaidaProdutoModalComponent);
  }

  abrirModalEditarProduto() {
    this.modalRef = this.modalService.show(EditarProdutoModalComponent);
  }

}
