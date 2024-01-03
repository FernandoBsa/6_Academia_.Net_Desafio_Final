import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { LancamentosViewModel } from '../model/lancamentosviewmodel';
import { Observable } from 'rxjs';
import { EntradaSaidaViewModel } from '../model/entradasaidaviewmodel';

@Injectable({
  providedIn: 'root'
})
export class LacamentosService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  consultarTodosLancamentos(): Observable<LancamentosViewModel[]> {
    return this.http.get<LancamentosViewModel[]>(`${this.apiUrl}/Log/ConsultarLog`);
  }

  excluirLog(logId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Log/ExcluirLog/${logId}`);
  }

  registrarEntradaProduto(entradaProduto: EntradaSaidaViewModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Log/EntradaProduto`, entradaProduto);
  }

  registrarSaidaProduto(saidaProduto: EntradaSaidaViewModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Log/SaidaProduto`, saidaProduto);
  }

}
