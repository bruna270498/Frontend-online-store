import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getQuery, getCategoryById } from '../services/api';

export default class Home extends Component {
  state = {
    categoria: [],
    query: '',
    renderList: '',
    renderCategory: '',
  };

  async componentDidMount() {
    const categoria = await getCategories();
    this.setState({
      categoria,
    });
  }

  pesquisarCategoria = async ({ target }) => {
    const { id } = target;
    const categorias = await getCategoryById(id);
    const listaDeCategorias = categorias.results;
    const elementoCategoria = (
      <div>
        <ul>
          {listaDeCategorias.map((e) => (
            <li
              data-testid="product"
              key={ e.title }
            >
              {e.title}
              {e.thumbnail}
              {e.price}
              <Link
                data-testid="product-detail-link"
                to={ `/detalhes/${e.id}` }
              >
                Detalhes do Produto
              </Link>
              <button
                data-testid="product-add-to-cart"
                type="button"
                onClick={ () => this.adicionarProdutoaoCarrinho(e) }
              >
                Adicionar ao Carrinho
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
    this.setState({
      renderCategory: elementoCategoria,
    });
  };

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
                  <Link
                    data-testid="product-detail-link"
                    to={ `/detalhes/${e.id}` }
                  >
                    Detalhes do Produto
                  </Link>
                  <button
                    data-testid="product-add-to-cart"
                    type="button"
                    onClick={ () => this.adicionarProdutoaoCarrinho(e) }
                  >
                    Adicionar ao Carrinho
                  </button>
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
    const { categoria, query, renderList, renderCategory } = this.state;
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
            <label key={ e.id } htmlFor={ e.id } data-testid="category">
              {e.name}
              <input
                type="radio"
                value={ e.name }
                id={ e.id }
                name="category"
                onClick={ this.pesquisarCategoria }
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
        { renderCategory }
        <div />
      </div>
    );
  }
}
