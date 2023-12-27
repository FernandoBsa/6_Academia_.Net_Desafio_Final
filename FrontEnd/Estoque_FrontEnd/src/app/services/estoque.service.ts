import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstoqueViewModel } from '../model/estoqueviewmodel';

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
}
