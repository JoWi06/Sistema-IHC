document.addEventListener('DOMContentLoaded', function() {
    const logoToggle = document.getElementById('logo-toggle');
    const sidebar = document.querySelector('.sidebar');
    const userToggle = document.getElementById('user-toggle');
    const userDropdownMenu = document.getElementById('user-dropdown-menu');

    // Minimizar/Maximizar sidebar al hacer clic en el logo
    if (logoToggle && sidebar) {
        logoToggle.addEventListener('click', function() {
            sidebar.classList.toggle('minimized');
        });
    }

    // Mostrar/Ocultar dropdown de usuario
    if (userToggle && userDropdownMenu) {
        userToggle.addEventListener('click', function() {
            userDropdownMenu.style.display = (userDropdownMenu.style.display === 'block' || userDropdownMenu.style.display === '') ? 'none' : 'block';
        });

        // Cierra el dropdown si se hace clic fuera de él
        document.addEventListener('click', function(event) {
            if (!userToggle.contains(event.target) && !userDropdownMenu.contains(event.target)) {
                userDropdownMenu.style.display = 'none';
            }
        });
    }

    const addUserButton = document.querySelector('.add-user-button');
    const addUserModal = document.getElementById('add-user-modal');
    const closeAddModalButton = document.getElementById('close-add-modal');
    const addUserForm = document.getElementById('add-user-form');
    const userTableBody = document.getElementById('user-table-body');
    const editUserModal = document.getElementById('edit-user-modal');
    const closeEditModalButton = document.getElementById('close-edit-modal');
    const editUserForm = document.getElementById('edit-user-form');
    const viewUserModal = document.getElementById('view-user-modal');
    const closeViewModalButton = document.getElementById('close-view-modal');
    const viewUserDetails = document.getElementById('view-user-details');

    let usersData = []; // Aquí almacenarías los datos de los usuarios (simulado)
    let nextUserId = 7; // Para simular IDs únicos, empezando después de los datos simulados

    // Simulación de datos de usuarios (reemplazar con llamada a backend)
    function fetchUsers() {
        usersData = [
            { id: 1, nombres: 'Ana', apellidos: 'Torres Montalvo', usuario: 'atorresm', contrasena: '******', roles: 'Gerente General' },
            { id: 2, nombres: 'Marianela', apellidos: 'Frías Torres', usuario: 'mfrías', contrasena: '******', roles: 'Administrador' },
            { id: 3, nombres: 'Hillary', apellidos: 'Cajo Manayalle', usuario: 'mcajom', contrasena: '******', roles: 'Vendedor' },
            { id: 4, nombres: 'Carlos', apellidos: 'Frías Torres', usuario: 'cfríast', contrasena: '******', roles: 'Almacenero' },
            { id: 5, nombres: 'Admin', apellidos: 'SuperAdmin', usuario: 'AdminS', contrasena: '******', roles: 'Administrador' },
            { id: 6, nombres: 'Soporte', apellidos: 'SoporteAdmin', usuario: 'Soporte1', contrasena: '******', roles: 'Soporte Sistema' }
        ];
        renderUserTable();
    }

    function renderUserTable() {
        userTableBody.innerHTML = '';
        usersData.forEach(user => {
            const row = userTableBody.insertRow();
            row.innerHTML = `
                <td>${user.nombres}</td>
                <td>${user.apellidos}</td>
                <td>${user.usuario}</td>
                <td>••••••</td>
                <td>${user.roles}</td>
                <td class="opciones">
                    <i class="fa-solid fa-pencil action-icon edit-button" style="cursor: pointer;" data-id="${user.id}"></i>
                    <i class="fa-solid fa-eye action-icon view-button" style="cursor: pointer; margin-left: 8px;" data-id="${user.id}"></i>
                    <i class="fa-solid fa-trash action-icon delete-button" style="cursor: pointer; margin-left: 8px;" data-id="${user.id}"></i>
                </td>
            `;
        });

        // Agregar event listeners a los botones después de renderizar la tabla
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', openEditModal);
        });
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', deleteUser);
        });
        document.querySelectorAll('.view-button').forEach(button => {
            button.addEventListener('click', openViewModal);
        });
    }

    // Abrir modal de Crear Usuario
    if (addUserButton) {
        addUserButton.addEventListener('click', () => {
            addUserModal.style.display = 'flex';
        });
    }

    // Cerrar modal de Crear Usuario
    if (closeAddModalButton) {
        closeAddModalButton.addEventListener('click', () => {
            addUserModal.style.display = 'none';
            addUserForm.reset();
        });
    }

    // Guardar nuevo usuario (simulado - enviar al backend en realidad)
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const nombres = document.getElementById('nombres').value;
            const apellidos = document.getElementById('apellidos').value;
            const usuario = document.getElementById('usuario').value;
            const contrasena = document.getElementById('contrasena').value;
            const roles = document.getElementById('roles').value;

            const newUser = {
                id: nextUserId++,
                nombres: nombres,
                apellidos: apellidos,
                usuario: usuario,
                contrasena: '******', // No guardar la contraseña real en el frontend
                roles: roles
            };
            usersData.push(newUser);
            renderUserTable();
            addUserModal.style.display = 'none';
            addUserForm.reset();
            alert('Usuario creado exitosamente (simulado)');
            // Aquí deberías enviar los datos al backend para guardar en la base de datos
        });
    }

    let currentEditingUser = null;

    // Abrir modal de Editar Usuario
    function openEditModal(event) {
        const userId = parseInt(event.target.closest('.action-icon').dataset.id);
        currentEditingUser = usersData.find(user => user.id === userId);
        if (currentEditingUser) {
            document.getElementById('edit-user-id').value = currentEditingUser.id;
            document.getElementById('edit-nombres').value = currentEditingUser.nombres;
            document.getElementById('edit-apellidos').value = currentEditingUser.apellidos;
            document.getElementById('edit-usuario').value = currentEditingUser.usuario;
            document.getElementById('edit-roles').value = currentEditingUser.roles;
            editUserModal.style.display = 'flex';
        }
    }

    // Cerrar modal de Editar Usuario
    if (closeEditModalButton) {
        closeEditModalButton.addEventListener('click', () => {
            editUserModal.style.display = 'none';
            editUserForm.reset();
            currentEditingUser = null;
        });
    }

    // Guardar cambios del usuario (simulado - enviar al backend en realidad)
    if (editUserForm) {
        editUserForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (!currentEditingUser) return;

            currentEditingUser.nombres = document.getElementById('edit-nombres').value;
            currentEditingUser.apellidos = document.getElementById('edit-apellidos').value;
            currentEditingUser.usuario = document.getElementById('edit-usuario').value;
            const newPassword = document.getElementById('edit-contrasena').value;
            if (newPassword) {
                currentEditingUser.contrasena = '******'; // Simular actualización de contraseña
                // Enviar la nueva contraseña al backend para ser hasheada y guardada
            }
            currentEditingUser.roles = document.getElementById('edit-roles').value;

            renderUserTable();
            editUserModal.style.display = 'none';
            editUserForm.reset();
            currentEditingUser = null;
            alert('Usuario actualizado exitosamente (simulado)');
            // Aquí deberías enviar los datos actualizados al backend
        });
    }

    // Eliminar usuario (simulado - enviar al backend en realidad)
    function deleteUser(event) {
        const userIdToDelete = parseInt(event.target.closest('.action-icon').dataset.id);
        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            usersData = usersData.filter(user => user.id !== userIdToDelete);
            renderUserTable();
            alert('Usuario eliminado exitosamente (simulado)');
            // Aquí deberías enviar la solicitud al backend para eliminar el usuario
        }
    }

    // Abrir modal de Ver Usuario
    function openViewModal(event) {
        const userId = parseInt(event.target.closest('.action-icon').dataset.id);
        const userToView = usersData.find(user => user.id === userId);
        if (userToView) {
            document.getElementById('view-id').textContent = userToView.id;
            document.getElementById('view-nombres').textContent = userToView.nombres;
            document.getElementById('view-apellidos').textContent = userToView.apellidos;
            document.getElementById('view-usuario').textContent = userToView.usuario;
            document.getElementById('view-roles').textContent = userToView.roles;
            viewUserModal.style.display = 'flex';
        }
    }

    // Cerrar modal de Ver Usuario
    if (closeViewModalButton) {
        closeViewModalButton.addEventListener('click', () => {
            viewUserModal.style.display = 'none';
        });
    }

    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === addUserModal) {
            addUserModal.style.display = 'none';
            addUserForm.reset();
        }
        if (event.target === editUserModal) {
            editUserModal.style.display = 'none';
            editUserForm.reset();
            currentEditingUser = null;
        }
        if (event.target === viewUserModal) {
            viewUserModal.style.display = 'none';
        }
    });

    (function(d){
        var s = d.createElement("script");
        s.setAttribute("data-account", "abc1234567890"); // ← tu ID real aquí
        s.setAttribute("src", "https://cdn.userway.org/widget.js");
        (d.body || d.head).appendChild(s);
    })(document);

    // Inicializar la tabla de usuarios
    fetchUsers();
});