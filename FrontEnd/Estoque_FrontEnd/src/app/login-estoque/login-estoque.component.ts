import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginViewModel } from '../model/loginviewmodel';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-estoque',
  templateUrl: './login-estoque.component.html',
  styleUrl: './login-estoque.component.scss'
})
export class LoginEstoqueComponent {
  loginUser: LoginViewModel = new LoginViewModel();

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService
  ) { }

  fazerLogin(): void {
    this.loginService.login(this.loginUser).subscribe({
      next: () => {
        this.loginService.setAutenticacao(true);
        this.loginService.setNomeLogin(this.loginUser.NomeUsuario);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.loginService.setAutenticacao(false);
        this.toastr.error(error.error.error);
      }
    }
    );
  }

}
