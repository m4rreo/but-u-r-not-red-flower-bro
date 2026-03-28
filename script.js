// 1. Получаем только нужные элементы
const closedFlower = document.getElementById('closedflower');
const openFlower = document.getElementById('openflower');
const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const predictionContainer = document.getElementById('prediction-container');
const predictionElement = document.getElementById('prediction');

// Изначально скрываем контейнер
predictionContainer.style.display = 'none';

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

let isAnimating = false;
let musicStarted = false;

// Оставляем только фоновую музыку
const backgroundMusic = new Audio('./txtblue.mp3');
backgroundMusic.volume = 0.3;

// Функция: показать предсказание
function showPrediction() {
    if (isAnimating) return;
    isAnimating = true;

    // Включаем музыку при первом клике
    if (!musicStarted) {
        backgroundMusic.play().catch(error => console.log('Ошибка звука:', error));
        musicStarted = true;
    }

    // Переключаем сцены
    scene1.classList.remove('active');
    scene2.classList.add('active');

    // Эффект появления текста
    setTimeout(() => {
        openFlower.style.opacity = 0;
        openFlower.style.transform = 'scale(0.8)';
        openFlower.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
        predictionElement.textContent = randomPrediction;

        predictionContainer.style.display = 'block';
        
        // Для корректной работы анимации появления (через микро-задержку)
        setTimeout(() => {
            predictionContainer.style.opacity = 1;
            predictionElement.style.opacity = 1;
        }, 50);

    }, 400);

    // Блокируем клик на время анимации
    setTimeout(() => {
        isAnimating = false;
    }, 4000);
}

// Единственный нужный обработчик
closedFlower.addEventListener('click', showPrediction);




