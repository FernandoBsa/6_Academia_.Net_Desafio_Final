import { Component } from '@angular/core';
import { LancamentosViewModel } from '../model/lancamentosviewmodel';
import { LacamentosService } from '../services/lacamentos.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { log } from 'console';
import { FiltroLogViewModel } from '../model/filtrologviewmodel';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lancamentos-estoque',
  templateUrl: './lancamentos-estoque.component.html',
  styleUrl: './lancamentos-estoque.component.scss'
})
export class LancamentosEstoqueComponent {
  lancamentos: LancamentosViewModel[] = []
  idLog: number = 0;
  filtroLog: FiltroLogViewModel = new FiltroLogViewModel()


  constructor(
    private lacamentosService: LacamentosService,
    private modalServiceConfirmacao: NgbModal,
    private toastr: ToastrService,
    private modalserviceLogFiltro: NgbModal,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarLancamentos();
  }

  carregarLancamentos(): void {
    this.lacamentosService.consultarTodosLancamentos().subscribe({
      next: (response) => {
        console.log(response)
        this.lancamentos = response;
      },
      error: (error) => { console.log('Erro ao obeter produtos', error) }
    }
    );
  }

  excluirLog(logId: number): void {
    this.lacamentosService.excluirLog(logId).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success(response.success)
        this.modalServiceConfirmacao.dismissAll();
      },
      error: (error) => {
        this.toastr.error(error.error.error)
        this.modalServiceConfirmacao.dismissAll();
      }
    });
  }

  excluir() {
    this.excluirLog(this.idLog);
  }

  openConfirmacao(content: any, logId: number) {
    this.idLog = logId;
    this.modalServiceConfirmacao.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' }).result.then(
      (result: any) => {
        this.idLog = 0;
        this.carregarLancamentos();
      }).catch(
        (reason: any) => {
          this.idLog = 0;
          this.carregarLancamentos();
        });
  }

  openFiltro(content: any) {
    this.modalserviceLogFiltro.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' }).result.then((result: any) => {
    }).catch((reason: any) => {
    });
  }

  filtrarLancamentos() {
    this.lacamentosService.filtrarLog(this.filtroLog).subscribe(
      (data) => {
        this.lancamentos = data;
        this.modalserviceLogFiltro.dismissAll();
      },
      (error) => {
        this.toastr.error(error.error.error);
        this.modalserviceLogFiltro.dismissAll();
      }
    );
  }

  limparFiltro() {
    this.filtroLog = new FiltroLogViewModel();
  }

}
