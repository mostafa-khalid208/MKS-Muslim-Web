// particles.js - Lightweight particle system for Glassmorphic UI

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    
    // Apply glassmorphism to all cards automatically
    document.querySelectorAll('.card').forEach(card => {
        if (!card.classList.contains('glass-panel')) {
            card.classList.add('glass-panel');
        }
    });
});

function initParticles() {
    // Check if container already exists
    let container = document.getElementById('particles-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'particles-container';
        document.body.prepend(container);
    }
    
    // Clear existing particles
    container.innerHTML = '';
    
    // Determine number of particles based on screen size (keep it light)
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 5px and 20px
    const size = Math.random() * 15 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random horizontal position
    particle.style.left = `${Math.random() * 100}vw`;
    
    // Random vertical start position (mostly lower half)
    particle.style.top = `${Math.random() * 50 + 50}vh`;
    
    // Random animation duration between 10s and 25s
    const duration = Math.random() * 15 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 10}s`;
    
    container.appendChild(particle);
}

// Re-init on resize to ensure good coverage
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initParticles, 500);
});
