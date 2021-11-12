import { Component, OnInit } from '@angular/core';
import { CarrinhoDeComprasService } from '../services/carrinho-de-compras.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho-de-compras',
  templateUrl: './carrinho-de-compras.component.html',
  styleUrls: ['./carrinho-de-compras.component.css']
})
export class CarrinhoDeComprasComponent implements OnInit {

  //atributo
  dados: any = {}; //vazio

  constructor(
    private carrinhoDeComprasService: CarrinhoDeComprasService, //inicialização
    private router: Router //inicialização
  ) { }

  //evento executado sempre que o componente é carregado
  ngOnInit(): void {

    //capturar todos os itens do carrinho de compras
    this.dados = this.carrinhoDeComprasService.obterCarrinhoDeCompras();
  }

  //função para limpar todo o conteudo do carrinho de compras
  limparCarrinho(): void {
    this.carrinhoDeComprasService.limparCarrinho();
    this.router.navigate(['/carrinho-de-compras'])
      .then(() => {
        window.location.reload();
      });
  }
}
