import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default class Detalhes extends Component {
  state = {
    produto: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const produto = await getProductById(id);
    this.setState({
      produto,
    });
  }

  adicionarProdutoaoCarrinho = (produto) => {
    let produtosDoCarrinho = JSON.parse(localStorage.getItem('carrinho'));
    if (produtosDoCarrinho === null) {
      produtosDoCarrinho = [];
    }
    const { title, price, id } = produto;

    const check = produtosDoCarrinho.some((e) => e.id === id);

    if (check === true) {
      produtosDoCarrinho.forEach((e) => {
        if (e.id === id) {
          e.quantidade += 1;
        }
      });
      localStorage.setItem('carrinho', JSON.stringify(produtosDoCarrinho));
    } else {
      const mock = {
        id,
        title,
        price,
        quantidade: 1,
      };
      produtosDoCarrinho.push(mock);
      localStorage.setItem('carrinho', JSON.stringify(produtosDoCarrinho));
    }
  };

  render() {
    const { produto } = this.state;
    return (
      <div>
        <h1>Detalhes do Produto</h1>
        <h3 data-testid="product-detail-name">
          Nome:
          {' '}
          {produto.title}
        </h3>
        <img
          data-testid="product-detail-image"
          src={ produto.thumbnail }
          alt={ produto.title }
        />
        <h3 data-testid="product-detail-price">
          Preço:
          {' '}
          { produto.price }
        </h3>
        <button
          type="submit"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.adicionarProdutoaoCarrinho(produto) }
        >
          Adicionar ao Carrinho
        </button>
        <Link
          data-testid="shopping-cart-button"
          type="button"
          to="/carrinho"
        >
          vá para o carrinho
        </Link>
      </div>
    );
  }
}

Detalhes.propTypes = {
  id: PropTypes.string,
}.isRequired;
