// Получаем элементы
const closedFlower = document.getElementById('closedflower');
const openFlower = document.getElementById('openflower');
const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const predictionContainer = document.getElementById('prediction-container');
const predictionElement = document.getElementById('prediction');
const historyButton = document.getElementById('button');

// Изначально скрываем контейнер с предсказанием и кнопку
predictionContainer.style.display = 'none';
historyButton.style.display = 'none';
historyButton.style.opacity = '0';

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
backgroundMusic.src = './txtblue.mp3';
backgroundMusic.loop = false;
backgroundMusic.volume = 0.3;

// Флаг: была ли музыка уже включена
let musicStarted = false;

// Функция: показать предсказание
function showPrediction() {
    if (isAnimating) return;
    isAnimating = true;

    // Включаем музыку при первом клике на цветок
    if (!musicStarted) {
        backgroundMusic.play().catch(error => {
            console.log('Ошибка воспроизведения музыки:', error);
        });
        musicStarted = true;
    }

    // Переключаем сцены
    scene1.classList.remove('active');
    scene2.classList.add('active');

    // Убираем цветок и показываем предсказание
    setTimeout(() => {
        // Скрываем цветок (с плавным исчезновением)
        openFlower.style.opacity = 0;
        openFlower.style.transform = 'scale(0.8)';
        openFlower.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        // Выбираем случайное предсказание
        const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
        predictionElement.textContent = randomPrediction;

        // Показываем контейнер с предсказанием (но без кнопки)
        predictionContainer.style.display = 'block';
        predictionContainer.style.opacity = '1';
        predictionElement.style.opacity = 1;

        // Скрываем кнопку изначально
        historyButton.style.display = 'none';
        historyButton.style.opacity = '0';

        // Ждем после показа предсказания, затем показываем кнопку
        setTimeout(() => {
            historyButton.style.display = 'block';
            // Небольшая задержка перед анимацией появления
            setTimeout(() => {
                historyButton.style.opacity = '1';
                historyButton.style.transition = 'opacity 0.7s ease';
            }, 50);
        }, 1500); // Задержка 1.5 секунды перед показом кнопки

    }, 400);

    // Разблокируем анимацию
    setTimeout(() => {
        isAnimating = false;
    }, 4000);
}

// Обработчик клика на закрытый цветок
closedFlower.addEventListener('click', showPrediction);

// Обработчик клика на предсказание для возврата к началу
predictionElement.addEventListener('click', (e) => {
    if (isAnimating) return;
    
    // Скрываем кнопку сразу (с плавным исчезновением)
    historyButton.style.opacity = '0';
    
    // Ждем завершения анимации исчезновения кнопки
    setTimeout(() => {
        historyButton.style.display = 'none';
        
        // Скрываем контейнер с предсказанием
        predictionContainer.style.opacity = '0';
        
        setTimeout(() => {
            predictionContainer.style.display = 'none';
            
            // Возвращаемся к первой сцене
            scene2.classList.remove('active');
            scene1.classList.add('active');
            
            // Возвращаем цветок в исходное состояние
            openFlower.style.opacity = 1;
            openFlower.style.transform = 'scale(1)';
            openFlower.style.transition = 'none';
            
            // Сбрасываем предсказание
            predictionElement.textContent = '';
        }, 500);
    }, 300);
});



