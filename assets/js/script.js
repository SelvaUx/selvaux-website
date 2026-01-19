// JavaScript for Scroll-Triggered Animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the section must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // JavaScript for Profile Image Tilt Effect
    const profilePic = document.getElementById('profile-pic');
    if (profilePic) {
        const profilePicContainer = profilePic.parentElement; // The container for perspective

        profilePicContainer.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = profilePicContainer.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Calculate tilt based on mouse position relative to the center of the image
            const rotateY = (mouseX - centerX) / (width / 2) * 10; // Max 10 degrees tilt
            const rotateX = -((mouseY - centerY) / (height / 2) * 10); // Max 10 degrees tilt, inverted for natural feel

            profilePic.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        profilePicContainer.addEventListener('mouseleave', () => {
            profilePic.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'; // Reset on mouse leave
        });
    }
});
