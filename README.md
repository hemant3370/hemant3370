# Configurable Portfolio Website

A modern, responsive portfolio website where all content is configurable via a JSON configuration file. This makes it easy to customize your portfolio without touching HTML or CSS code.

## Features

- **Fully Configurable**: All content is managed through `config.json`
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Theme**: Automatic theme switching with manual toggle
- **Dynamic Content**: Content loads dynamically from configuration
- **Modern UI**: Clean, professional design with smooth animations
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance**: Optimized loading and smooth animations

## Quick Start

1. **Clone or download** the project files
2. **Edit** `config.json` with your information
3. **Open** `index.html` in a web browser

## Configuration Guide

### Site Information

```json
{
  "site": {
    "title": "Your Name - Your Title",
    "description": "Your portfolio description for SEO",
    "keywords": "your, keywords, here",
    "author": "Your Name",
    "language": "en"
  }
}
```

### Navigation

```json
{
  "navigation": {
    "brand": "Your Name",
    "menu": [
      { "id": "home", "label": "Home", "href": "#home" },
      { "id": "about", "label": "About", "href": "#about" }
    ]
  }
}
```

### Hero Section

```json
{
  "hero": {
    "title": "Your Name",
    "subtitle": "Your Professional Title",
    "description": "A brief description about yourself",
    "buttons": [
      { "text": "View My Work", "href": "#projects", "style": "primary" },
      { "text": "Get In Touch", "href": "#contact", "style": "outline" }
    ],
    "socialLinks": [
      { "platform": "GitHub", "url": "https://github.com/yourusername", "icon": "github" }
    ]
  }
}
```

### Skills

```json
{
  "skills": {
    "title": "Skills & Technologies",
    "categories": [
      {
        "name": "Frontend",
        "skills": ["JavaScript", "React", "Vue.js", "HTML5", "CSS3"]
      }
    ]
  }
}
```

### Projects

```json
{
  "projects": {
    "title": "Featured Projects",
    "items": [
      {
        "title": "Project Name",
        "description": "Project description",
        "technologies": ["React", "Node.js", "MongoDB"],
        "links": {
          "github": "https://github.com/yourusername/project",
          "demo": "https://project-demo.com"
        },
        "icon": "weather"
      }
    ]
  }
}
```

### Blog Posts

```json
{
  "blog": {
    "title": "Latest Blog Posts",
    "posts": [
      {
        "title": "Blog Post Title",
        "category": "Category",
        "date": "Dec 15, 2024",
        "readTime": "5 min read",
        "excerpt": "Blog post excerpt",
        "link": "#",
        "icon": "article"
      }
    ]
  }
}
```

### Experience Timeline

```json
{
  "experience": {
    "title": "Experience & Education",
    "timeline": [
      {
        "title": "Job Title",
        "company": "Company Name",
        "period": "2022 - Present",
        "description": "Job description",
        "achievements": [
          "Achievement 1",
          "Achievement 2"
        ]
      }
    ]
  }
}
```

### Contact Information

```json
{
  "contact": {
    "title": "Get In Touch",
    "info": {
      "title": "Let's Connect",
      "description": "Your contact description",
      "details": [
        { "label": "Email", "value": "your.email@example.com" },
        { "label": "Location", "value": "Your City, Country" },
        { "label": "Status", "value": "Available for opportunities", "status": "success" }
      ]
    },
    "form": {
      "fields": [
        { "id": "name", "label": "Name", "type": "text", "required": true },
        { "id": "email", "label": "Email", "type": "email", "required": true }
      ],
      "submitText": "Send Message",
      "successMessage": "Thank you! Your message has been sent."
    }
  }
}
```

## Available Icons

The portfolio includes a set of predefined icons for projects and blog posts:

- `github` - GitHub logo
- `linkedin` - LinkedIn logo
- `twitter` - Twitter logo
- `weather` - Weather/cloud icon
- `chart` - Bar chart icon
- `chat` - Chat bubble icon
- `check` - Checkmark icon
- `cart` - Shopping cart icon
- `star` - Star icon
- `article` - Article/document icon
- `code` - Code brackets icon
- `home` - House icon

## Customization Options

### Colors and Themes

The CSS uses CSS custom properties (variables) that can be easily modified in `style.css`:

```css
:root {
  --color-primary: #your-color;
  --color-background: #your-background;
  --color-text: #your-text-color;
}
```

### Adding New Sections

To add a new section:

1. Add the section configuration to `config.json`
2. Add the HTML structure to `index.html`
3. Add the rendering logic to `app.js`
4. Style the section in `style.css`

### Form Handling

The contact form currently simulates submission. To integrate with a real backend:

1. Modify the `handleContactForm()` method in `app.js`
2. Replace the simulated API call with your actual endpoint
3. Handle success/error responses appropriately

## File Structure

```
portfolio/
├── index.html          # Main HTML template
├── style.css           # Styles and CSS variables
├── app.js             # JavaScript application logic
├── config.json        # Configuration file
└── README.md          # This file
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Features

- Lazy loading of content
- Smooth scroll animations
- Intersection Observer for animations
- Optimized CSS with CSS custom properties
- Minimal JavaScript footprint

## Accessibility Features

- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader friendly
- High contrast support

## Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Your portfolio will be available at `https://username.github.io/repository-name`

### Netlify

1. Drag and drop your project folder to Netlify
2. Your portfolio will be deployed automatically
3. Custom domain can be configured in settings

### Vercel

1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push
3. Get a custom URL and optional custom domain

## Troubleshooting

### Content Not Loading

- Check that `config.json` is in the same directory as `index.html`
- Verify JSON syntax is valid (use a JSON validator)
- Check browser console for JavaScript errors
- Ensure you're running from a web server (not just opening the HTML file)

### Styling Issues

- Verify `style.css` is properly linked
- Check that CSS custom properties are supported in your browser
- Ensure all required fonts are available

### Form Issues

- Check that all required form fields are configured in `config.json`
- Verify form validation logic in `app.js`
- Test form submission in browser console

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this portfolio template.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you need help customizing your portfolio:

1. Check the configuration examples above
2. Review the browser console for errors
3. Validate your JSON configuration
4. Test with a minimal configuration first

## Changelog

### Version 1.0.0
- Initial release
- Full JSON configuration support
- Responsive design
- Dark/light theme switching
- Dynamic content rendering
- Contact form with validation
- Smooth animations and transitions
