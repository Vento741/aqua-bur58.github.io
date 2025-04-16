// Скрипт отслеживания целей для Яндекс.Метрики
document.addEventListener('DOMContentLoaded', function() {
    // Цель #1: "Звонок клиента"
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            ym(101106725, 'reachGoal', 'call_click');
            console.log('Цель "call_click" достигнута');
        });
    });

    // Цель #2: "Заявка с формы контактов"
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function() {
            ym(101106725, 'reachGoal', 'contact_form_submit');
            console.log('Цель "contact_form_submit" достигнута');
        });
    });

    // Цель #3: "Переход в мессенджеры"
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    const telegramLinks = document.querySelectorAll('a[href*="t.me"]');

    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            ym(101106725, 'reachGoal', 'messenger_click');
            ym(101106725, 'reachGoal', 'whatsapp_click');
            console.log('Цель "messenger_click" (WhatsApp) достигнута');
        });
    });

    telegramLinks.forEach(link => {
        link.addEventListener('click', function() {
            ym(101106725, 'reachGoal', 'messenger_click');
            ym(101106725, 'reachGoal', 'telegram_click');
            console.log('Цель "messenger_click" (Telegram) достигнута');
        });
    });

    // Цель #5: "Клик по кнопке 'Заказать услугу'"
    const orderButtons = document.querySelectorAll('.btn-primary');
    orderButtons.forEach(button => {
        if (button.textContent.includes('Заказать') ||
            button.textContent.includes('Получить') ||
            button.textContent.includes('Узнать')) {
            button.addEventListener('click', function() {
                ym(101106725, 'reachGoal', 'order_service_click');
                console.log('Цель "order_service_click" достигнута');
            });
        }
    });

    // Цель #6: "Просмотр FAQ"
    const faqSection = document.querySelector('#faq');
    if (faqSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    ym(101106725, 'reachGoal', 'faq_view');
                    console.log('Цель "faq_view" достигнута');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(faqSection);
    }

    // Цель #7: "Полная прокрутка страницы"
    let scrolled = false;
    window.addEventListener('scroll', function() {
        if (!scrolled) {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY + window.innerHeight;

            if (scrollTop / scrollHeight > 0.9) {
                scrolled = true;
                ym(101106725, 'reachGoal', 'full_scroll');
                console.log('Цель "full_scroll" достигнута');
            }
        }
    });

    // Цель #8: "Время на сайте более 3 минут"
    setTimeout(function() {
        ym(101106725, 'reachGoal', 'time_spent_3min');
        console.log('Цель "time_spent_3min" достигнута');
    }, 180000); // 3 минуты в миллисекундах
});