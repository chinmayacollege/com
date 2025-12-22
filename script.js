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
            cards.forEach((card, idx) => {
                card.classList.remove('active');
                const video = card.querySelector('video');
                if (video) {
                    // Mute all videos by default
                    video.muted = true;
                }
            });

            // Normalize rotation to 0-3 index
            let normalizedRotation = ((rotation % 360) + 360) % 360;
            let index = Math.round(normalizedRotation / 90);
            // Invert index because rotation negative is forward
            let finalIndex = (index === 0) ? 0 : (4 - index) % 4;

            if (cards[finalIndex]) {
                cards[finalIndex].classList.add('active');
                const activeVideo = cards[finalIndex].querySelector('video');

                if (activeVideo) {
                    // Unmute for videos 1 and 3 (index 1 and 3)
                    // Video 0: college-function.mp4 (muted)
                    // Video 1: college-highlight-1.mp4 (unmuted)
                    // Video 2: college-highlight-2.mp4 (muted)
                    // Video 3: college-highlight-3.mp4 (unmuted)
                    if (finalIndex === 1 || finalIndex === 3) {
                        activeVideo.muted = false;
                        activeVideo.volume = 0.7; // Set volume to 70%
                    }
                }
            }
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

        videos.forEach((video, index) => {
            const card = video.closest('.video-carousel-card');

            // Create fullscreen button overlay
            const fullscreenBtn = document.createElement('div');
            fullscreenBtn.className = 'video-fullscreen-btn';
            fullscreenBtn.innerHTML = '⛶';
            fullscreenBtn.setAttribute('aria-label', 'Enter fullscreen');
            fullscreenBtn.setAttribute('role', 'button');
            fullscreenBtn.setAttribute('tabindex', '0');
            card.appendChild(fullscreenBtn);

            // Function to request fullscreen with enhanced mobile support
            const openFullscreen = (elem) => {
                return new Promise((resolve, reject) => {
                    try {
                        // Try standard fullscreen API first
                        if (elem.requestFullscreen) {
                            elem.requestFullscreen()
                                .then(() => {
                                    console.log('Fullscreen activated (standard)');
                                    resolve();
                                })
                                .catch(err => {
                                    console.log('Standard fullscreen failed:', err);
                                    reject(err);
                                });
                        }
                        // Webkit (Safari desktop)
                        else if (elem.webkitRequestFullscreen) {
                            elem.webkitRequestFullscreen();
                            console.log('Fullscreen activated (webkit)');
                            resolve();
                        }
                        // iOS Safari - use native fullscreen
                        else if (elem.webkitEnterFullscreen) {
                            elem.webkitEnterFullscreen();
                            console.log('Fullscreen activated (iOS)');
                            resolve();
                        }
                        // IE11
                        else if (elem.msRequestFullscreen) {
                            elem.msRequestFullscreen();
                            console.log('Fullscreen activated (IE)');
                            resolve();
                        }
                        // Fallback: try to play in current view
                        else {
                            console.log('Fullscreen API not supported, playing inline');
                            elem.play();
                            reject(new Error('Fullscreen not supported'));
                        }
                    } catch (err) {
                        console.error('Fullscreen error:', err);
                        reject(err);
                    }
                });
            };

            // Enhanced fullscreen button handler with touch support
            const handleFullscreenRequest = (e) => {
                e.preventDefault();
                e.stopPropagation();

                console.log('Fullscreen button clicked/tapped');

                openFullscreen(video)
                    .then(() => {
                        // Auto-play after entering fullscreen
                        setTimeout(() => {
                            video.play().catch(err => console.log('Play error:', err));
                        }, 200);
                    })
                    .catch(err => {
                        console.log('Could not enter fullscreen:', err);
                        // Fallback: just play the video
                        video.play().catch(playErr => console.log('Play fallback error:', playErr));
                    });
            };

            // Add both click and touch events for better compatibility
            fullscreenBtn.addEventListener('click', handleFullscreenRequest);
            fullscreenBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                handleFullscreenRequest(e);
            }, { passive: false });

            // Make button more visible when video is active
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        if (card.classList.contains('active')) {
                            fullscreenBtn.style.opacity = '1';
                            fullscreenBtn.style.pointerEvents = 'auto';
                        } else {
                            fullscreenBtn.style.opacity = '0.7';
                        }
                    }
                });
            });

            observer.observe(card, { attributes: true });

            // Desktop click handler for video area
            video.addEventListener('click', (e) => {
                // Only on desktop (non-touch devices)
                if (!('ontouchstart' in window)) {
                    const rect = video.getBoundingClientRect();
                    const clickY = e.clientY - rect.top;
                    // Click on upper part of video (not controls)
                    if (clickY < rect.height * 0.8) {
                        openFullscreen(video)
                            .then(() => {
                                setTimeout(() => video.play(), 100);
                            })
                            .catch(err => console.log('Desktop fullscreen error:', err));
                    }
                }
            });
        });
    }
});
