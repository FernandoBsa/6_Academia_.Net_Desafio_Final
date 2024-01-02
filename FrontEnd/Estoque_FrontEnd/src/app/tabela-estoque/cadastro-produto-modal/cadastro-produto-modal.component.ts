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
    debugger;
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
