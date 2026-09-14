/* FreshPantry shared browser behavior. No hash-based routing is used. */

const htmlElement = document.documentElement;

function initializeTheme() {
  const themeBtn = document.getElementById('theme-btn');
  const savedTheme = localStorage.getItem('fp-theme') || 'light';
  htmlElement.setAttribute('data-theme', savedTheme);

  if (!themeBtn) return;

  themeBtn.textContent = savedTheme === 'light' ? '🌙' : '☀️';
  themeBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('fp-theme', newTheme);
    themeBtn.textContent = newTheme === 'light' ? '🌙' : '☀️';
  });
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('fp-cart') || '[]');
  } catch (error) {
    console.error('Could not read cart from storage:', error);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('fp-cart', JSON.stringify(cart));
}

function updateCartUI() {
  const cartBadge = document.getElementById('cart-badge');
  const cartContainer = document.getElementById('cart-items-container');
  const cart = getCart();

  if (cartBadge) cartBadge.textContent = cart.length;
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
    return;
  }

  let total = 0;
  const itemsHtml = cart
    .map((item, index) => {
      total += Number(item.price);
      return `
            <div class="cart-item">
                <span>${escapeHtml(item.name)}</span>
                <span class="cart-item-price">$${Number(item.price).toFixed(
                  2
                )}</span>
                <button type="button" class="icon-btn remove-cart-item" data-index="${index}" title="Remove item" aria-label="Remove ${escapeHtml(
        item.name
      )}">&times;</button>
            </div>`;
    })
    .join('');

  cartContainer.innerHTML =
    itemsHtml +
    `
        <div class="cart-total">
            <span>Order Total:</span>
            <span class="cart-total-price">$${total.toFixed(2)}</span>
        </div>`;
}

function initializeCart() {
  const cartDialog = document.getElementById('cart-modal');
  const cartBtn = document.getElementById('cart-btn');

  updateCartUI();

  if (cartBtn && cartDialog) {
    cartBtn.addEventListener('click', () => cartDialog.showModal());
  }

  document.addEventListener('click', (event) => {
    const addButton = event.target.closest('.add-to-cart');
    if (addButton) {
      const cart = getCart();
      cart.push({
        id: addButton.dataset.id,
        name: addButton.dataset.name,
        price: Number.parseFloat(addButton.dataset.price),
      });
      saveCart(cart);
      updateCartUI();

      const originalText = addButton.textContent;
      addButton.textContent = '✓ Added';
      addButton.classList.replace('btn-primary', 'btn-accent');
      window.setTimeout(() => {
        addButton.textContent = originalText;
        addButton.classList.replace('btn-accent', 'btn-primary');
      }, 1000);
    }

    const removeButton = event.target.closest('.remove-cart-item');
    if (removeButton) {
      const cart = getCart();
      cart.splice(Number(removeButton.dataset.index), 1);
      saveCart(cart);
      updateCartUI();
    }
  });
}

function initializeCheckoutButton() {
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (!checkoutBtn) return;

  checkoutBtn.addEventListener('click', () => {
    alert('Proceeding to secure checkout...');
  });
}

function initializeRegistrationForm() {
  const form = document.getElementById('form-register');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Registration form validated natively. Proceeding to login...');
    window.location.href = 'login.html';
    form.reset();
  });
}

function initializeLoginForm() {
  const form = document.getElementById('form-login');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = document.getElementById('login-user')?.value.trim();
    const pwd = document.getElementById('login-pwd')?.value;

    if (user === 'admin' && pwd === 'test@123') {
      alert('Authentication Successful! Welcome Admin.');
      window.location.href = '../admin/dashboard.html';
      form.reset();
    } else {
      alert('Access Denied: Invalid Username or Password.');
    }
  });
}

function initializeSidebarToggle() {
  const sidebar = document.getElementById('admin-sidebar');
  const sidebarToggleBtn = document.getElementById('sidebar-toggle');
  if (!sidebar || !sidebarToggleBtn) return;

  sidebarToggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });
}

function initializeAdminAddForm() {
  const form = document.getElementById('form-add-product');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Product Added to Database!');
    form.reset();
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeCart();
  initializeRegistrationForm();
  initializeLoginForm();
  initializeSidebarToggle();
  initializeAdminAddForm();
  initializeCheckoutButton();
});
