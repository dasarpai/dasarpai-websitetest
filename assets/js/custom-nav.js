document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.greedy-nav');
    const burgerToggle = nav.querySelector('.greedy-nav__toggle');
    const visibleLinks = nav.querySelector('.visible-links');
    
    // Toggle burger menu
    burgerToggle.addEventListener('click', function(e) {
        e.preventDefault();
        nav.classList.toggle('show-links');
        this.classList.toggle('close');
    });

    // Handle menu toggles
    document.addEventListener('click', function(e) {
        // Close burger menu when clicking outside
        if (!nav.contains(e.target)) {
            nav.classList.remove('show-links');
            burgerToggle.classList.remove('close');
            // Close all submenus
            document.querySelectorAll('.submenu, .submenu-child').forEach(menu => {
                menu.classList.remove('show');
            });
            document.querySelectorAll('.menu-toggle, .submenu-toggle').forEach(toggle => {
                toggle.classList.remove('active');
            });
        }

        // Handle menu toggle clicks
        if (e.target.closest('.menu-toggle')) {
            const menuToggle = e.target.closest('.menu-toggle');
            const submenu = menuToggle.nextElementSibling;
            
            // If on mobile, prevent immediate parent link navigation
            if (window.innerWidth <= 768) {
                e.preventDefault();
                
                // Close sibling menus
                const parentUl = menuToggle.closest('ul');
                parentUl.querySelectorAll('.menu-toggle').forEach(toggle => {
                    if (toggle !== menuToggle) {
                        toggle.classList.remove('active');
                        const siblingMenu = toggle.nextElementSibling;
                        if (siblingMenu) siblingMenu.classList.remove('show');
                    }
                });

                // Toggle current menu
                menuToggle.classList.toggle('active');
                if (submenu) submenu.classList.toggle('show');
            }
        }

        // Handle submenu toggle clicks
        if (e.target.closest('.submenu-toggle')) {
            const submenuToggle = e.target.closest('.submenu-toggle');
            const submenuChild = submenuToggle.nextElementSibling;
            
            // Always prevent navigation for submenu toggles
            e.preventDefault();
            
            // Close sibling submenus
            const parentUl = submenuToggle.closest('ul');
            parentUl.querySelectorAll('.submenu-toggle').forEach(toggle => {
                if (toggle !== submenuToggle) {
                    toggle.classList.remove('active');
                    const siblingMenu = toggle.nextElementSibling;
                    if (siblingMenu) siblingMenu.classList.remove('show');
                }
            });

            // Toggle current submenu
            submenuToggle.classList.toggle('active');
            if (submenuChild) submenuChild.classList.toggle('show');
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                // Reset mobile menu state on desktop
                nav.classList.remove('show-links');
                burgerToggle.classList.remove('close');
                document.querySelectorAll('.submenu, .submenu-child').forEach(menu => {
                    menu.classList.remove('show');
                });
                document.querySelectorAll('.menu-toggle, .submenu-toggle').forEach(toggle => {
                    toggle.classList.remove('active');
                });
            }
        }, 250);
    });
});
