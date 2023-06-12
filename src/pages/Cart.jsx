import React, { Component } from 'react';
import { getCartItem } from '../services/cartApi';

export default class Cart extends Component {
  state = {
    cartItens: [],
  };

  componentDidMount() {
    this.addState();
  }

  addState = () => {
    const retorno = getCartItem();
    this.setState({
      cartItens: retorno,
    });
  };

  increase = (id) => {
    const cartItems = JSON.parse(localStorage.getItem('cart_item'));
    const indexItem = cartItems.findIndex((item) => item.id === id);
    cartItems[indexItem].qnt += 1;
    localStorage.setItem('cart_item', JSON.stringify(cartItems));
    this.addState();
  };

  decrease = (id) => {
    const cartItems = JSON.parse(localStorage.getItem('cart_item'));
    const indexItem = cartItems.findIndex((item) => item.id === id);
    if (cartItems[indexItem].qnt > 1) {
      cartItems[indexItem].qnt -= 1;
      localStorage.setItem('cart_item', JSON.stringify(cartItems));
      this.addState();
    }
  };

  remove = (id) => {
    const cartItems = JSON.parse(localStorage.getItem('cart_item'));
    const indexItem = cartItems.findIndex((item) => item.id === id);
    cartItems.splice(indexItem, 1);
    localStorage.setItem('cart_item', JSON.stringify(cartItems));
    this.addState();
  };

  render() {
    const { cartItens } = this.state;
    return (
      <div>
        {cartItens.length > 0 ? (cartItens.map(({ product, price, id, qnt }) => (
          <div key={ `${id}${product}` }>
            <p data-testid="shopping-cart-product-name">{ product }</p>
            <p>{ price }</p>
            <p
              data-testid="shopping-cart-product-quantity"
            >
              Quantidade:
              {' '}
              { qnt }
            </p>
            <button
              data-testid="product-increase-quantity"
              type="button"
              id={ id }
              onClick={ () => (this.increase(id)) }
            >
              +
            </button>
            <button
              data-testid="product-decrease-quantity"
              type="button"
              id={ id }
              onClick={ () => (this.decrease(id)) }
            >
              -
            </button>
            <button
              data-testid="remove-product"
              type="button"
              id={ id }
              onClick={ () => (this.remove(id)) }
            >
              Delete
            </button>
          </div>)))
          : (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>)}
      </div>
    );
  }
}
