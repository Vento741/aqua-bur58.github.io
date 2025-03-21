/**
 * Скрипт для управления формами на сайте "Вода-даром.ру"
 * Файл: js/components/form.js
 */

// Глобальные функции, чтобы они были доступны из main.js
window.initFormAnimations = initFormAnimations;
window.initFormValidation = initFormValidation;
window.initPhoneMask = initPhoneMask;
window.initModalForms = initModalForms;
window.validateForm = validateForm;
window.handleFormSubmit = handleFormSubmit;
window.showError = showError;
window.openModal = openModal;
window.closeModal = closeModal;

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    initFormAnimations();
    initFormValidation();
    initPhoneMask();
    initModalForms();
});

/**
 * Инициализация анимаций форм
 */
function initFormAnimations() {
    // Анимация полей формы при фокусе
    const formControls = document.querySelectorAll('.form-control');

    formControls.forEach(control => {
        // Добавляем класс active для label, если поле уже содержит значение
        if (control.value.trim() !== '') {
            const label = control.previousElementSibling;
            if (label && label.classList.contains('form-label')) {
                label.classList.add('active');
            }
        }

        // Обработчик фокуса
        control.addEventListener('focus', function() {
            const label = this.previousElementSibling;
            if (label && label.classList.contains('form-label')) {
                label.classList.add('active');
            }

            this.parentElement.classList.add('focused');
        });

        // Обработчик потери фокуса
        control.addEventListener('blur', function() {
            const label = this.previousElementSibling;
            if (label && label.classList.contains('form-label') && this.value.trim() === '') {
                label.classList.remove('active');
            }

            this.parentElement.classList.remove('focused');
        });

        // Обработчик ввода
        control.addEventListener('input', function() {
            const label = this.previousElementSibling;
            if (label && label.classList.contains('form-label')) {
                if (this.value.trim() !== '') {
                    label.classList.add('active');
                } else {
                    label.classList.remove('active');
                }
            }

            // Убираем класс ошибки при вводе
            this.classList.remove('error');
            const errorMessage = this.parentElement.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });

    // Добавление эффекта волны для кнопок
    const formButtons = document.querySelectorAll('.form-btn, .btn-submit');

    formButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Инициализация валидации форм
 */
function initFormValidation() {
    // Обработчик отправки для всех форм
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Предотвращаем отправку по умолчанию
            e.preventDefault();

            // Если форма валидна, обрабатываем отправку
            if (validateForm(this)) {
                handleFormSubmit(this);
            }
        });
    });
}

/**
 * Валидация формы
 * @param {HTMLFormElement} form - форма для валидации
 * @returns {boolean} - результат валидации
 */
function validateForm(form) {
    let isValid = true;

    // Удаляем предыдущие сообщения об ошибках
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());

    // Проверяем все обязательные поля
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        field.classList.remove('error');

        // Проверка на пустое значение
        if (field.value.trim() === '') {
            showError(field, 'Это поле обязательно для заполнения');
            isValid = false;
            return;
        }

        // Проверка email
        if (field.type === 'email') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(field.value.trim())) {
                showError(field, 'Пожалуйста, введите корректный email адрес');
                isValid = false;
                return;
            }
        }

        // Проверка телефона
        if (field.type === 'tel') {
            const phoneRegex = /^(\+7|8)\s?\(?\d{3}\)?\s?\d{3}(-|\s)?\d{2}(-|\s)?\d{2}$/;
            if (!phoneRegex.test(field.value.trim())) {
                showError(field, 'Пожалуйста, введите корректный номер телефона');
                isValid = false;
                return;
            }
        }
    });

    // Проверка согласия с политикой конфиденциальности
    const privacyCheckbox = form.querySelector('input[type="checkbox"][name="privacy"]');
    if (privacyCheckbox && !privacyCheckbox.checked) {
        showError(privacyCheckbox, 'Необходимо согласиться с политикой конфиденциальности');
        isValid = false;
    }

    return isValid;
}

/**
 * Отображение ошибки для поля формы
 * @param {HTMLElement} field - поле с ошибкой
 * @param {string} message - текст ошибки
 */
function showError(field, message) {
    // Добавляем класс ошибки
    field.classList.add('error');

    // Создаем элемент с сообщением
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;

    // Добавляем сообщение после поля
    field.parentElement.appendChild(errorMessage);

    // Анимируем появление сообщения
    setTimeout(() => {
        errorMessage.style.opacity = '1';
        errorMessage.style.transform = 'translateY(0)';
    }, 10);
}

/**
 * Обработка отправки формы
 * @param {HTMLFormElement} form - форма для отправки
 */
function handleFormSubmit(form) {
    // Получаем кнопку отправки
    const submitButton = form.querySelector('button[type="submit"], .btn-submit');

    if (submitButton) {
        // Сохраняем оригинальный текст кнопки
        const originalText = submitButton.innerHTML;

        // Меняем текст на индикатор загрузки
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitButton.disabled = true;

        // Собираем данные формы
        const formData = new FormData(form);

        // Преобразуем данные в объект для отображения в консоли
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        console.log('Отправка данных формы:', formDataObj);

        // Имитация отправки данных (в реальном проекте здесь будет отправка на сервер)
        setTimeout(() => {
            // Показываем уведомление об успешной отправке
            showNotification('Спасибо! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.', 'success');

            // Сбрасываем форму
            form.reset();

            // Возвращаем кнопке оригинальный вид
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;

            // Если форма находится в модальном окне, закрываем его
            const modal = form.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        }, 1500);
    }
}

/**
 * Инициализация масок для телефонных полей
 */
function initPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Если поле пустое, добавляем +7
            if (this.value === '') {
                this.value = '+7 ';
            }
        });

        input.addEventListener('input', function(e) {
            // Получаем только цифры
            let value = this.value.replace(/\D/g, '');

            // Ограничиваем длину до 11 цифр
            if (value.length > 11) {
                value = value.slice(0, 11);
            }

            // Форматируем ввод
            let formattedValue = '';

            if (value.length > 0) {
                // Код страны
                formattedValue = '+' + value.substring(0, 1);

                // Код оператора
                if (value.length > 1) {
                    formattedValue += ' (' + value.substring(1, 4);
                }

                // Первая часть номера
                if (value.length > 4) {
                    formattedValue += ') ' + value.substring(4, 7);
                }

                // Вторая часть номера
                if (value.length > 7) {
                    formattedValue += '-' + value.substring(7, 9);
                }

                // Третья часть номера
                if (value.length > 9) {
                    formattedValue += '-' + value.substring(9, 11);
                }
            }

            this.value = formattedValue;
        });
    });
}

/**
 * Инициализация форм в модальных окнах
 */
function initModalForms() {
    // Кнопки открытия модальных окон
    const modalTriggers = document.querySelectorAll('[data-modal]');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();

            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Закрытие модальных окон
    const closeButtons = document.querySelectorAll('.modal-close');

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });

    // Закрытие по клику на оверлей
    const modals = document.querySelectorAll('.modal');

    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });

    // Закрытие по клавише Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
}

/**
 * Открытие модального окна
 * @param {string} modalId - ID модального окна
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.classList.add('active');
        document.body.classList.add('modal-open');

        // Фокусируем первое поле ввода в модальном окне
        const firstInput = modal.querySelector('input:not([type="hidden"])');
        if (firstInput) {
            setTimeout(() => {
                firstInput.focus();
            }, 300);
        }
    }
}

/**
 * Закрытие модального окна
 * @param {string} modalId - ID модального окна
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
}

/**
 * Отображение уведомления
 * @param {string} message - текст уведомления
 * @param {string} type - тип уведомления (success, error, warning, info)
 * @param {number} duration - длительность показа в мс
 */
function showNotification(message, type = 'info', duration = 5000) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    // Определяем иконку в зависимости от типа
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'times-circle';
    if (type === 'warning') icon = 'exclamation-triangle';

    // Создаем содержимое уведомления
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-${icon}"></i>
        </div>
        <div class="notification-content">${message}</div>
        <button class="notification-close">&times;</button>
    `;

    // Добавляем уведомление в документ
    document.body.appendChild(notification);

    // Анимация появления
    setTimeout(() => {
        notification.classList.add('visible');
    }, 10);

    // Обработчик кнопки закрытия
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.classList.remove('visible');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });

    // Автоматическое закрытие
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}