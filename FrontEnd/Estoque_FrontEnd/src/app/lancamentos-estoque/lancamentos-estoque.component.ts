import { Component } from '@angular/core';
import { LancamentosViewModel } from '../model/lancamentosviewmodel';
import { LacamentosService } from '../services/lacamentos.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { log } from 'console';
import { FiltroLogViewModel } from '../model/filtrologviewmodel';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

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
      error: (error) => { console.log('Erro ao obter produtos', error) }
    }
    );
  }

  excluirLog(logId: number): void {
    this.lacamentosService.excluirLog(logId).subscribe({
      next: (response) => {
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

  gerarRelatorioPdfLancamentos() {
    const doc = new jsPDF();
  
    doc.text('Relatório de Lançamentos', 75, 10);
  
    const data = [
      ['ID', 'Produto ID', 'Nome', 'Movimento', 'Quantidade', 'Data'],
      ...this.lancamentos.map(lancamento => [
        lancamento.id,
        lancamento.produtoId,
        lancamento.nomeProduto,
        lancamento.tipoMovimento,
        lancamento.quantidade,
        this.formatarData(lancamento.dataMovimento)
      ]),
    ];
  
    let startY = 20;
    const rowHeight = 10;
    let currentY = startY;
    const marginLeft = 10;
  
    const headers = data[0];
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    for (let i = 0; i < headers.length; i++) {
      const headerText = String(headers[i]);
      doc.text(headerText, marginLeft + i * 30, currentY);
    }
  
    currentY += rowHeight;
  
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      for (let j = 0; j < row.length; j++) {
        doc.text(String(row[j]), marginLeft + j * 30, currentY);
      }
      currentY += rowHeight;
    }
  
    doc.save('Relatorio_Lancamentos.pdf');
  }

  formatarData(data: Date | null): string {
    if (!data) {
      return ''; 
    }
  
    const dateObj = new Date(data);
    const dia = String(dateObj.getDate()).padStart(2, '0');
    const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
    const ano = dateObj.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  }


}
