import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EntradaSaidaViewModel } from '../../model/entradasaidaviewmodel';
import { LacamentosService } from '../../services/lacamentos.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-entrada-produto-modal',
  templateUrl: './entrada-produto-modal.component.html',
  styleUrl: './entrada-produto-modal.component.scss'
})
export class EntradaProdutoModalComponent {
  entrada: EntradaSaidaViewModel = new EntradaSaidaViewModel ();

  constructor(
    public bsModalRef: BsModalRef,
    private lancamentosService: LacamentosService,
    private toastr: ToastrService
    ) {}

    registrarEntrada(): void {
      this.lancamentosService.registrarEntradaProduto(this.entrada).subscribe({
        next: (response) => {
          this.toastr.success(response.success);
          this.bsModalRef.hide();
          window.location.reload();
        },
        error: (error) => {
          this.toastr.error(error.error.error)
        }
      })
    }


}
