let balance = 0;
let energy = 10;
const profit = 10;

const balanceEl = document.getElementById("balance");
const energyEl = document.getElementById("energy");
const fightBtn = document.getElementById("fightBtn");

fightBtn.addEventListener("click", () => {
    console.log("Fight button clicked");

    if (energy > 0) {
        balance += profit;
        energy -= 1;

        balanceEl.textContent = `${balance}`;
        energyEl.textContent = `${energy}/10`;

        // Отправка данных в Telegram WebApp (если нужно использовать)
        Telegram.WebApp.sendData(JSON.stringify({
            action: "fight",
            balance: balance,
            energy: energy
        }));
    } else {
        alert("⚡ Not enough energy!");
    }
});

// Восстановление энергии каждые 5 секунд
setInterval(() => {
    if (energy < 10) {
        energy += 1;
        energyEl.textContent = `${energy}/10`;
    }
}, 5000);
