const hamburgerMenuNav = document.getElementById("main-nav-mob");
const hamburgerMenuBtn = document.getElementById("hamburgerBTN");

const profileBtnPc = document.getElementById("profile-button-pc");
const profileBtnMobile = document.getElementById("profile-button-mobile")
// localStorage.removeItem("userInfo")

 const user = JSON.parse(localStorage.getItem("userInfo"));

profileBtnPc.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("click");
  redirectProfile();
});
profileBtnMobile.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("click");
  redirectProfile();
});


function redirectProfile() {
 
  console.log(user);
  // const userAccessToken = user.accessToken;
  // console.log("Access : " + userAccessToken);


  if (user === null || user === "") {
    location.href = "/account/login.html";
  } else {
    location.href = "/comingsoon-page.html";
  
}
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
