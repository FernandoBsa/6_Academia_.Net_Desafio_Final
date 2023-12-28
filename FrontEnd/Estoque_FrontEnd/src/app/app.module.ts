import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabelaEstoqueComponent } from './tabela-estoque/tabela-estoque.component';
import { LancamentosEstoqueComponent } from './lancamentos-estoque/lancamentos-estoque.component';
import { HomeComponent } from './home/home.component';
import { CadastroProdutoModalComponent } from './tabela-estoque/cadastro-produto-modal/cadastro-produto-modal.component';
import { EntradaProdutoModalComponent } from './tabela-estoque/entrada-produto-modal/entrada-produto-modal.component';
import { SaidaProdutoModalComponent } from './tabela-estoque/saida-produto-modal/saida-produto-modal.component';
import { LoginEstoqueComponent } from './login-estoque/login-estoque.component';
import { ContatoEstoqueComponent } from './contato-estoque/contato-estoque.component';
import { EditarProdutoModalComponent } from './tabela-estoque/editar-produto-modal/editar-produto-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TabelaEstoqueComponent,
    LancamentosEstoqueComponent,
    HomeComponent,
    CadastroProdutoModalComponent,
    EntradaProdutoModalComponent,
    SaidaProdutoModalComponent,
    LoginEstoqueComponent,
    ContatoEstoqueComponent,
    EditarProdutoModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
