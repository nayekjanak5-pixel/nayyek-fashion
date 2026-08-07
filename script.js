/* =========================================================
   NAYYEK PREMIUM FASHION
   script.js
   ========================================================= */


/* =========================================================
   PRODUCTS
   এখান থেকেই Product Name, Price, Category edit করবেন
   ========================================================= */

const products = [

  {
  id: 1,
  name: "NAYYEK Men's Premium Printed Shorts",
  category: "Men",
  price: 1599,
  oldPrice: 1999,
  badge: "NEW",
  image: "images/printed-shorts.jpg",

  rating: 4.8,
  reviews: 24,

  colors: ["Sage Green", "White", "Beige"],

  sizes: ["M", "L", "XL", "XXL"],

  description:
    "Premium printed shorts with lightweight fabric, breathable comfort, elastic waistband and deep side pockets."
},

  {
    id: 2,
    name: "Premium Relaxed Shirt",
    category: "Men",
    price: 2299,
    oldPrice: 2599,
    badge: "NEW",
    code: "02",
    description:
      "A relaxed-fit shirt designed for smart casual everyday wear."
  },

  {
    id: 3,
    name: "Essential Everyday Top",
    category: "Women",
    price: 1799,
    oldPrice: 0,
    badge: "",
    code: "03",
    description:
      "A minimal essential with a soft feel and versatile fit."
  },

  {
    id: 4,
    name: "Premium Casual Set",
    category: "Women",
    price: 2999,
    oldPrice: 3499,
    badge: "LIMITED",
    code: "04",
    description:
      "An elevated matching set for effortless everyday styling."
  },

  {
    id: 5,
    name: "Kids Graphic T-Shirt",
    category: "Kids",
    price: 999,
    oldPrice: 1199,
    badge: "NEW",
    code: "05",
    description:
      "Comfort-first everyday T-shirt made for active days."
  },

  {
    id: 6,
    name: "Cotton Summer Shorts",
    category: "Men",
    price: 1599,
    oldPrice: 1899,
    badge: "",
    code: "06",
    description:
      "Lightweight shorts with a comfortable fit for summer."
  },

  {
    id: 7,
    name: "Minimal Everyday Hoodie",
    category: "Women",
    price: 2499,
    oldPrice: 2999,
    badge: "BESTSELLER",
    code: "07",
    description:
      "A clean premium hoodie for relaxed everyday looks."
  },

  {
    id: 8,
    name: "Daily Comfort Set",
    category: "Kids",
    price: 1899,
    oldPrice: 2199,
    badge: "",
    code: "08",
    description:
      "A comfortable coordinated set for everyday adventures."
  }

];


/* =========================================================
   CART + WISHLIST
   Browser-এ Save থাকবে
   ========================================================= */

let cart =
  JSON.parse(localStorage.getItem("nayyekCart")) || [];

let wishlist =
  JSON.parse(localStorage.getItem("nayyekWishlist")) || [];


/* =========================================================
   MONEY FORMAT
   ========================================================= */

function money(amount) {

  return "₹" + Number(amount).toLocaleString("en-IN");

}


/* =========================================================
   PRODUCT RENDER
   ========================================================= */

function renderProducts() {

  const productContainer =
    document.getElementById("products");

  if (!productContainer) {
    return;
  }


  const category =
    document.getElementById("categoryFilter")?.value || "all";

  const search =
    document
      .getElementById("searchInput")
      ?.value
      .toLowerCase()
      .trim() || "";


  const sort =
    document.getElementById("sortProducts")?.value ||
    "featured";


  let filteredProducts = products.filter(product => {

    const categoryMatch =
      category === "all" ||
      product.category === category;


    const searchMatch =
      product.name
        .toLowerCase()
        .includes(search);


    return categoryMatch && searchMatch;

  });


  /* SORT */

  if (sort === "low") {

    filteredProducts.sort(
      (a, b) => a.price - b.price
    );

  }


  if (sort === "high") {

    filteredProducts.sort(
      (a, b) => b.price - a.price
    );

  }


  /* NO PRODUCT */

  if (filteredProducts.length === 0) {

    productContainer.innerHTML = `
      <div class="empty-cart">
        No products found.
      </div>
    `;

    return;

  }


  /* PRODUCT CARDS */

  productContainer.innerHTML =
    filteredProducts.map(product => {

      const liked =
        wishlist.includes(product.id);


      return `

        <article class="product-card">

          <div
           <div
  class="product-image"
  onclick="openProduct(${product.id})"
  style="
    background-image: url('${product.image}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  "
>
</div>

          </div>


          ${
            product.badge
              ? `
                <span class="product-badge">
                  ${product.badge}
                </span>
              `
              : ""
          }


          <button
            class="wishlist-btn ${liked ? "active" : ""}"
            onclick="toggleWishlistItem(${product.id})"
            aria-label="Add to wishlist"
          >

            ${liked ? "♥" : "♡"}

          </button>


          <div class="product-info">

            <h3>
              ${product.name}
            </h3>


            <p>
              ${product.category}
            </p>


            <p class="price">

              ${money(product.price)}

              ${
                product.oldPrice
                  ? `
                    <del>
                      ${money(product.oldPrice)}
                    </del>
                  `
                  : ""
              }

            </p>


            <button
              class="add-btn"
              onclick="addToCart(${product.id})"
            >

              ADD TO BAG

            </button>

          </div>

        </article>

      `;

    }).join("");


  updateCounts();

}


/* =========================================================
   CATEGORY
   ========================================================= */

function setCategory(category) {

  const categorySelect =
    document.getElementById("categoryFilter");


  if (categorySelect) {

    categorySelect.value = category;

  }


  renderProducts();

}


/* =========================================================
   SEARCH
   ========================================================= */

function searchProducts() {

  renderProducts();

}


/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(
  productId,
  size = "M"
) {

  const product =
    products.find(
      item => item.id === productId
    );


  if (!product) {
    return;
  }


  const existing =
    cart.find(
      item =>
        item.id === productId &&
        item.size === size
    );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({

      id: productId,

      size: size,

      quantity: 1

    });

  }


  saveCart();


  openCart();

}


/* =========================================================
   REMOVE CART ITEM
   ========================================================= */

function removeFromCart(
  productId,
  size
) {

  cart =
    cart.filter(item => {

      return !(
        item.id === productId &&
        item.size === size
      );

    });


  saveCart();

}


/* =========================================================
   CHANGE CART QUANTITY
   ========================================================= */

function changeQuantity(
  productId,
  size,
  change
) {

  const item =
    cart.find(item =>
      item.id === productId &&
      item.size === size
    );


  if (!item) {
    return;
  }


  item.quantity += change;


  if (item.quantity <= 0) {

    removeFromCart(
      productId,
      size
    );

    return;

  }


  saveCart();

}


/* =========================================================
   UPDATE CART
   ========================================================= */

function updateCart() {

  const cartItems =
    document.getElementById("cartItems");


  const cartCount =
    document.getElementById("cartCount");


  const cartTotal =
    document.getElementById("cartTotal");


  if (!cartItems) {
    return;
  }


  /* TOTAL QUANTITY */

  const totalQuantity =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  if (cartCount) {

    cartCount.textContent =
      totalQuantity;

  }


  /* EMPTY */

  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div class="empty-cart">

        Your bag is empty.

      </div>

    `;


    if (cartTotal) {

      cartTotal.textContent =
        money(0);

    }


    updateShippingMessage(0);

    return;

  }


  /* CART ITEMS */

  cartItems.innerHTML =
    cart.map(item => {

      const product =
        products.find(
          product =>
            product.id === item.id
        );


      if (!product) {
        return "";
      }


      return `

        <div class="cart-item">

          <div>

            <strong>
              ${product.name}
            </strong>


            <small>
              Size: ${item.size}
            </small>


            <small>
              ${money(product.price)}
            </small>


            <div
              style="
                margin-top:10px;
                display:flex;
                align-items:center;
                gap:10px;
              "
            >

              <button
                onclick="
                  changeQuantity(
                    ${product.id},
                    '${item.size}',
                    -1
                  )
                "
                style="
                  width:28px;
                  height:28px;
                  border:1px solid #ddd;
                  background:white;
                "
              >
                −
              </button>


              <strong>
                ${item.quantity}
              </strong>


              <button
                onclick="
                  changeQuantity(
                    ${product.id},
                    '${item.size}',
                    1
                  )
                "
                style="
                  width:28px;
                  height:28px;
                  border:1px solid #ddd;
                  background:white;
                "
              >
                +
              </button>

            </div>

          </div>


          <button
            class="remove"
            onclick="
              removeFromCart(
                ${product.id},
                '${item.size}'
              )
            "
          >

            Remove

          </button>

        </div>

      `;

    }).join("");


  /* TOTAL */

  const total =
    cart.reduce(
      (sum, item) => {

        const product =
          products.find(
            product =>
              product.id === item.id
          );


        return (
          sum +
          product.price *
          item.quantity
        );

      },
      0
    );


  if (cartTotal) {

    cartTotal.textContent =
      money(total);

  }


  updateShippingMessage(total);

}


/* =========================================================
   FREE SHIPPING
   ========================================================= */

function updateShippingMessage(total) {

  const message =
    document.getElementById(
      "freeShippingMsg"
    );


  if (!message) {
    return;
  }


  const freeShippingAmount = 5000;


  if (total >= freeShippingAmount) {

    message.textContent =
      "🎉 You unlocked FREE SHIPPING!";

  } else {

    const remaining =
      freeShippingAmount - total;


    message.textContent =
      `Add ${money(
        remaining
      )} more for FREE SHIPPING.`;

  }

}


/* =========================================================
   WISHLIST
   ========================================================= */

function toggleWishlistItem(productId) {

  if (
    wishlist.includes(productId)
  ) {

    wishlist =
      wishlist.filter(
        id => id !== productId
      );

  } else {

    wishlist.push(productId);

  }


  saveWishlist();

}


/* =========================================================
   WISHLIST RENDER
   ========================================================= */

function renderWishlist() {

  const wishlistContainer =
    document.getElementById(
      "wishlistItems"
    );


  if (!wishlistContainer) {
    return;
  }


  if (wishlist.length === 0) {

    wishlistContainer.innerHTML = `

      <div class="empty-cart">

        Your wishlist is empty.

      </div>

    `;

    return;

  }


  wishlistContainer.innerHTML =
    wishlist.map(productId => {

      const product =
        products.find(
          item =>
            item.id === productId
        );


      if (!product) {
        return "";
      }


      return `

        <div class="cart-item">

          <div>

            <strong>
              ${product.name}
            </strong>

            <small>
              ${money(product.price)}
            </small>

          </div>


          <button
            class="remove"
            onclick="
              addToCart(${product.id})
            "
          >

            Add

          </button>

        </div>

      `;

    }).join("");

}


/* =========================================================
   SAVE DATA
   ========================================================= */

function saveCart() {

  localStorage.setItem(
    "nayyekCart",
    JSON.stringify(cart)
  );


  updateCart();

}


function saveWishlist() {

  localStorage.setItem(
    "nayyekWishlist",
    JSON.stringify(wishlist)
  );


  renderWishlist();

  renderProducts();

  updateCounts();

}


/* =========================================================
   COUNTERS
   ========================================================= */

function updateCounts() {

  const cartCount =
    document.getElementById(
      "cartCount"
    );


  const wishCount =
    document.getElementById(
      "wishCount"
    );


  if (cartCount) {

    cartCount.textContent =
      cart.reduce(
        (total, item) =>
          total + item.quantity,
        0
      );

  }


  if (wishCount) {

    wishCount.textContent =
      wishlist.length;

  }

}


/* =========================================================
   OPEN CART
   ========================================================= */

function openCart() {

  closeDrawers();


  const cartPanel =
    document.getElementById(
      "cartPanel"
    );


  const overlay =
    document.getElementById(
      "overlay"
    );


  if (cartPanel) {

    cartPanel.classList.add(
      "open"
    );

  }


  if (overlay) {

    overlay.classList.add(
      "show"
    );

  }


  updateCart();

}


/* =========================================================
   CLOSE CART
   ========================================================= */

function closeCart() {

  closeDrawers();

}


/* =========================================================
   OPEN WISHLIST
   ========================================================= */

function openWishlist() {

  closeDrawers();


  const wishlistPanel =
    document.getElementById(
      "wishlistPanel"
    );


  const overlay =
    document.getElementById(
      "overlay"
    );


  if (wishlistPanel) {

    wishlistPanel.classList.add(
      "open"
    );

  }


  if (overlay) {

    overlay.classList.add(
      "show"
    );

  }


  renderWishlist();

}


/* =========================================================
   CLOSE DRAWERS
   ========================================================= */

function closeDrawers() {

  document
    .querySelectorAll(".cart-panel")
    .forEach(panel => {

      panel.classList.remove(
        "open"
      );

    });


  const overlay =
    document.getElementById(
      "overlay"
    );


  if (overlay) {

    overlay.classList.remove(
      "show"
    );

  }

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMenu() {

  const nav =
    document.getElementById(
      "nav"
    );


  if (nav) {

    nav.classList.toggle(
      "show"
    );

  }

}


/* =========================================================
   SEARCH BOX
   ========================================================= */

function toggleSearch() {

  const searchBox =
    document.getElementById(
      "searchBox"
    );


  const searchInput =
    document.getElementById(
      "searchInput"
    );


  if (!searchBox) {
    return;
  }


  searchBox.classList.toggle(
    "show"
  );


  if (
    searchBox.classList.contains(
      "show"
    )
  ) {

    setTimeout(() => {

      searchInput?.focus();

    }, 100);

  }

}


/* =========================================================
   PRODUCT QUICK VIEW
   ========================================================= */

function openProduct(productId) {

  const product =
    products.find(
      item =>
        item.id === productId
    );


  if (!product) {
    return;
  }


  const modal =
    document.getElementById(
      "productModal"
    );


  const content =
    document.getElementById(
      "modalContent"
    );


  if (!modal || !content) {
    return;
  }


  content.innerHTML = `

    <div
  class="modal-image"
  style="
    background-image: url('${product.image}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  "
>
</div>

        </p>


        <h2>

          ${product.name}

        </h2>


        <p class="modal-price">
        <div class="modal-rating">
  <span>★★★★★</span>
  <strong>${product.rating}</strong>
  <small>(${product.reviews} Reviews)</small>
</div>

          ${money(product.price)}

          ${
            product.oldPrice
              ? `
                <del>
                  ${money(
                    product.oldPrice
                  )}
                </del>
              `
              : ""
          }

        </p>


        <p class="modal-desc">

          ${product.description}

        </p>


        <h4>
          SELECT SIZE
        </h4>


        <div
          class="sizes"
          id="sizePicker"
        >

          <button
            onclick="selectSize(this)"
          >
            S
          </button>

          <button
            class="selected"
            onclick="selectSize(this)"
          >
            M
          </button>

          <button
            onclick="selectSize(this)"
          >
            L
          </button>

          <button
            onclick="selectSize(this)"
          >
            XL
          </button>

          <button
            onclick="selectSize(this)"
          >
            XXL
          </button>

        </div>


        <button
          class="btn btn-dark full"
          onclick="
            addSelectedToCart(
              ${product.id}
            )
          "
        >

          ADD TO BAG

        </button>

      </div>

    </div>

  `;


  modal.classList.add(
    "show"
  );

}


/* =========================================================
   SELECT SIZE
   ========================================================= */

function selectSize(button) {

  const sizeButtons =
    document.querySelectorAll(
      "#sizePicker button"
    );


  sizeButtons.forEach(btn => {

    btn.classList.remove(
      "selected"
    );

  });


  button.classList.add(
    "selected"
  );

}


/* =========================================================
   ADD SELECTED PRODUCT
   ========================================================= */

function addSelectedToCart(
  productId
) {

  const selected =
    document.querySelector(
      "#sizePicker .selected"
    );


  const size =
    selected
      ? selected.textContent.trim()
      : "M";


  addToCart(
    productId,
    size
  );


  closeModal();

}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeModal() {

  const modal =
    document.getElementById(
      "productModal"
    );


  if (modal) {

    modal.classList.remove(
      "show"
    );

  }

}


/* =========================================================
   NEWSLETTER
   ========================================================= */

function subscribe(event) {

  event.preventDefault();


  const message =
    document.getElementById(
      "subscribeMsg"
    );


  if (message) {

    message.textContent =
      "Welcome to NAYYEK — your 10% offer is on the way.";

  }


  event.target.reset();

}


/* =========================================================
   CHECKOUT
   ========================================================= */

function checkout() {

  if (cart.length === 0) {

    alert(
      "Your shopping bag is empty."
    );

    return;

  }


  alert(
    "Demo checkout is ready. Next we can connect Razorpay / UPI / WhatsApp orders."
  );

}


/* =========================================================
   CLOSE MODAL / MENU WITH ESC
   ========================================================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      closeModal();

      closeDrawers();

    }

  }
);


/* =========================================================
   INITIAL LOAD
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    renderProducts();

    updateCart();

    renderWishlist();

    updateCounts();

  }
);