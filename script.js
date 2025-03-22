// Переменные
let balance = 0;
let energy = 10;
const profit = 10;

// Telegram WebApp готов
Telegram.WebApp.ready();
Telegram.WebApp.expand(); // Автоматически разворачивает на весь экран

// Получаем элементы
const balanceEl = document.getElementById("balance");
const energyEl = document.getElementById("energy");
const fightBtn = document.getElementById("fightBtn");

// Обработка кнопки Fight
fightBtn.addEventListener("click", () => {
    console.log("Fight button clicked");

    if (energy > 0) {
        balance += profit;
        energy -= 1;

        balanceEl.textContent = `${balance}`;
        energyEl.textContent = `${energy}/10`;

        // Отправить данные в Telegram WebApp (если понадобится)
        Telegram.WebApp.sendData(JSON.stringify({
            action: "fight",
            balance: balance,
            energy: energy
        }));
    } else {
        alert("⚡ Not enough energy!");
    }
});

// Автоматическое восстановление энергии каждые 5 секунд
setInterval(() => {
    if (energy < 10) {
        energy += 1;
        energyEl.textContent = `${energy}/10`;
    }
}, 5000);
