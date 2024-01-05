import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginViewModel } from '../model/loginviewmodel';
import { EventEmitter } from 'stream';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiUrl = environment.apiUrl

  public nomeLogin: string = '';

  public usuarioAutenticado: boolean = false;

  constructor(private http: HttpClient) { }

  login(user: LoginViewModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/Usuario/Login`, user);
  }

  userAutenticado():boolean {
    return this.usuarioAutenticado;
  }

  setAutenticacao(value: boolean){
    this.usuarioAutenticado = value;
  }

  setNomeLogin(value: string){
    this.nomeLogin = value;
  }

  getNomeLogin(): string {
    return this.nomeLogin;
  }
}
