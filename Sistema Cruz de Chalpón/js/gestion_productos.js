document.addEventListener('DOMContentLoaded', function() {
    const agregarProductoBtn = document.getElementById('agregar-producto-btn');
    const productoModal = document.getElementById('producto-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const productoForm = document.getElementById('producto-form');
    const productoIdInput = document.getElementById('producto-id');
    const productoNombreInput = document.getElementById('producto-nombre');
    const productoStockInput = document.getElementById('producto-stock');
    const productoPrecioCompraInput = document.getElementById('producto-precio-compra');
    const productoPrecioVentaInput = document.getElementById('producto-precio-venta');
    const productoStockMinimoInput = document.getElementById('producto-stock-minimo');
    const productosTableBody = document.getElementById('productos-table-body');
    const searchInput = document.getElementById('search-input');
    const itemsPerPageSelect = document.getElementById('items-per-page');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const currentPageSpan = document.getElementById('current-page');
    const verProductoModal = document.getElementById('ver-producto-modal');
    const closeVerModalBtn = document.getElementById('close-ver-modal');
    const verProductoNombreSpan = document.getElementById('ver-producto-nombre');
    const verProductoStockSpan = document.getElementById('ver-producto-stock');
    const verProductoPrecioCompraSpan = document.getElementById('ver-producto-precio-compra');
    const verProductoPrecioVentaSpan = document.getElementById('ver-producto-precio-venta');
    const verProductoStockMinimoSpan = document.getElementById('ver-producto-stock-minimo');

    let productosData = [
        { id: 1, nombre: 'Galleta Oreo', stockMinimo: 10, stock: 5, precioCompra: 0.50, precioVenta: 1.00 },
        { id: 2, nombre: 'Fideos Sayon', stockMinimo: 40, stock: 250, precioCompra: 1.50, precioVenta: 2.50 },
        { id: 3, nombre: 'Leche Gloria', stockMinimo: 20, stock: 15, precioCompra: 4.50, precioVenta: 6.00 },
        { id: 4, nombre: 'Casinos', stockMinimo: 10, stock: 120, precioCompra: 0.70, precioVenta: 1.50 },
        { id: 5, nombre: 'Gaseosas', stockMinimo: 10, stock: 0, precioCompra: 7.00, precioVenta: 10.00 },
        { id: 6, nombre: 'Gaseosa Oro 3 Litros', stockMinimo: 20, stock: 250, precioCompra: 9.50, precioVenta: 12.50 },
        { id: 7, nombre: 'Gaseosa Inka Kola 1 Litro', stockMinimo: 20, stock: 100, precioCompra: 0.80, precioVenta: 1.50 },
        { id: 8, nombre: 'Volt', stockMinimo: 10, stock: 120, precioCompra: 0.70, precioVenta: 1.50 },
        { id: 9, nombre: 'Pan Bimbo', stockMinimo: 30, stock: 80, precioCompra: 1.20, precioVenta: 2.00 },
        { id: 10, nombre: 'Mantequilla', stockMinimo: 15, stock: 5, precioCompra: 2.50, precioVenta: 3.50 },
        { id: 11, nombre: 'Queso Edam', stockMinimo: 10, stock: 30, precioCompra: 5.00, precioVenta: 7.00 },
        { id: 12, nombre: 'Yogurt', stockMinimo: 50, stock: 20, precioCompra: 0.60, precioVenta: 1.00 },
    ];

    let editingProductId = null;
    let currentPage = 1;
    let itemsPerPage = parseInt(itemsPerPageSelect.value);
    let filteredProductos = [...productosData];

    function renderStock(stock, stockMinimo) {
        if (stock === 0) {
            return '<span class="stock-label agotado">Agotado</span>';
        } else if (stock <= stockMinimo) {
            return '<span class="stock-label en-minimo">En mínimo</span>';
        } else if (stock <= (stockMinimo * 1.5)) {
            return '<span class="stock-label por-agotado">Por Agotado</span>';
        } else {
            return stock;
        }
    }

    function renderProductos() {
        productosTableBody.innerHTML = '';
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentProductos = filteredProductos.slice(startIndex, endIndex);

        currentProductos.forEach(producto => {
            const row = productosTableBody.insertRow();
            row.insertCell().textContent = producto.id;
            row.insertCell().textContent = producto.nombre;
            row.insertCell().textContent = producto.stockMinimo.toFixed(2);
            row.insertCell().innerHTML = renderStock(producto.stock, producto.stockMinimo);
            row.insertCell().textContent = producto.precioCompra.toFixed(2);
            row.insertCell().textContent = producto.precioVenta.toFixed(2);

            const opcionesCell = row.insertCell();
            const editButton = document.createElement('i');
            editButton.classList.add('fa-solid', 'fa-pencil');
            editButton.style.cursor = 'pointer';
            editButton.addEventListener('click', () => openEditModal(producto.id));
            opcionesCell.appendChild(editButton);

            const viewButton = document.createElement('i');
            viewButton.classList.add('fa-solid', 'fa-eye');
            viewButton.style.cursor = 'pointer';
            viewButton.style.marginLeft = '8px';
            viewButton.addEventListener('click', () => openViewModal(producto.id));
            opcionesCell.appendChild(viewButton);
        });

        renderPagination();
    }

    function renderPagination() {
        const totalPages = Math.ceil(filteredProductos.length / itemsPerPage);
        currentPageSpan.textContent = currentPage;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    }

    function openModal() {
        productoModal.style.display = 'block';
        productoForm.reset();
        productoIdInput.value = '';
        editingProductId = null;
        document.querySelector('.modal-content h2').textContent = 'Agregar Producto';
    }

    function openEditModal(id) {
        const producto = productosData.find(p => p.id === id);
        if (producto) {
            productoModal.style.display = 'block';
            document.querySelector('.modal-content h2').textContent = 'Editar Producto';
            productoIdInput.value = producto.id;
            productoNombreInput.value = producto.nombre;
            productoStockInput.value = producto.stock;
            productoPrecioCompraInput.value = producto.precioCompra;
            productoPrecioVentaInput.value = producto.precioVenta;
            productoStockMinimoInput.value = producto.stockMinimo;
            editingProductId = id;
        }
    }

    function closeModal() {
        productoModal.style.display = 'none';
    }

    function openViewModal(id) {
        const producto = productosData.find(p => p.id === id);
        if (producto) {
            verProductoModal.style.display = 'block';
            verProductoNombreSpan.textContent = producto.nombre;
            verProductoStockSpan.innerHTML = renderStock(producto.stock, producto.stockMinimo);
            verProductoPrecioCompraSpan.textContent = producto.precioCompra.toFixed(2);
            verProductoPrecioVentaSpan.textContent = producto.precioVenta.toFixed(2);
            verProductoStockMinimoSpan.textContent = producto.stockMinimo.toFixed(2);
        }
    }

    function closeVerModal() {
        verProductoModal.style.display = 'none';
    }

    function guardarProducto(event) {
        event.preventDefault();
        const nombre = productoNombreInput.value;
        const stock = parseInt(productoStockInput.value);
        const precioCompra = parseFloat(productoPrecioCompraInput.value);
        const precioVenta = parseFloat(productoPrecioVentaInput.value);
        const stockMinimo = parseInt(productoStockMinimoInput.value);

        if (editingProductId) {
            const index = productosData.findIndex(p => p.id === editingProductId);
            if (index !== -1) {
                productosData[index] = { id: editingProductId, nombre, stock, precioCompra, precioVenta, stockMinimo };
            }
        } else {
            const newId = productosData.length > 0 ? Math.max(...productosData.map(p => p.id)) + 1 : 1;
            productosData.push({ id: newId, nombre, stock, precioCompra, precioVenta, stockMinimo });
        }

        filteredProductos = [...productosData];
        currentPage = 1;
        renderProductos();
        closeModal();
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filteredProductos = productosData.filter(producto =>
            producto.nombre.toLowerCase().includes(searchTerm)
        );
        currentPage = 1;
        renderProductos();
    });

    itemsPerPageSelect.addEventListener('change', function() {
        itemsPerPage = parseInt(this.value);
        currentPage = 1;
        renderProductos();
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProductos();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredProductos.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderProductos();
        }
    });

    agregarProductoBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    closeVerModalBtn.addEventListener('click', closeVerModal);
    productoForm.addEventListener('submit', guardarProducto);
    window.addEventListener('click', function(event) {
        if (event.target === productoModal) {
            closeModal();
        }
        if (event.target === verProductoModal) {
            closeVerModal();
        }
    });

    renderProductos();
});