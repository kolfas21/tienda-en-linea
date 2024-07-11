// public/js/cart.js

document.addEventListener('DOMContentLoaded', () => {
    // Array para almacenar los artículos del carrito
    let cartItems = [];

    // Función para actualizar el modal del carrito
    function updateCartModal() {
        const cartTableBody = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        cartTableBody.innerHTML = ''; // Limpiar el contenido previo
        let total = 0;

        cartItems.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.id}">Eliminar</button></td>
            `;
            cartTableBody.appendChild(row);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Evento para añadir artículos al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const id = event.target.getAttribute('data-id');
            const name = event.target.getAttribute('data-name');
            const price = parseFloat(event.target.getAttribute('data-price'));

            const existingItem = cartItems.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({ id, name, price, quantity: 1 });
            }

            updateCartModal();
        });
    });

    // Evento para eliminar artículos del carrito
    document.getElementById('cartItems').addEventListener('click', event => {
        if (event.target.classList.contains('remove-from-cart')) {
            const id = event.target.getAttribute('data-id');
            cartItems = cartItems.filter(item => item.id !== id);
            updateCartModal();
        }
    });
});
