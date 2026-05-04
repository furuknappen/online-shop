// TODO: add stars and maybe tags to make cards fuller

// import { createCarousel } from "./scripts/carousel.js";
const url = "https://v2.api.noroff.dev/online-shop";
const cardContainer = document.getElementById("gridContainerHomepage");
// let currentCarouselSlide = 1;
// let page = 2;
// const carouselCardsAmount = 3;

const carouselCardsContainer = document.getElementById(
  "carousel-cards-container",
);
// debugger;
async function fetchProducts() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // "Failed to fetch (" + response.status + "), with message: " response.message
      // BK Riktig plass??
      //TODO: BK
      cardContainer.innerHTML =
        '<p role="alert" >Unable to load products. Please try again later. </p>';
      throw new Error(`Failed to fetch products:  (${response.status})`);
    }
    const result = await response.json();

    const products = result.data;
    return products;
  } catch (error) {
    // "Failed to fetch" + error.message
    //TODO: BK - kan de være samme?
    cardContainer.innerHTML =
      '<p role="alert" >Unable to load products. Please try again later. </p>';

    // console.error("Fetch error: ", error);
  }
}
const products = await fetchProducts();

function createProductCards(products) {
  products
    .filter((_, i) => i <= 11)
    .forEach((product) => {
      const listItem = document.createElement("li");
      const card = document.createElement("a");
      card.classList.add("card");
      card.setAttribute("role", "listitem");

      const imgDiv = document.createElement("div");
      imgDiv.classList.add("imgDiv");

      const image = document.createElement("img");

      image.src = product.image.url;
      image.alt = product.image.alt;
      image.classList.add("cardImg");
      imgDiv.appendChild(image);
      card.appendChild(imgDiv);

      const cardTextDiv = document.createElement("div");
      cardTextDiv.classList.add("cardTextDiv");
      card.appendChild(cardTextDiv);
      card.href = `product/index.html?id=${product.id}`;
      const name = document.createElement("h2");
      name.classList.add("itemName");
      name.textContent = product.title;
      cardTextDiv.appendChild(name);

      const priceContainer = document.createElement("div");
      priceContainer.classList.add("priceContainer");
      const price = document.createElement("p");
      price.classList.add("priceNormal");

      let ariaLabel;
      if (product.discountedPrice < product.price) {
        price.textContent = product.discountedPrice + ",-";
        // price.classList.add("priceSale");
        const oldPrice = document.createElement("p");
        oldPrice.classList.add("oldPrice");
        oldPrice.textContent = product.price + ",-";
        ariaLabel = `View ${product.title}, original price ${product.price}, sale price ${product.discountedPrice}`;
        priceContainer.appendChild(price);
        priceContainer.appendChild(oldPrice);
      } else {
        price.textContent = product.price + ",-";
        priceContainer.appendChild(price);
        ariaLabel = `View ${product.title},  price ${product.price}`;
      }
      card.setAttribute("aria-label", ariaLabel);

      cardTextDiv.appendChild(priceContainer);
      listItem.appendChild(card);
      cardContainer.appendChild(listItem);

      // card.addEventListener("click", () => {
      //   window.location.href = `/product/index.html?id=${product.id}`;
      // });
    });
}

createProductCards(products);

function sortTopRated(products) {
  const sorted = products.sort((a, b) => {
    return b.rating - a.rating;
  });
  const topRatedProducts = sorted.slice(0, carouselCardsAmount);
  return topRatedProducts;
}

function createCarousel(topRatedProducts) {
  const chunks = [];
  for (
    let i = 0; // start
    i < topRatedProducts.length; // Kjør så lenge dette er sant
    i += cardsPerSlide // for hver loop, øk `i`med `cardsPerSlide`
  ) {
    chunks.push(topRatedProducts.slice(i, i + cardsPerSlide));
  }
  return chunks;
}

let cardsPerSlide = 3;
const screenWidth = window.innerWidth;
const mobileMaxWidth = 768;

function updateCardsPerSlide() {
  if (screenWidth < mobileMaxWidth) {
    cardsPerSlide = 2;
  } else {
    cardsPerSlide = 3;
  }
}

updateCardsPerSlide();

let currentSlide = 0;
const carouselCardsAmount = 12;
const topRatedProducts = sortTopRated(products);
const chunks = createCarousel(topRatedProducts);
rerenderCarouselCards(chunks[currentSlide]);

window.addEventListener("resize", updateCardsPerSlide);

function ariaCurrentSlideInfo() {
  const currentNumberSlides = carouselCardsAmount / cardsPerSlide;
  console.log(currentSlide + 1);
  // need an css class for this
  document.getElementById("carousel-status").textContent =
    `Showing slide ${currentSlide + 1} of ${currentNumberSlides}`;
}

ariaCurrentSlideInfo();

const prevBtn = document.getElementById("carousel-prev-btn");
prevBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (currentSlide == 0) {
    currentSlide = chunks.length;
  }
  ariaCurrentSlideInfo();
  currentSlide--;
  rerenderCarouselCards(chunks[currentSlide]);
});

const nextBtn = document.getElementById("carousel-next-btn");
nextBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (currentSlide == chunks.length - 1) {
    currentSlide = -1;
  }

  ariaCurrentSlideInfo();
  currentSlide++;
  rerenderCarouselCards(chunks[currentSlide]);
});

/** Clear container and render carusell */
function rerenderCarouselCards(products) {
  carouselCardsContainer.innerHTML = null;
  console.log("enters function");
  products.forEach((product) => {
    const listItem = document.createElement("li");
    const card = document.createElement("a");
    card.classList.add("card");
    card.id = "carousel-card";
    card.href = `product/index.html?id=${product.id}`;

    const imgDiv = document.createElement("div");
    imgDiv.classList.add("imgDiv");

    const image = document.createElement("img");

    image.src = product.image.url;
    image.alt = product.image.alt || product.title;
    image.classList.add("cardImg");
    imgDiv.appendChild(image);
    card.appendChild(imgDiv);

    const cardTextDiv = document.createElement("div");
    cardTextDiv.classList.add("cardTextDiv");
    card.appendChild(cardTextDiv);

    const name = document.createElement("h2");
    name.classList.add("itemName");
    name.textContent = product.title;
    cardTextDiv.appendChild(name);

    const priceContainer = document.createElement("div");
    priceContainer.classList.add("priceContainer");
    const price = document.createElement("p");
    price.classList.add("priceNormal");
    let ariaLabel;
    if (product.discountedPrice < product.price) {
      price.textContent = product.discountedPrice + ",-";
      // price.classList.add("priceSale");
      const oldPrice = document.createElement("p");
      oldPrice.classList.add("oldPrice");
      oldPrice.textContent = product.price + ",-";
      ariaLabel = `View ${product.title}, original price ${product.price}, sale price ${product.discountedPrice}`;
      priceContainer.appendChild(price);
      priceContainer.appendChild(oldPrice);
    } else {
      price.textContent = product.price + ",-";
      priceContainer.appendChild(price);
      ariaLabel = `View ${product.title},  price ${product.price}`;
    }
    card.setAttribute("aria-label", ariaLabel);

    cardTextDiv.appendChild(priceContainer);
    listItem.appendChild(card);
    carouselCardsContainer.appendChild(listItem);

    // card.addEventListener("click", () => {
    //   window.location.href = `product/index.html?id=${product.id}`;
    // });
  });
}
