import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

export default class Detalhes extends Component {
  state = {
    produto: '',
    email: '',
    avalia: '',
    comentario: '',
    mensagemError: false,
    infoForm: [],
    comentarioAvaliador: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const produto = await getProductById(id);
    this.setState({
      produto,
    });
    const comentarioAvaliador = JSON.parse(localStorage.getItem(produto.id));
    this.setState({ comentarioAvaliador });
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

  salvarEstado = ({ target }) => {
    const { name } = target;
    const value = (target.checkbox) ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  salvarForm = () => {
    const { comentario, email, avalia, infoForm } = this.state;
    const informacao = { email, avalia, comentario };
    this.setState({
      infoForm: [...infoForm, informacao],
    });
  };

  avaliarBtn = (event) => {
    event.preventDefault();
    const { avalia, email, infoForm, produto } = this.state;
    if (avalia === '' || email === '') {
      // retorna a mensagem de erro campos invalidos
      this.setState({
        mensagemError: true,
      });
    } else { this.setState({ mensagemError: false }); }
    this.salvarForm();
    localStorage.setItem(produto.id, JSON.stringify(infoForm));
  };

  render() {
    const { produto, mensagemError } = this.state;
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
        <form>
          <input
            data-testid="product-detail-email"
            type="email"
            placeholder="Email"
            name="email"
            onChange={ this.salvarEstado }
            required
          />
          <input
            onChange={ this.salvarEstado }
            data-testid="1-rating"
            type="radio"
            name="avalia"
            value="1"
            required
          />
          <input
            onChange={ this.salvarEstado }
            data-testid="2-rating"
            type="radio"
            name="avalia"
            value="2"
            required
          />
          <input
            onChange={ this.salvarEstado }
            data-testid="3-rating"
            type="radio"
            name="avalia"
            value="3"
            required
          />
          <input
            onChange={ this.salvarEstado }
            data-testid="4-rating"
            type="radio"
            name="avalia"
            value="4"
            required
          />
          <input
            onChange={ this.salvarEstado }
            data-testid="5-rating"
            type="radio"
            name="avalia"
            value="5"
            required
          />
          <textarea
            data-testid="product-detail-evaluation"
            onChange={ this.salvarEstado }
            type="text"
            name="comentario"
            placeholder="Deixe seu Comentário"
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.avaliarBtn }
          >
            Avaliar

          </button>
          {mensagemError && (

            <span data-testid="error-msg">Campos inválidos</span>

          )}
        </form>
        {/* {comentarioAvaliador.map((e, index) => (
          <div key={ index }>
            <h3>{e.email}</h3>
            <h3>{e.avalia}</h3>
            <p>{e.comentario}</p>
          </div>
        ))} */}
      </div>
    );
  }
}

Detalhes.propTypes = {
  id: PropTypes.string,
}.isRequired;
