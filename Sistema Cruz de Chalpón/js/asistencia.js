 document.addEventListener('DOMContentLoaded', function() {
            const markAssistanceButton = document.querySelector('.mark-assistance-button');
            const assistanceModal = document.getElementById('assistance-modal');
            const closeModalButton = document.getElementById('close-modal-button');
            const currentDateSpan = document.getElementById('current-date');
            const currentTimeSpan = document.getElementById('current-time');
            
            // Función para mostrar la ventana modal
            function showModal() {
                assistanceModal.style.display = 'flex';
            }

            // Función para ocultar la ventana modal
            function closeModal() {
                assistanceModal.style.display = 'none';
            }

            // Evento al hacer clic en el botón de marcar asistencia
            if (markAssistanceButton) {
                markAssistanceButton.addEventListener('click', showModal);
            }

            // Evento al hacer clic en el botón de cerrar de la modal
            if (closeModalButton) {
                closeModalButton.addEventListener('click', closeModal);
            }

            // Cerrar la modal si se hace clic fuera de ella
            window.addEventListener('click', function(event) {
                if (event.target === assistanceModal) {
                    closeModal();
                }
            });

            // Mostrar fecha y hora actual (opcional)
            function updateDateTime() {
                const now = new Date();
                const optionsDate = { day: '2-digit', month: 'long', year: 'numeric' };
                const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
                currentDateSpan.textContent = now.toLocaleDateString('es-ES', optionsDate).toUpperCase();
                currentTimeSpan.textContent = now.toLocaleTimeString('es-ES', optionsTime);
            }

            updateDateTime();
            setInterval(updateDateTime, 1000); // Actualizar cada segundo
        });