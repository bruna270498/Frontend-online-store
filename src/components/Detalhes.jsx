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
        <Link
          data-testid="shopping-cart-button"
          type="button"
          to="/carrinho"
        >
          Adicionar ao Carrinho
        </Link>
      </div>
    );
  }
}

Detalhes.propTypes = {
  id: PropTypes.string,
}.isRequired;
