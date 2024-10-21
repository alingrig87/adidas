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
                <button data-productId=${product.id}>Edit</button>
            </td>
            <td>
                <button data-productId=${product.id}>Delete</button>
            </td>
        </tr>
    `
          )
          .join(""))
    );
}
