const hamburgerMenuNav = document.getElementById("main-nav-mob");
const hamburgerMenuBtn = document.getElementById("hamburgerBTN");

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
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const notification = document.querySelector(".cartNotification");
  //TODO: finne ut hvordan man kan vise hele antallet
  notification.textContent = cart.length;
  if (cart.length == 0) {
// do nothing
  } else if (cart.length <= 9) {
    notification.classList.add("under10");
    notification.classList.remove("over10");

  } else {
    notification.classList.remove("under10");
    notification.classList.add("over10");
  }
}
