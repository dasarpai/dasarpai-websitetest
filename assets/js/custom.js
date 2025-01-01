document.addEventListener('DOMContentLoaded', function() {
  console.log('Custom dropdown script loaded');
  
  // Find all dropdown toggles
  const dropdowns = document.querySelectorAll('.dropdown .dropdown-toggle');
  
  console.log('Dropdowns found:', dropdowns.length);
  
  dropdowns.forEach(function(dropdown) {
    dropdown.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Dropdown clicked:', this.textContent);
      
      // Toggle the dropdown menu visibility
      const dropdownMenu = this.nextElementSibling;
      
      if (dropdownMenu) {
        dropdownMenu.classList.toggle('show');
        console.log('Dropdown menu toggled');
      } else {
        console.error('No dropdown menu found for:', this);
      }
      
      // Close other open dropdowns
      dropdowns.forEach(function(otherDropdown) {
        if (otherDropdown !== dropdown) {
          const otherMenu = otherDropdown.nextElementSibling;
          if (otherMenu) {
            otherMenu.classList.remove('show');
          }
        }
      });
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach(function(dropdown) {
        const dropdownMenu = dropdown.nextElementSibling;
        if (dropdownMenu) {
          dropdownMenu.classList.remove('show');
        }
      });
    }
  });
});