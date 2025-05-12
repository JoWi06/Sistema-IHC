document.addEventListener('DOMContentLoaded', function() {
    const agregarProveedorBtn = document.getElementById('agregar-proveedor-btn');
    const agregarEditarModal = document.getElementById('agregar-editar-modal');
    const modalTitulo = document.getElementById('modal-titulo');
    const cerrarModalBtn = document.getElementById('cerrar-modal');
    const proveedorForm = document.getElementById('proveedor-form');
    const proveedorIdInput = document.getElementById('proveedor-id');
    const nombreInput = document.getElementById('nombre');
    const contactoInput = document.getElementById('contacto');
    const telefonoInput = document.getElementById('telefono');
    const emailInput = document.getElementById('email');
    const proveedoresTableBody = document.getElementById('proveedores-table-body');

    let proveedoresData = [
        { id: 1, nombre: 'Proveedor A', contacto: 'Juan Pérez', telefono: '987654321', email: 'juan@proveedora.com' },
        { id: 2, nombre: 'Proveedor B', contacto: 'Ana López', telefono: '912345678', email: 'ana@proveedorb.com' }
    ];

    let editingProveedorId = null;

    function renderProveedores() {
        proveedoresTableBody.innerHTML = '';
        proveedoresData.forEach(proveedor => {
            const row = proveedoresTableBody.insertRow();
            row.insertCell().textContent = proveedor.id;
            row.insertCell().textContent = proveedor.nombre;
            row.insertCell().textContent = proveedor.contacto || '-';
            row.insertCell().textContent = proveedor.telefono || '-';
            row.insertCell().textContent = proveedor.email || '-';

            const opcionesCell = row.insertCell();
            opcionesCell.classList.add('opciones');

            const editButton = document.createElement('i');
            editButton.classList.add('fa-solid', 'fa-pencil');
            editButton.style.cursor = 'pointer';
            editButton.addEventListener('click', () => openEditModal(proveedor.id));
            opcionesCell.appendChild(editButton);

            const deleteButton = document.createElement('i');
            deleteButton.classList.add('fa-solid', 'fa-trash');
            deleteButton.style.cursor = 'pointer';
            deleteButton.style.marginLeft = '8px';
            deleteButton.addEventListener('click', () => deleteProveedor(proveedor.id));
            opcionesCell.appendChild(deleteButton);
        });
    }

    agregarProveedorBtn.addEventListener('click', () => {
        modalTitulo.textContent = 'Agregar Proveedor';
        editingProveedorId = null;
        proveedorForm.reset();
        agregarEditarModal.style.display = 'block';
    });

    cerrarModalBtn.addEventListener('click', () => {
        agregarEditarModal.style.display = 'none';
    });

    function openEditModal(id) {
        modalTitulo.textContent = 'Editar Proveedor';
        editingProveedorId = id;
        const proveedor = proveedoresData.find(p => p.id === id);
        if (proveedor) {
            proveedorIdInput.value = proveedor.id;
            nombreInput.value = proveedor.nombre;
            contactoInput.value = proveedor.contacto || '';
            telefonoInput.value = proveedor.telefono || '';
            emailInput.value = proveedor.email || '';
            agregarEditarModal.style.display = 'block';
        }
    }

    proveedorForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newProveedor = {
            nombre: nombreInput.value,
            contacto: contactoInput.value,
            telefono: telefonoInput.value,
            email: emailInput.value
        };

        if (editingProveedorId) {
            const index = proveedoresData.findIndex(p => p.id === editingProveedorId);
            if (index !== -1) {
                proveedoresData[index] = { id: editingProveedorId, ...newProveedor };
            }
        } else {
            const newId = proveedoresData.length > 0 ? Math.max(...proveedoresData.map(p => p.id)) + 1 : 1;
            proveedoresData.push({ id: newId, ...newProveedor });
        }

        renderProveedores();
        agregarEditarModal.style.display = 'none';
        editingProveedorId = null;
    });

    function deleteProveedor(id) {
        if (confirm('¿Estás seguro de que quieres eliminar este proveedor?')) {
            proveedoresData = proveedoresData.filter(p => p.id !== id);
            renderProveedores();
        }
    }

    renderProveedores();
});