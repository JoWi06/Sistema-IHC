document.addEventListener('DOMContentLoaded', function() {
            const verificarLicenciaButton = document.getElementById('verificar-licencia-button');
            const licenseStatusDiv = document.getElementById('license-status');
            const uploadLicenseSection = document.getElementById('upload-license-section');
            const uploadLicenseButton = document.getElementById('upload-license-button');
            const uploadStatusDiv = document.getElementById('upload-status');
            const newLicenseFile = document.getElementById('new-license-file');

            function mostrarEstadoLicencia(vigente) {
                licenseStatusDiv.innerHTML = '';
                uploadLicenseSection.style.display = 'none';
                if (vigente) {
                    licenseStatusDiv.innerHTML = '<button class="vigente-button">Vigente</button>';
                } else {
                    licenseStatusDiv.innerHTML = '<button class="no-vigente-button">No Vigente</button>';
                    uploadLicenseSection.style.display = 'block';
                }
            }

            if (verificarLicenciaButton) {
                verificarLicenciaButton.addEventListener('click', function() {
                    // Simulación de la verificación de la licencia (reemplazar con lógica real)
                    const licenciaVigente = Math.random() < 0.7; // Simula una licencia vigente el 70% de las veces
                    mostrarEstadoLicencia(licenciaVigente);
                });

                // Simulación de la verificación automática al cargar la página (opcional)
                const licenciaVigenteInicial = Math.random() < 0.7;
                mostrarEstadoLicencia(licenciaVigenteInicial);
            }

            if (uploadLicenseButton) {
                uploadLicenseButton.addEventListener('click', function() {
                    const file = newLicenseFile.files[0];
                    if (file) {
                        // Simulación de la carga de la nueva licencia (reemplazar con lógica real)
                        uploadStatusDiv.textContent = `Cargando: ${file.name}...`;
                        setTimeout(function() {
                            // Simulación de carga exitosa
                            uploadStatusDiv.textContent = `Licencia "${file.name}" cargada exitosamente. Verificando...`;
                            // Simulación de verificación después de la carga
                            const nuevaLicenciaVigente = true; // O podrías simular un resultado diferente
                            mostrarEstadoLicencia(nuevaLicenciaVigente);
                            if (nuevaLicenciaVigente) {
                                uploadStatusDiv.textContent += ' Licencia ahora Vigente.';
                            } else {
                                uploadStatusDiv.textContent += ' La nueva licencia aún no es válida.';
                            }
                            // Limpiar el input de archivo
                            newLicenseFile.value = '';
                        }, 2000); // Simula un tiempo de carga de 2 segundos
                    } else {
                        uploadStatusDiv.textContent = 'Por favor, seleccione un archivo.';
                    }
                });
            }
        });