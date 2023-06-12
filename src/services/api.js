export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const result = await fetch(url).then((response) => response.json());
  return result;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export async function getProductById(categoryId) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductByName(name) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${name}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getProductDetails(id) {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
