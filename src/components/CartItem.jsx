import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CartItem extends Component {
  render() {
    const { produto,
      adicionarMaisUm,
      removerUm,
      remover,
    } = this.props;

    return (
      <div>
        <h4 data-testid="shopping-cart-product-name">
          { produto.title }
        </h4>
        <h4>
          { produto.price }
        </h4>
        <div data-testid="shopping-cart-product-quantity">{ produto.quantidade }</div>
        <button
          id={ produto.id }
          value="acrescentar"
          data-testid="product-increase-quantity"
          type="button"
          onClick={ adicionarMaisUm }
        >
          +1
        </button>
        <button
          data-testid="product-decrease-quantity"
          type="button"
          onClick={ removerUm }
        >
          -1
        </button>
        <button
          data-testid="remove-product"
          type="button"
          onClick={ remover }
        >
          remover
        </button>

      </div>

    );
  }
}

CartItem.propTypes = {
  adicionarMaisUm: PropTypes.func,
}.isRequired;
