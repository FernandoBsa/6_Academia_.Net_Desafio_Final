import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Estoque_FrontEnd';

  constructor(private loginService: LoginService, private router: Router) {}

  estaAutenticado() {
    return this.loginService.userAutenticado(); 
  }

  nomeLogin() {
    return this.loginService.getNomeLogin();
  } 

  fazerLogout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
