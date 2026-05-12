
const purchaseHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
const cart = purchaseHistory[0]
console.log(purchaseHistory[0])
cart.forEach((item) => {
  const product = document.createElement("a");

  product.href = `product/index.html?id=${item.id}`

  const ammount = document.createElement("p")
  ammount.innerHTML = item.quantity;
  ammount.classList.add("quantityNumber");

  product.classList.add("miniCart");
  const image = document.createElement("img");
  image.src = item.image.url;
  image.alt = item.image.alt;

  const title = document.createElement("p");
  title.classList.add("itemInfo", "cartTitle");
  title.textContent = item.title;

  const price = document.createElement("p");
  price.classList.add("itemInfo", "summaryItemPrice");
  
  price.innerHTML = (item.discountedPrice * item.quantity).toFixed(2) + ",-";



  product.append(ammount, image, title, price);
  miniCartContainer.append(product);

totalPrice += item.discountedPrice * item.quantity;
  
});