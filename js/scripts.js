/* filepath: /d:/AI/Website/Basicone/scripts.js */
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.menu-tab');
    const contents = document.querySelectorAll('.menu-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Form submission (prevent default for demo)
    const form = document.getElementById('booking-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your reservation request! We will confirm your booking shortly.');
            form.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if(this.getAttribute('href') !== '#') {
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === 'admin' && password === 'admin') {
                window.location.href = 'admin.html';
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    }

    // Admin form submission
    const adminForm = document.getElementById('admin-form');
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle form submission to add/update dishes
            alert('Dish added/updated successfully!');
        });
    }
});

function goBack() {
    window.history.back();
}

function logout() {
    window.location.href = 'index.html';
}