/**
 * Компонент для адаптивного отображения разделов "Мы предлагаем" и "Преимущества" на мобильных устройствах
 */
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, находимся ли мы на мобильном устройстве (ширина экрана <= 765px)
    const isMobile = window.innerWidth <= 765;

    if (isMobile) {
        initMobileAdaptations();
    }

    // Обработка изменения размера экрана
    window.addEventListener('resize', function() {
        const currentIsMobile = window.innerWidth <= 765;

        // Если изменился размер экрана с мобильного на десктоп или наоборот
        if (currentIsMobile !== isMobile) {
            if (currentIsMobile) {
                initMobileAdaptations();
            } else {
                // Если перешли на десктоп, сбрасываем все изменения
                resetMobileAdaptations();
            }
        }
    });

    /**
     * Инициализация мобильных адаптаций
     */
    function initMobileAdaptations() {
        // Получаем все заголовки карточек
        const cardHeaders = document.querySelectorAll('.about-card .card-header');

        // Добавляем обработчики событий для каждого заголовка
        cardHeaders.forEach(header => {
            // Убираем существующие обработчики, если они есть
            header.removeEventListener('click', toggleCardContent);

            // Добавляем новый обработчик
            header.addEventListener('click', toggleCardContent);

            // Находим карточку для данного заголовка
            const card = header.closest('.about-card');

            // Находим содержимое для разворачивания
            let content = null;
            if (card.classList.contains('advantages-card')) {
                content = card.querySelector('.advantages-grid');
            } else if (card.classList.contains('offers-card')) {
                content = card.querySelector('.service-list');
            }

            // Если нашли содержимое и на мобильном устройстве
            if (content && window.innerWidth <= 765) {
                // Добавляем класс, если его нет
                if (!content.classList.contains('expanded')) {
                    content.classList.remove('expanded');
                }
            }
        });
    }

    /**
     * Сброс мобильных адаптаций при переходе на десктоп
     */
    function resetMobileAdaptations() {
        // Получаем все заголовки карточек
        const cardHeaders = document.querySelectorAll('.about-card .card-header');

        // Удаляем обработчики событий
        cardHeaders.forEach(header => {
            header.removeEventListener('click', toggleCardContent);
            header.classList.remove('expanded');

            // Находим карточку для данного заголовка
            const card = header.closest('.about-card');

            // Находим содержимое
            let content = null;
            if (card.classList.contains('advantages-card')) {
                content = card.querySelector('.advantages-grid');
            } else if (card.classList.contains('offers-card')) {
                content = card.querySelector('.service-list');
            }

            // Если нашли содержимое, разворачиваем его
            if (content) {
                content.classList.add('expanded');
            }
        });
    }

    /**
     * Обработчик события клика по заголовку карточки
     */
    function toggleCardContent(event) {
        // Получаем заголовок
        const header = this;

        // Находим карточку
        const card = header.closest('.about-card');

        // Находим содержимое для разворачивания/сворачивания
        let content = null;
        if (card.classList.contains('advantages-card')) {
            content = card.querySelector('.advantages-grid');
        } else if (card.classList.contains('offers-card')) {
            content = card.querySelector('.service-list');
        }

        // Если нашли содержимое
        if (content) {
            // Переключаем класс expanded у заголовка и содержимого
            header.classList.toggle('expanded');
            content.classList.toggle('expanded');
        }
    }
});