import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoDeComprasService {

  //conteudo do carrinho de compras
  dados = {
    valorTotal: 0, //total do carrinho de compras
    quantidadeItens: 0, //quantidade de itens do carrinho
    itens: [{ //os produtos contidos no carrinho
      idProduto: 0,
      nome: '',
      preco: 0,
      quantidade: 0,
      total: 0,
      descricao: '',
      foto: ''
    }]
  }

  constructor() { }

  //função para adicionar itens no carrinho de compras
  adicionarItem(item: any): void {

    //verificar se ja existe um carrinho de compras em memória
    if (localStorage.getItem('carrinho-de-compras') != null) {
      //ler o conteudo do carrinho de compras que já estava em memória
      this.dados = JSON.parse(localStorage.getItem('carrinho-de-compras') as string);
    }
    else {
      //criar o primeiro carrinho de compras do usuario
      this.dados.valorTotal = 0;
      this.dados.quantidadeItens = 0;
      this.dados.itens = [];
    }

    //verificando se o produto que está sendo inserido 
    //no carrinho de compras já foi adicionado ao carrinho
    var itemJaExiste = false;
    for (var i = 0; i < this.dados.itens.length; i++) {
      //verificar se o item do carrinho de compras é o mesmo produto selecionado
      if (this.dados.itens[i].idProduto == item.idProduto) {

        //incrementar a quantidade
        this.dados.itens[i].quantidade++;
        //incrementar o total do produto
        this.dados.itens[i].total = this.dados.itens[i].preco * this.dados.itens[i].quantidade;

        //recalcular o total e quantidade do carrinho de compras
        this.dados.valorTotal += this.dados.itens[i].total;
        this.dados.quantidadeItens += this.dados.itens[i].quantidade;

        itemJaExiste = true;
        break;
      }
    }

    //se o produto não existe no carrinho de compras, 
    //ele será adicionado pela primeira vez
    if (!itemJaExiste) {

      //adicionar o item no carrinho
      this.dados.itens.push({
        idProduto: item.idProduto,
        nome: item.nome,
        preco: item.preco,
        quantidade: 1,
        total: item.preco,
        descricao: item.descricao,
        foto: item.foto
      });

      //recalcular o total do carrinho de compras
      this.dados.valorTotal += item.preco;
      this.dados.quantidadeItens++;
    }

    //salvar os dados na local storage
    localStorage.setItem('carrinho-de-compras', JSON.stringify(this.dados));
  }

  //função para retornar todo o conteudo do carrinho de compras
  obterCarrinhoDeCompras(): any {

    //capturar o carrinho de compras armazenado na localstorage
    var carrinho = localStorage.getItem('carrinho-de-compras');

    //verificar se o carrinho não veio vazio
    if (carrinho != null) {
      this.dados = JSON.parse(carrinho);
    }

    //retornar o carrinho de compras
    return this.dados;
  }

  //função para limpar todos os itens do carrinho de compras
  limparCarrinho(): void {
    if (window.confirm('Deseja remover todos os itens do seu carrinho de compras?')) {
      localStorage.removeItem('carrinho-de-compras');
    }
  }

  //função para limpar todos os itens do carrinho de compras
  finalizarCompra(): void {
    localStorage.removeItem('carrinho-de-compras');
  }

}
