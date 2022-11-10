import React, { Component } from 'react';

export default class CartItem extends Component {
  render() {
    const { produto, adicionarMaisUm, removerUm, remover, quantidadeProduto } = this.props
    return (
      <div>
        <h4 data-testid="shopping-cart-product-name">
          Nome:
          {' '}
          { produto.title }
        </h4>
        <h4>
          Preço:
          {' '}
          { produto.price }
        </h4>
        <h4 data-testid="shopping-cart-product-quantity">
          {' '}
          { quantidadeProduto }
        </h4>
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
