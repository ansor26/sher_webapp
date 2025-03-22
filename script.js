// Гарантируем, что Telegram WebApp готов
Telegram.WebApp.ready();

// Раскрываем окно (полноэкранное)
Telegram.WebApp.expand();

// Получаем данные пользователя
const user = Telegram.WebApp.initDataUnsafe.user;
console.log("Привет,", user.first_name);

// Переменные для логики
let balance = 0;
let energy = 10;
const profit = 10;

const balanceEl = document.getElementById("balance");
const energyEl = document.getElementById("energy");
const fightBtn = document.getElementById("fightBtn");

// Обработка нажатия "Fight"
fightBtn.addEventListener("click", () => {
    if (energy > 0) {
        balance += profit;
        energy--;

        balanceEl.textContent = `${balance}`;
        energyEl.textContent = `${energy}/10`;

        // Отправка действия в Telegram (можно использовать на бэке)
        Telegram.WebApp.sendData(JSON.stringify({
            action: "fight",
            user_id: user.id,
            balance: balance,
            energy: energy
        }));
    } else {
        alert("⚡ Not enough energy!");
    }
});
