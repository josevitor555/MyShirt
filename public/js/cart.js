const payBtn = document.querySelector(".btn-buy");

payBtn.addEventListener("click", () => {
  fetch('/stripe-checkout', {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      items: JSON.parse(localStorage.getItem("cartItems")),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.url) {
        location.href = data.url;
      } else {
        console.error('URL not found in response.');
      }
    })
    .catch((error) => console.error(error));
});
