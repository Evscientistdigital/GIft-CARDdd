let currentSlide = 1;
const totalSlides = 6;

// Next Slide Function
function nextSlide() {
    const current = document.querySelector(`[data-slide="${currentSlide}"]`);
    current.classList.remove('active');
    current.classList.add('prev');
    
    currentSlide++;
    if (currentSlide > totalSlides) currentSlide = 1;
    
    const next = document.querySelector(`[data-slide="${currentSlide}"]`);
    next.classList.add('active');
    
    updateProgress();
    createParticles();
    if (currentSlide === 3) createHearts();
}

// Restart Function
function restart() {
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active', 'prev');
    });
    currentSlide = 1;
    document.querySelector('[data-slide="1"]').classList.add('active');
    updateProgress();
}

// Update Progress Bar
function updateProgress() {
    const progress = (currentSlide / totalSlides) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

// Create Floating Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particlesContainer.appendChild(particle);

            setTimeout(() => particle.remove(), 7000);
        }, i * 100);
    }
}

// Create Floating Hearts
function createHearts() {
    const heartsContainer = document.getElementById('hearts');
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '💕';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heartsContainer.appendChild(heart);

            setTimeout(() => heart.remove(), 5000);
        }, i * 200);
    }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        restart();
    }
});

// Touch/Swipe Support
let startX = 0;
document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    if (endX - startX > 50) restart();
});

// Initialize
updateProgress();
createParticles();
setInterval(createParticles, 3000);
