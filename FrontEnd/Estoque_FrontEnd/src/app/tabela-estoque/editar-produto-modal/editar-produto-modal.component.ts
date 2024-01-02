import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EstoqueService } from '../../services/estoque.service';
import { ToastrService } from 'ngx-toastr';
import { EstoqueViewModel } from '../../model/estoqueviewmodel';
import { Router } from 'express';

@Component({
  selector: 'app-editar-produto-modal',
  templateUrl: './editar-produto-modal.component.html',
  styleUrl: './editar-produto-modal.component.scss'
})
export class EditarProdutoModalComponent {

  produto: EstoqueViewModel = new EstoqueViewModel();

  constructor(
    public bsModalRef: BsModalRef,
    private estoqueService: EstoqueService,
    private toastr: ToastrService,
    ) { }

  salvarAlteracoes(): void {
    this.estoqueService.alterarProduto(this.produto).subscribe({
      next: (response) => {
        this.toastr.success(response.success);
        this.bsModalRef.hide();
        window.location.reload();
      },
      error: (error) => {
        this.toastr.error(error.error.error)
      }
    });
  }

}
