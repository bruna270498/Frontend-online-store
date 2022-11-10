import React, { Component } from 'react';
import CartItem from './CartItem';

export default class Carrinho extends Component {
  state = {
    produtosDoCarrinho: [],
    produtosProntos: false,
    quantidadeProduto: 1,
  };

  componentDidMount() {
    const produtosDoCarrinho = JSON.parse(localStorage.getItem('carrinho'));
    if (produtosDoCarrinho !== null) {
      this.setState({
        produtosProntos: true,
        produtosDoCarrinho,
      });
    }
  }

  componentWillUnmount() {
    const { produtosDoCarrinho } = this.state;
    localStorage.setItem('carrinho', JSON.stringify(produtosDoCarrinho));
  }

  adicionarMaisUm = (id) => {
    const { produtosDoCarrinho } = this.state;
    produtosDoCarrinho.forEach((produto) => {
      if (id === produto.id) {
        produto.quantidade += 1;
      }
      this.setState({
        produtosDoCarrinho,
      });
    });
  };

  removerUm = (id) => {
    const produtosDoCarrinho = JSON.parse(localStorage.getItem('carrinho'));
    produtosDoCarrinho.forEach((produto) => {
      if (id === produto.id) {
        this.setState((prevState) => ({
          quantidadeProduto: prevState.quantidadeProduto - 1,
        }));
        produto.quantidade -= 1;
      }
    });
    localStorage.setItem('carrinho', JSON.stringify(produtosDoCarrinho));
  };

  render() {
    const { produtosDoCarrinho, produtosProntos, quantidadeProduto } = this.state;
    const carrinhoVazio = (
      <h1
        data-testid="shopping-cart-empty-message"
      >
        Seu carrinho está vazio
      </h1>
    );

    return (
      <div>
        { produtosProntos === true
          ? produtosDoCarrinho.map((e, key) => (
            <CartItem
              key={ key }
              produto={ e }
              quantidadeProduto={ quantidadeProduto }
              adicionarMaisUm={ () => this.adicionarMaisUm(e.id) }
              removerUm={ () => this.removerUm(e.id) }
              remover={ () => this.remover(e) }
            />
          )) : carrinhoVazio }
      </div>
    );
  }
}
