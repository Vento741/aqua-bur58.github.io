/**
 * Главный JavaScript файл для сайта "Аква-Бур58"
 * Файл: js/main.js
 */

// Инициализация основных функций сайта
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен, инициализируем функции');

    // Инициализируем компоненты напрямую
    // Проверяем, доступны ли функции в глобальном контексте
    if (typeof initAnimations === 'function') initAnimations();
    if (typeof initWaveEffects === 'function') initWaveEffects();
    if (typeof initMobileMenu === 'function') initMobileMenu();
    if (typeof initScrollSpy === 'function') initScrollSpy();
    if (typeof initBackToTop === 'function') initBackToTop();
    if (typeof initPreloader === 'function') initPreloader();
    if (typeof initLazyImages === 'function') initLazyImages();
    if (typeof initServiceFilters === 'function') initServiceFilters();
    if (typeof initTestimonialsSlider === 'function') initTestimonialsSlider();
    if (typeof initFaqAccordion === 'function') initFaqAccordion();
    if (typeof initContactForm === 'function') initContactForm();
    if (typeof initFixedHeader === 'function') initFixedHeader();
    if (typeof initNewsletterForm === 'function') initNewsletterForm();

    // Анимация волн в футере
    initFooterWaves();
});

/**
 * Инициализация анимаций на странице
 */
function initAnimations() {
    console.log('Инициализация анимаций');
    // Эта функция вызывает методы из animations.js
}

/**
 * Инициализация водных эффектов
 */
function initWaveEffects() {
    console.log('Инициализация водных эффектов');
    // Эта функция вызывает методы из waves.js
}

/**
 * Инициализация мобильного меню
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.navbar-toggler');
    const mobileMenu = document.querySelector('.navbar-collapse');

    if (!menuToggle || !mobileMenu) return;

    // Обработчики событий
    menuToggle.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
    });

    // Закрытие меню при клике на ссылку
    const menuLinks = document.querySelectorAll('.nav-link');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('show')) {
                menuToggle.click();
            }
        });
    });
}

/**
 * Инициализация отслеживания скролла для подсветки пунктов меню
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Функция обновления активного пункта меню
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100; // Небольшой отступ

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Удаляем активный класс со всех ссылок
                navLinks.forEach(link => link.classList.remove('active'));

                // Добавляем активный класс нужной ссылке
                document.querySelectorAll(`.nav-link[href="#${sectionId}"]`).forEach(link => {
                    link.classList.add('active');
                });
            }
        });
    }

    // Обработчик события скролла
    window.addEventListener('scroll', updateActiveLink);

    // Плавная прокрутка при клике на ссылки
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Отступ для фиксированного хедера
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Инициализация при загрузке
    updateActiveLink();
}

/**
 * Инициализация кнопки "Наверх"
 */
function initBackToTop() {
    const scrollTopButton = document.getElementById('scrollTop');

    if (scrollTopButton) {
        // Показываем/скрываем кнопку при скролле
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopButton.classList.add('visible');
            } else {
                scrollTopButton.classList.remove('visible');
            }
        });

        // Прокрутка наверх при клике
        scrollTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Инициализация прелоадера
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');

    if (preloader) {
        // Скрываем прелоадер после загрузки страницы
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';

            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
}

/**
 * Инициализация ленивой загрузки изображений
 */
function initLazyImages() {
    // Проверяем поддержку IntersectionObserver
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback для браузеров без поддержки IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');

        function lazyLoad() {
            lazyImages.forEach(img => {
                if (isElementInViewport(img)) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
            });
        }

        // Запускаем загрузку при скролле
        window.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);

        // Загрузка видимых изображений при загрузке страницы
        lazyLoad();
    }
}

/**
 * Проверка видимости элемента в области просмотра
 * @param {HTMLElement} el - проверяемый элемент
 * @returns {boolean} - находится ли элемент в области просмотра
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Инициализация фильтров услуг
 */
function initServiceFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceItems = document.querySelectorAll('.service-item');

    if (filterButtons.length && serviceItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Удаляем активный класс со всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Добавляем активный класс на текущую кнопку
                button.classList.add('active');

                // Получаем выбранный фильтр
                const filter = button.getAttribute('data-filter');

                // Анимированная фильтрация услуг
                serviceItems.forEach(item => {
                    // Сначала скрываем все элементы
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';

                            // Добавляем небольшую задержку перед показом
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            item.style.display = 'none';
                        }
                    }, 300);
                });

                // Эффект волны от кнопки фильтра
                const wave = document.createElement('span');
                wave.classList.add('filter-wave');
                button.appendChild(wave);

                setTimeout(() => {
                    wave.remove();
                }, 1000);
            });
        });

        // Инициализация эффектов для карточек услуг
        initServiceCardEffects();
    }
}

/**
 * Инициализация эффектов для карточек услуг
 */
function initServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        // Эффект при наведении на карточку
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');

            // Создаем эффект переливающегося блика
            const reflection = document.createElement('div');
            reflection.classList.add('card-reflection');
            this.appendChild(reflection);

            // Анимируем блик
            setTimeout(() => {
                reflection.style.opacity = '1';
                reflection.style.transform = 'translateX(100%)';
            }, 10);

            // Удаляем блик после анимации
            setTimeout(() => {
                reflection.remove();
            }, 1000);
        });

        // Убираем эффекты при уходе мыши
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');

            // Удаляем блик, если он есть
            const reflection = this.querySelector('.card-reflection');
            if (reflection) {
                reflection.remove();
            }
        });

        // Эффект при нажатии на кнопки
        const buttons = card.querySelectorAll('.btn-service');
        buttons.forEach(button => {
            button.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(2px)';
            });

            button.addEventListener('mouseup', function() {
                this.style.transform = '';
            });

            button.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    });
}

/**
 * Инициализация слайдера отзывов
 */
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;

    const track = slider.querySelector('.testimonials-track');
    const slides = slider.querySelectorAll('.testimonial-item');
    const dotsContainer = slider.querySelector('.testimonials-dots');
    const prevButton = slider.querySelector('.nav-prev');
    const nextButton = slider.querySelector('.nav-next');

    if (slides.length <= 1) return;

    let currentIndex = 0;
    let autoplayInterval;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Настройка размеров слайдера при загрузке и ресайзе
    function setSizes() {
        const sliderWidth = slider.offsetWidth;
        // Устанавливаем ширину трека
        track.style.width = `${slides.length * 100}%`;

        // Устанавливаем ширину каждого слайда
        slides.forEach(slide => {
            slide.style.width = `${100 / slides.length}%`;
        });

        // Убедимся, что текст внутри слайдов нормально переносится
        const textBlocks = slider.querySelectorAll('.testimonial-text p');
        textBlocks.forEach(block => {
            block.style.maxWidth = `${sliderWidth - 100}px`;
        });
    }

    // Создаем точки навигации
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Переключаем на нужный слайд
    function goToSlide(index) {
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        // Анимация перехода
        track.style.transition = 'transform 0.5s ease';
        track.style.transform = `translateX(-${index * 100}%)`;

        // Обновляем активную точку
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Анимация появления текста
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.opacity = '1';
            } else {
                slide.style.opacity = '0.5';
            }
        });

        currentIndex = index;
        resetAutoplay();
    }

    // Следующий слайд
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // Предыдущий слайд
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Автопрокрутка
    function startAutoplay() {
        if (autoplayInterval) clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    // Сброс автопрокрутки
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Обработчики событий касания для мобильных устройств    
    function touchStart(event) {
        isDragging = true;
        startPos = getPositionX(event);

        track.style.transition = 'none';

        document.addEventListener('touchmove', touchMove);
        document.addEventListener('touchend', touchEnd);
    }

    function touchMove(event) {
        if (!isDragging) return;

        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;

        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function touchEnd() {
        isDragging = false;

        const movedBy = currentTranslate - prevTranslate;

        // Если перемещение было значительным, переходим к следующему/предыдущему слайду
        if (movedBy < -100) {
            nextSlide();
        } else if (movedBy > 100) {
            prevSlide();
        } else {
            goToSlide(currentIndex);
        }

        document.removeEventListener('touchmove', touchMove);
        document.removeEventListener('touchend', touchEnd);
    }

    function getPositionX(event) {
        return event.type.includes('touch') ?
            event.touches[0].clientX :
            event.clientX;
    }

    // Привязка событий
    function bindEvents() {
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        track.addEventListener('touchstart', touchStart);

        // Остановка автопрокрутки при наведении на слайдер      
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        slider.addEventListener('mouseleave', () => {
            startAutoplay();
        });

        // Пересчет размеров при изменении окна
        window.addEventListener('resize', setSizes);
    }

    // Инициализация слайдера
    function init() {
        setSizes();
        createDots();
        bindEvents();
        startAutoplay();

        // Анимация первого слайда при загрузке
        setTimeout(() => {
            slides[0].style.opacity = '1';
        }, 300);
    }

    // Запускаем слайдер
    init();
}

/**
 * Инициализация аккордеона FAQ
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.accordion-item');
    const faqButtons = document.querySelectorAll('.accordion-button');

    if (faqItems.length) {
        console.log('FAQ аккордеон инициализирован');

        // Добавим плавную анимацию при открытии/закрытии
        faqButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Добавим небольшую задержку для анимации
                setTimeout(() => {
                    const isExpanded = this.getAttribute('aria-expanded') === 'true';
                    const collapseElement = document.querySelector(this.getAttribute('data-bs-target'));

                    if (isExpanded && collapseElement) {
                        // Если открыт - плавно прокрутим к нему
                        collapseElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }, 350);
            });
        });

        // Инициализация поиска по FAQ (если есть поле поиска)
        const faqSearch = document.querySelector('.faq-search input');
        if (faqSearch) {
            faqSearch.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();

                faqButtons.forEach(button => {
                    const questionText = button.textContent.toLowerCase();
                    const accordionItem = button.closest('.accordion-item');
                    const collapseId = button.getAttribute('data-bs-target');
                    const collapseContent = document.querySelector(collapseId);
                    const answerText = collapseContent ? collapseContent.textContent.toLowerCase() : '';

                    if (searchTerm === '' || questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                        accordionItem.style.display = 'block';
                        // Подсветим совпадения, если есть поисковый запрос
                        if (searchTerm !== '') {
                            button.innerHTML = highlightText(button.textContent, searchTerm);
                        }
                    } else {
                        accordionItem.style.display = 'none';
                    }
                });
            });

            // Функция для подсветки совпадений
            function highlightText(text, term) {
                const regex = new RegExp(`(${term})`, 'gi');
                return text.replace(regex, '<span class="highlight">$1</span>');
            }
        }
    }
}

/**
 * Инициализация контактной формы
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Валидация формы по мере ввода
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });

        // Для select элементов
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', function() {
                validateInput(this);
            });
        }
    });

    // Анимация форм-контролов при фокусе
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Обработка отправки формы
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Проверка валидности всех полей
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Показать состояние отправки
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Отправка...';

            // Имитация задержки отправки
            setTimeout(() => {
                const formData = new FormData(contactForm);
                const formValues = {};

                // Собираем данные формы для отображения в сообщении
                formData.forEach((value, key) => {
                    formValues[key] = value;
                });

                // Показать сообщение об успешной отправке
                showFormSuccess(formValues);

                // Сбрасываем форму и стили валидации
                contactForm.reset();
                inputs.forEach(input => {
                    input.classList.remove('is-valid');
                    if (input.tagName === 'SELECT') {
                        // Для селектов нужно сбросить на первый option
                        input.selectedIndex = 0;
                    }
                });

                // Восстанавливаем кнопку отправки
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Отправить заявку';
            }, 1500);
        }
    });

    // Функция валидации поля
    function validateInput(input) {
        let isValid = true;
        let errorMessage = null;

        if (input.nextElementSibling && input.nextElementSibling.nextElementSibling) {
            errorMessage = input.nextElementSibling.nextElementSibling;
        }

        // Сначала сбросим прошлую валидацию
        input.classList.remove('is-invalid', 'is-valid');

        // Проверка обязательных полей
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.classList.add('is-invalid');
            if (errorMessage) {
                errorMessage.textContent = 'Это поле обязательно к заполнению';
            }
            isValid = false;
        }
        // Проверка телефона
        else if (input.id === 'phone' && input.value.trim()) {
            const phonePattern = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
            if (!phonePattern.test(input.value.trim())) {
                input.classList.add('is-invalid');
                if (errorMessage) {
                    errorMessage.textContent = 'Введите корректный номер телефона';
                }
                isValid = false;
            } else {
                input.classList.add('is-valid');
            }
        }
        // Проверка селекта
        else if (input.tagName === 'SELECT' && input.value === '') {
            input.classList.add('is-invalid');
            if (errorMessage) {
                errorMessage.textContent = 'Пожалуйста, выберите услугу';
            }
            isValid = false;
        }
        // Если поле валидно, добавляем класс is-valid
        else if (input.value.trim()) {
            input.classList.add('is-valid');
        }

        return isValid;
    }

    // Функция отображения сообщения об успешной отправке
    function showFormSuccess(formData) {
        // Создаем элемент со стилизованным сообщением об успехе
        const successMessage = document.createElement('div');
        successMessage.className = 'contact-success-message';

        let serviceName = '';
        if (formData.serviceType) {
            switch (formData.serviceType) {
                case 'drilling':
                    serviceName = 'Бурение скважины';
                    break;
                case 'abyssin':
                    serviceName = 'Абиссинская скважина';
                    break;
                case 'equipment':
                    serviceName = 'Обустройство скважины';
                    break;
                case 'repair':
                    serviceName = 'Ремонт скважины';
                    break;
                case 'other':
                    serviceName = 'Другое';
                    break;
                default:
                    serviceName = 'Не указана';
            }
        } else {
            serviceName = 'Не указана';
        }

        successMessage.innerHTML = `
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <h4>Спасибо за заявку!</h4>
            <p>Мы получили ваше сообщение и свяжемся с вами в ближайшее время.</p>
            <div class="request-details">
                <div class="request-item">
                    <span class="request-label">Имя:</span>
                    <span class="request-value">${formData.name || 'Не указано'}</span>
                </div>
                <div class="request-item">
                    <span class="request-label">Телефон:</span>
                    <span class="request-value">${formData.phone || 'Не указан'}</span>
                </div>
                <div class="request-item">
                    <span class="request-label">Услуга:</span>
                    <span class="request-value">${serviceName}</span>
                </div>
            </div>
            <button type="button" class="close-success-message">Закрыть</button>
        `;

        // Добавляем сообщение в DOM
        const formBlock = contactForm.closest('.contact-form-block');
        formBlock.appendChild(successMessage);

        // Анимация появления
        setTimeout(() => {
            successMessage.classList.add('visible');
        }, 10);

        // Добавляем обработчик для закрытия сообщения
        const closeButton = successMessage.querySelector('.close-success-message');
        closeButton.addEventListener('click', () => {
            successMessage.classList.remove('visible');
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        });

        // Автоматически скрываем через 8 секунд
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.classList.remove('visible');
                setTimeout(() => {
                    if (successMessage.parentNode) {
                        successMessage.remove();
                    }
                }, 300);
            }
        }, 8000);
    }
}

// Инициализация формы подписки на новости в футере
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (!email) {
            showToast('Пожалуйста, введите email', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showToast('Пожалуйста, введите корректный email', 'error');
            return;
        }

        // Здесь будет отправка данных на сервер
        // Имитация отправки данных
        showToast('Спасибо за подписку на нашу рассылку!', 'success');
        emailInput.value = '';
    });
}

// Проверка валидности email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функция для отображения toast-уведомлений
function showToast(message, type = 'info') {
    // Создаем элемент toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    // Добавляем на страницу
    document.body.appendChild(toast);

    // Показываем
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Скрываем через 3 секунды
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Анимация волн в футере для интерактивности
function initFooterWaves() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    // Создание волн с разной скоростью и амплитудой при прокрутке
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const isFooterVisible = isElementInViewport(footer);

        if (isFooterVisible) {
            const waves = footer.querySelectorAll('.water-wave');
            waves.forEach((wave, index) => {
                const speed = (index + 1) * 0.05;
                const amplitude = (index + 1) * 0.1;

                wave.style.transform = `translateX(${-scrollPosition * speed}%) scaleY(${1 + amplitude * Math.sin(scrollPosition * 0.01)})`;
            });
        }
    });
}

// Проверка, находится ли элемент в видимой области
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}