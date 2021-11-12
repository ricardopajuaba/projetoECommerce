import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig | null> | (() => Partial<IConfig>) = null;

import { AppComponent } from './app.component';
import { LojaProdutosComponent } from './loja-produtos/loja-produtos.component';
import { CadastroClientesComponent } from './cadastro-clientes/cadastro-clientes.component';
import { LoginClientesComponent } from './login-clientes/login-clientes.component';
import { CarrinhoDeComprasComponent } from './carrinho-de-compras/carrinho-de-compras.component';
import { CadastroVendaComponent } from './cadastro-venda/cadastro-venda.component';

//mapeando uma rota para cada componente do projeto
const routes: Routes = [
  { path: '', component: LojaProdutosComponent }, //raiz do projeto
  { path: 'cadastro-clientes', component: CadastroClientesComponent },
  { path: 'login-clientes', component: LoginClientesComponent },
  { path: 'carrinho-de-compras', component: CarrinhoDeComprasComponent },
  { path: 'cadastro-vendas', component: CadastroVendaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LojaProdutosComponent,
    CadastroClientesComponent,
    LoginClientesComponent,
    CarrinhoDeComprasComponent,
    CadastroVendaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), //registrando todas as rotas mapeadas
    HttpClientModule, //biblioteca para requisições na API
    NgxPaginationModule, //biblioteca de paginação de dados
    Ng2SearchPipeModule, //biblioteca de filtro de pesquisa
    FormsModule, //biblioteca para desenvolvimento de formulários
    ReactiveFormsModule, //biblioteca para desenvolvimento de formulários
    NgxMaskModule.forRoot() //biblioteca para mascara de campos de formulários
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
