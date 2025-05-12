document.addEventListener('DOMContentLoaded', function() {
    const productSearchInput = document.getElementById('product-search');
    const searchResultsDiv = document.getElementById('search-results');
    const salesTableBody = document.getElementById('sales-table-body');
    const salesFinalActions = document.getElementById('sales-final-actions');
    let productCounter = 0;
    let cartItems = [];

    // Simulación de datos de productos (reemplazar con una API real)
    const products = [
        { id: 1, nombre: 'Galleta Rellenita', categoria: 'Alimentos', precio: 1.00, vence: '18/09/2025' },
        { id: 2, nombre: 'Gaseosa Coca-Cola 500ml', categoria: 'Bebidas', precio: 2.50, vence: '25/12/2025' },
        { id: 1, nombre: 'Galleta Oreo', categoria: 'Alimentos', precio: 0.50, vence: '18/09/2025' },
        { id: 2, nombre: 'Fideos Sayon', categoria: 'Alimentos', precio: 1.50, vence: '18/09/2025' },
        { id: 3, nombre: 'Leche Gloria', categoria: 'Bebidas', precio: 4.50, vence: '18/09/2025' },
        { id: 4, nombre: 'Casinos', categoria: 'Alimentos', precio: 0.70, vence: '18/09/2025' },
        { id: 5, nombre: 'Gaseosas', categoria: 'Bebidas', precio: 7.00, vence: '18/09/2025' },
        { id: 6, nombre: 'Gaseosa Oro 3 Litros', categoria: 'Bebidas', precio: 9.50, vence: '18/09/2025' },
        { id: 7, nombre: 'Gaseosa Inka Kola 1 Litro', categoria: 'Bebidas', precio: 0.80, vence: '18/09/2025' },
        { id: 8, nombre: 'Volt', categoria: 'Bebidas', precio: 0.70, vence: '18/09/2025' },
        { id: 9, nombre: 'Pan Bimbo', categoria: 'Alimentos',  precio: 1.20, vence: '18/09/2025' },
        { id: 10, nombre: 'Mantequilla', categoria: 'Alimentos', precio: 2.50, vence: '18/09/2025' },
        { id: 11, nombre: 'Queso Edam', categoria: 'Alimentos', precio: 5.00, vence: '18/09/2025' },
        { id: 12, nombre: 'Yogurt', categoria: 'Bebidas', precio: 0.60, vence: '18/09/2025' },
        // ... más productos
    ];

    // Función para mostrar los resultados de la búsqueda
    function displaySearchResults(results) {
        searchResultsDiv.innerHTML = '';
        if (results.length > 0) {
            results.forEach(product => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('search-result-item');
                resultItem.textContent = product.nombre;
                resultItem.addEventListener('click', () => {
                    addProductToCart(product);
                    productSearchInput.value = '';
                    searchResultsDiv.innerHTML = '';
                });
                searchResultsDiv.appendChild(resultItem);
            });
            searchResultsDiv.style.display = 'block';
        } else {
            searchResultsDiv.style.display = 'none';
        }
    }

    // Evento al escribir en la barra de búsqueda
    productSearchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const results = products.filter(product =>
            product.nombre.toLowerCase().includes(searchTerm)
        );
        displaySearchResults(results);
    });

    // Función para agregar un producto al carrito
    function addProductToCart(product) {
        productCounter++;
        const newRow = salesTableBody.insertRow();
        newRow.dataset.productId = product.id;
        newRow.innerHTML = `
            <td>${productCounter}</td>
            <td>${product.nombre}</td>
            <td>${product.categoria || '--'}</td>
            <td><input type="number" class="item-quantity" value="1" min="1"></td>
            <td class="item-price">${product.precio.toFixed(2)}</td>
            <td><input type="number" class="item-discount" value="0.00" min="0"></td>
            <td class="item-importe">${product.precio.toFixed(2)}</td>
            <td>${product.vence || '--'}</td>
            <td><button class="remove-item-button"><img src="icons/remove.png" alt="Quitar"></button></td>
        `;
        cartItems.push({ productId: product.id, quantity: 1, price: product.precio, discount: 0 });
        updateCartCalculations();
        salesFinalActions.style.display = 'flex'; // Mostrar botones cobrar y cancelar
        productSearchInput.focus(); // Mantener el foco en la búsqueda
        attachRowEventListeners(newRow);
    }

    function attachRowEventListeners(row) {
        const quantityInput = row.querySelector('.item-quantity');
        const discountInput = row.querySelector('.item-discount');
        const removeButton = row.querySelector('.remove-item-button');

        quantityInput.addEventListener('change', () => updateItem(row));
        discountInput.addEventListener('change', () => updateItem(row));
        removeButton.addEventListener('click', () => removeItem(row));
    }

    function updateItem(row) {
        const productId = parseInt(row.dataset.productId);
        const quantity = parseInt(row.querySelector('.item-quantity').value);
        const price = parseFloat(row.querySelector('.item-price').textContent);
        const discount = parseFloat(row.querySelector('.item-discount').value);
        const importe = (quantity * price * (1 - discount / 100)).toFixed(2);
        row.querySelector('.item-importe').textContent = importe;

        const cartItem = cartItems.find(item => item.productId === productId);
        if (cartItem) {
            cartItem.quantity = quantity;
            cartItem.discount = discount;
        }
        updateCartCalculations();
    }

    function removeItem(row) {
        const productId = parseInt(row.dataset.productId);
        const index = cartItems.findIndex(item => item.productId === productId);
        if (index > -1) {
            cartItems.splice(index, 1);
        }
        salesTableBody.removeChild(row);
        productCounter--;
        updateCounter();
        updateCartCalculations();
        if (cartItems.length === 0) {
            salesFinalActions.style.display = 'none'; // Ocultar botones si no hay productos
        }
    }

    function updateCounter() {
        salesTableBody.querySelectorAll('tr').forEach((row, index) => {
            row.querySelector('td:first-child').textContent = index + 1;
        });
    }

    function updateCartCalculations() {
        let suma = 0;
        let descuentoTotal = 0;
        cartItems.forEach(item => {
            suma += item.quantity * item.price;
            descuentoTotal += (item.quantity * item.price) * (item.discount / 100);
        });
        const igv = suma * 0.18; // Ejemplo de IGV del 18%
        const subtotal = suma - descuentoTotal;
        const totalFinal = subtotal * 1.18;

        document.getElementById('suma').textContent = suma.toFixed(2);
        document.getElementById('igv').textContent = igv.toFixed(2);
        document.getElementById('subtotal').textContent = subtotal.toFixed(2);
        document.getElementById('descuento-total').textContent = descuentoTotal.toFixed(2);
        document.getElementById('total-final').textContent = totalFinal.toFixed(2);
        document.querySelector('.total-amount').textContent = totalFinal.toFixed(2);
    }

    const cobrarButton = document.querySelector('.cobrar-button');
    const cobrarModal = document.getElementById('cobrar-modal');
    const cerrarCobrarModalButton = document.getElementById('cerrar-cobrar-modal');
    const efectivoRecibidoInput = document.getElementById('efectivo-recibido');
    const aPagarInput = document.getElementById('a-pagar');
    const cambioInput = document.getElementById('cambio');
    const totalFinalSpan = document.getElementById('total-final');
    const facturarImprimirButton = document.getElementById('facturar-imprimir');

    // Abrir la modal de Cobrar
    if (cobrarButton) {
        cobrarButton.addEventListener('click', function() {
            const totalAPagar = parseFloat(totalFinalSpan.textContent);
            aPagarInput.value = totalAPagar.toFixed(2);
            efectivoRecibidoInput.value = totalAPagar.toFixed(2); // Establecer valor inicial
            calcularCambio(); // Calcular el cambio inicial
            cobrarModal.style.display = 'flex';
        });
    }

    // Cerrar la modal de Cobrar
    if (cerrarCobrarModalButton) {
        cerrarCobrarModalButton.addEventListener('click', function() {
            cobrarModal.style.display = 'none';
        });
    }

    // Calcular el cambio al ingresar el efectivo recibido
    if (efectivoRecibidoInput) {
        efectivoRecibidoInput.addEventListener('input', calcularCambio);
    }

    // Función para calcular el cambio
    function calcularCambio() {
        const aPagar = parseFloat(aPagarInput.value) || 0;
        const efectivoRecibido = parseFloat(efectivoRecibidoInput.value) || 0;
        const cambio = efectivoRecibido - aPagar;
        cambioInput.value = cambio.toFixed(2);
    }

    // Cerrar la modal si se hace clic fuera de ella
    window.addEventListener('click', function(event) {
        if (event.target === cobrarModal) {
            cobrarModal.style.display = 'none';
        }
    });

    // Acción al hacer clic en "Facturar e Imprimir" para mostrar el voucher en una ventana emergente
    if (facturarImprimirButton) {
        facturarImprimirButton.addEventListener('click', function() {
            const tipoComprobante = document.getElementById('comprobante').value;
            const totalAPagar = document.getElementById('a-pagar').value;
            const efectivoRecibido = document.getElementById('efectivo-recibido').value;
            const cambio = document.getElementById('cambio').value;
            const productosEnCarrito = cartItems.map(item => {
                const producto = products.find(p => p.id === item.productId);
                return `${producto ? producto.nombre : 'Producto Desconocido'} (${item.quantity} x S/.${item.price.toFixed(2)}) - S/.${(item.quantity * item.price * (1 - item.discount / 100)).toFixed(2)}`;
            }).join('\n');

            const mensajeVoucher = `
====================
    Cruz de Chalpón
====================
Tipo de Comprobante: ${tipoComprobante.toUpperCase()}
Fecha: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
--------------------
Productos:
${productosEnCarrito}
--------------------
SUBTOTAL: S/. ${document.getElementById('subtotal').textContent}
DESCUENTO: S/. ${document.getElementById('descuento-total').textContent}
IGV: S/. ${document.getElementById('igv').textContent}
TOTAL A PAGAR: S/. ${totalAPagar}
EFECTIVO RECIBIDO: S/. ${efectivoRecibido}
CAMBIO: S/. ${cambio}
====================
¡Gracias por su compra!
`;

            const ventanaImpresion = window.open('', '_blank');
            if (ventanaImpresion) {
                ventanaImpresion.document.write(`<pre>${mensajeVoucher}</pre>`);
                ventanaImpresion.document.close();
                ventanaImpresion.print();
                // Opcional: Cerrar la ventana de impresión después de un breve tiempo
                // setTimeout(() => {
                //     ventanaImpresion.close();
                // }, 1000);
                cobrarModal.style.display = 'none';
                // Opcional: Limpiar el carrito o redirigir a una nueva venta
            } else {
                alert('No se pudo abrir la ventana de impresión.');
            }
        });
    }

    const cancelarVentaButton = document.querySelector('.cancel-sale-button');

    // Acción al hacer clic en "Cancelar"
    if (cancelarVentaButton) {
        cancelarVentaButton.addEventListener('click', function() {
            // Limpiar el carrito de compras
            cartItems = [];

            // Limpiar la tabla de productos
            salesTableBody.innerHTML = '';
            productCounter = 0;
            updateCounter(); // Asegurarse de que el contador esté en 0 (aunque la tabla esté vacía)

            // Resetear los cálculos del total
            document.getElementById('suma').textContent = '0.00';
            document.getElementById('igv').textContent = '0.00';
            document.getElementById('subtotal').textContent = '0.00';
            document.getElementById('descuento-total').textContent = '0.00';
            document.getElementById('total-final').textContent = '0.00';
            document.querySelector('.total-amount').textContent = '0.00';

            // Ocultar la sección de acciones finales (Cobrar y Cancelar)
            salesFinalActions.style.display = 'none';

            // Opcional: Limpiar la barra de búsqueda
            document.getElementById('product-search').value = '';
            document.getElementById('search-results').style.display = 'none';

            // Opcional: Cerrar la modal de cobro si está abierta
            const cobrarModal = document.getElementById('cobrar-modal');
            if (cobrarModal && cobrarModal.style.display === 'flex') {
                cobrarModal.style.display = 'none';
            }
        });
    }
});