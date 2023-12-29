import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { LancamentosViewModel } from '../model/lancamentosviewmodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LacamentosService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  consultarTodosLancamentos(): Observable<LancamentosViewModel[]> {
    return this.http.get<LancamentosViewModel[]>(`${this.apiUrl}/Log/ConsultarLog`);
  }

  
}
