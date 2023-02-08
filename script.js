// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!

const cartItems = document.querySelector('.cart__items');
cartItems.innerHTML = getSavedCartItems();

// Função responsável por criar e retornar o elemento de imagem do produto.
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

// Função responsável por criar e retornar qualquer elemento.
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

// Função responsável por criar e retornar o elemento do produto.
const createProductItemElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createCustomElement('span', 'item__title', price));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
};

// Função que cria listagem de produtos.
const creatList = async () => {
  const fetch = await fetchProducts('computador');
  const father = document.getElementsByClassName('items')[0];
  fetch.forEach((element) => {
    const creatElements = createProductItemElement(element);
    father.appendChild(creatElements);
  });
};

// Função responsável por criar e retornar um item do carrinho.
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  // li.addEventListener('click', cartItemClickListener);
  return li;
};

// Função que adiciona um item ao carrinho (pesca pelo id).
const addItemToCart = async (id) => {
  const fetchItemId = await fetchItem(id);
  cartItems.appendChild(createCartItemElement(fetchItemId));
  await saveCartItems(cartItems.innerHTML);
};

// Função adiciona um event listener a cada botão "item__add" na página. 
const bindAddToCartButton = () => {
  document.querySelectorAll('.item__add').forEach((btn) =>
    btn.addEventListener('click', (e) => {
      const selectedProductId = e.target.parentNode.firstChild.innerText;
      addItemToCart(selectedProductId);
    }));
};

const removeButtonHandler = (event) => {
  cartItems.removeChild(event.target);
  saveCartItems(cartItems.innerHTML);
};

cartItems.addEventListener('click', removeButtonHandler);

// Função para limpar carrinho de compras
const clearCartHandler = () => {
  const buttClearCart = document.querySelector('.empty-cart');
  buttClearCart.addEventListener('click', () => {
    Array.from(cartItems.children).forEach((element) => {
      cartItems.removeChild(element);
      localStorage.clear();
    });
  });
};

window.onload = async () => {
  await creatList();
  bindAddToCartButton();
  clearCartHandler();
};
