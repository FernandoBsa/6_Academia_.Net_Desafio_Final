import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstoqueViewModel } from '../model/estoqueviewmodel';
import { CadastroViewModel } from '../model/cadastroviewmodel';
import { FiltroProdutoViewModel } from '../model/filtroprodutoviewmodel';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  consultarTodosProdutos(): Observable<EstoqueViewModel[]> {
    return this.http.get<EstoqueViewModel[]>(`${this.apiUrl}/Estoque/ConsultarTodosProdutos`);
  }

  excluirProduto(produtoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Estoque/ExcluirProduto/${produtoId}`)
  }

  cadastrarProduto(produto: CadastroViewModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/Estoque/CadastroProduto`, produto);
  }

  alterarProduto(produto: EstoqueViewModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/Estoque/AlterarProduto`, produto);
  }

  obterProduto(produtoId: number): Observable<EstoqueViewModel> {
    return this.http.get<EstoqueViewModel>(`${this.apiUrl}/Estoque/ObterProduto/${produtoId}`);
  }

  filtrarProdutos(filtro: FiltroProdutoViewModel): Observable<EstoqueViewModel[]> {
    return this.http.get<EstoqueViewModel[]>(`${this.apiUrl}/Estoque/FiltrarProdutos`, { params: filtro as any });
  }

}
