// Portfolio Website - Dynamic Content Renderer
class PortfolioApp {
    constructor() {
        this.config = null;
        this.currentTheme = 'light';
        this.init();
    }

    async init() {
        try {
            // Load configuration
            await this.loadConfig();
            
            // Set up the page
            this.setupPage();
            this.renderContent();
            this.setupEventListeners();
            this.setupTheme();
            
            // Initialize animations
            this.initAnimations();
            
        } catch (error) {
            console.error('Failed to initialize portfolio app:', error);
            this.showError('Failed to load portfolio content. Please refresh the page.');
        }
    }

    async loadConfig() {
        try {
            const response = await fetch('config.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.config = await response.json();
        } catch (error) {
            throw new Error(`Failed to load configuration: ${error.message}`);
        }
    }

    setupPage() {
        // Set document title and meta
        document.title = this.config.site.title;
        document.querySelector('meta[name="description"]').setAttribute('content', this.config.site.description);
        document.querySelector('meta[name="keywords"]').setAttribute('content', this.config.site.keywords);
        document.querySelector('meta[name="author"]').setAttribute('content', this.config.site.author);
        document.documentElement.lang = this.config.site.language;
    }

    renderContent() {
        this.renderNavigation();
        this.renderHero();
        this.renderAbout();
        this.renderSkills();
        this.renderProjects();
        this.renderBlog();
        this.renderExperience();
        this.renderContact();
        this.renderFooter();
    }

    renderNavigation() {
        const navbar = document.getElementById('navbar');
        const navContent = navbar.querySelector('.nav-content');
        
        // Update brand
        navContent.querySelector('.nav-brand').textContent = this.config.navigation.brand;
        
        // Update navigation menu
        const navMenu = navContent.querySelector('.nav-menu');
        navMenu.innerHTML = this.config.navigation.menu.map(item => 
            `<li><a href="${item.href}" class="nav-link" data-section="${item.id}">${item.label}</a></li>`
        ).join('');
    }

    renderHero() {
        const hero = document.getElementById('home');
        const heroContent = hero.querySelector('.hero-content');
        
        // Update hero text
        heroContent.querySelector('.hero-title').textContent = this.config.hero.title;
        heroContent.querySelector('.hero-subtitle').textContent = this.config.hero.subtitle;
        heroContent.querySelector('.hero-description').textContent = this.config.hero.description;
        
        // Update buttons
        const heroButtons = heroContent.querySelector('.hero-buttons');
        heroButtons.innerHTML = this.config.hero.buttons.map(button => 
            `<a href="${button.href}" class="btn btn--${button.style}">${button.text}</a>`
        ).join('');
        
        // Update social links
        const socialLinks = heroContent.querySelector('.social-links');
        socialLinks.innerHTML = this.config.hero.socialLinks.map(social => 
            `<a href="${social.url}" target="_blank" aria-label="${social.platform}">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    ${this.config.icons[social.icon]}
                </svg>
            </a>`
        ).join('');
    }

    renderAbout() {
        const about = document.getElementById('about');
        const aboutContent = about.querySelector('.about-content');
        
        // Update title
        about.querySelector('.section-title').textContent = this.config.about.title;
        
        // Update content
        aboutContent.querySelector('.about-summary').textContent = this.config.about.summary;
        aboutContent.querySelector('.about-story').textContent = this.config.about.story;
        
        // Update values
        const valuesSection = aboutContent.querySelector('.about-values');
        valuesSection.querySelector('h3').textContent = this.config.about.values.title;
        
        const valuesList = valuesSection.querySelector('ul');
        valuesList.innerHTML = this.config.about.values.items.map(item => 
            `<li>${item}</li>`
        ).join('');
    }

    renderSkills() {
        const skills = document.getElementById('skills');
        const skillsGrid = skills.querySelector('.skills-grid');
        
        // Update title
        skills.querySelector('.section-title').textContent = this.config.skills.title;
        
        // Update skills categories
        skillsGrid.innerHTML = this.config.skills.categories.map(category => `
            <div class="skill-category">
                <h3>${category.name}</h3>
                <div class="skill-tags">
                    ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    renderProjects() {
        const projects = document.getElementById('projects');
        const projectsGrid = projects.querySelector('.projects-grid');
        
        // Update title
        projects.querySelector('.section-title').textContent = this.config.projects.title;
        
        // Update projects
        projectsGrid.innerHTML = this.config.projects.items.map(project => `
            <div class="project-card">
                <div class="project-image">
                    <div class="project-placeholder">
                        <svg width="60" height="60" fill="var(--color-primary)" viewBox="0 0 24 24">
                            ${this.config.icons[project.icon]}
                        </svg>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.links.github}" target="_blank" class="btn btn--sm btn--outline">GitHub</a>
                        <a href="${project.links.demo}" target="_blank" class="btn btn--sm btn--primary">Live Demo</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderBlog() {
        const blog = document.getElementById('blog');
        const blogGrid = blog.querySelector('.blog-grid');
        
        // Update title
        blog.querySelector('.section-title').textContent = this.config.blog.title;
        
        // Update blog posts
        blogGrid.innerHTML = this.config.blog.posts.map(post => `
            <article class="blog-card">
                <div class="blog-image">
                    <div class="blog-placeholder">
                        <svg width="40" height="40" fill="var(--color-primary)" viewBox="0 0 24 24">
                            ${this.config.icons[post.icon]}
                        </svg>
                    </div>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-category">${post.category}</span>
                        <span class="blog-date">${post.date}</span>
                        <span class="blog-read-time">${post.readTime}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="${post.link}" class="blog-link">Read More →</a>
                </div>
            </article>
        `).join('');
    }

    renderExperience() {
        const experience = document.getElementById('experience');
        const timeline = experience.querySelector('.timeline');
        
        // Update title
        experience.querySelector('.section-title').textContent = this.config.experience.title;
        
        // Update timeline
        timeline.innerHTML = this.config.experience.timeline.map(item => `
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <h4>${item.company}</h4>
                    <span class="timeline-period">${item.period}</span>
                    <p>${item.description}</p>
                    ${item.achievements.length > 0 ? `
                        <ul class="achievements">
                            ${item.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    renderContact() {
        const contact = document.getElementById('contact');
        const contactContent = contact.querySelector('.contact-content');
        
        // Update title
        contact.querySelector('.section-title').textContent = this.config.contact.title;
        
        // Update contact info
        const contactInfo = contactContent.querySelector('.contact-info');
        contactInfo.querySelector('h3').textContent = this.config.contact.info.title;
        contactInfo.querySelector('p').textContent = this.config.contact.info.description;
        
        const contactDetails = contactInfo.querySelector('.contact-details');
        contactDetails.innerHTML = this.config.contact.info.details.map(detail => `
            <div class="contact-item">
                <strong>${detail.label}:</strong> 
                ${detail.status ? `<span class="status status--${detail.status}">${detail.value}</span>` : detail.value}
            </div>
        `).join('');
        
        // Update contact form
        const contactForm = contactContent.querySelector('.contact-form');
        const formFields = contactForm.querySelector('.form-group:first-of-type').parentNode;
        
        // Clear existing form fields
        formFields.innerHTML = '';
        
        // Add new form fields
        this.config.contact.form.fields.forEach(field => {
            const fieldGroup = document.createElement('div');
            fieldGroup.className = 'form-group';
            
            const label = document.createElement('label');
            label.setAttribute('for', field.id);
            label.className = 'form-label';
            label.textContent = field.label;
            
            let input;
            if (field.type === 'textarea') {
                input = document.createElement('textarea');
                input.rows = field.rows || 5;
            } else {
                input = document.createElement('input');
                input.type = field.type;
            }
            
            input.id = field.id;
            input.name = field.id;
            input.className = 'form-control';
            if (field.required) input.required = true;
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.id = `${field.id}Error`;
            
            fieldGroup.appendChild(label);
            fieldGroup.appendChild(input);
            fieldGroup.appendChild(errorDiv);
            formFields.appendChild(fieldGroup);
        });
        
        // Update submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.textContent = this.config.contact.form.submitText;
        
        // Update success message
        const successDiv = contactForm.querySelector('.form-success');
        successDiv.textContent = this.config.contact.form.successMessage;
    }

    renderFooter() {
        const footer = document.querySelector('.footer');
        const footerContent = footer.querySelector('.footer-content');
        
        // Update copyright
        footerContent.querySelector('p').textContent = this.config.footer.copyright;
        
        // Update footer links
        const footerLinks = footerContent.querySelector('.footer-links');
        footerLinks.innerHTML = this.config.footer.links.map(link => 
            `<a href="${link.url}" target="_blank">${link.text}</a>`
        ).join('');
    }

    setupEventListeners() {
        // Navigation toggle
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });
        
        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactForm();
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    setupTheme() {
        // Check for saved theme preference or default to config
        const savedTheme = localStorage.getItem('portfolio-theme') || this.config.theme.default;
        this.setTheme(savedTheme);
        
        // Update theme toggle icon
        this.updateThemeIcon();
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-color-scheme', theme);
        localStorage.setItem('portfolio-theme', theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = this.config.theme.toggleIcon[this.currentTheme];
    }

    async handleContactForm() {
        const form = document.getElementById('contactForm');
        const formData = new FormData(form);
        
        // Basic validation
        let isValid = true;
        const errors = {};
        
        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(error => {
            error.classList.remove('show');
            error.textContent = '';
        });
        
        // Validate required fields
        this.config.contact.form.fields.forEach(field => {
            if (field.required) {
                const input = document.getElementById(field.id);
                const errorDiv = document.getElementById(`${field.id}Error`);
                
                if (!input.value.trim()) {
                    errors[field.id] = `${field.label} is required`;
                    errorDiv.textContent = errors[field.id];
                    errorDiv.classList.add('show');
                    isValid = false;
                } else if (field.type === 'email' && !this.isValidEmail(input.value)) {
                    errors[field.id] = 'Please enter a valid email address';
                    errorDiv.textContent = errors[field.id];
                    errorDiv.classList.add('show');
                    isValid = false;
                }
            }
        });
        
        if (!isValid) return;
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            const successDiv = document.getElementById('formSuccess');
            successDiv.classList.remove('hidden');
            
            // Reset form
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successDiv.classList.add('hidden');
            }, 5000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError('Failed to send message. Please try again.');
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    initAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe all sections for animation
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('fade-in');
            observer.observe(section);
        });
        
        // Add fade-in class to cards and other elements
        document.querySelectorAll('.project-card, .blog-card, .skill-category, .timeline-item').forEach(item => {
            item.classList.add('fade-in');
            observer.observe(item);
        });
    }

    showError(message) {
        // Create and show error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-error);
            color: white;
            padding: 16px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(errorDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Handle page visibility changes for better performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'Portfolio - Come back! 👋';
    } else {
        // Restore original title from config
        const originalTitle = document.querySelector('meta[name="title"]')?.content || 'Portfolio';
        document.title = originalTitle;
    }
});