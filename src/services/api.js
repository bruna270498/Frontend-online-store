export async function getCategories() {
  return (await fetch('https://api.mercadolibre.com/sites/MLB/categories')).json();
}

export async function getQuery(query) {
  return (await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`)).json();
}

export async function getCategoryById(id) {
  return (await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`)).json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  return (await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`)).json();
}

export async function getProductById(id) {
  return (await fetch(`https://api.mercadolibre.com/items/${id}`)).json();
}
