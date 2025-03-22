// Разворачиваем Mini App на весь экран
Telegram.WebApp.ready();
Telegram.WebApp.expand();

let balance = 0;
let energy = 10;
const profit = 10;

const balanceEl = document.getElementById("balance");
const energyEl = document.getElementById("energy");
const fightBtn = document.getElementById("fightBtn");

fightBtn.addEventListener("mousedown", (e) => {
    e.preventDefault(); // убирает фокус, чтобы не прыгал экран
});

fightBtn.addEventListener("click", () => {
    console.log("Fight button clicked");

    if (energy > 0) {
        balance += profit;
        energy -= 1;

        balanceEl.textContent = `${balance}`;
        energyEl.textContent = `${energy}/10`;

        Telegram.WebApp.sendData(JSON.stringify({
            action: "fight",
            balance: balance,
            energy: energy
        }));
    } else {
        alert("⚡ Not enough energy!");
    }
});

setInterval(() => {
    if (energy < 10) {
        energy += 1;
        energyEl.textContent = `${energy}/10`;
    }
}, 5000);
