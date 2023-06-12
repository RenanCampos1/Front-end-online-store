import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductDetails } from '../services/api';
import { addFavorites } from '../services/cartApi';

export default class DetailProduct extends Component {
  state = {
    data: {},
  };

  componentDidMount() {
    this.detailsProduct();
  }

  detailsProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getProductDetails(id);
    this.setState({
      data: result,
    });
  };

  render() {
    const { data: { title, thumbnail, price, warranty, id } } = this.state;
    return (
      <div>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <p data-testid="product-detail-name">{title}</p>
        <span data-testid="product-detail-price">{`R$ ${price}`}</span>
        <p>{warranty}</p>
        <Link to="/cart">
          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Comprar
          </button>
        </Link>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => addFavorites(title, price, id) }
        >
          Adicionar ao carrinho
        </button>

      </div>
    );
  }
}

DetailProduct.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
