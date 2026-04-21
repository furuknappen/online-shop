// TODO: add stars and maybe tags to make cards fuller
const url = "https://v2.api.noroff.dev/online-shop";
const cardContainer = document.getElementById("gridContainerHomepage");

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



async function createProductCards() {
  const products = await fetchProducts();
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

    cardContainer.appendChild(card);

    card.addEventListener("click", () => {
      window.location.href = `/product/index.html?id=${product.id}`;
    });
  });
}

await createProductCards();
