import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EntradaSaidaViewModel } from '../../model/entradasaidaviewmodel';
import { LacamentosService } from '../../services/lacamentos.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-saida-produto-modal',
  templateUrl: './saida-produto-modal.component.html',
  styleUrl: './saida-produto-modal.component.scss'
})
export class SaidaProdutoModalComponent {
  entrada: EntradaSaidaViewModel = new EntradaSaidaViewModel ();

  constructor(
    public bsModalRef: BsModalRef,
    private lancamentosService: LacamentosService,
    private toastr: ToastrService
    ) {}

    registrarSaida(): void {
      this.lancamentosService.registrarSaidaProduto(this.entrada).subscribe({
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
