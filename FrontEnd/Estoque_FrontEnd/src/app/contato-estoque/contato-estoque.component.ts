import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contato-estoque',
  templateUrl: './contato-estoque.component.html',
  styleUrl: './contato-estoque.component.scss'
})
export class ContatoEstoqueComponent {

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {}

}
