# nayyek Fashion Website

A ready-to-edit fashion storefront built with plain HTML, CSS and JavaScript.

## How to edit

1. Open `index.html` in Chrome to preview.
2. Open the folder in VS Code.
3. Edit:
   - `index.html` → text, sections, products, contact details
   - `style.css` → colours, fonts, spacing, layout
   - `script.js` → products, prices, cart behaviour
4. Replace the placeholder fashion blocks with your own product images.
5. For real orders/payments, connect the checkout to Shopify, WooCommerce, Razorpay, Stripe, etc.

## Main brand text to change

Search `NAYYEK` in `index.html` and replace it with your brand name.

## Product editing

Open `script.js` and edit the `products` array. Example:

{ id: 1, name: "Your Product", category: "Men", price: 29.99, code: "01" }

## Important

The cart is a front-end demo. It does not process real payments until a payment/commerce backend is connected.
