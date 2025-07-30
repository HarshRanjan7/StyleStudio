// --- Modal Elements ---
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

/**
 * Closes the modal by adding the 'closed' class.
 */
const closeModal = function () {
    if (modal) { // Ensure modal exists before trying to access its classList
        modal.classList.add('closed');
    }
};

// Add event listeners only if the elements exist
modalCloseOverlay?.addEventListener('click', closeModal);
modalCloseBtn?.addEventListener('click', closeModal);


// --- Notification Toast Elements ---
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// Add event listener only if the toast close button exists
toastCloseBtn?.addEventListener('click', function () {
    if (notificationToast) { // Ensure notificationToast exists
        notificationToast.classList.add('closed');
    }
});


// --- Mobile Menu Elements ---
// Using querySelectorAll for elements that might appear multiple times
const mobileMenuOpenBtns = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenuCloseBtns = document.querySelectorAll('[data-mobile-menu-close-btn]');
const mobileMenus = document.querySelectorAll('[data-mobile-menu]');
const overlay = document.querySelector('[data-overlay]');

/**
 * Handles opening and closing of mobile menus and the overlay.
 * Uses a single function for consistency and reusability.
 * @param {HTMLElement} menuElement - The specific mobile menu to toggle.
 * @param {boolean} isOpen - True to open, false to close.
 */
const toggleMobileMenu = function (menuElement, isOpen) {
    if (menuElement && overlay) { // Ensure elements exist
        if (isOpen) {
            menuElement.classList.add('active');
            overlay.classList.add('active');
        } else {
            menuElement.classList.remove('active');
            overlay.classList.remove('active');
        }
    }
};

// Loop through all mobile menu open buttons
mobileMenuOpenBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => toggleMobileMenu(mobileMenus[index], true));
});

// Loop through all mobile menu close buttons
mobileMenuCloseBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => toggleMobileMenu(mobileMenus[index], false));
});

// Add event listener to overlay for closing menus
overlay?.addEventListener('click', () => {
    mobileMenus.forEach(menu => toggleMobileMenu(menu, false));
});


// --- Accordion Elements ---
const accordionBtns = document.querySelectorAll('[data-accordion-btn]');
const accordions = document.querySelectorAll('[data-accordion]');

accordionBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        // Check if the next sibling (the accordion content) exists and has 'active'
        const isClickedAccordionActive = this.nextElementSibling?.classList.contains('active');

        // Close all other active accordions unless the current one was already active
        accordions.forEach((accordionItem, index) => {
            if (!isClickedAccordionActive && accordionItem.classList.contains('active')) {
                accordionItem.classList.remove('active');
                accordionBtns[index].classList.remove('active'); // Also remove 'active' from its button
            }
        });

        // Toggle the clicked accordion and its button
        this.nextElementSibling?.classList.toggle('active');
        this.classList.toggle('active');
    });
});