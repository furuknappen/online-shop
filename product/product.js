import { toastNotification } from "../scripts/toastNotification.js";
import { createModal } from "../scripts/modal.js";
import { rerenderCartNotification } from "../scripts/header.js";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const url = "https://v2.api.noroff.dev/online-shop/";

const user = JSON.parse(localStorage.getItem("userInfo"));

async function fetchData() {
  try {
    const response = await fetch(url + productId);
    if (!response.ok) {
      document.getElementById("product-content").innerHTML =
        "Unable to load content. Try again later. ";
      throw new Error(response.status);
    }
    const result = await response.json();
    const product = result.data;

    return product;
  } catch (error) {
    document.getElementById("product-content").innerHTML =
      "Unable to load content. Try again later. " + error;
    throw new Error("Could not fetch data: " + error);
  }
}

async function displayProduct() {
  const product = await fetchData();
  document.querySelector(".itemImage").src = product.image.url;
  document.querySelector(".itemImage").alt = product.image.alt;
  document.querySelector(".h1Itemname").textContent = product.title;
  document.querySelector(".infoText").textContent = product.description;
  document.querySelector(".item-tags").textContent = product.tags;

  // PRICE
  const priceContainer = document.querySelector(".priceContainer");
  priceContainer.classList.add("priceContainerCart");
  const price = document.createElement("p");
  price.classList.add("priceNormalCart");
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
  addToCartBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (user === null || user === "") {
      const heading = "Sign in?";
      const message = "You need to be signed in to add to cart.";
      const buttonText = "Sign in";
      createModal(heading, message, buttonText, redirectToLogin);
    } else {
      addToCart(product);
    }
  });

  document.createElement("div");
  document.create;

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

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  const toastMessage = `You have successfully added ${product.title} to your cart!`;
  toastNotification(toastMessage, "success");
  rerenderCartNotification();
}

await displayProduct();

const shareBtn = document.getElementById("shareBtn");
shareBtn.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    navigator.clipboard.writeText(window.location.href);
    toastNotification("Link copied!", "success");
  } catch (error) {
    toastNotification("Could not copy link:" + error, "error");
  }
});

function redirectToLogin() {
  location.href = "../account/login.html";
}


document.getElementById("linkBackBtn").addEventListener("click", () => {
  window.history.back()
})