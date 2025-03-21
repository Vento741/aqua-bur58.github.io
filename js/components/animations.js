/**
 * Скрипт для управления анимациями на сайте "Вода-даром.ру"
 * Файл: js/components/animations.js
 */

// Глобальные функции, чтобы они были доступны из main.js
window.initScrollAnimations = initScrollAnimations;
window.initWaterEffects = initWaterEffects;
window.initCounters = initCounters;
window.initRippleEffect = initRippleEffect;
window.initBackToTop = initBackToTop;
window.initLazyLoad = initLazyLoad;
window.initParallaxEffects = initParallaxEffects;
window.showNotification = showNotification;
window.createWaterRipple = createWaterRipple;

// Инициализация всех анимаций при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initWaterEffects();
    initCounters();
    initRippleEffect();
    initBackToTop();
    initLazyLoad();
    initParallaxEffects();
});

/**
 * Инициализация анимаций при скролле страницы
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Функция проверки видимости элемента в области просмотра
    const isElementInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        const offset = 100; // Дополнительный отступ
        return (
            rect.top <= window.innerHeight - offset &&
            rect.bottom >= 0
        );
    };

    // Проверка и анимация видимых элементов
    const checkVisibility = () => {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    };

    // Запуск проверки при загрузке и скролле
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
}

/**
 * Инициализация водных эффектов (пузырьки, волны)
 */
function initWaterEffects() {
    // Создание пузырьков в элементах с классом .bubbles-container
    const bubblesContainers = document.querySelectorAll('.bubbles-container');

    bubblesContainers.forEach(container => {
        // Очищаем уже существующие пузырьки
        const existingBubbles = container.querySelectorAll('.bubble');
        existingBubbles.forEach(bubble => bubble.remove());

        // Создаем новые пузырьки
        for (let i = 0; i < 7; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            container.appendChild(bubble);
        }
    });

    // Анимация плавающих элементов
    const floatingElements = document.querySelectorAll('.float-element');
    floatingElements.forEach((element, index) => {
        // Назначаем разные задержки для каждого элемента
        const delay = index * 0.5;
        element.style.animationDelay = `${delay}s`;
    });
}

/**
 * Инициализация счетчиков чисел
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');

    // Функция для анимации счетчика от 0 до заданного значения
    const animateCounter = (counter, target) => {
        let start = 0;
        const duration = 2000; // Длительность анимации в мс
        const step = timestamp => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const value = Math.floor(progress * target);
            counter.textContent = value;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                counter.textContent = target; // Убедимся, что финальное значение точное
            }
        };

        window.requestAnimationFrame(step);
    };

    // Отслеживание момента, когда счетчик появляется в области просмотра
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target') || counter.textContent, 10);
                animateCounter(counter, target);
                observer.unobserve(counter); // Прекращаем наблюдение после запуска анимации
            }
        });
    }, { threshold: 0.5 });

    // Начинаем отслеживание всех счетчиков
    counters.forEach(counter => {
        counter.textContent = '0'; // Начинаем с нуля
        observer.observe(counter);
    });
}

/**
 * Добавление эффекта ряби при клике на кнопки и карточки
 */
function initRippleEffect() {
    const elements = document.querySelectorAll('.btn, .card-hover-effect');

    elements.forEach(element => {
        element.addEventListener('click', function(e) {
            // Создаем элемент эффекта
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            this.appendChild(ripple);

            // Устанавливаем позицию и размеры эффекта
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            // Удаляем элемент после завершения анимации
            ripple.addEventListener('animationend', function() {
                ripple.remove();
            });
        });
    });
}

/**
 * Инициализация кнопки "Наверх"
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');

    if (!backToTopButton) return;

    // Показываем кнопку, когда пользователь прокрутил вниз на 300px
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Плавная прокрутка наверх при клике
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Ленивая загрузка изображений
 */
function initLazyLoad() {
    // Используем Intersection Observer для определения, когда изображение появляется в области просмотра
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Устанавливаем src из data-src

                // После загрузки удаляем класс lazy-image и обработчик
                img.onload = () => {
                    img.classList.remove('lazy-image');
                    img.classList.add('fade-in');
                    delete img.dataset.src;
                };

                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Эффекты параллакса для фоновых элементов
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const offset = element.offsetTop;
            const position = (scrollTop - offset) * speed;

            element.style.transform = `translateY(${position}px)`;
        });
    });
}

/**
 * Создание уведомлений
 * @param {string} message - текст уведомления
 * @param {string} type - тип уведомления (success, error, warning, info)
 * @param {number} duration - длительность показа в мс
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    // Добавляем содержимое уведомления
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        </div>
        <div class="notification-content">${message}</div>
        <button class="notification-close">&times;</button>
    `;

    // Добавляем на страницу
    document.body.appendChild(notification);

    // Показываем уведомление
    setTimeout(() => {
        notification.classList.add('visible');
    }, 10);

    // Обработчик закрытия
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.classList.remove('visible');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });

    // Автоматическое скрытие через указанное время
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

/**
 * Создание эффекта ряби на воде
 * @param {HTMLElement} container - контейнер для эффекта
 */
function createWaterRipple(container) {
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const droplet = document.createElement('div');
    droplet.className = 'water-droplet';

    // Случайное положение капли
    const x = Math.random() * width;
    const y = Math.random() * height;

    droplet.style.left = `${x}px`;
    droplet.style.top = `${y}px`;

    container.appendChild(droplet);

    // Удаляем каплю после окончания анимации
    droplet.addEventListener('animationend', () => {
        droplet.remove();
    });
}