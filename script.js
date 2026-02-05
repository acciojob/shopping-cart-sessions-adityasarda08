// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.addEventListener("click", () => addToCart(product.id));

    li.textContent = `${product.name} - $${product.price} `;
    li.appendChild(btn);

    productList.appendChild(li);
  });
}


// Render cart list
function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  const cart = getCart();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  const product = products.find((p) => p.id === productId);
  cart.push(product);

  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = getCart();

  cart = cart.filter((item) => item.id !== productId);

  saveCart(cart);
  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Initial render
renderProducts();
renderCart();
