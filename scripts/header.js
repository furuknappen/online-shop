import { createModal } from "./modal.js";

const hamburgerMenuNav = document.getElementById("main-nav-mob");
const hamburgerMenuBtn = document.getElementById("hamburgerBTN");
const cartBtn = document.querySelectorAll(".cartBtn");
rerenderCartNotification()
// localStorage.removeItem("userInfo")

cartBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    // e.preventDefault();
    const user = JSON.parse(localStorage.getItem("userInfo"));
    redirectCart(user);
  });
});

function redirectCart(user) {
  if (user === null || user === "") {
    createModal(
      "Sign in?",
      "You need to be signed in to go to cart.",
      "Sign in",
      redirectToLogin,
      "",
    );
  } else {
    location.href = "/cart/index.html";

  }
}

const profileBtn = document.querySelectorAll(".profileBtn");
profileBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    // e.preventDefault();
    const user = JSON.parse(localStorage.getItem("userInfo"));
    redirectProfile(user);
  });
});

function redirectProfile(user) {
  if (user === null || user === "") {
    location.href = "/account/login.html";
  } else {

    createModal("Log out?", "You are about to log out", "Log out", logOut, "");
  }
}

function logOut() {
  localStorage.clear();
}

function redirectToLogin() {
  location.href = "/account/login.html";
}

const en = JSON.parse(localStorage.getItem("userInfo"));
console.log("en: ", en);

hamburgerMenuBtn.addEventListener("click", () => {
  // const isOpen = hamburgerMenuNav.hasAttribute("hidden", "hidden")
  // if(isOpen){
  //   hamburgerMenuNav.removeAttribute(hidden)
  //   hamburgerMenuBtn.setAttribute('aria-expanded', 'true')
  // } else {
  //   hamburgerMenuNav.setAttribute('hidden', '')
  //   hamburgerMenuBtn.setAttribute('aria-expanded', 'false')
  // }
  console.log("click");

  const isExpanded = hamburgerMenuBtn.getAttribute("aria-expanded") === "true";
  hamburgerMenuBtn.setAttribute("aria-expanded", !isExpanded);

  if (isExpanded) {
    hamburgerMenuNav.setAttribute("hidden", "");
  } else {
    hamburgerMenuNav.removeAttribute("hidden");
  }
});

export function rerenderCartNotification() {
  console.log("enters cartnot")
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const notification = document.querySelector(".cartNotification");
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
  notification.textContent = totalQuantity;
  if (totalQuantity == 0) {
    // do nothing
  } else if (totalQuantity <= 9) {
    notification.classList.add("under10");
    notification.classList.remove("over10");
  } else {
    notification.classList.remove("under10");
    notification.classList.add("over10");
  }
}
