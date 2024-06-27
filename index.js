import "./styles.css";
import "./styles.css";

let productsData = {};

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((products) => {
    productsData = products;
    renderProducts(productsData);
    document.getElementById("result").innerHTML =
      productsData.length + " " + "Results";
    console.log(productsData);
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
  });

function createProductHTML(product) {
  return `
      <div class="col-lg-4 col-6">
        <div class="product-wrap">
        <div class="product-image-wrap" style="background-image: url('${
          product.image
        }');">
        </div>
          
          <div class="product-title">
            <p class="product-title">${product.title}</p>
            <p class="product-price">$${product.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
    `;
}

function renderProducts(products) {
  // Find the container for the products
  const productsContainer = document.querySelector("#product-row"); // Make sure to add this ID to your container element

  // Clear the container
  productsContainer.innerHTML = "";

  // Loop through the products and append them to the container
  products.forEach((product) => {
    productsContainer.innerHTML += createProductHTML(product);
  });
}

function getSelectedCategories() {
  const checkboxes = document.querySelectorAll(".category-checkbox");
  return Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.getAttribute("data-category"));
}

function areAllChecked() {
  const checkboxes = document.querySelectorAll(".cat-check");
  return Array.from(checkboxes).every((checkbox) => checkbox.checked);
}

document.querySelectorAll(".cat-check").forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (areAllChecked()) {
      // If all checkboxes are checked, render all products
      renderProducts(productsData);
    } else {
      // Otherwise, filter based on the checked category
      const category = this.getAttribute("data-category");
      const isChecked = this.checked;
      filterAndRenderProducts(category, isChecked);
    }
  });
});

function filterAndRenderProducts(category, isChecked) {
  let filteredProducts = productsData;
  if (isChecked) {
    // Filter products that match the category
    filteredProducts = productsData.filter(
      (product) => product.category === category
    );
  }
  renderProducts(filteredProducts);
}
