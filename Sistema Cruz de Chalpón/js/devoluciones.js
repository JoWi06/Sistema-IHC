document.addEventListener('DOMContentLoaded', function() {
    const devolucionForm = document.getElementById('devolucion-form');
    const productoInput = document.getElementById('producto');
    const cantidadInput = document.getElementById('cantidad');
    const motivoInput = document.getElementById('motivo');
    const evidenciaInput = document.getElementById('evidencia');
    const devolucionesTableBody = document.getElementById('devoluciones-table-body');
    const noDevolucionesMessage = document.getElementById('no-devoluciones');

    let devolucionesRegistradas = [];
    let contadorDevoluciones = 1;

    function mostrarDevoluciones() {
        devolucionesTableBody.innerHTML = '';
        if (devolucionesRegistradas.length === 0) {
            noDevolucionesMessage.style.display = 'block';
        } else {
            noDevolucionesMessage.style.display = 'none';
            devolucionesRegistradas.forEach(devolucion => {
                const row = devolucionesTableBody.insertRow();
                row.insertCell().textContent = devolucion.id;
                row.insertCell().textContent = devolucion.producto;
                row.insertCell().textContent = devolucion.cantidad;
                row.insertCell().textContent = devolucion.motivo;
                const evidenciaCell = row.insertCell();
                if (devolucion.evidencia) {
                    const link = document.createElement('a');
                    link.href = devolucion.evidenciaURL; // En una implementación real, esto sería una URL
                    link.textContent = 'Ver Evidencia';
                    link.target = '_blank';
                    evidenciaCell.appendChild(link);
                    evidenciaCell.classList.add('evidencia-col');
                } else {
                    evidenciaCell.textContent = '-';
                }
                row.insertCell().textContent = devolucion.fechaRegistro;
            });
        }
    }

    devolucionForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const producto = productoInput.value.trim();
        const cantidad = parseInt(cantidadInput.value);
        const motivo = motivoInput.value.trim();
        const evidenciaFile = evidenciaInput.files[0];
        const fechaRegistro = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();

        if (producto && cantidad > 0 && motivo) {
            let evidenciaURL = null;
            if (evidenciaFile) {
                // En una implementación real, aquí se subiría el archivo y se obtendría una URL
                evidenciaURL = URL.createObjectURL(evidenciaFile); // Esto es solo temporal
            }

            const nuevaDevolucion = {
                id: contadorDevoluciones++,
                producto: producto,
                cantidad: cantidad,
                motivo: motivo,
                evidencia: evidenciaFile ? evidenciaFile.name : null,
                evidenciaURL: evidenciaURL,
                fechaRegistro: fechaRegistro
            };

            devolucionesRegistradas.push(nuevaDevolucion);
            mostrarDevoluciones();

            productoInput.value = '';
            cantidadInput.value = 1;
            motivoInput.value = '';
            evidenciaInput.value = ''; // Limpiar el campo de archivo
        } else {
            alert('Por favor, complete los campos obligatorios.');
        }
    });

    mostrarDevoluciones(); // Mostrar cualquier devolución inicial
});