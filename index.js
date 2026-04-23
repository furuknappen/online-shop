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

async function fetchProducts() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // "Failed to fetch (" + response.status + "), with message: " response.message
      throw new Error("Something is wrong: ", response.status);
    }
    const result = await response.json();

    const products = result.data;
    return products;
  } catch (error) {
    // "Failed to fetch" + error.message
    console.error("Fetch error: ", error);
  }
}
const products = await fetchProducts();

function createProductCards(products) {
  products
    .filter((_, i) => i <= 11)
    .forEach((product) => {
      const card = document.createElement("a");
      card.classList.add("card");

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

      const name = document.createElement("h2");
      name.classList.add("itemName");
      name.textContent = product.title;
      cardTextDiv.appendChild(name);

      const priceContainer = document.createElement("div");
      priceContainer.classList.add("priceContainer");
      const price = document.createElement("p");
      price.classList.add("priceNormal");
      if (product.discountedPrice < product.price) {
        price.textContent = product.discountedPrice + ",-";
        // price.classList.add("priceSale");
        const oldPrice = document.createElement("p");
        oldPrice.classList.add("oldPrice");
        oldPrice.textContent = product.price + ",-";

        priceContainer.appendChild(price);
        priceContainer.appendChild(oldPrice);
      } else {
        price.textContent = product.price + ",-";
        priceContainer.appendChild(price);
      }

      cardTextDiv.appendChild(priceContainer);

      cardContainer.appendChild(card);

      card.addEventListener("click", () => {
        window.location.href = `/product/index.html?id=${product.id}`;
      });
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
  console.log("enters create carousel");

  const chunks = [];

  for (let i = 0; i < topRatedProducts.length; i += cardsPerSlide) {
    chunks.push(topRatedProducts.slice(i, i + cardsPerSlide));
  }
  console.log("Chunks: ", chunks);
  return chunks;
}

const cardsPerSlide = 3;
let currentSlide = 0;
const carouselCardsAmount = 12
const topRatedProducts = sortTopRated(products);
const chunks = createCarousel(topRatedProducts);
rerenderCarouselCards(chunks[currentSlide]);

const prevBtn = document.getElementById("carousel-prev-btn");
prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentSlide == 0) {
    currentSlide = chunks.length;
  }

  currentSlide--;
  rerenderCarouselCards(chunks[currentSlide]);
});

const nextBtn = document.getElementById("carousel-next-btn");
nextBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (currentSlide == chunks.length -1) {
    currentSlide = -1;
  }

  currentSlide++;
  rerenderCarouselCards(chunks[currentSlide]);
});

function rerenderCarouselCards(products) {
  carouselCardsContainer.innerHTML = null;

  console.log("enters function");
  products.forEach((product) => {
    const card = document.createElement("a");
    card.classList.add("card");

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

    const name = document.createElement("h2");
    name.classList.add("itemName");
    name.textContent = product.title;
    cardTextDiv.appendChild(name);

    const priceContainer = document.createElement("div");
    priceContainer.classList.add("priceContainer");
    const price = document.createElement("p");
    price.classList.add("priceNormal");
    if (product.discountedPrice < product.price) {
      price.textContent = product.discountedPrice + ",-";
      // price.classList.add("priceSale");
      const oldPrice = document.createElement("p");
      oldPrice.classList.add("oldPrice");
      oldPrice.textContent = product.price + ",-";

      priceContainer.appendChild(price);
      priceContainer.appendChild(oldPrice);
    } else {
      price.textContent = product.price + ",-";
      priceContainer.appendChild(price);
    }

    cardTextDiv.appendChild(priceContainer);

    carouselCardsContainer.appendChild(card);
  });
}

