# FreshPantry

FreshPantry is a beginner-friendly grocery store frontend built with HTML, CSS, and vanilla JavaScript. It demonstrates semantic HTML, responsive layouts, theme switching, forms, a persistent browser cart, and a small admin area.

## Project structure

```text
freshpantry/
├── index.html
├── pages/
│   ├── catalog.html
│   ├── login.html
│   └── register.html
├── admin/
│   ├── dashboard.html
│   ├── inventory.html
│   ├── add-product.html
│   └── semantics.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── assets/
└── README.md
```

## Navigation architecture

The project no longer uses a hash-based client-side router. Each major view is a normal HTML document, and navigation uses standard relative links:

- `index.html` — home
- `pages/catalog.html` — product catalog
- `pages/login.html` — login
- `pages/register.html` — registration
- `admin/dashboard.html` — admin home
- `admin/inventory.html` — inventory table
- `admin/add-product.html` — add-product form
- `admin/semantics.html` — HTML semantics demonstrations

This makes the project easier for a beginner to understand because every page can be opened and edited independently.

## JavaScript features

`js/app.js` contains shared browser behavior only; it is not a router. It handles:

- Light/dark theme switching with `localStorage`
- Shopping cart state with `localStorage`
- Add/remove cart items
- Registration form demonstration
- Demo admin login
- Admin sidebar collapse
- Add-product form demonstration

## Demo admin login

Username: `admin`

Password: `test@123`

This is intentionally a frontend-only demo. It is not secure authentication and should not be used for a real application.

## Running the project

No build tool or package installation is required. Open `index.html` in a browser. For the best experience, serve the folder with a simple local web server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Notes

The product images currently use external placeholder URLs from `placehold.co`. The registration, checkout, and inventory actions are demonstrations only and do not connect to a backend or database.


## Recent structure improvements

- The application uses separate HTML pages instead of hash-based routing.
- Shared presentation rules live in `css/style.css`; inline `style="..."` attributes have been removed from the HTML.
- Shared browser behavior lives in `js/app.js`, including theme switching, cart persistence, forms, and the checkout demo.
- Responsive CSS is included for mobile navigation, the catalog grid, forms, dashboard/sidebar layout, dialogs, and data tables.
- The cart is persisted with `localStorage`, so it survives navigation between pages.
