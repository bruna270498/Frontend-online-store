import React, { Component } from 'react';
import CartItem from './CartItem';

export default class Carrinho extends Component {
  state = {
    produtosDoCarrinho: [],
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

  updateStorage = () => {
    const { produtosDoCarrinho } = this.state;
    localStorage.setItem('carrinho', JSON.stringify(produtosDoCarrinho));
  };

  adicionarMaisUm = (id) => {
    const { produtosDoCarrinho } = this.state;
    produtosDoCarrinho.forEach((e) => {
      if (e.id === id) {
        e.quantidade += 1;
      }
    });

    this.setState({
      produtosDoCarrinho,
    });
    this.updateStorage();
  };

  removerUm = (id) => {
    const { produtosDoCarrinho } = this.state;
    produtosDoCarrinho.forEach((e) => {
      if (e.id === id && e.quantidade > 1) {
        e.quantidade -= 1;
      }
    });

    this.setState({
      produtosDoCarrinho,
    });
    this.updateStorage();
  };

  remover = (id) => {
    const { produtosDoCarrinho } = this.state;
    let indiceDoProduto;
    produtosDoCarrinho.forEach((e, i) => {
      if (e.id === id) {
        indiceDoProduto = i;
      }
    });

    produtosDoCarrinho.splice(indiceDoProduto, 1);
    this.setState({
      produtosDoCarrinho,
    });
    this.checkCarrinhoVazio();
    this.updateStorage();
  };

  checkCarrinhoVazio = () => {
    const { produtosDoCarrinho } = this.state;

    const value = produtosDoCarrinho.length !== 0;

    this.setState({
      produtosProntos: value,
    });
  };

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
            <CartItem
              key={ key }
              produto={ e }
              adicionarMaisUm={ () => this.adicionarMaisUm(e.id) }
              removerUm={ () => this.removerUm(e.id) }
              remover={ () => this.remover(e.id) }
            />
          )) : carrinhoVazio }
      </div>
    );
  }
}
