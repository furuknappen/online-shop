
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const url = "https://v2.api.noroff.dev/online-shop/";

async function fetchData() {
  try {
    const response = await fetch(url + productId);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const result = await response.json();
    const item = result.data;

    console.log(item);
  } catch (error) {
    alert("Could not fetch data: " + error)
  }
}

fetchData()