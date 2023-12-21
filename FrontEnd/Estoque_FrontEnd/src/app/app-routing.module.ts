import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelaEstoqueComponent } from './tabela-estoque/tabela-estoque.component';
import { LancamentosEstoqueComponent } from './lancamentos-estoque/lancamentos-estoque.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
{ path: 'estoque', component: TabelaEstoqueComponent },
{ path: 'lancamentos', component: LancamentosEstoqueComponent },
{ path: '**', redirectTo: '/home'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }