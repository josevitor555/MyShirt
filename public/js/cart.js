document.addEventListener("DOMContentLoaded", () => {
    const proceedToCheckoutBtn = document.getElementById('proceedToCheckout');
    const applyButton = document.querySelector("#coupon button");
    const couponInput = document.querySelector("#coupon input");
    const couponMessage = document.getElementById("coupon-message");
    const cartSubtotalElement = document.getElementById("cart-subtotal");
    const cartTotalElement = document.getElementById("cart-total");

    const validCoupons = ["DISCONTO30", "SAVE30", "PROMO30"];
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
        .then((res) => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error(text) });
            }
            return res.json();
        })
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
            showCouponMessage(`Cupom aplicado com sucesso! Você economizou ${formatBRL(discount)}`, "success");
        } else {
            showCouponMessage("Código Inválido!", "error");
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
        tbody.innerHTML = "";

        cartSubtotal = 0;

        cartItems.forEach(item => {
            const tr = document.createElement('tr');

            const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            const subtotal = price * item.quantity;
            cartSubtotal += subtotal;

            const truncatedTitle = item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title;

            tr.innerHTML = `
                <td> <a href="#"> <i class='bx bxs-trash-alt remove-item'></i> </a> </td>
                <td> <a href="#"> <img src="${item.productImg}" alt="Image Product Not Found"> </a> </td>
                <td class="product-title"> <p> ${truncatedTitle} </p> </td>
                <td> ${formatBRL(price)} </td> <!-- Ok: Exibição do preço em BRL -->
                <td> <input type="number" value="${item.quantity}" readonly> </td>
                <td> ${formatBRL(subtotal)} </td> <!-- Ok: Exibição do subtotal em BRL -->
            `;

            tbody.appendChild(tr);

            const removeIcon = tr.querySelector('.remove-item');
            removeIcon.addEventListener('click', () => {
                removeCartItem(item);
            });
        });

        const shipping = "Grátis";

        document.getElementById('cart-subtotal').innerText = formatBRL(cartSubtotal);
        document.getElementById('cart-total').innerText = formatBRL(cartSubtotal);

        const cartTotalsTable = document.getElementById('subtotal').getElementsByTagName('table')[0];
        const cartTotalsRows = cartTotalsTable.getElementsByTagName('tr');
        
        cartTotalsRows[0].getElementsByTagName('td')[1].innerText = `${formatBRL(cartSubtotal)}`;
        cartTotalsRows[1].getElementsByTagName('td')[1].innerText = shipping;
        cartTotalsRows[2].getElementsByTagName('td')[1].innerText = `${formatBRL(cartSubtotal)}`;

        const cartEmptyMessage = document.getElementById('cart-empty-message');
        if (cartItems.length === 0) {
            cartEmptyMessage.style.display = 'block';
        } else {
            cartEmptyMessage.style.display = 'none';
        }
    }

    function formatBRL(value) {
        return value.toLocaleString('pt-BR',
        {
            style: 'currency',
            currency: 'BRL'
        });
    }
    
    function updateCartTotals(subtotal) {
        cartSubtotalElement.textContent = formatBRL(subtotal);
        cartTotalElement.textContent = formatBRL(subtotal);
    
        const cartTotalsTable = document.getElementById('subtotal').getElementsByTagName('table')[0];
        const cartTotalsRows = cartTotalsTable.getElementsByTagName('tr');
        
        cartTotalsRows[0].getElementsByTagName('td')[1].innerText = formatBRL(subtotal);
        cartTotalsRows[2].getElementsByTagName('td')[1].innerText = formatBRL(subtotal);
    }

    function clearCart() {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTotal');
    }
    
    function removeCartItem(itemToRemove) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems'));
        cartItems = cartItems.filter(item => item.title !== itemToRemove.title);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        loadCartItemsIntoTable();

        const newSubtotal = calculateSubTotal(cartItems);
        updateCartTotals(newSubtotal);
    }

    function calculateSubTotal(cartItems) {
        let subtotal = 0;
        cartItems.forEach(item => {
            const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
            subtotal += price * item.quantity;
        });

        return subtotal;
    }
});
