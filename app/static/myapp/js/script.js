document.addEventListener('DOMContentLoaded', () => {
    const state = {
        currentSlide: 0,
        totalSlides: 6,
        autoplayInterval: null,
        peoCurrentSlide: 0,
        peoslidesTotal: 4,
        peoAutoplayInterval: null,
        slides: [
            {
                name: "Isaac Toluwalase",
                role: "Team Lead",
                image: "/assets/team/isaac.jpg"
            },
            {
                name: "Okereke Emmanuel",
                role: "Technical Lead",
                image: "/assets/team/emmanuel.jpg"
            },
            {
                name: "Ezekwe Daniel",
                role: "Frontend Developer",
                image: "/assets/team/daniel.jpg"
            },
            {
                name: "Hammed Omotayo",
                role: "Backend Developer",
                image: "/assets/team/omotayo.jpg"
            },
            {
                name: "Ikechukwu Alozie",
                role: "UI/UX Designer",
                image: "/assets/team/ikechukwu.jpg"
            },
            {
                name: "Lawal Abdulwarith",
                role: "Quality Assurance",
                image: "/assets/team/lawal.jpg"
            }
        ],
        peoSlides: [
            {
                title: "Mastering Digital Electronics",
                description: "Provides theoretical and practical expertise in circuits, computers, machinery, and programmable controls.",
                icon: "/assets/icons/digital-electronics.svg"
            },
            {
                title: "Expertise in Application",
                description: "Demonstrate expertise in electrical and electronics engineering to support design, application, and maintenance needs.",
                icon: "/assets/icons/application.svg"
            },
            {
                title: "Modern Solutions",
                description: "Apply mathematics, science, engineering, and technology knowledge to solve diverse engineering problems.",
                icon: "/assets/icons/solutions.svg"
            },
            {
                title: "Expertise in Power Systems",
                description: "To gain expertise in Electrical & Electronics Engineering and develop skills for issue analysis in power generation and distribution.",
                icon: "/assets/icons/power-systems.svg"
            }
        ]
    };

    function createSlideElement(slide, type) {
        const slideElement = document.createElement('div');
        slideElement.className = 'slide';
        slideElement.setAttribute('role', 'tabpanel');
        slideElement.setAttribute('aria-label', slide.name || slide.title);

        if (type === 'team') {
            slideElement.innerHTML = `
                <div class="slide-content">
                    <h3>${slide.name}</h3>
                    <p>${slide.role}</p>
                </div>
            `;
        } else {
            slideElement.innerHTML = `
                <div class="slide-content">
                    <h3>${slide.title}</h3>
                    <p>${slide.description}</p>
                </div>
            `;
        }

        return slideElement;
    }

    function initializeSliders() {
        const mainSlider = document.querySelector('.slides');
        const peoSlider = document.querySelector('.peo-slides');

        if (mainSlider) {
            mainSlider.setAttribute('role', 'tablist');
            state.slides.forEach(slide => {
                mainSlider.appendChild(createSlideElement(slide, 'team'));
            });
        }

        if (peoSlider) {
            peoSlider.setAttribute('role', 'tablist');
            state.peoSlides.forEach(slide => {
                peoSlider.appendChild(createSlideElement(slide, 'peo'));
            });
        }

        initializeIndicators();
        startAutoplay();
    }

    function createIndicator(index, total, type) {
        const button = document.createElement('button');
        button.className = `indicator ${index === 0 ? 'active' : ''}`;
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        button.setAttribute('aria-label', `Go to ${type} ${index + 1} of ${total}`);
        button.setAttribute('tabindex', index === 0 ? '0' : '-1');
        return button;
    }

    function initializeIndicators() {
        const mainIndicators = document.querySelector('.slider-indicators');
        const peoIndicators = document.querySelector('.peo-indicators');

        if (mainIndicators) {
            state.slides.forEach((_, index) => {
                const button = createIndicator(index, state.totalSlides, 'team member');
                button.addEventListener('click', () => goToSlide(index));
                button.addEventListener('keydown', handleIndicatorKeydown);
                mainIndicators.appendChild(button);
            });
        }

        if (peoIndicators) {
            state.peoSlides.forEach((_, index) => {
                const button = createIndicator(index, state.peoslidesTotal, 'objective');
                button.addEventListener('click', () => goToPeoSlide(index));
                button.addEventListener('keydown', handleIndicatorKeydown);
                peoIndicators.appendChild(button);
            });
        }
    }

    function handleIndicatorKeydown(event) {
        const isMainSlider = event.target.closest('.slider-indicators');
        const indicators = isMainSlider
            ? document.querySelectorAll('.slider-indicators .indicator')
            : document.querySelectorAll('.peo-indicators .indicator');
        const currentIndex = Array.from(indicators).indexOf(event.target);

        switch (event.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                event.preventDefault();
                navigateIndicators(indicators, currentIndex, 1);
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                event.preventDefault();
                navigateIndicators(indicators, currentIndex, -1);
                break;
            case 'Home':
                event.preventDefault();
                navigateIndicators(indicators, currentIndex, -currentIndex);
                break;
            case 'End':
                event.preventDefault();
                navigateIndicators(indicators, currentIndex, indicators.length - 1 - currentIndex);
                break;
        }
    }

    function navigateIndicators(indicators, currentIndex, direction) {
        const newIndex = (currentIndex + direction + indicators.length) % indicators.length;
        indicators[newIndex].focus();
        indicators[newIndex].click();
    }

    function goToSlide(index) {
        state.currentSlide = index;
        updateSlides();
    }

    function goToPeoSlide(index) {
        state.peoCurrentSlide = index;
        updatePeoSlides();
    }

    function updateSlides() {
        const mainSlider = document.querySelector('.slides');
        const indicators = document.querySelectorAll('.slider-indicators .indicator');
        const slides = document.querySelectorAll('.slides .slide');

        if (mainSlider) {
            mainSlider.style.transform = `translateX(-${state.currentSlide * 100}%)`;

            indicators.forEach((indicator, index) => {
                const isActive = index === state.currentSlide;
                indicator.classList.toggle('active', isActive);
                indicator.setAttribute('aria-selected', isActive);
                indicator.setAttribute('tabindex', isActive ? '0' : '-1');
            });

            slides.forEach((slide, index) => {
                slide.setAttribute('aria-hidden', index !== state.currentSlide);
                slide.setAttribute('tabindex', index === state.currentSlide ? '0' : '-1');
            });
        }
    }

    function updatePeoSlides() {
        const peoSlider = document.querySelector('.peo-slides');
        const indicators = document.querySelectorAll('.peo-indicators .indicator');
        const slides = document.querySelectorAll('.peo-slides .slide');

        if (peoSlider) {
            peoSlider.style.transform = `translateX(-${state.peoCurrentSlide * 100}%)`;

            indicators.forEach((indicator, index) => {
                const isActive = index === state.peoCurrentSlide;
                indicator.classList.toggle('active', isActive);
                indicator.setAttribute('aria-selected', isActive);
                indicator.setAttribute('tabindex', isActive ? '0' : '-1');
            });

            slides.forEach((slide, index) => {
                slide.setAttribute('aria-hidden', index !== state.peoCurrentSlide);
                slide.setAttribute('tabindex', index === state.peoCurrentSlide ? '0' : '-1');
            });
        }
    }

    function startAutoplay() {
        stopAutoplay();

        state.autoplayInterval = setInterval(() => {
            state.currentSlide = (state.currentSlide + 1) % state.totalSlides;
            updateSlides();
        }, 5000);

        state.peoAutoplayInterval = setInterval(() => {
            state.peoCurrentSlide = (state.peoCurrentSlide + 1) % state.peoslidesTotal;
            updatePeoSlides();
        }, 5000);
    }

    function stopAutoplay() {
        if (state.autoplayInterval) {
            clearInterval(state.autoplayInterval);
        }
        if (state.peoAutoplayInterval) {
            clearInterval(state.peoAutoplayInterval);
        }
    }

    function initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-item');
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const nav = document.querySelector('.nav-links');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        mobileMenuButton.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });

        if (mobileMenuButton && nav) {
            mobileMenuButton.addEventListener('click', () => {
                const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
                mobileMenuButton.setAttribute('aria-expanded', (!isExpanded).toString());
                nav.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                    nav.classList.remove('active');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    function initializeAnimations() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            observer.observe(element);
        });
    }

    function initializeSliderControls() {
        const sliderButtons = document.querySelectorAll('.slider-button');
        const peoButtons = document.querySelectorAll('.peo-button');

        sliderButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('prev')) {
                    state.currentSlide = (state.currentSlide - 1 + state.totalSlides) % state.totalSlides;
                } else {
                    state.currentSlide = (state.currentSlide + 1) % state.totalSlides;
                }
                updateSlides();
            });
        });

        peoButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('prev')) {
                    state.peoCurrentSlide = (state.peoCurrentSlide - 1 + state.peoslidesTotal) % state.peoslidesTotal;
                } else {
                    state.peoCurrentSlide = (state.peoCurrentSlide + 1) % state.peoslidesTotal;
                }
                updatePeoSlides();
            });
        });
    }

    function initializeSliderInteractions() {
        const sliders = document.querySelectorAll('.slider-container, .objectives-slider');

        sliders.forEach(slider => {
            let touchStartX = 0;
            let touchEndX = 0;

            slider.addEventListener('mouseenter', stopAutoplay);
            slider.addEventListener('mouseleave', startAutoplay);
            slider.addEventListener('focusin', stopAutoplay);
            slider.addEventListener('focusout', startAutoplay);

            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe(slider, touchStartX, touchEndX);
            }, { passive: true });
        });
    }

    function handleSwipe(slider, startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (slider.classList.contains('slider-container')) {
                if (diff > 0) {
                    state.currentSlide = (state.currentSlide + 1) % state.totalSlides;
                } else {
                    state.currentSlide = (state.currentSlide - 1 + state.totalSlides) % state.totalSlides;
                }
                updateSlides();
            } else {
                if (diff > 0) {
                    state.peoCurrentSlide = (state.peoCurrentSlide + 1) % state.peoslidesTotal;
                } else {
                    state.peoCurrentSlide = (state.peoCurrentSlide - 1 + state.peoslidesTotal) % state.peoslidesTotal;
                }
                updatePeoSlides();
            }
        }
    }

    function initialize() {
        initializeSliders();
        initializeNavigation();
        initializeAnimations();
        initializeSliderControls();
        initializeSliderInteractions();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoplay();
            } else {
                startAutoplay();
            }
        });

        window.addEventListener('resize', () => {
            updateSlides();
            updatePeoSlides();
        });
    }

    initialize();
});
