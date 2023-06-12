const CART_ITEM = 'cart_item';

const readFavoriteCharacter = () => JSON.parse(localStorage.getItem(CART_ITEM));

const saveFavoriteCharacter = (cartItem) => localStorage
  .setItem(CART_ITEM, JSON.stringify(cartItem));

export const addFavorites = (product, price, id) => {
  const cart = readFavoriteCharacter() || [];
  const objeto = {
    product,
    price,
    id,
    qnt: 1,
  };

  saveFavoriteCharacter([...cart, objeto]);
};

export const getCartItem = () => readFavoriteCharacter() || [];

export const removeFavorite = (product) => {
  const cart = readFavoriteCharacter() || [];
  saveFavoriteCharacter(cart.filter((s) => s.id !== product.id));
};
