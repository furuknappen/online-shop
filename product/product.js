const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const url = "https://v2.api.noroff.dev/online-shop/";

async function fetchData() {
  try {
    const response = await fetch(url + productId);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const result = await response.json();
    const product = result.data;

    return product;
  } catch (error) {
    alert("Could not fetch data: " + error);
  }
}

// fetchData()

async function displayProduct() {
  const product = await fetchData();
  console.log(product);

  document.querySelector(".itemImage").src = product.image.url;
  document.querySelector(".itemImage").alt = product.image.alt;
  document.querySelector(".h1Itemname").textContent = product.title;
  document.querySelector(".infoText").textContent = product.description;
  document.querySelector(".item-tags").textContent = product.tags;
  // PRICE
  const priceContainer = document.querySelector(".priceContainer");
  priceContainer.classList.add("priceContainer");
  const price = document.createElement("p");
  price.classList.add("priceNormal");
  if (product.discountedPrice < product.price) {
    price.textContent = product.discountedPrice + ",-";
    const oldPrice = document.createElement("p");
    oldPrice.classList.add("priceOld");
    oldPrice.textContent = product.price + ",-";
    priceContainer.appendChild(price);
    priceContainer.appendChild(oldPrice);
  } else {
    price.textContent = product.price + ",-";
    priceContainer.appendChild(price);
  }

  const addToCartBtn = document.getElementById("addToCartBtn");
  const noSizeError = document.getElementById("noSizeError");

  // fjerne no size og endre sånn at hvis de ikke velger quantity s blir det automatisk 1
  document.querySelectorAll("input[name='size']").forEach((radio) => {
    radio.addEventListener("change", () => {
      noSizeError.style.display = "none";
    });
  });

  addToCartBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const selectedSize = document.querySelector("input[name='size']:checked");

    if (!selectedSize) {
      noSizeError.style.display = "flex";
      return;
    }
    noSizeError.style.display = "none";
    addToCart(item, selectedSize.value);
  });

// quantity input

 document.createElement("div")
 document.create







  // Reviews
  if (product.reviews == 0) {
    document.querySelector(".reviews-container").textContent = "No reviews yet";
  }

  const reviewsContainer = document.querySelector(".reviews-container");
  const reviews = product.reviews;
  reviews.forEach((review) => {
    const reviewDiv = document.createElement("div");
    reviewDiv.classList.add("review-div");

    const reviewName = document.createElement("h3");
    reviewName.textContent = review.username;
    const reviewStars = document.createElement("div");
    reviewStars.textContent = review.rating + " Stars";
    const reviewText = document.createElement("p");
    reviewText.textContent = review.description;

    reviewDiv.appendChild(reviewName);
    reviewDiv.appendChild(reviewStars);
    reviewDiv.appendChild(reviewText);
    reviewsContainer.append(reviewDiv);
  });
}

function addToCart(item, size) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItem = {
    ...item,
    selectedSize: size,
  };

  cart.push(cartItem);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayToastNotification(item);
  setTimeout(() => {
    removeToastNotification();
  }, 2000);

  rerenderCartNotification();
}

await displayProduct();
const cartContent = localStorage.getItem("cart");

// TOAST NOTIFICATION
function displayToastNotification(item) {
  const toastDiv = document.createElement("div");
  toastDiv.classList.add("toastNotification");

  const checkmark = document.createElement("div");
  checkmark.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>`;
  const info = document.createElement("p");
  info.textContent = `You have successfully added ${item.title} to your cart!`;

  toastDiv.append(checkmark, info);
  document.querySelector(".flexDivItemPage").append(toastDiv);
}

function removeToastNotification() {
  document.querySelector(".toastNotification").remove();
}
