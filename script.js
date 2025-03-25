document.addEventListener('DOMContentLoaded', () => {
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        Telegram.WebApp.ready();   // Обязательная инициализация
        Telegram.WebApp.expand();  // Попытка открыть на весь экран
    }

    const hamster = document.getElementById('hamster');
    const scoreElement = document.getElementById('score');
    const energyElement = document.getElementById('energy');
    const dailyRewardTimerElement = document.getElementById('daily-reward-timer');
    const dailyCodeTimerElement = document.getElementById('daily-code-timer');
    const comboTimerElement = document.getElementById('combo-timer');

    // 🎵 Добавляем звук
    const clickSound = new Audio('coin.mp3');
    clickSound.volume = 0.5;

    let score = parseInt(localStorage.getItem('score')) || 194912344;
    let currentEnergy = 3000;
    const totalEnergy = 3000;

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    scoreElement.textContent = formatNumber(score);

    function updateEnergyDisplay() {
        energyElement.textContent = `${currentEnergy}/${totalEnergy}`;
    }

    function createFloatingScore(x, y) {
        const floatingScore = document.createElement('div');
        floatingScore.id = 'floating-score';
        floatingScore.style.left = `${x}px`;
        floatingScore.style.top = `${y}px`;
        floatingScore.textContent = '+1';
        document.body.appendChild(floatingScore);
        setTimeout(() => {
            floatingScore.remove();
        }, 1000);
    }

    hamster.addEventListener('click', (event) => {
        if (currentEnergy > 0) {
            score++;
            currentEnergy--;
            scoreElement.textContent = formatNumber(score);
            updateEnergyDisplay();
            createFloatingScore(event.clientX, event.clientY);
            localStorage.setItem('score', score);

            // ▶️ Проигрывание звука
            clickSound.currentTime = 0;
            clickSound.play();
        }
    });

    setInterval(() => {
        if (currentEnergy < totalEnergy) {
            currentEnergy++;
            updateEnergyDisplay();
        }
    }, 5000);

    setInterval(() => {
        score += 2000;
        scoreElement.textContent = formatNumber(score);
        localStorage.setItem('score', score);
    }, 60000);

    function startTimer(timerElement, initialTimeInSeconds, callback) {
        let time = initialTimeInSeconds;
        const interval = setInterval(() => {
            if (time > 0) {
                time--;
                const minutes = Math.floor(time / 60);
                const seconds = time % 60;
                timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            } else {
                callback();
                clearInterval(interval);
                startTimer(timerElement, initialTimeInSeconds, callback);
            }
        }, 1000);
    }

    function rewardCallback() {
        const randomPoints = Math.floor(Math.random() * 10001) + 5000;
        score += randomPoints;
        scoreElement.textContent = formatNumber(score);
        localStorage.setItem('score', score);
    }

    startTimer(dailyRewardTimerElement, 750, rewardCallback);
    startTimer(dailyCodeTimerElement, 450, rewardCallback);
    startTimer(comboTimerElement, 30, rewardCallback);
});
