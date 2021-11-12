import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarrinhoDeComprasService } from '../services/carrinho-de-compras.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loja-produtos',
  templateUrl: './loja-produtos.component.html',
  styleUrls: ['./loja-produtos.component.css']
})
export class LojaProdutosComponent implements OnInit {

  //atributo para armazenar os produtos (json array)
  produtos: any[] = [];

  //atributo para selecionar 1 produto (adicionar ao carrinho)
  produto: any = {
    idProduto: 0,
    nome: '',
    preco: 0,
    quantidade: 0,
    descricao: '',
    foto: ''
  };

  //atributo para armazenar o numero da paginação
  pagina = 1;

  //atributo para armazenar o filtro de busca
  filtro: string = '';

  constructor(
    private httpClient: HttpClient, //inicializando (injeção de dependencia)
    private carrinhoDeComprasService: CarrinhoDeComprasService, //inicializando
    private router: Router //inicializando
  ) { }

  //função executada quando o componente é carregado
  ngOnInit(): void {

    //fazendo uma requisição para a API para consultar os produtos
    this.httpClient.get(environment.apiECommerce + 'produtos')
      .subscribe( //captura o retorno obtido da API (PROMISSE)
        (data) => { //recebendo a resposta de sucesso da API

          //armazenar os produtos obtidos na API
          this.produtos = data as any[];

        },
        (e) => { //recebendo a resposta de erro da API
          console.log(e);
        }
      );
  }

  //função para capturar o produto selecionado (adicionar ao carrinho)
  selecionarProduto(item: any): void {
    //armazenar os dados do produto no atributo da classe..
    this.produto = item;
  }

  //função para adicionar 1 produto ao carrinho de compras
  adicionarAoCarrinho(): void {

    //adicionar o produto selecionado ao carrinho de compras
    this.carrinhoDeComprasService.adicionarItem(this.produto);

    //redirecionar para a página do carrinho de compras
    this.router.navigate(['/carrinho-de-compras']);
  }

  //função para executar a paginação do componente
  handlePageChange(event: any): void {
    this.pagina = event;
  }

}
