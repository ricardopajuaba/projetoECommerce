import { Component, OnInit } from '@angular/core';
import { CarrinhoDeComprasService } from '../services/carrinho-de-compras.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-venda',
  templateUrl: './cadastro-venda.component.html',
  styleUrls: ['./cadastro-venda.component.css']
})
export class CadastroVendaComponent implements OnInit {

  mensagem_sucesso: string = '';

  dados_cliente = {
    nomeCliente: '',
    emailCliente: '',
    accessToken: '',
    dataExpiracao: ''
  };

  dados_carrinho: any = {}; //vazio

  constructor(
    private httpClient: HttpClient, //inicialização
    private carrinhoDeComprasService: CarrinhoDeComprasService, //inicialização
    private router: Router //inicialização
  ) { }

  //função executada sempre que o componente é carregado..
  ngOnInit(): void {

    //obter os dados do cliente autenticado pela API
    var dados = localStorage.getItem('DADOS_CLIENTE');

    if (dados != null && dados != undefined) {

      //capturar todos os dados do cliente autenticado
      this.dados_cliente = JSON.parse(dados);

      //capturar todos os itens do carrinho de compras
      this.dados_carrinho = this.carrinhoDeComprasService.obterCarrinhoDeCompras();
    }
    else {
      this.router.navigate(['/login-clientes']);
    }
  }

  //função para finalizar a compra
  finalizarCompra(): void {

    //dados para envio a API:
    var dados_venda = {
      dataVenda: new Date(),
      emailCliente: this.dados_cliente.emailCliente,
      observacoes: "Aula de JAVA - COTI Informática",
      produtos: [] as number[]
    }

    //adicionando os produtos do carrinho de compras:
    for (var i = 0; i < this.dados_carrinho.itens.length; i++) {
      var idProduto = this.dados_carrinho.itens[i].idProduto as number;
      dados_venda.produtos.push(idProduto);
    }

    //acessando a API para gravar a compra
    this.httpClient.post(environment.apiECommerce + "vendas", dados_venda,
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.dados_cliente.accessToken) })
      .subscribe(
        (data: any) => {

          //exibir mensagem de sucesso
          this.mensagem_sucesso = data.message;

          //limpar o carrinho de compras
          this.carrinhoDeComprasService.finalizarCompra();
          //recarregar a página
          this.ngOnInit();

          this.dados_carrinho.quantidadeItens = 0;
        },
        (e: any) => {
          console.log(e);
        }
      )

  }

}
