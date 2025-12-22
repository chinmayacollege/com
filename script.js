document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            document.querySelector('.navbar').classList.toggle('menu-open');
            const icon = navLinks.classList.contains('active') ? '✕' : '☰';
            mobileMenuBtn.textContent = icon;
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                document.querySelector('.navbar').classList.remove('menu-open');
                mobileMenuBtn.textContent = '☰';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && e.target !== mobileMenuBtn) {
                navLinks.classList.remove('active');
                document.querySelector('.navbar').classList.remove('menu-open');
                mobileMenuBtn.textContent = '☰';
            }
        });
    }

    // Ripple Effect for Buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            this.appendChild(ripples);

            setTimeout(() => {
                ripples.remove();
            }, 1000);
        });
    });

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add visible class styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    // WhatsApp Form Submission Handler
    const handleWhatsAppSubmission = (e, type) => {
        e.preventDefault();
        const phoneNumber = '919482862413';
        let message = '';

        if (type === 'contact') {
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const msg = document.getElementById('contactMessage').value;

            message = `*New Contact Message*\n\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${msg}`;
        } else if (type === 'admission') {
            const name = document.getElementById('admissionName').value;
            const email = document.getElementById('admissionEmail').value;
            const program = document.getElementById('admissionProgram').value;

            message = `*New Admission Inquiry*\n\n*Name:* ${name}\n*Email:* ${email}\n*Program:* ${program}`;
        }

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => handleWhatsAppSubmission(e, 'contact'));
    }

    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => handleWhatsAppSubmission(e, 'admission'));
    }

    // Dynamic Gallery Rotation
    const galleryContainer = document.querySelector('.dynamic-gallery');
    if (galleryContainer) {
        const images = galleryContainer.querySelectorAll('img');
        let currentIndex = 0;

        setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 4000); // Change image every 4 seconds
    }


    // 3D Video Carousel Rotation & Navigation
    const carouselSection = document.querySelector('.video-carousel-container');
    const carouselVideo = document.querySelector('.video-carousel');
    const cards = document.querySelectorAll('.video-carousel-card');
    const nextBtn = document.querySelector('.nav-btn.next');
    const prevBtn = document.querySelector('.nav-btn.prev');

    if (carouselSection && carouselVideo && cards.length > 0) {
        let rotation = 0;
        let isPaused = false;

        const updateActiveCard = () => {
            cards.forEach(card => card.classList.remove('active'));
            // Normalize rotation to 0-3 index
            let normalizedRotation = ((rotation % 360) + 360) % 360;
            let index = Math.round(normalizedRotation / 90);
            // Invert index because rotation negative is forward
            let finalIndex = (index === 0) ? 0 : (4 - index) % 4;
            if (cards[finalIndex]) cards[finalIndex].classList.add('active');
        };

        const rotateNext = () => {
            rotation -= 90;
            carouselVideo.style.transform = `rotateY(${rotation}deg)`;
            updateActiveCard();
        };

        const rotatePrev = () => {
            rotation += 90;
            carouselVideo.style.transform = `rotateY(${rotation}deg)`;
            updateActiveCard();
        };

        let interval = setInterval(() => {
            if (!isPaused) rotateNext();
        }, 3000);

        const resetTimer = () => {
            clearInterval(interval);
            interval = setInterval(() => {
                if (!isPaused) rotateNext();
            }, 3000);
        };

        if (nextBtn) nextBtn.addEventListener('click', () => {
            rotateNext();
            resetTimer();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            rotatePrev();
            resetTimer();
        });

        carouselSection.addEventListener('mouseenter', () => isPaused = true);
        carouselSection.addEventListener('mouseleave', () => isPaused = false);

        carouselSection.addEventListener('touchstart', () => {
            isPaused = true;
            setTimeout(() => { isPaused = false; }, 5000);
        });

        // Fullscreen functionality for videos
        const videos = document.querySelectorAll('.video-carousel-card video');

        videos.forEach(video => {
            // Function to request fullscreen with cross-browser support
            const openFullscreen = (elem) => {
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) { /* Safari */
                    elem.webkitRequestFullscreen();
                } else if (elem.webkitEnterFullscreen) { /* iOS Safari */
                    elem.webkitEnterFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE11 */
                    elem.msRequestFullscreen();
                }
            };

            // Click event to open fullscreen
            video.addEventListener('click', (e) => {
                // Don't interfere with native controls
                if (e.target === video) {
                    openFullscreen(video);
                    // Auto-play when entering fullscreen
                    video.play();
                }
            });

            // Double-tap for mobile devices
            let lastTap = 0;
            video.addEventListener('touchend', (e) => {
                const currentTime = new Date().getTime();
                const tapLength = currentTime - lastTap;
                if (tapLength < 300 && tapLength > 0) {
                    e.preventDefault();
                    openFullscreen(video);
                    video.play();
                }
                lastTap = currentTime;
            });
        });
    }
});
