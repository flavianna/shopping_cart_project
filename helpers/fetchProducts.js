const fetchProducts = async (query) => {
  try {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const data = await response.json();
    // aqui você pode manipular os dados retornados pela API
    return data.results;
  } catch (error) {
    // aqui você pode tratar erros que possam ocorrer na solicitação
    throw new Error('You must provide an url');
  }
};
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
