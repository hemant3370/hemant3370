// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');
const navLinks = document.querySelectorAll('.nav-link');

// Theme Management
class ThemeManager {
    constructor() {
        this.theme = this.getStoredTheme() || 'light';
        this.init();
    }

    getStoredTheme() {
        try {
            return localStorage.getItem('theme');
        } catch (e) {
            return null;
        }
    }

    setStoredTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            console.warn('Could not save theme preference');
        }
    }

    init() {
        this.applyTheme();
        this.updateThemeIcon();
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.updateThemeIcon();
        this.setStoredTheme(this.theme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-color-scheme', this.theme);
    }

    updateThemeIcon() {
        const icons = { light: '🌙', dark: '☀️' };
        if (themeToggle) {
            const iconElement = themeToggle.querySelector('.theme-icon');
            if (iconElement) {
                iconElement.textContent = icons[this.theme];
            }
        }
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupScrollSpy();
        this.setupNavbarScroll();
    }

    setupSmoothScrolling() {
        // Handle navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
                this.closeMobileMenu();
            });
        });

        // Handle hero buttons
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.getAttribute('href');
                this.scrollToSection(targetId);
            });
        });

        // Handle any other internal links
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(link => {
            if (!link.classList.contains('nav-link') && !link.closest('.hero-buttons')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    this.scrollToSection(targetId);
                });
            }
        });
    }

    scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
        }
    }

    setupMobileMenu() {
        if (navToggle) {
            navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu && navMenu.classList.contains('active') && !navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu when pressing escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }

    toggleMobileMenu() {
        if (navMenu && navToggle) {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        }
    }

    closeMobileMenu() {
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }

    setupScrollSpy() {
        if (!this.sections.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                    
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to current link
                    if (currentLink) {
                        currentLink.classList.add('active');
                    }
                }
            });
        }, {
            rootMargin: '-20% 0px -70% 0px'
        });

        this.sections.forEach(section => observer.observe(section));
    }

    setupNavbarScroll() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add/remove background blur based on scroll position
            if (navbar) {
                if (currentScrollY > 50) {
                    navbar.style.background = 'rgba(var(--color-surface-rgb, 252, 252, 249), 0.95)';
                    navbar.style.backdropFilter = 'blur(10px)';
                } else {
                    navbar.style.background = 'rgba(var(--color-surface-rgb, 252, 252, 249), 0.95)';
                    navbar.style.backdropFilter = 'blur(10px)';
                }
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

// Form Management
class FormManager {
    constructor() {
        if (contactForm) {
            this.init();
        }
    }

    init() {
        contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isValid = this.validateForm();
        if (!isValid) return;

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // Simulate form submission
            await this.simulateFormSubmission();
            
            // Show success message
            this.showSuccess();
            contactForm.reset();
        } catch (error) {
            this.showError('Failed to send message. Please try again.');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    validateForm() {
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous error
        this.clearError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = `${this.getFieldLabel(fieldName)} is required.`;
            isValid = false;
        }
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address.';
                isValid = false;
            }
        }
        // Minimum length validation
        else if (fieldName === 'message' && value && value.length < 10) {
            errorMessage = 'Message must be at least 10 characters long.';
            isValid = false;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        const errorElement = document.getElementById(`${field.name}Error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        field.style.borderColor = 'var(--color-error)';
    }

    clearError(field) {
        const errorElement = document.getElementById(`${field.name}Error`);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
        field.style.borderColor = '';
    }

    showSuccess() {
        const successElement = document.getElementById('formSuccess');
        if (successElement) {
            successElement.classList.remove('hidden');
            setTimeout(() => {
                successElement.classList.add('hidden');
            }, 5000);
        }
    }

    showError(message) {
        alert(message); // Simple fallback
    }

    getFieldLabel(fieldName) {
        const labels = {
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message'
        };
        return labels[fieldName] || fieldName;
    }

    async simulateFormSubmission() {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(resolve, 1500);
        });
    }
}

// Animation Management
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupLoadingAnimations();
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.skill-category, .project-card, .blog-card, .timeline-item');
        
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay for grouped elements
                    setTimeout(() => {
                        entry.target.classList.add('fade-in', 'visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    setupLoadingAnimations() {
        // Add loading class to elements that should animate on load
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
        
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
    }
}

// Utility Functions
class UtilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupExternalLinks();
        this.setupPerformanceOptimizations();
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Navigation shortcuts
            if (e.altKey) {
                const sections = ['home', 'about', 'skills', 'projects', 'contact'];
                const keyNumber = parseInt(e.key);
                
                if (keyNumber >= 1 && keyNumber <= sections.length) {
                    e.preventDefault();
                    const targetSection = document.getElementById(sections[keyNumber - 1]);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    }

    setupExternalLinks() {
        // Add external link indicators and security
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
            }
            if (!link.hasAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    setupPerformanceOptimizations() {
        // Lazy loading for images (if any were added)
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            if (lazyImages.length > 0) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    });
                });

                lazyImages.forEach(img => imageObserver.observe(img));
            }
        }

        // Debounced scroll handler
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                // Scroll-based optimizations
                this.updateScrollProgress();
            }, 16); // ~60fps
        });
    }

    updateScrollProgress() {
        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100));
        
        // You could use this for a progress indicator
        document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
    }
}

// Initialize Application
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            // Initialize all managers
            this.themeManager = new ThemeManager();
            this.navigationManager = new NavigationManager();
            this.formManager = new FormManager();
            this.animationManager = new AnimationManager();
            this.utilityManager = new UtilityManager();

            // Add loaded class to body for CSS transitions
            document.body.classList.add('loaded');
            
            console.log('Portfolio application initialized successfully');
        } catch (error) {
            console.error('Error initializing application:', error);
        }
    }
}

// Start the application
const app = new App();

// Additional event listeners for enhanced functionality
window.addEventListener('resize', () => {
    // Handle responsive behavior
    const mobileBreakpoint = 768;
    if (window.innerWidth > mobileBreakpoint && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (navToggle) {
            navToggle.classList.remove('active');
        }
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - pause animations or reduce activity
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible - resume normal activity
        document.body.classList.remove('page-hidden');
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App, ThemeManager, NavigationManager, FormManager, AnimationManager, UtilityManager };
}