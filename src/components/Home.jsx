import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getQuery } from '../services/api';

export default class Home extends Component {
  state = {
    categoria: [],
    query: '',
    renderList: '',
  };

  async componentDidMount() {
    const categoria = await getCategories();
    this.setState({
      categoria,
    });
  }

  atualizarInput = ({ target }) => {
    this.setState({
      query: target.value,
    });
  };

  pesquisarProduto = async (event) => {
    event.preventDefault();
    const { query } = this.state;
    const produtos = await getQuery(query);
    const listaDeProdutos = produtos.results;
    const elemento = (
      <div>
        {listaDeProdutos.length < 1 ? 'Nenhum produto foi encontrado'
          : (
            <ul>
              {listaDeProdutos.map((e) => (
                <li
                  data-testid="product"
                  key={ e.title }
                >
                  {e.title}
                  {e.thumbnail}
                  {e.price}
                </li>
              ))}
            </ul>
          )}
      </div>
    );
    this.setState({
      renderList: elemento,
    });
  };

  render() {
    const { categoria, query, renderList } = this.state;
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
                // onClick=""
              />
            </label>
          ))}
        </div>
        <form>
          <label htmlFor="queryId">
            <input
              data-testid="query-input"
              type="text"
              id="queryId"
              value={ query }
              onChange={ this.atualizarInput }
            />
          </label>
          <button
            data-testid="query-button"
            type="submit"
            value={ query }
            onClick={ this.pesquisarProduto }
          >
            botão
          </button>
        </form>
        { renderList }
        <div />
      </div>
    );
  }
}
