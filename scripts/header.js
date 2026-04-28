
const hamburgerMenuNav = document.getElementById("main-nav-mob")
const hamburgerMenuBtn = document.getElementById("hamburgerBTN")


hamburgerMenuBtn.addEventListener('click', () => {
  // const isOpen = hamburgerMenuNav.hasAttribute("hidden", "hidden")
  // if(isOpen){
  //   hamburgerMenuNav.removeAttribute(hidden)
  //   hamburgerMenuBtn.setAttribute('aria-expanded', 'true')
  // } else {
  //   hamburgerMenuNav.setAttribute('hidden', '')
  //   hamburgerMenuBtn.setAttribute('aria-expanded', 'false')
  // }
console.log("click")

  const isExpanded = hamburgerMenuBtn.getAttribute('aria-expanded') === 'true'
  hamburgerMenuBtn.setAttribute('aria-expanded', !isExpanded)

if(isExpanded){
  hamburgerMenuNav.setAttribute('hidden', '')
} else {
  hamburgerMenuNav.removeAttribute('hidden')
}


})