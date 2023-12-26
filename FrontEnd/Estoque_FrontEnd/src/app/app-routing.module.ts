import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelaEstoqueComponent } from './tabela-estoque/tabela-estoque.component';
import { LancamentosEstoqueComponent } from './lancamentos-estoque/lancamentos-estoque.component';
import { HomeComponent } from './home/home.component';
import { LoginEstoqueComponent } from './login-estoque/login-estoque.component';
import { ContatoEstoqueComponent } from './contato-estoque/contato-estoque.component';

const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
{ path: 'estoque', component: TabelaEstoqueComponent },
{ path: 'lancamentos', component: LancamentosEstoqueComponent },
{ path: 'login', component: LoginEstoqueComponent },
{ path: 'contato', component: ContatoEstoqueComponent },
{ path: '**', redirectTo: '/home'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }