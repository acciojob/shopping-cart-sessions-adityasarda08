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
const clearBtn = document.getElementById("clear-cart-btn");

// ✅ READ ONLY helper
function getCart() {
  return JSON.parse(window.sessionStorage.getItem("cart")) || [];
}

// ✅ WRITE helper
function saveCart(cart) {
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
}

// ✅ Render products (NO storage touch)
function renderProducts() {
  productList.innerHTML = "";

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

// ✅ Render cart (READ ONLY — NEVER WRITE)
function renderCart() {
  cartList.innerHTML = "";

  const cart = getCart();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// ✅ Add to cart (MERGE, never overwrite)
function addToCart(productId) {
  const cart = getCart(); // <-- Cypress preloaded data preserved

  const product = products.find((p) => p.id === productId);
  cart.push(product);

  saveCart(cart);
  renderCart();
}

// ✅ Clear cart (explicit user action only)
function clearCart() {
  window.sessionStorage.removeItem("cart");
  renderCart();
}

// Events
clearBtn.addEventListener("click", clearCart);

// Initial render (SAFE)
renderProducts();
renderCart();
