import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EstoqueService } from '../../services/estoque.service';
import { ToastrService } from 'ngx-toastr';
import { CadastroViewModel } from '../../model/cadastroviewmodel';
import { EstoqueViewModel } from '../../model/estoqueviewmodel';


@Component({
  selector: 'app-cadastro-produto-modal',
  templateUrl: './cadastro-produto-modal.component.html',
  styleUrl: './cadastro-produto-modal.component.scss'
})
export class CadastroProdutoModalComponent {
  produto: CadastroViewModel = new CadastroViewModel();

  constructor(
    public bsModalRef: BsModalRef,
    private estoqueService: EstoqueService,
    private toastr: ToastrService
  ) { }


  cadastrarProduto(): void {
    if(this.produto.Quantidade == null){
      this.produto.Quantidade = 0;
    }
    if(this.produto.PrecoUnitario == null){
      this.produto.PrecoUnitario = 0;
    }
    this.estoqueService.cadastrarProduto(this.produto).subscribe({
      next: (response) => {
        this.toastr.success(response.success);
        this.bsModalRef.hide();
      },
      error: (error) => {
        this.toastr.error(error.error.error)
      }
    });
  }

  cadastrar() {
    this.cadastrarProduto();
  }

}
