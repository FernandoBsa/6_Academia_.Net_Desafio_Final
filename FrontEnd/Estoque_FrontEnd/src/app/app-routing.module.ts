import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelaEstoqueComponent } from './tabela-estoque/tabela-estoque.component';
import { LancamentosEstoqueComponent } from './lancamentos-estoque/lancamentos-estoque.component';
import { HomeComponent } from './home/home.component';
import { LoginEstoqueComponent } from './login-estoque/login-estoque.component';
import { ContatoEstoqueComponent } from './contato-estoque/contato-estoque.component';
import { AuthguardService } from './services/authguard.service'

const routes: Routes = [
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'home', component: HomeComponent, canActivate: [AuthguardService]},
{ path: 'estoque', component: TabelaEstoqueComponent, canActivate: [AuthguardService]},
{ path: 'lancamentos', component: LancamentosEstoqueComponent, canActivate: [AuthguardService] },
{ path: 'login', component: LoginEstoqueComponent },
{ path: 'contato', component: ContatoEstoqueComponent,canActivate: [AuthguardService] },
{ path: '**', redirectTo: '/home'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }