/**
 * JS for BS Marriage Connect
 * Standard Logic Migration from React
 */

document.addEventListener('DOMContentLoaded', () => {

    // Navbar Elements
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const logoText = document.getElementById('logo-text');
    const navCta = document.getElementById('nav-cta');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');

    // State Variables (Mimicking React state)
    let isScrolled = false;
    let isMobileMenuOpen = false;

    // --- Scroll Handler ---
    const handleScroll = () => {
        const currentScrolled = window.scrollY > 50;

        if (currentScrolled !== isScrolled) {
            isScrolled = currentScrolled;

            if (isScrolled) {
                navbar.classList.add('scrolled');
                navbar.classList.remove('py-5');
                navbar.classList.add('py-3');
            } else {
                navbar.classList.remove('scrolled');
                navbar.classList.add('py-5');
                navbar.classList.remove('py-3');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);

    // --- Mobile Menu Toggle ---
    const toggleMobileMenu = () => {
        isMobileMenuOpen = !isMobileMenuOpen;

        if (isMobileMenuOpen) {
            mobileMenu.style.maxHeight = '400px';
            mobileMenu.classList.add('border-t');
            // Change Icon to 'X' (Manually swap icon class if not using Lucide re-creation)
            mobileMenuIcon.setAttribute('data-lucide', 'x');
        } else {
            mobileMenu.style.maxHeight = '0';
            mobileMenu.classList.remove('border-t');
            mobileMenuIcon.setAttribute('data-lucide', 'menu');
        }
        // Tell Lucide to re-process the icon
        lucide.createIcons();
    };

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close Menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMobileMenuOpen) toggleMobileMenu();
        });
    });

    // --- Form Submission ---
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(registrationForm);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const community = formData.get('community');

            if (!name || !phone || !community) {
                alert('Please fill in all fields');
                return;
            }

            if (phone.length < 10) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }

            // Redirect to WhatsApp
            const whatsappNumber = "917013715289";
            const message = `*New Registration - BS Marriage Connect*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Community:* ${community}\n\nI'm interested in finding my perfect match!`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');

            // Success feedback
            alert(`Thank you ${name}! Your details have been sent. If WhatsApp didn't open automatically, please check your popup blocker.`);
            registrationForm.reset();
        });
    }

    // newsletter form also
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            if (input.value) {
                alert('Success! You are now subscribed to our matching tips.');
                input.value = '';
            }
        });
    }

    // --- Active Link Sync (Smooth Scroll Handling for links) ---
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = 80;
                const offsetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Card Click-to-Select (Golden Yellow Highlight) ---
    const selectableCards = document.querySelectorAll('.selectable-card');
    selectableCards.forEach(card => {
        card.addEventListener('click', () => {
            // Find sibling cards in the same grid/container
            const parent = card.parentElement;
            parent.querySelectorAll('.selectable-card').forEach(sibling => {
                sibling.classList.remove('card-selected');
            });
            // Toggle selected on clicked card
            card.classList.add('card-selected');
        });
    });

});
