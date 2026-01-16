
// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mainPlayer = document.getElementById('main-player');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

function toggleMenu() {
    mobileMenu.classList.add('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-times');
}

// YouTube Player Logic
function changeVideo(id) {
    // Update Iframe
    mainPlayer.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    
    // Update Active Class in UI
    const playlistItems = document.querySelectorAll('.song-item');
    playlistItems.forEach(item => {
        item.classList.remove('active');
        // Find if this item matches the id (a bit hacky but works for demo)
        if (item.getAttribute('onclick').includes(id)) {
            item.classList.add('active');
        }
    });

    // Scroll back to player on small screens
    if (window.innerWidth < 1024) {
        document.getElementById('musicas').scrollIntoView({ behavior: 'smooth' });
    }
}

// Gallery Lightbox
function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Lock scroll
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = 'auto'; // Unlock scroll
}

// Close Lightbox with Escape Key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// Simple Scroll Animation Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

document.querySelectorAll('section > div').forEach(el => {
    el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
    observer.observe(el);
});
