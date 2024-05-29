document.addEventListener("DOMContentLoaded", () => {
    const proceedToCheckoutBtn = document.getElementById('proceedToCheckout');
    const applyButton = document.querySelector("#coupon button");
    const couponInput = document.querySelector("#coupon input");
    const couponMessage = document.getElementById("coupon-message");
    const cartSubtotalElement = document.getElementById("cart-subtotal");
    const cartTotalElement = document.getElementById("cart-total");

    const validCoupons = ["DISCOUNT30", "SAVE30", "PROMO30"];
    let appliedCoupon = "";
    
    let cartSubtotal = 0;

    proceedToCheckoutBtn.addEventListener('click', () => {
        fetch('/stripe-checkout', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: JSON.parse(localStorage.getItem("cartItems")),
                discountCode: appliedCoupon
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

    applyButton.addEventListener("click", function() {
        const enteredCoupon = couponInput.value.trim();
        
        if (validCoupons.includes(enteredCoupon)) {
            appliedCoupon = enteredCoupon;
            const discountPercentage = 30;
            const discount = (cartSubtotal * discountPercentage) / 100;
            const newSubtotal = cartSubtotal - discount;
            updateCartTotals(newSubtotal);
            showCouponMessage(`Coupon applied successfully! You saved $${discount.toFixed(2)}`, "success");
        } else {
            showCouponMessage("Invalid coupon code!", "error");
        }
    });

    function showCouponMessage(message, type) {
        couponMessage.textContent = message;
        couponMessage.classList.remove("success", "error");
        couponMessage.classList.add(type);
    }

    loadCartItemsIntoTable();

    function loadCartItemsIntoTable() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const tbody = document.querySelector("#cartPage tbody");
        tbody.innerHTML = ""; // Clear the table body

        cartSubtotal = 0;

        cartItems.forEach(item => {
            const tr = document.createElement('tr');

            // Convert the price to a float
            const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            const subtotal = price * item.quantity;
            cartSubtotal += subtotal;

            const truncatedTitle = item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title;

            tr.innerHTML = `
                <td> <a href="#"> <i class='bx bxs-trash-alt'></i> </a> </td>
                <td> <a href="#"> <img src="${item.productImg}" alt="Image Product Not Found"> </a> </td>
                <td class="product-title"> <p> ${truncatedTitle} </p> </td>
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

    function updateCartTotals(subtotal) {
        cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        cartTotalElement.textContent = `$${subtotal.toFixed(2)}`;

        const cartTotalsTable = document.getElementById('subtotal').getElementsByTagName('table')[0];
        const cartTotalsRows = cartTotalsTable.getElementsByTagName('tr');
        
        cartTotalsRows[0].getElementsByTagName('td')[1].innerText = `$${subtotal.toFixed(2)}`;
        cartTotalsRows[2].getElementsByTagName('td')[1].innerText = `$${subtotal.toFixed(2)}`;
    }

    function clearCart() {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTotal');
    }
});

/*
Armazenamento dos dados no localStorage: Certifique-se de que os dados do carrinho são armazenados corretamente no localStorage.
Recuperação dos dados do localStorage: Verifique se os dados são recuperados corretamente e usados de forma adequada no cálculo dos preços.
Conversão de string para número: Certifique-se de que a conversão dos preços de string para número está sendo feita corretamente.
*/