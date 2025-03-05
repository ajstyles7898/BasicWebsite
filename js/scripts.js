/* filepath: /d:/AI/Website/Basicone/scripts.js */
document.addEventListener('DOMContentLoaded', async function() {
    function setupTabSwitching(tabSelector, contentSelector) {
        const tabs = document.querySelectorAll(tabSelector);
        const contents = document.querySelectorAll(contentSelector);

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-tab');
                const targetContent = document.getElementById(target);
                
                if (!targetContent) {
                    console.error(`Error: Element with ID '${target}' not found`);
                    return;
                }

                // Remove 'active' class from all tabs and hide all contents
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.style.display = 'none');

                // Add 'active' class to clicked tab and show corresponding content
                tab.classList.add('active');
                targetContent.style.display = 'block';
            });
        });

        // ✅ Ensure the first tab content is shown initially
        if (contents.length > 0) {
            contents[0].style.display = 'block';
        }
    }

    // Apply tab switching separately for Menu and Order Online pages
    setupTabSwitching('.menu-tab', '.menu-content'); // For menu.html
    setupTabSwitching('.order-tab', '.order-content'); // For order.html
    
    // Load food items from JSON file
    const foodItems = await fetchFoodItems();
    displayFoodItems(foodItems);

    // Fetch food items from JSON file
    async function fetchFoodItems() {
        try {
            const response = await fetch('food-items.json');
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error('Error loading food items:', error);
            return [];
        }
    }

    // Display food items in menu and order online page
    function displayFoodItems(items) {
    console.log("🔍 Running displayFoodItems...");
    const categories = ['breakfast', 'lunch', 'dinner', 'all-day'];

    categories.forEach(category => {
        const menuContent = document.getElementById(category);
        const orderContent = document.getElementById(`order-${category}`);

        if (!menuContent && !orderContent) {
            console.warn(`⚠️ Warning: Sections for '${category}' not found.`);
            return; // Skip this category if both are missing
        }

        items.forEach(item => {
            if (item.category === category) {
                const menuItem = document.createElement('div');
                menuItem.classList.add('menu-item');
                menuItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="menu-item-image">
                    <div class="menu-item-info">
                        <h3>${item.name}</h3>
                        <p class="menu-item-price">$${item.price.toFixed(2)}</p>
                        <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
                    </div>
                `;

                if (menuContent) menuContent.appendChild(menuItem.cloneNode(true));
                if (orderContent) orderContent.appendChild(menuItem.cloneNode(true));
            }
        });
    });
}
window.displayFoodItems = displayFoodItems;



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

            fetch('credentials.json')
                .then(response => response.json())
                .then(credentials => {
                    if (username === credentials.admin.username && password === credentials.admin.password) {
                        localStorage.setItem('isAdmin', 'true');
                        window.location.href = 'index.html';
                    } else {
                        alert('Invalid credentials. Please try again.');
                    }
                })
                .catch(error => console.error('Error loading credentials:', error));
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

    // Check if user is admin
    if (localStorage.getItem('isAdmin') === 'true') {
        document.body.classList.add('admin');
    }
});

function goBack() {
    window.history.back();
}

function logout() {
    localStorage.removeItem('isAdmin');
    window.location.href = 'index.html';
}

function editItem(itemName) {
    // Implement edit item functionality
    alert(`Edit item: ${itemName}`);
}

function removeItem(itemName) {
    // Implement remove item functionality
    alert(`Remove item: ${itemName}`);
}

function addItem() {
    // Implement add item functionality
    alert('Add new item');
}