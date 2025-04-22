// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    
    // Load all components
    loadComponent('header', 'header.html');
    loadComponent('hero', 'hero.html');
    loadComponent('services', 'services.html');
    loadComponent('projects', 'projects.html');
    loadComponent('team', 'team.html');
    // loadComponent('testimonials', 'testimonials.html');
    loadComponent('contact', 'contact.html');
    loadComponent('footer', 'footer.html');
    
    // Setup theme toggle functionality
    setupThemeToggle();
  });
  
  // Function to load HTML components
  function loadComponent(id, url) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
      })
      .catch(error => {
        console.error(`Error loading component ${id}:`, error);
      });
  }
  
  // Theme toggle functionality
  function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use browser default
    if (localStorage.getItem('color-theme') === 'dark' || 
       (!localStorage.getItem('color-theme') && 
        window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
    
    // Listen for theme toggle click
    themeToggleBtn.addEventListener('click', function() {
      // Toggle dark class on html element
      htmlElement.classList.toggle('dark');
      
      // Update localStorage
      if (htmlElement.classList.contains('dark')) {
        localStorage.setItem('color-theme', 'dark');
      } else {
        localStorage.setItem('color-theme', 'light');
      }
    });
  
    // Make sure the icons update when the theme changes
    updateThemeIcons();
  
    // Add mutation observer to watch for class changes on the html element
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          updateThemeIcons();
        }
      });
    });
  
    observer.observe(htmlElement, { attributes: true });
  }
  
  // Update theme icons based on current theme
  function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    const moonIcon = document.querySelector('#theme-toggle-btn .fa-moon');
    const sunIcon = document.querySelector('#theme-toggle-btn .fa-sun');
    
    if (moonIcon && sunIcon) {
      if (isDark) {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
      } else {
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
      }
    }
  }
  
  // Form submission handler
  function handleContactSubmit(event) {
    event.preventDefault();
  
    const form = event.target;
  
    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject')?.value.trim() || 'Contact Form Submission';
    const message = document.getElementById('message').value.trim();
  
    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all required fields');
      return;
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
  
    try {
      // Construct the mailto URL with pre-filled fields
      const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const mailtoUrl = `mailto:supun9402@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  
      // Open email client
      window.location.href = mailtoUrl;
  
      // Show success message
      const successMessage = document.getElementById('success-message');
      form.classList.add('hidden');
      successMessage.classList.remove('hidden');
  
      // Reset form
      form.reset();
  
      // Hide success message after 5 seconds and show form again
      setTimeout(() => {
        successMessage.classList.add('hidden');
        form.classList.remove('hidden');
      }, 5000);
    } catch (error) {
      console.error('Error opening email client:', error);
      alert('There was an error opening your email client. Please try again or contact us directly at info@ramsytec.com');
    }
  }
  

  // Mobile menu toggle
  function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
  }