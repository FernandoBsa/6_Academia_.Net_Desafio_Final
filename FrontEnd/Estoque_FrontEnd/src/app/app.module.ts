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
import { LoginEstoqueComponent } from './login-estoque/login-estoque.component';
import { ContatoEstoqueComponent } from './contato-estoque/contato-estoque.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { Router } from 'express';

@NgModule({
  declarations: [
    AppComponent,
    TabelaEstoqueComponent,
    LancamentosEstoqueComponent,
    HomeComponent,
    LoginEstoqueComponent,
    ContatoEstoqueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    RouterModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      positionClass: 'toast-top-right',
      progressAnimation: 'decreasing',
      preventDuplicates: true,
    })
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
