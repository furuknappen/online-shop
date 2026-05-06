"use strict";
// TODO: må input ha forskjellige navn?
//TODO: å skrive inn i quantity inputfeltet fungerer ikke 

const productDisplay = document.querySelector(".productContainer");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let totalPrice = 0;
let totalDiscount = 0;

if (cart.length == 0) {
  const noItems = document.createElement("p");
  noItems.classList.add("noItems");
  noItems.textContent = "No items in cart";
  document.querySelector(".productContainer").append(noItems);
  document.querySelector("#goToCheckout").classList.add("disabled");
  document.querySelector("#goToCheckout").title = "No item in cart";
}

function rerenderCart() {
  console.log("inside");
  productDisplay.innerHTML = "";
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  totalPrice = 0;
  totalDiscount = 0;
  
if (cart.length == 0) {
  const noItems = document.createElement("p");
  noItems.classList.add("noItems");
  noItems.textContent = "No items in cart";
  document.querySelector(".productContainer").append(noItems);
  document.querySelector("#goToCheckout").classList.add("disabled");
  document.querySelector("#goToCheckout").title = "No item in cart";
}



  cart.forEach((item, index) => {
    console.log(item.quantity);
    const productLine = document.createElement("div");
    productLine.classList.add("product-line");

    const image = document.createElement("img");
    image.src = item.image.url;
    image.alt = item.image.alt;

    const cartText = document.createElement("div");
    cartText.classList.add("cartText");

    // let size = document.createElement("p");
    // size.textContent = `Size: ${item.selectedSize}`;

    const quantityDiv = document.createElement("div");
    quantityDiv.classList.add("quantityDiv")
    //  let quantity = document.createElement("p");
    //   quantity.textContent = `Quantity: ${item.quantity}`;

    const quantityInput = document.createElement("input");
    quantityInput.id = "quantityInputCart"
    quantityInput.classList.add("quantityInput")
    quantityInput.value = item.quantity;

    const reduceQuantityBtn = document.createElement("button");
    reduceQuantityBtn.classList.add("reduceQuantityBtn", "quantityBtn")
    reduceQuantityBtn.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /></svg>`;

    reduceQuantityBtn.addEventListener("click", () => {
      // const newQuantity =
      reduceQuantity(item, index);
      // item.quantity = newQuantity;
    });

    const addQuantityBtn = document.createElement("button");
       addQuantityBtn.classList.add("addQuantityBtn", "quantityBtn")
    addQuantityBtn.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>`;

    addQuantityBtn.addEventListener("click", () => {
    addQuantity(item, index);
    });

    quantityDiv.append(reduceQuantityBtn, quantityInput, addQuantityBtn);

    // se litt på denne
    const priceContainer = document.createElement("div");
    priceContainer.classList.add("priceContainer");
    let price = document.createElement("p");
    price.classList.add("itemInfo", "product-price");

    if (item.discountedPrice < item.price) {
      price.textContent = item.discountedPrice + ",-";
      totalDiscount += (item.price - item.discountedPrice) * item.quantity;
      console.log("total discount",totalDiscount)
      totalPrice += (item.discountedPrice * item.quantity)

const oldPrice = document.createElement("p");
    oldPrice.classList.add("priceOld");
    oldPrice.textContent = item.price + ",-";

    priceContainer.appendChild(price);
    priceContainer.appendChild(oldPrice);

    } else {
      price.textContent = item.price + ",-";
      priceContainer.appendChild(price);
      totalPrice += item.price * quantity
    }


    const title = document.createElement("p");
    title.classList.add("itemInfo" , "product-title");
    title.textContent = item.title;

    const trashBtn = document.createElement("button");
    trashBtn.classList.add("removeBtn");
    trashBtn.setAttribute("aria-label", `remove ${item.title} from cart`);
    trashBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="40" height="40" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>`;

    trashBtn.addEventListener("click", () => {
      removeItemFromCart(index);
    });

   
    productLine.append(image, cartText);
    cartText.append(title,priceContainer, quantityDiv);
    productLine.append(trashBtn);
    productDisplay.appendChild(productLine);
    console.log("total price is" , totalPrice)
    document.querySelector("#goToCheckout").href = "checkout-page.html";
  });
// TODO: total price does not work! BK pls
  document.querySelector(".discounted").textContent = totalDiscount.toFixed(2) + " ,-";
  document.querySelector(".totalPrice").textContent = totalPrice.toFixed(2);
}

rerenderCart();

function removeItemFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  rerenderCart();
}

function reduceQuantity(item, index) {
  console.log("click down");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].quantity <= 1) {
    removeItemFromCart(index);
  } else {
    cart[index].quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    rerenderCart();
  }
}

function addQuantity(item, index) {
  console.log("click up");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  rerenderCart();
}
