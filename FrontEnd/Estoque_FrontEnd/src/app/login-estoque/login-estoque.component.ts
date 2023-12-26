import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-estoque',
  templateUrl: './login-estoque.component.html',
  styleUrl: './login-estoque.component.scss'
})
export class LoginEstoqueComponent {
  constructor(private router: Router) { }
  public ngOnInit(): void {
    //   this.router.navigate(['/home']);
  }
}
