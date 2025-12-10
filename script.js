// Script para interactividad adicional

document.addEventListener('DOMContentLoaded', function() {
    // === ANIMACIONES AL HACER SCROLL ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aparecer');
                // Opcional: dejar de observar después de animar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos los elementos con clase 'animado'
    const elementosAnimados = document.querySelectorAll('.tarjeta-glass, .titulo-principal-seccion, .empresa-card, .servicio-card, .politica-imagen, .politica-texto, .seccion-imagen, .seccion-texto, .footer');
    elementosAnimados.forEach(el => {
        el.classList.add('animado');
        observer.observe(el);
    });

    // === MENÚ HAMBURGUESA ===
    const btnHamburguesa = document.getElementById('btnHamburguesa');
    const menuLateral = document.getElementById('menuLateral');
    const overlayMenu = document.getElementById('overlayMenu');
    const btnCerrarMenu = document.getElementById('btnCerrarMenu');
    const submenuBtn = document.getElementById('submenuBtn');
    const submenuContenido = document.getElementById('submenuContenido');

    // Función para abrir el menú
    function abrirMenu() {
        menuLateral.classList.add('activo');
        overlayMenu.classList.add('activo');
        btnHamburguesa.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquear scroll del body
    }

    // Función para cerrar el menú
    function cerrarMenu() {
        menuLateral.classList.remove('activo');
        overlayMenu.classList.remove('activo');
        btnHamburguesa.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    }

    // Abrir menú al hacer clic en hamburguesa
    if (btnHamburguesa) {
        btnHamburguesa.addEventListener('click', abrirMenu);
    }

    // Cerrar menú al hacer clic en botón cerrar
    if (btnCerrarMenu) {
        btnCerrarMenu.addEventListener('click', cerrarMenu);
    }

    // Cerrar menú al hacer clic en overlay
    if (overlayMenu) {
        overlayMenu.addEventListener('click', cerrarMenu);
    }

    // Toggle del submenú "MÁS"
    if (submenuBtn) {
        submenuBtn.addEventListener('click', function() {
            submenuBtn.classList.toggle('activo');
            submenuContenido.classList.toggle('activo');
        });
    }

    // Cerrar menú al hacer clic en cualquier enlace
    const menuLateralItems = document.querySelectorAll('.menu-lateral-item:not(.submenu-btn), .menu-lateral-subitem');
    menuLateralItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Pequeño delay para que se vea la animación del clic
            setTimeout(cerrarMenu, 200);
        });
    });

    // Cerrar menú automáticamente si se redimensiona a escritorio
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900 && menuLateral.classList.contains('activo')) {
            cerrarMenu();
        }
    });

    // === ANIMACIÓN SUAVE AL HACER SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Evitar preventDefault en enlaces sin target específico
            if (href !== '#' && href !== '#mas') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // === EFECTO DE PARALAJE SUTIL ===
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        document.body.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    });

    // === ANIMACIÓN DE ENTRADA ===
    const tarjetaGlass = document.querySelector('.tarjeta-glass');
    if (tarjetaGlass) {
        setTimeout(() => {
            tarjetaGlass.style.opacity = '1';
            tarjetaGlass.style.transform = 'translateY(0)';
        }, 100);
    }

    // === EFECTO HOVER PARA BOTONES ===
    const botones = document.querySelectorAll('.btn-aula');
    botones.forEach(boton => {
        boton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        boton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // === CERRAR DROPDOWN AL HACER CLICK FUERA ===
    document.addEventListener('click', function(event) {
        const dropdown = document.querySelector('.dropdown');
        if (dropdown && !dropdown.contains(event.target)) {
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
            }
        }
    });

    console.log('🌿 Servi Ambientales - Sistema cargado correctamente');
});

