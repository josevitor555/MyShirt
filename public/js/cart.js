const payBtn = document.querySelector(".btn-buy");

payBtn.addEventListener("click", () => {
  fetch('/stripe-checkout', {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      items: JSON.parse(localStorage.getItem("cartItems")) || [],
    }),
  })
    .then((response) => response.json())
    .then((url) => {
      location.href = url;
    })
    .catch((error) => console.error(error));
});

// import { Stripe } from "stripe";

// var stripe = Stripe(
//   "pk_test_51P9d4GJTiGK3Mb2UmpPGmNUzlzaSD2bwUpUMmCFxFU9ZwwQucXzCy8NdiQ6DganlT32P22hnmf1bFdqhKhTOscKI00Gq1jRbss"
// );
// var checkoutButton = document.querySelector(".btn-buy");

// checkoutButton.addEventListener("click", function () {
//   fetch("/stripe-checkout", {
//     headers: new Headers({ "Content-Type": "application/json" }),
//     method: "POST",
//     body: JSON.stringify({
//       items: JSON.parse(localStorage.getItem("cartItems")) || [],
//     }),
//   })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (session) {
//       return stripe.redirectToCheckout({ sessionId: session.id });
//     })
//     .then(function (result) {
//       if (result.error) {
//         alert(result.error.message);
//       }
//     })
//     .catch(function (error) {
//       console.error("Error:", error);
//     });
// });
