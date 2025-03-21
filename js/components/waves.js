/**
 * Скрипт для создания и управления волновыми эффектами на сайте "Вода-даром.ру"
 * Файл: js/components/waves.js
 */

// Глобальные функции, чтобы они были доступны из main.js
window.initWaveDividers = initWaveDividers;
window.initWaterBackground = initWaterBackground;
window.initDropletEffects = initDropletEffects;
window.initWaveText = initWaveText;
window.initInteractiveWaterBackground = initInteractiveWaterBackground;

// Инициализация всех волновых эффектов при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    initWaveDividers();
    initWaterBackground();
    initDropletEffects();
    initWaveText();
});

/**
 * Создание волнистых разделителей между секциями
 */
function initWaveDividers() {
    // Контейнеры, к которым нужно добавить волнистые разделители
    const containers = document.querySelectorAll('.wave-divider-container');

    containers.forEach(container => {
        // Определяем цвет следующей секции для разделителя
        const nextSection = container.nextElementSibling;
        const nextSectionColor = nextSection ?
            window.getComputedStyle(nextSection).backgroundColor :
            '#ffffff';

        // Создаем разделитель
        const waveDivider = document.createElement('div');
        waveDivider.className = 'wave-divider';

        // Добавляем SVG волны
        waveDivider.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path fill="${nextSectionColor}" d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z" opacity="1"></path>
                <path fill="${nextSectionColor}" d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity="0.5"></path>
                <path fill="${nextSectionColor}" d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" opacity="0.3"></path>
            </svg>
        `;

        // Добавляем волновой разделитель в контейнер
        container.appendChild(waveDivider);
    });
}

/**
 * Создание и анимация фона с водной тематикой
 */
function initWaterBackground() {
    const waterBackgrounds = document.querySelectorAll('.water-background');

    waterBackgrounds.forEach(background => {
        // Создаем пузырьки
        for (let i = 0; i < 15; i++) {
            createBubble(background);
        }

        // Создаем рябь на воде
        setInterval(() => {
            createWaterRipple(background);
        }, 2000);
    });
}

/**
 * Создание пузырька для фона
 * @param {HTMLElement} container - контейнер для пузырька
 */
function createBubble(container) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    // Случайный размер
    const size = Math.random() * 30 + 10;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Случайная позиция
    const left = Math.random() * 100;
    bubble.style.left = `${left}%`;

    // Случайная задержка анимации
    bubble.style.animationDelay = `${Math.random() * 5}s`;

    // Добавляем пузырек в контейнер
    container.appendChild(bubble);

    // Удаляем пузырек после завершения анимации и создаем новый
    bubble.addEventListener('animationend', () => {
        bubble.remove();
        createBubble(container);
    });
}

/**
 * Создание эффекта водной ряби
 * @param {HTMLElement} container - контейнер для эффекта
 */
function createWaterRipple(container) {
    const ripple = document.createElement('div');
    ripple.className = 'water-ripple';

    // Случайная позиция
    const left = Math.random() * 90 + 5;
    const top = Math.random() * 80 + 10;

    ripple.style.left = `${left}%`;
    ripple.style.top = `${top}%`;

    // Добавляем в контейнер
    container.appendChild(ripple);

    // Удаляем после завершения анимации
    setTimeout(() => {
        ripple.remove();
    }, 4000);
}

/**
 * Создание и анимация капель воды
 */
function initDropletEffects() {
    const dropletContainers = document.querySelectorAll('.droplet-container');

    dropletContainers.forEach(container => {
        // Создаем капли с интервалом
        setInterval(() => {
            createDroplet(container);
        }, 800);
    });
}

/**
 * Создание капли воды
 * @param {HTMLElement} container - контейнер для капли
 */
function createDroplet(container) {
    const droplet = document.createElement('div');
    droplet.className = 'droplet';

    // Случайная позиция по горизонтали
    const left = Math.random() * 100;
    droplet.style.left = `${left}%`;

    // Случайный размер
    const size = Math.random() * 10 + 5;
    droplet.style.width = `${size}px`;
    droplet.style.height = `${size * 1.5}px`;

    // Добавляем в контейнер
    container.appendChild(droplet);

    // Удаляем после завершения анимации
    droplet.addEventListener('animationend', () => {
        droplet.remove();
    });
}

/**
 * Создание эффекта водного текста
 */
function initWaveText() {
    const waterTexts = document.querySelectorAll('.water-text');

    waterTexts.forEach(text => {
        // Создаем контейнер для текстового эффекта
        const container = document.createElement('div');
        container.className = 'water-text-container';

        // Получаем оригинальный текст
        const originalText = text.textContent;

        // Очищаем элемент
        text.textContent = '';

        // Создаем внутренний контейнер
        const innerContainer = document.createElement('div');
        innerContainer.className = 'water-text-inner';

        // Добавляем текст
        innerContainer.textContent = originalText;

        // Добавляем внутренний контейнер в основной
        container.appendChild(innerContainer);

        // Добавляем контейнер в элемент
        text.appendChild(container);

        // Создаем волны для текста
        const wave1 = document.createElement('div');
        wave1.className = 'text-wave wave1';
        const wave2 = document.createElement('div');
        wave2.className = 'text-wave wave2';

        container.appendChild(wave1);
        container.appendChild(wave2);
    });
}

/**
 * Создание интерактивного водного фона, реагирующего на движение мыши
 * @param {string} selector - селектор контейнера
 */
function initInteractiveWaterBackground(selector) {
    const container = document.querySelector(selector);
    if (!container) return;

    // Создаем холст для воды
    const canvas = document.createElement('canvas');
    canvas.className = 'water-canvas';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let canvasWidth = container.offsetWidth;
    let canvasHeight = container.offsetHeight;

    // Устанавливаем размеры холста
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Данные для анимации воды
    const waterData = {
        points: [],
        pointsCount: Math.floor(canvasWidth / 20), // Количество точек по ширине
        friction: 0.025, // Трение
        mouseInfluence: 30, // Влияние мыши
    };

    // Создаем точки для анимации
    for (let i = 0; i < waterData.pointsCount; i++) {
        waterData.points.push({
            x: canvasWidth * (i / (waterData.pointsCount - 1)),
            y: canvasHeight * 0.5,
            velocity: 0,
            original: {
                x: canvasWidth * (i / (waterData.pointsCount - 1)),
                y: canvasHeight * 0.5
            }
        });
    }

    // Обработчик движения мыши
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Применяем влияние мыши на ближайшие точки
        waterData.points.forEach(point => {
            const dx = mouseX - point.x;
            const dy = mouseY - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < waterData.mouseInfluence) {
                const force = (1 - (distance / waterData.mouseInfluence)) * 5;
                point.velocity += force;
            }
        });
    });

    // Функция анимации
    function animate() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Обновляем позиции точек
        waterData.points.forEach(point => {
            // Применяем физику
            const dy = point.original.y - point.y;
            const acceleration = dy * 0.05;

            point.velocity += acceleration;
            point.velocity *= (1 - waterData.friction);
            point.y += point.velocity;
        });

        // Рисуем воду
        ctx.beginPath();
        ctx.moveTo(0, canvasHeight);

        // Рисуем верхний край воды
        for (let i = 0; i < waterData.pointsCount; i++) {
            const point = waterData.points[i];

            // Если это первая точка
            if (i === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                const prevPoint = waterData.points[i - 1];
                const xc = (point.x + prevPoint.x) / 2;
                const yc = (point.y + prevPoint.y) / 2;

                // Используем кривую Безье для сглаживания
                ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, xc, yc);
            }
        }

        // Замыкаем путь снизу холста
        ctx.lineTo(canvasWidth, canvasHeight);
        ctx.lineTo(0, canvasHeight);

        // Заливаем водой
        const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        gradient.addColorStop(0, 'rgba(0, 149, 235, 0.7)');
        gradient.addColorStop(1, 'rgba(0, 149, 235, 0.3)');

        ctx.fillStyle = gradient;
        ctx.fill();

        requestAnimationFrame(animate);
    }

    // Обработчик изменения размера окна
    window.addEventListener('resize', () => {
        canvasWidth = container.offsetWidth;
        canvasHeight = container.offsetHeight;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Обновляем позиции точек
        const pointsCount = Math.floor(canvasWidth / 20);

        // Если количество точек изменилось, пересоздаем массив
        if (pointsCount !== waterData.pointsCount) {
            waterData.pointsCount = pointsCount;
            waterData.points = [];

            for (let i = 0; i < waterData.pointsCount; i++) {
                waterData.points.push({
                    x: canvasWidth * (i / (waterData.pointsCount - 1)),
                    y: canvasHeight * 0.5,
                    velocity: 0,
                    original: {
                        x: canvasWidth * (i / (waterData.pointsCount - 1)),
                        y: canvasHeight * 0.5
                    }
                });
            }
        } else {
            // Иначе просто обновляем координаты
            for (let i = 0; i < waterData.pointsCount; i++) {
                waterData.points[i].x = canvasWidth * (i / (waterData.pointsCount - 1));
                waterData.points[i].original.x = canvasWidth * (i / (waterData.pointsCount - 1));
                waterData.points[i].y = canvasHeight * 0.5;
                waterData.points[i].original.y = canvasHeight * 0.5;
            }
        }
    });

    // Запускаем анимацию
    animate();
}