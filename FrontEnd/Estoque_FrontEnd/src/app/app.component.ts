import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Estoque_FrontEnd';

  constructor(private loginService: LoginService) {}

  estaAutenticado() {
   return this.loginService.userAutenticado();
  }

  nomeLogin() {
    return this.loginService.getNomeLogin();
  }

  

}
