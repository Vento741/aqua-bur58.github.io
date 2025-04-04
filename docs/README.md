# Аква-Бур58 - Сайт компании по бурению скважин

Лендинг для компании, занимающейся бурением скважин в Пензе и Пензенской области.

## Описание проекта

Одностраничный сайт-лендинг для демонстрации услуг компании по бурению скважин. Сайт содержит информацию о различных типах скважин, преимуществах компании, примеры работ и контактную информацию.

+ Вдохновлённый красотой природы и силой воды, проект выполнен в уникальном, оригинальном и изысканном стиле. Каждый элемент дизайна тщательно проработан, чтобы удивлять посетителя и создавать атмосферу спокойствия и уверенности.

## Структура сайта

- Главный экран (Hero section)
- О компании
- Услуги
- Как мы работаем
- Наши работы
- Отзывы клиентов
- Часто задаваемые вопросы (FAQ)
- Контакты
- Футер

## Технические особенности

- HTML5 и CSS3
- Bootstrap 5 для адаптивной верстки
- Font Awesome для иконок
- JavaScript для интерактивных элементов
- Анимированные волны между разделами для сохранения водного стиля
- Компонентный подход в структуре CSS и JS
- Отдельные файлы стилей для адаптивности
- Минимальные отступы по краям для улучшения восприятия
- Адаптивный дизайн (работает на мобильных устройствах и ПК)
- Оптимизированные SVG изображения для декоративных элементов и анимаций

## Структура проекта

```
/
├── index.html               # Основной HTML файл
├── css/                     # Директория стилей
│   ├── main.css             # Основные стили
│   ├── adaptive.css         # Стили для адаптивности
│   ├── animations.css       # Анимации, включая волны
│   └── components/          # Компоненты CSS
│       ├── header.css       # Стили для хедера
│       ├── footer.css       # Стили для футера
│       ├── services.css     # Стили для блока услуг
│       └── ...
├── js/                      # Директория JavaScript
│   ├── main.js              # Основной JS файл
│   └── components/          # Компоненты JS
│       ├── waves.js         # Скрипт для анимации волн
│       ├── carousel.js      # Скрипт для карусели
│       └── ...
├── images/                  # Изображения
├── fonts/                   # Шрифты
└── README.md                # Документация
```

## Запуск проекта

Проект не требует специальных инструментов для запуска. Достаточно открыть файл `index.html` в любом современном веб-браузере.

## Настройка перед публикацией

Перед публикацией сайта необходимо:

1. Заменить все изображения-заглушки на реальные фотографии:
   - Логотип компании (`images/logo.png` и `images/logo-white.png`)
   - Фоновое изображение для главного экрана (`images/hero-bg.jpg`)
   - Фотографии о компании (`images/about-company.jpg`)
   - Изображения услуг (`images/service-portable.jpg`, `images/service-abyssinskaya.jpg`)
   - Фотографии выполненных работ (`images/portfolio-*.jpg`)
   - Фотографии для отзывов (`images/testimonial-*.jpg`)

2. Заменить заглушки для контактных данных:
   - Номер телефона: во всех ссылках вида `tel:+7XXXXXXXXXX` нужно указать реальный номер
   - Адреса электронной почты (если используются)
   - Ссылки на социальные сети и мессенджеры

3. Настроить карту в разделе Контакты:
   - Заменить URL карты Яндекс в iframe на корректный с отмеченной зоной обслуживания

4. Настроить мета-теги для SEO:
   - Проверить и при необходимости обновить теги title, description и keywords в `<head>` файла index.html

## Дальнейшее развитие

Возможности для дальнейшего развития сайта:

1. Добавление галереи изображений с лайтбоксом для просмотра фотографий выполненных работ
2. Интеграция с системами аналитики (Яндекс.Метрика, Google Analytics)
3. Добавление микроразметки schema.org для улучшения SEO
4. Создание многостраничной версии сайта с отдельными страницами для каждой услуги
5. Добавление блога с полезными статьями о бурении скважин

## Контакты для связи

При возникновении вопросов о проекте обращайтесь:
- Email: your-email@example.com
- Телефон: +7 (XXX) XXX-XX-XX 

xn---58-5cdahe7dyc3a.xn--p1ai