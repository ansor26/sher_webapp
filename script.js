// Telegram API и полноэкранный режим
Telegram.WebApp.ready();
Telegram.WebApp.expand();

// Загружаем из памяти (если есть)
let balance = parseInt(localStorage.getItem("balance")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 10;
const profit = 10;

// Элементы
const balanceEl = document.getElementById("balance");
const energyEl = document.getElementById("energy");
const fightBtn = document.getElementById("fightBtn");

// UI обновление
function updateUI() {
    balanceEl.textContent = `${balance}`;
    energyEl.textContent = `${energy}/10`;
}

fightBtn.addEventListener("mousedown", (e) => {
    e.preventDefault(); // убирает фокус и скролл
});

fightBtn.addEventListener("click", () => {
    if (energy > 0) {
        balance += profit;
        energy -= 1;

        // сохраняем
        localStorage.setItem("balance", balance);
        localStorage.setItem("energy", energy);

        updateUI();

        Telegram.WebApp.sendData(JSON.stringify({
            action: "fight",
            balance,
            energy
        }));
    } else {
        alert("⚡ Not enough energy!");
    }
});

// восстановление энергии
setInterval(() => {
    if (energy < 10) {
        energy += 1;
        localStorage.setItem("energy", energy);
        updateUI();
    }
}, 5000);

// при старте
updateUI();
