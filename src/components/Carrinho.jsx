import React, { Component } from 'react';

export default class Carrinho extends Component {
  state = {
    produtosProntos: false,
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

  render() {
    const { produtosDoCarrinho, produtosProntos } = this.state;
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
            <div key={ key }>
              <h4 data-testid="shopping-cart-product-name">
                Nome:
                {' '}
                { e.title }
              </h4>
              <h4>
                Preço:
                {' '}
                { e.price }
              </h4>
              <h4 data-testid="shopping-cart-product-quantity">
                Quantidade:
                {' '}
                { e.quantidade }
              </h4>
            </div>)) : carrinhoVazio }
      </div>
    );
  }
}
