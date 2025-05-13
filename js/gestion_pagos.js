document.addEventListener('DOMContentLoaded', function() {
            const payrollTableBody = document.getElementById('payroll-table-body');
            const totalPayrollElement = document.getElementById('total-payroll');
            const pagarEmpleadosButton = document.getElementById('pagar-empleados-button');
            const paymentStatusDiv = document.getElementById('payment-status');

            // Simulación de datos de nómina (reemplazar con datos reales)
            const payrollData = [
                { empleado: 'Ana Torres Montalvo', fechaIngreso: '02/02/2010', sueldoBase: 2000.00, asistencias: 'COMPLETO', descuentos: 0, credito: 0.00, sueldoPagar: 2000.00 },
                { empleado: 'Marianela Frías Torres', fechaIngreso: '02/04/2014', sueldoBase: 1800.00, asistencias: 'COMPLETO', descuentos: 50.00, credito: 0.00, sueldoPagar: 1750.00 },
                { empleado: 'Hillary Cajó Mandayalle', fechaIngreso: '10/07/2018', sueldoBase: 950.00, asistencias: 'INCOMPLETO', descuentos: 29.00, credito: 0.00, sueldoPagar: 810.00 },
                { empleado: 'Carlos Frías Torres', fechaIngreso: '10/08/2014', sueldoBase: 1025.00, asistencias: 'VACACIONES', descuentos: 0, credito: 0.00, sueldoPagar: 1025.00 }
            ];

            function displayPayrollData(data) {
                payrollTableBody.innerHTML = '';
                let totalPayroll = 0;
                data.forEach(employeeData => {
                    const row = payrollTableBody.insertRow();
                    row.insertCell().textContent = employeeData.empleado;
                    row.insertCell().textContent = employeeData.fechaIngreso;
                    row.insertCell().textContent = `S/. ${employeeData.sueldoBase.toFixed(2)}`;

                    const asistenciaCell = row.insertCell();
                    const asistenciaSpan = document.createElement('span');
                    asistenciaSpan.textContent = employeeData.asistencias;
                    asistenciaSpan.classList.add('asistencia-label');
                    asistenciaSpan.classList.add(employeeData.asistencias.toLowerCase().replace(' ', '-').replace('(', '').replace(')', '')); // Clases dinámicas para estilos
                    asistenciaCell.appendChild(asistenciaSpan);

                    row.insertCell().textContent = `S/. ${employeeData.descuentos.toFixed(2)}`;
                    row.insertCell().textContent = `S/. ${employeeData.credito.toFixed(2)}`;
                    row.insertCell().textContent = `S/. ${employeeData.sueldoPagar.toFixed(2)}`;
                    totalPayroll += employeeData.sueldoPagar;
                });
                totalPayrollElement.textContent = `S/. ${totalPayroll.toFixed(2)}`;
            }

            displayPayrollData(payrollData);

            if (pagarEmpleadosButton) {
                pagarEmpleadosButton.addEventListener('click', function() {
                    // Simulación del proceso de pago para todos los empleados mostrados
                    paymentStatusDiv.textContent = 'Procesando pagos para todos los empleados...';
                    setTimeout(() => {
                        paymentStatusDiv.textContent = 'Pagos completados para el periodo.';
                        // Aquí deberías implementar la lógica real para marcar a todos como pagados.
                    }, 2000);
                });
            }
        });