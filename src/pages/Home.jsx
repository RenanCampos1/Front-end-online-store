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
        <input
          type="text"
          name="productName"
          value={ productName }
          onChange={ this.handleChange }
          data-testid="query-input"
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.requireProducts }
        >
          Pesquisarr
        </button>
        {
          productName.length === 0
          && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>)
        }
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ this.handleClick }
        >
          Carrinho de compras

        </button>
        {
          messageOn && <Redirect to="/Cart" />
        }
        { results !== undefined ? results.map(({ id, title, thumbnail, price }) => (
          <div key={ id }>
            <Link data-testid="product-detail-link" key={ id } to={ `/detail/${id}` }>
              {' '}
              <div key={ id } data-testid="product">
                {title}
                <img src={ thumbnail } alt={ title } />
                {price}
              </div>
            </Link>
            <button
              data-testid="product-add-to-cart"
              type="button"
              onClick={ () => addFavorites(title, price, id) }
            >
              Adicionar ao carrinho
            </button>
          </div>
        )) : <p>Nenhum produto foi encontrado</p>}
        {lista.map((e) => (
          <label htmlFor="radio" key={ e.id } data-testid="category">
            { e.name }
            <input
              onClick={ this.requestCategoryID }
              type="radio"
              name="categories"
              id="radio"
              value={ e.id }
              key={ e.id }
            />
          </label>))}
      </div>

    );
  }
}

export default Home;
