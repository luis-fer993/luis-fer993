// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Typing Effect for Hero Title - Fixed to preserve HTML structure
function typeWriter(element, htmlContent, speed = 50) {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Extract text content while preserving structure
    const textNodes = [];
    const walker = document.createTreeWalker(
        tempDiv,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    let node;
    while (node = walker.nextNode()) {
        textNodes.push({
            node: node,
            text: node.textContent,
            originalLength: node.textContent.length
        });
    }
    
    // Clear the element
    element.innerHTML = '';
    
    // Rebuild structure
    let currentNodeIndex = 0;
    let currentCharIndex = 0;
    
    function type() {
        if (currentNodeIndex < textNodes.length) {
            const currentNode = textNodes[currentNodeIndex];
            
            if (currentCharIndex === 0) {
                // Create the appropriate element for this text node
                const parent = currentNode.node.parentNode;
                if (parent && parent !== tempDiv) {
                    // This text is inside a span or other element
                    const span = document.createElement(parent.tagName.toLowerCase());
                    if (parent.className) {
                        span.className = parent.className;
                    }
                    element.appendChild(span);
                    span.appendChild(document.createTextNode(''));
                } else {
                    // This is direct text content
                    element.appendChild(document.createTextNode(''));
                }
            }
            
            const targetElement = element.lastChild;
            if (currentCharIndex < currentNode.text.length) {
                targetElement.textContent += currentNode.text[currentCharIndex];
                currentCharIndex++;
                setTimeout(type, speed);
            } else {
                currentNodeIndex++;
                currentCharIndex = 0;
                setTimeout(type, speed);
            }
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalHTML = heroTitle.innerHTML;
        typeWriter(heroTitle, originalHTML, 50);
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic Year in Footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} Your Name. All rights reserved.`;
}

// Add active class to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Project Card Hover Effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .nav-link.active {
        color: var(--accent);
    }
`;
document.head.appendChild(style);
