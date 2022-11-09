import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

export default class Home extends Component {
  state = {
    categoria: [],
  };

  async componentDidMount() {
    const categoria = await getCategories();
    this.setState({
      categoria,
    });
  }

  render() {
    const { categoria } = this.state;
    return (
      <div>
        <h1
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.

        </h1>
        <Link to="/carrinho" data-testid="shopping-cart-button">Carrinho de Compras</Link>
        <div>
          {categoria.map((e) => (
            <label key={ e.id } htmlFor={ e.name } data-testid="category">
              {e.name}
              <input
                type="radio"
                value={ e.name }
                id={ e.name }
                name="category"
                onClick=""
              />
            </label>
          ))}
        </div>
      </div>
    );
  }
}
