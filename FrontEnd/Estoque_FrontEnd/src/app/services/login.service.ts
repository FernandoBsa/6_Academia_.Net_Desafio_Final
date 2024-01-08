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
    if(typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('usuarioAutenticado') === 'true'
    }
    else {
      return false;
    }    
   }

  setAutenticacao(value: boolean){
    this.usuarioAutenticado = value;
    sessionStorage.setItem('usuarioAutenticado', value.toString());
  }

  setNomeLogin(value: string){
    this.nomeLogin = value;
    sessionStorage.setItem('nomeLogin', value);
  }

  getNomeLogin(): string {
    if(typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('nomeLogin') || '';
    }
    else {
      return '';
    }   
  }

  logout(): void {
    sessionStorage.removeItem('usuarioAutenticado');
    sessionStorage.removeItem('nomeLogin');
    this.usuarioAutenticado = false;
    this.nomeLogin = '';
  }
}
