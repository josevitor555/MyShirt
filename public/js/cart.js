document.addEventListener("DOMContentLoaded", () => {
  const proceedToCheckoutBtn = document.getElementById('proceedToCheckout');

  proceedToCheckoutBtn.addEventListener('click', () => {
      fetch('/stripe-checkout', {
          method: "post",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              items: JSON.parse(localStorage.getItem("cartItems")),
          }),
      })
      .then((res) => res.json())
      .then((data) => {
          if (data.url) {
              location.href = data.url;
              clearCart();
          } else {
              console.error('URL not found in response.');
          }
      })
      .catch((error) => console.error(error));
  });

  loadCartItemsIntoTable();
});

function loadCartItemsIntoTable() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const tbody = document.querySelector("#cartPage tbody");
  tbody.innerHTML = ""; // Clear the table body

  let cartSubtotal = 0;

  cartItems.forEach(item => {
      const tr = document.createElement('tr');

      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      const subtotal = price * item.quantity;
      cartSubtotal += subtotal;

      tr.innerHTML = `
          <td> <a href="#"> <i class='bx bxs-trash-alt'></i> </a> </td>
          <td> <a href="#"> <img src="${item.productImg}" alt="Image Product Not Found"> </a> </td>
          <td> <p> ${item.title} </p> </td>
          <td> $${price.toFixed(2)} </td>
          <td> <input type="number" value="${item.quantity}" readonly> </td>
          <td> $${subtotal.toFixed(2)} </td>
      `;

      tbody.appendChild(tr);
  });

  const cartTotal = cartSubtotal.toFixed(2);
  const shipping = "Free"; // Assuming shipping is free

  document.getElementById('cart-subtotal').innerText = `$${cartSubtotal.toFixed(2)}`;
  document.getElementById('cart-total').innerText = `$${cartTotal}`;

  const cartTotalsTable = document.getElementById('subtotal').getElementsByTagName('table')[0];
  const cartTotalsRows = cartTotalsTable.getElementsByTagName('tr');
  
  cartTotalsRows[0].getElementsByTagName('td')[1].innerText = `$${cartTotal}`;
  cartTotalsRows[1].getElementsByTagName('td')[1].innerText = shipping;
  cartTotalsRows[2].getElementsByTagName('td')[1].innerText = `$${cartTotal}`;

  const cartEmptyMessage = document.getElementById('cart-empty-message');
  if (cartItems.length === 0) {
      cartEmptyMessage.style.display = 'block';
  } else {
      cartEmptyMessage.style.display = 'none';
  }

}

function clearCart() {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartTotal');
}