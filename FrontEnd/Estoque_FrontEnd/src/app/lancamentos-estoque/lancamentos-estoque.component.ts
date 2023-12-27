import { Component } from '@angular/core';
import { LancamentosViewModel } from '../model/lancamentosviewmodel';
import { LacamentosService } from '../services/lacamentos.service';

@Component({
  selector: 'app-lancamentos-estoque',
  templateUrl: './lancamentos-estoque.component.html',
  styleUrl: './lancamentos-estoque.component.scss'
})
export class LancamentosEstoqueComponent {
lancamentos: LancamentosViewModel[] = []

constructor(private lacamentosService : LacamentosService) {}

ngOnInit(): void {
  this.carregarLancamentos(); 
}

carregarLancamentos(): void {
    this.lacamentosService.consultarTodosLancamentos().subscribe({
      next: (response) => {       
        this.lancamentos = response;
      },
      error: (error) => {console.log('Erro ao obeter produtos', error)}
    }
    );
  }
}
