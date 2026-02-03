// Получаем элементы
const closedFlower = document.getElementById('closedflower');
const openFlower = document.getElementById('openflower');
const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');

// Массив предсказаний
const predictions = [
    'вас ждет неожиданная удача',
    'вас ждет неловкая ситуация',
    'все окажется куда лучше, чем вы ожидали',
    'ваша идея окажется гениальной',
    'вас ждет испытание',
    'судьба готовит для вас сюрприз',
    'вас ждет маленькое чудо',
    'сегодня можно будет расслабиться',
    'вас ждет разочарование',
    'что-то пойдет не по плану',
    'вы пожалеете о чем-то',
    'какое-то ваше действие окажется бесполезным',
    'маленькая неприятность станет большой',
    'мир станет чуть красивее',
    'то, чего вы так боялись - не случится',
    'вы научитесь чему-то',
    'произойдет что-то противоречивое и странное, но очень важное для вас',
    'вы узнаете какую-то правду',
    'вы будете много смеяться',
    'кто-то очень поможет вам'
];

// Флаг: блокирует повторные клики во время анимации
let isAnimating = false;

// Создаем элемент аудио для музыки
const backgroundMusic = new Audio();
backgroundMusic.src = './txtblue.mp3'; // Укажите путь к вашему музыкальному файлу
backgroundMusic.loop = false; // Зацикливаем музыку
backgroundMusic.volume = 0.3; // Устанавливаем громкость на 30%

// Флаг: была ли музыка уже включена
let musicStarted = false;

// Функция: показать предсказание
function showPrediction() {
    if (isAnimating) return;
    isAnimating = true;

    // 1. Включаем музыку при первом клике на цветок
    if (!musicStarted) {
        // Воспроизводим музыку сразу же при нажатии
        backgroundMusic.play().catch(error => {
            console.log('Ошибка воспроизведения музыки:', error);
            // Можно добавить здесь кнопку для ручного включения музыки
        });
        musicStarted = true;
    }

    // 2. Переключаем сцены
    scene1.classList.remove('active');
    scene2.classList.add('active');

    // 3. Ждём 1 сек, затем убираем цветок и показываем предсказание
    setTimeout(() => {
        // Скрываем цветок (с плавным исчезновением)
        openFlower.style.opacity = 0;
        openFlower.style.transform = 'scale(0.8)';
        openFlower.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        // Создаём и добавляем элемент предсказания
        const predictionElement = document.createElement('div');
        predictionElement.id = 'prediction';

        // Выбираем случайное предсказание
        const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
        predictionElement.textContent = randomPrediction;

        // Добавляем в сцену 2
        scene2.appendChild(predictionElement);

        // Плавное появление предсказания
        setTimeout(() => {
            predictionElement.style.opacity = 1;
            predictionElement.style.transform = 'translateY(0)';
        }, 10);

    }, 400); // 1 секунда задержки

    // Разблокируем анимацию через 2 сек (с запасом)
    setTimeout(() => {
        isAnimating = false;
    }, 4000);
}

// Обработчик клика на закрытый цветок
closedFlower.addEventListener('click', showPrediction);

// Опционально: при клике на предсказание можно вернуться к началу
document.addEventListener('click', (e) => {
    if (e.target.id === 'prediction' && !isAnimating) {
        scene2.classList.remove('active');
        scene1.classList.add('active');

        // Удаляем предсказание и возвращаем цветок в исходное состояние
        const predictionElement = document.getElementById('prediction');
        if (predictionElement) {
            predictionElement.remove();
        }
        openFlower.style.opacity = 1;
        openFlower.style.transform = 'scale(1)';
        openFlower.style.transition = 'none';
    }

    const historyButton = document.createElement('button');
    historyButton.id = 'button';
    historyButton.textContent = 'узнать историю';
    historyButton.addEventListener('click', (e) => {
        e.stopPropagation();
        window.open('https://ru.wikipedia.org/wiki/Аленький_цветочек', '_blank');
    });
    scene2.appendChild(historyButton);
});

