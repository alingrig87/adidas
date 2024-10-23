const productsTableBody = document
  .getElementById("products-table")
  .querySelector("tbody");

document.addEventListener("DOMContentLoaded", displayProducts);

const URL = "https://670fe587a85f4164ef2c6100.mockapi.io/products";

function displayProducts() {
  fetch(URL)
    .then((response) => response.json())
    .then(
      (products) =>
        (productsTableBody.innerHTML = products
          .map(
            (product) => `
        <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><img width="50px" src=${product.imageURL} /></td>
            <td>${product.details} </td>
            <td>
                <button class="edit-btn" data-productId=${product.id}>Edit</button>
            </td>
            <td>
                <button class="delete-btn" data-productId=${product.id}>Delete</button>
            </td>
        </tr>
    `
          )
          .join(""))
    );
}

// save new product
const form = document.getElementById("product-form");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imageUrlInput = document.getElementById("image-url");
const detailsInput = document.getElementById("details");
const saveProductBtn = document.getElementById("save-btn");
let currentEditableProductId;
let editMode = false;

saveProductBtn.addEventListener("click", saveProduct);

function saveProduct(event) {
  event.preventDefault();

  const product = {
    name: nameInput.value,
    price: Number(priceInput.value),
    imageURL: imageUrlInput.value,
    details: detailsInput.value,
  };

  if (editMode) {
    fetch(`${URL}/${currentEditableProductId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then(() => {
      form.reset();
      displayProducts();
      editMode = false;
    });
  } else {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then(() => displayProducts());
  }
}

productsTableBody.addEventListener("click", handleActions);

function handleActions(event) {
  if (event.target.classList.contains("edit-btn")) {
    currentEditableProductId = event.target.getAttribute("data-productId");
    fetch(`${URL}/${currentEditableProductId}`)
      .then((response) => response.json())
      .then((product) => {
        nameInput.value = product.name;
        priceInput.value = product.price;
        imageUrlInput.value = product.imageURL;
        detailsInput.value = product.details;
      });
    editMode = true;
  } else if (event.target.classList.contains("delete-btn")) {
    const id = event.target.getAttribute("data-productId");
    fetch(`${URL}/${id}`, {
      method: "DELETE",
    }).then(() => displayProducts());
  }
}
