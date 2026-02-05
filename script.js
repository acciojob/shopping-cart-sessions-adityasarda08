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
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// ---------------- CART HELPERS ----------------
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// ---------------- RENDER PRODUCTS ----------------
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price} `;

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.addEventListener("click", () => addToCart(product.id));

    li.appendChild(btn);
    productList.appendChild(li);
  });
}

// ---------------- RENDER CART ----------------
function renderCart() {
  cartList.innerHTML = "";

  const cart = getCart();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// ---------------- ADD TO CART ----------------
function addToCart(productId) {
  const cart = getCart();

  const product = products.find((p) => p.id === productId);
  cart.push(product);

  saveCart(cart);
  renderCart();
}

// ---------------- CLEAR CART ----------------
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// ---------------- EVENTS ----------------
clearCartBtn.addEventListener("click", clearCart);

// ---------------- INITIAL LOAD ----------------
renderProducts();
renderCart();
