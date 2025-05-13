document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const fechaInicioInput = document.getElementById('fecha-inicio');
    const fechaFinInput = document.getElementById('fecha-fin');
    const buscarProductoInput = document.getElementById('buscar-producto');
    const agregarProductoBtn = document.getElementById('agregar-producto-btn');
    const agregarEditarModal = document.getElementById('agregar-editar-modal');
    const modalTitulo = document.getElementById('modal-titulo');
    const cerrarModalBtn = document.getElementById('cerrar-modal');
    const productoForm = document.getElementById('producto-form');
    const productoIdInput = document.getElementById('producto-id');
    const nombreInput = document.getElementById('nombre');
    const cantidadInput = document.getElementById('cantidad');
    const presentacionInput = document.getElementById('presentacion');
    const vencimientoInput = document.getElementById('vencimiento');
    const estadoSelect = document.getElementById('estado');
    const almacenTableBody = document.getElementById('almacen-table-body');
    const detalleModal = document.getElementById('detalle-modal');
    const cerrarDetalleModalBtn = document.getElementById('cerrar-detalle-modal');
    const detalleNombreSpan = document.getElementById('detalle-nombre');
    const detalleCantidadSpan = document.getElementById('detalle-cantidad');
    const detallePresentacionSpan = document.getElementById('detalle-presentacion');
    const detalleVencimientoSpan = document.getElementById('detalle-vencimiento');
    const detalleEstadoSpan = document.getElementById('detalle-estado');
    const imprimirReporteBtn = document.getElementById('imprimir-reporte');

    // Inicialización de Flatpickr para los selectores de fecha
    flatpickr(fechaInicioInput);
    flatpickr(fechaFinInput);
    flatpickr(vencimientoInput);

    // Datos de ejemplo del almacén
    let almacenData = [
        { id: 1, nombre: 'Galleta Oreo', cantidad: 10, presentacion: 'UND', vencimiento: '2025-11-28', estado: 'Vigente' },
        { id: 2, nombre: 'Fideos Sayon', cantidad: 40, presentacion: 'PAQ', vencimiento: '2025-08-11', estado: 'Cant. Agotada' },
        { id: 3, nombre: 'Leche Gloria', cantidad: 20, presentacion: 'LT', vencimiento: '2025-12-10', estado: 'Vigente' },
        { id: 4, nombre: 'Casinos', cantidad: 10, presentacion: 'PAQ', vencimiento: '2025-05-18', estado: 'Vigente' },
        { id: 5, nombre: 'Gomitas', cantidad: 10, presentacion: 'BOL', vencimiento: '2025-06-20', estado: 'Cant. Agotada' },
        { id: 6, nombre: 'Gaseosa Oro 3 Litros', cantidad: 20, presentacion: 'UND', vencimiento: '2026-07-03', estado: 'Vigente' },
        { id: 7, nombre: 'Gaseosa Inka Kola 1 Litro', cantidad: 20, presentacion: 'UND', vencimiento: '2026-02-06', estado: 'Vigente' },
        { id: 8, nombre: 'Volt', cantidad: 10, presentacion: 'UND', vencimiento: '2026-01-06', estado: 'Vigente' },
    ];

    let editingItemId = null;

    // Función para renderizar la tabla del almacén
    function renderAlmacen() {
        almacenTableBody.innerHTML = '';
        almacenData.forEach(item => {
            const row = almacenTableBody.insertRow();
            row.insertCell().textContent = item.id;
            row.insertCell().textContent = item.nombre;
            row.insertCell().textContent = item.cantidad;
            row.insertCell().textContent = item.presentacion;
            row.insertCell().textContent = item.vencimiento || '-';
            const estadoCell = row.insertCell();
            estadoCell.textContent = item.estado;
            estadoCell.classList.add('estado-label', item.estado.replace(/\s+/g, ''));

            const opcionesCell = row.insertCell();
            opcionesCell.classList.add('opciones');

            const editButton = document.createElement('i');
            editButton.classList.add('fa-solid', 'fa-pencil');
            editButton.style.cursor = 'pointer';
            editButton.addEventListener('click', () => openEditModal(item.id));
            opcionesCell.appendChild(editButton);

            const viewButton = document.createElement('i');
            viewButton.classList.add('fa-solid', 'fa-eye');
            viewButton.style.cursor = 'pointer';
            viewButton.style.marginLeft = '8px';
            viewButton.addEventListener('click', () => openDetalleModal(item.id));
            opcionesCell.appendChild(viewButton);

            const deleteButton = document.createElement('i');
            deleteButton.classList.add('fa-solid', 'fa-trash');
            deleteButton.style.cursor = 'pointer';
            deleteButton.style.marginLeft = '8px';
            deleteButton.addEventListener('click', () => deleteItem(item.id));
            opcionesCell.appendChild(deleteButton);
        });
    }

    // Mostrar tabla al inicio
    renderAlmacen();

    // Función para abrir el modal de agregar
    agregarProductoBtn.addEventListener('click', () => {
        modalTitulo.textContent = 'Agregar Producto';
        editingItemId = null;
        productoForm.reset();
        agregarEditarModal.style.display = 'block';
    });

    // Función para abrir el modal de editar
    function openEditModal(id) {
        modalTitulo.textContent = 'Editar Producto';
        editingItemId = id;
        const item = almacenData.find(item => item.id === id);
        if (item) {
            productoIdInput.value = item.id;
            nombreInput.value = item.nombre;
            cantidadInput.value = item.cantidad;
            presentacionInput.value = item.presentacion;
            vencimientoInput.value = item.vencimiento || '';
            estadoSelect.value = item.estado;
            agregarEditarModal.style.display = 'block';
        }
    }

    // Cerrar modal agregar/editar
    cerrarModalBtn.addEventListener('click', () => {
        agregarEditarModal.style.display = 'none';
    });

    // Guardar producto
    productoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newItem = {
            nombre: nombreInput.value,
            cantidad: parseInt(cantidadInput.value),
            presentacion: presentacionInput.value,
            vencimiento: vencimientoInput.value || null,
            estado: estadoSelect.value
        };

        if (editingItemId) {
            const index = almacenData.findIndex(item => item.id === editingItemId);
            if (index !== -1) {
                almacenData[index] = { id: editingItemId, ...newItem };
            }
        } else {
            const newId = almacenData.length > 0 ? Math.max(...almacenData.map(item => item.id)) + 1 : 1;
            almacenData.push({ id: newId, ...newItem });
        }

        renderAlmacen();
        agregarEditarModal.style.display = 'none';
        editingItemId = null;
    });

    // Detalles del producto
    function openDetalleModal(id) {
        const item = almacenData.find(item => item.id === id);
        if (item) {
            detalleNombreSpan.textContent = item.nombre;
            detalleCantidadSpan.textContent = item.cantidad;
            detallePresentacionSpan.textContent = item.presentacion;
            detalleVencimientoSpan.textContent = item.vencimiento || '-';
            detalleEstadoSpan.textContent = item.estado;
            detalleEstadoSpan.className = 'estado-label ' + item.estado.replace(/\s+/g, '');
            detalleModal.style.display = 'block';
        }
    }

    cerrarDetalleModalBtn.addEventListener('click', () => {
        detalleModal.style.display = 'none';
    });

    // Eliminar producto
    function deleteItem(id) {
        if (confirm('¿Estás seguro de que quieres eliminar este producto del almacén?')) {
            almacenData = almacenData.filter(item => item.id !== id);
            renderAlmacen();
        }
    }

    // Filtro por fechas
    function filterByDate() {
        const fechaInicio = fechaInicioInput.value ? new Date(fechaInicioInput.value) : null;
        const fechaFin = fechaFinInput.value ? new Date(fechaFinInput.value) : null;

        if (!fechaInicio && !fechaFin) {
            renderAlmacen();
            return;
        }

        const filteredData = almacenData.filter(item => {
            if (item.vencimiento) {
                const fechaVencimiento = new Date(item.vencimiento);
                const cumpleInicio = !fechaInicio || fechaVencimiento >= fechaInicio;
                const cumpleFin = !fechaFin || fechaVencimiento <= fechaFin;
                return cumpleInicio && cumpleFin;
            }
            return false;
        });

        renderFilteredAlmacen(filteredData);
    }

    fechaInicioInput.addEventListener('change', filterByDate);
    fechaFinInput.addEventListener('change', filterByDate);

    // Búsqueda de productos
    buscarProductoInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const filteredData = almacenData.filter(item =>
            item.nombre.toLowerCase().includes(searchTerm)
        );
        renderFilteredAlmacen(filteredData);
    });

    // Renderizar tabla filtrada
    function renderFilteredAlmacen(data) {
        almacenTableBody.innerHTML = '';
        data.forEach(item => {
            const row = almacenTableBody.insertRow();
            row.insertCell().textContent = item.id;
            row.insertCell().textContent = item.nombre;
            row.insertCell().textContent = item.cantidad;
            row.insertCell().textContent = item.presentacion;
            row.insertCell().textContent = item.vencimiento || '-';
            const estadoCell = row.insertCell();
            estadoCell.textContent = item.estado;
            estadoCell.classList.add('estado-label', item.estado.replace(/\s+/g, ''));

            const opcionesCell = row.insertCell();
            opcionesCell.classList.add('opciones');

            const editButton = document.createElement('i');
            editButton.classList.add('fa-solid', 'fa-pencil');
            editButton.style.cursor = 'pointer';
            editButton.addEventListener('click', () => openEditModal(item.id));
            opcionesCell.appendChild(editButton);

            const viewButton = document.createElement('i');
            viewButton.classList.add('fa-solid', 'fa-eye');
            viewButton.style.cursor = 'pointer';
            viewButton.style.marginLeft = '8px';
            viewButton.addEventListener('click', () => openDetalleModal(item.id));
            opcionesCell.appendChild(viewButton);

            const deleteButton = document.createElement('i');
            deleteButton.classList.add('fa-solid', 'fa-trash');
            deleteButton.style.cursor = 'pointer';
            deleteButton.style.marginLeft = '8px';
            deleteButton.addEventListener('click', () => deleteItem(item.id));
            opcionesCell.appendChild(deleteButton);
        });
    }
});
