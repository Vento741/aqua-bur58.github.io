/**
 * Файл: js/components/navigation.js
 * Скрипт для управления навигацией и прокруткой на сайте
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех функций навигации
    initSmoothScroll();
    initActiveNavLinks();
    initFixedHeader();
    initMobileMenu();
    initBackToTop();
});

/**
 * Плавная прокрутка по якорным ссылкам
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Закрыть мобильное меню при клике
                const mobileMenu = document.querySelector('.mobile-menu');
                const hamburger = document.querySelector('.hamburger');

                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');

                    if (hamburger) {
                        hamburger.classList.remove('active');
                    }
                }

                // Определение высоты шапки для учета при прокрутке
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;

                // Прокрутка к элементу с учетом высоты шапки
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Подсветка активных пунктов меню при прокрутке
 */
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');

    if (sections.length === 0) return;

    const navLinks = document.querySelectorAll('.header-nav a, .footer-nav a');

    // Функция для определения активной секции
    function highlightActiveSection() {
        const scrollPosition = window.pageYOffset;

        // Высота шапки для учета при расчетах
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;

        // Проверяем все секции на видимость
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100; // 100px запас
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Если секция в поле зрения, делаем соответствующие ссылки активными
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Если мы в самом верху страницы, активируем первую ссылку
        if (scrollPosition < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            const homeLink = document.querySelector('.header-nav a[href="#home"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    }

    // Запускаем функцию при прокрутке
    window.addEventListener('scroll', highlightActiveSection);

    // И сразу при загрузке
    highlightActiveSection();
}

/**
 * Фиксированная шапка при прокрутке
 */
function initFixedHeader() {
    const header = document.querySelector('.header');

    if (!header) return;

    // Функция для обработки прокрутки
    function handleHeaderScroll() {
        const scrollPosition = window.pageYOffset;

        // Если прокрутили больше 100px, добавляем класс scrolled
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Запускаем функцию при прокрутке
    window.addEventListener('scroll', handleHeaderScroll);

    // И сразу при загрузке
    handleHeaderScroll();
}

/**
 * Мобильное меню
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!hamburger || !mobileMenu) return;

    // Открытие/закрытие меню по клику на гамбургер
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Закрытие меню по клику вне меню
    document.addEventListener('click', function(e) {
        const isClickInsideMenu = mobileMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);

        if (!isClickInsideMenu && !isClickOnHamburger && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Управление выпадающими подменю
    const dropdownToggle = document.querySelectorAll('.mobile-menu .has-dropdown > a');

    dropdownToggle.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();

            const parent = this.parentElement;
            const dropdown = this.nextElementSibling;

            // Закрыть другие выпадающие списки
            dropdownToggle.forEach(otherToggle => {
                if (otherToggle !== this) {
                    const otherParent = otherToggle.parentElement;
                    otherParent.classList.remove('open');

                    const otherDropdown = otherToggle.nextElementSibling;
                    if (otherDropdown) {
                        otherDropdown.style.maxHeight = '0px';
                    }
                }
            });

            // Открыть/закрыть текущий выпадающий список
            parent.classList.toggle('open');

            if (parent.classList.contains('open')) {
                dropdown.style.maxHeight = `${dropdown.scrollHeight}px`;
            } else {
                dropdown.style.maxHeight = '0px';
            }
        });
    });

    // Адаптация при изменении ширины окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

/**
 * Кнопка "Наверх"
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');

    if (!backToTopButton) return;

    // Показ/скрытие кнопки в зависимости от положения прокрутки
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Прокрутка наверх по клику
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}