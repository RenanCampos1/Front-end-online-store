import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getCategories, getProductByName, getProductById } from '../services/api';
import { addFavorites } from '../services/cartApi';

class Home extends React.Component {
  state = {
    productName: '',
    messageOn: false,
    lista: [],
    products: [],
  };

  componentDidMount() {
    this.requestApi();
  }

  requestApi = async () => {
    const retorno = await getCategories();
    this.setState({
      lista: retorno,
    });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  requireProducts = async () => {
    const { productName } = this.state;
    const dataApi = await getProductByName(productName);
    this.setState({ products: dataApi });
  };

  handleClick = () => {
    this.setState({
      messageOn: true,
    });
  };

  requestCategoryID = async ({ target }) => {
    const { value } = target;
    const resultApiCategory = await getProductById(value);
    this.setState({
      products: resultApiCategory,
    });
  };

  render() {
    const { productName, messageOn, lista, products: { results } } = this.state;
    return (
      <div>
        <style>
          {`
            .container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }

            .search-container {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
            }

            .search-input {
              flex: 1;
              margin-right: 10px;
              padding: 5px;
              font-size: 16px;
            }

            .search-button {
              padding: 8px 16px;
              font-size: 16px;
              background-color: #4CAF50;
              color: white;
              border: none;
              cursor: pointer;
            }

            .initial-message {
              margin-bottom: 20px;
              font-size: 16px;
            }

            .cart-button {
              padding: 8px 16px;
              font-size: 16px;
              background-color: #FF9800;
              color: white;
              border: none;
              cursor: pointer;
            }

            .product {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
              font-size: 16px;
            }

            .product-image {
              width: 80px;
              margin-right: 10px;
            }

            .product-title {
              flex: 1;
            }

            .product-price {
              font-weight: bold;
            }

            .category-label {
              display: block;
              margin-bottom: 10px;
              font-size: 16px;
            }

            .category-input {
              margin-right: 5px;
            }
          `}
        </style>
        <div className="container">
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              name="productName"
              value={productName}
              onChange={this.handleChange}
              data-testid="query-input"
            />
            <button
              className="search-button"
              data-testid="query-button"
              type="button"
              onClick={this.requireProducts}
            >
              Pesquisar
            </button>
          </div>
          {productName.length === 0 && (
            <p className="initial-message" data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
          <button
            className="cart-button"
            data-testid="shopping-cart-button"
            type="button"
            onClick={this.handleClick}
          >
            Carrinho de compras
          </button>
          {messageOn && <Redirect to="/Cart" />}
          {results !== undefined ? (
            results.map(({ id, title, thumbnail, price }) => (
              <div key={id} className="product">
                <Link data-testid="product-detail-link" key={id} to={`/detail/${id}`}>
                  <div className="product-title">{title}</div>
                  <img className="product-image" src={thumbnail} alt={title} />
                  <div className="product-price">{price}</div>
                </Link>
                <button
                  className="product-add-to-cart"
                  data-testid="product-add-to-cart"
                  type="button"
                  onClick={() => addFavorites(title, price, id)}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            ))
          ) : (
            <p>Nenhum produto foi encontrado</p>
          )}
          {lista.map((e) => (
            <label htmlFor="radio" key={e.id} className="category-label" data-testid="category">
              {e.name}
              <input
                className="category-input"
                onClick={this.requestCategoryID}
                type="radio"
                name="categories"
                id="radio"
                value={e.id}
                key={e.id}
              />
            </label>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
