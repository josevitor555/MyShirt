const payBtn = document.querySelector(".btn-buy");

payBtn.addEventListener("click", () => {
  fetch("http://localhost:3000/stripe-checkout", {
    method: "post",
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


// Cookies blocked:

// import { Stripe } from 'stripe';

// var stripe = Stripe(
//   "keypk_live_51P9d4GJTiGK3Mb2UwyL8RGw6jnWIM77UN2yNujCL14Hda1vsmi6j3itSGpj7oSrUI44CMGkjqfSjwwaJGu9TPJml00LRaUSErj"
// );
// var checkoutButton = document.querySelector(".btn-buy");

// checkoutButton.addEventListener("click", function () {
//   fetch("/stripe-checkout", {
//     headers: { "Content-Type": "application/json" },
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
