import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EstoqueService } from '../services/estoque.service';
import { EstoqueViewModel } from '../model/estoqueviewmodel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';
import { LacamentosService } from '../services/lacamentos.service';
import { FiltroProdutoViewModel } from '../model/filtroprodutoviewmodel';
import { CadastroViewModel } from '../model/cadastroviewmodel';
import { EntradaSaidaViewModel } from '../model/entradasaidaviewmodel';
import { disableDebugTools } from '@angular/platform-browser';
import { error } from 'node:console';


@Component({
  selector: 'app-tabela-estoque',
  templateUrl: './tabela-estoque.component.html',
  styleUrl: './tabela-estoque.component.scss'
})
export class TabelaEstoqueComponent {
  modalRef: BsModalRef | undefined;
  produtos: EstoqueViewModel[] = [];
  idProduto: number = 0
  produtoselecionado: number | null = null;
  public filtro: FiltroProdutoViewModel = new FiltroProdutoViewModel();
  produtosFiltro: EstoqueViewModel[] = [];
  novoProduto: CadastroViewModel = new CadastroViewModel
  entrada: EntradaSaidaViewModel = new EntradaSaidaViewModel();
  saida: EntradaSaidaViewModel = new EntradaSaidaViewModel();
  produtoEditar: EstoqueViewModel = new EstoqueViewModel();


  constructor(
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private estoqueService: EstoqueService,
    private lancamentosService: LacamentosService,
    private modalServiceConfirmacao: NgbModal,
    private modalServiceFiltro: NgbModal,
    private modalServiceCadastro: NgbModal,
    private modalServiceEntrada: NgbModal,
    private modalServiceSaida: NgbModal,
    private modalSerivceEditar: NgbModal,
    private toastr: ToastrService,
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

  openExcluir(content: any, id: number) {
    this.idProduto = id;
    this.modalServiceConfirmacao.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result: any) => {
      this.idProduto = 0;
      this.carregarProdutos();
    }).catch((reason: any) => {
      this.idProduto = 0;
      this.carregarProdutos();
    });
  }



  openFiltro(content: any) {
    this.modalServiceFiltro.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then((result: any) => {
    }).catch((reason: any) => {
    });
  }

  filtrarProdutos() {
    this.estoqueService.filtrarProdutos(this.filtro).subscribe(
      (data) => {
        this.produtos = data;
        this.modalServiceFiltro.dismissAll();
      },
      (error) => {
        this.toastr.error(error.error.error);
        this.modalServiceFiltro.dismissAll();
      }
    );
  }

  limparFiltro() {
    this.filtro = new FiltroProdutoViewModel();
  }

  openCadastro(content: any) {
    this.modalServiceCadastro.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then((result: any) => {
      this.carregarProdutos();
    }).catch((reason: any) => {
      this.carregarProdutos();
    });
  }

  cadastrarProduto(): void {
    if (this.novoProduto.Quantidade == null) {
      this.novoProduto.Quantidade = 0;
    }
    if (this.novoProduto.PrecoUnitario == null) {
      this.novoProduto.PrecoUnitario = 0;
    }
    this.estoqueService.cadastrarProduto(this.novoProduto).subscribe({
      next: (response) => {
        this.toastr.success(response.success);
        this.modalServiceFiltro.dismissAll();
      },
      error: (error) => {
        this.toastr.error(error.error.error)
        this.modalServiceFiltro.dismissAll();
      }
    });
  }

  cadastrar() {
    this.cadastrarProduto();
  }

  registrarEntrada(): void {
    this.lancamentosService.registrarEntradaProduto(this.entrada).subscribe({
      next: (response) => {
        this.toastr.success(response.success);
        this.modalServiceFiltro.dismissAll();
        this.limparEntrada()
      },
      error: (error) => {
        this.toastr.error(error.error.error)
        this.modalServiceFiltro.dismissAll();
      }
    })
  }

  openEntrada(content: any) {
    this.modalServiceEntrada.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then((result: any) => {
      this.limparEntrada()
      this.carregarProdutos();
    }).catch((reason: any) => {
      this.limparEntrada()
      this.carregarProdutos();
    });
  }

  registrarSaida(): void {
    this.lancamentosService.registrarSaidaProduto(this.saida).subscribe({
      next: (response) => {
        this.toastr.success(response.success);
        this.modalServiceFiltro.dismissAll();
        this.limparSaida();
      },
      error: (error) => {
        this.toastr.error(error.error.error)
        this.modalServiceFiltro.dismissAll();
      }
    })
  }

  openSaida(content: any) {
    this.modalServiceSaida.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then((result: any) => {
      this.limparSaida();
      this.carregarProdutos();
    }).catch((reason: any) => {
      this.limparSaida();
      this.carregarProdutos();
    });
  }

  limparEntrada() {
    this.entrada = new EntradaSaidaViewModel();
  }

  limparSaida() {
    this.saida = new EntradaSaidaViewModel();
  }


  openEditar(content: any, id: number) {
    this.estoqueService.obterProduto(id).subscribe(
      {
        next: (response) => {
          this.produtoEditar = response;
        },
        error: (error) => {
          this.toastr.error(error.error.error);
        }
      });
    this.modalSerivceEditar.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then((result: any) => {
      this.carregarProdutos();
    }).catch((reason: any) => {
      this.carregarProdutos();
    });
  }

  salvarAlteracoes(): void {
    this.estoqueService.alterarProduto(this.produtoEditar).subscribe({
      next: (response) => {
        this.toastr.success(response.success);
        this.modalSerivceEditar.dismissAll();
      },
      error: (error) => {
        this.toastr.error(error.error.error)
        this.modalSerivceEditar.dismissAll();
      }
    });
  }




}
