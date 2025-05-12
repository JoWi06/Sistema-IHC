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
    (function(d){
      var s = d.createElement("script");
      s.setAttribute("data-account", "abc1234567890"); // ← tu ID real aquí
      s.setAttribute("src", "https://cdn.userway.org/widget.js");
      (d.body || d.head).appendChild(s);
    })(document);
});