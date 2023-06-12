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
    const {
      match: { params: { id } },
    } = this.props;
    const result = await getProductDetails(id);
    this.setState({
      data: result,
    });
  };

  render() {
    const {
      data: { title, thumbnail, price, warranty, id },
    } = this.state;
    return (
      <div>
        <style>
          {`
            .product-detail {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }

            .product-detail-image {
              width: 200px;
              margin-bottom: 10px;
            }

            .product-detail-name {
              font-size: 20px;
              font-weight: bold;
            }

            .product-detail-price {
              font-size: 18px;
              font-weight: bold;
            }

            .product-detail-warranty {
              margin-top: 10px;
            }

            .product-detail-buttons {
              margin-top: 20px;
            }

            .product-detail-buttons button {
              padding: 8px 16px;
              font-size: 16px;
              background-color: #4CAF50;
              color: white;
              border: none;
              cursor: pointer;
              margin-right: 10px;
            }
          `}
        </style>
        <div className="product-detail">
          <img
            data-testid="product-detail-image"
            className="product-detail-image"
            src={thumbnail}
            alt={title}
          />
          <p data-testid="product-detail-name" className="product-detail-name">
            {title}
          </p>
          <span data-testid="product-detail-price" className="product-detail-price">{`R$ ${price}`}</span>
          <p className="product-detail-warranty">{warranty}</p>
          <div className="product-detail-buttons">
            <Link to="/cart">
              <button data-testid="shopping-cart-button" type="button">
                Comprar
              </button>
            </Link>
            <button
              data-testid="product-detail-add-to-cart"
              type="button"
              onClick={() => addFavorites(title, price, id)}
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
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
