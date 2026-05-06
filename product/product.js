import { toastNotification } from "../scripts/toastNotification.js";
import {rerenderCartNotification } from "../scripts/header.js";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
//TODO: add share btn
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
  const noSizeError = document.getElementById("noSizeError");

  // fjerne no size og endre sånn at hvis de ikke velger quantity s blir det automatisk 1
  // document.querySelectorAll("input[name='size']").forEach((radio) => {
  //   radio.addEventListener("change", () => {
  //     noSizeError.style.display = "none";
  //   });
  // });

  addToCartBtn.addEventListener("click", (event) => {
    event.preventDefault();

    // const selectedSize = document.querySelector("input[name='size']:checked");

    // if (!selectedSize) {
    //   noSizeError.style.display = "flex";
    //   return;
    // }
    // noSizeError.style.display = "none";
    // addToCart(item, selectedSize.value);
    addToCart(product);
  });

  // quantity input

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
  console.log("cart: ", cart);
}

await displayProduct();
const cartContent = localStorage.getItem("cart");
