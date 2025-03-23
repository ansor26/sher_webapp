Telegram.WebApp.ready();
Telegram.WebApp.expand();

let balance = parseInt(localStorage.getItem("balance")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 10;
let xp = parseInt(localStorage.getItem("xp")) || 0;
let level = parseInt(localStorage.getItem("level")) || 1;
let xpToNext = level * 100;
let lastEnergyUpdate = parseInt(localStorage.getItem("lastEnergyUpdate")) || Date.now();

const profit = 10;
const xpPerFight = 5;

const balanceEl = document.getElementById("balance");
const energyEl = document.getElementById("energy");
const fightBtn = document.getElementById("fightBtn");
const levelEl = document.getElementById("level");
const xpEl = document.getElementById("xp");
const xpToNextEl = document.getElementById("xpToNext");
const xpProgress = document.getElementById("xpProgress");

// Восстанавливаем энергию по времени (после закрытия)
const now = Date.now();
const diffSec = Math.floor((now - lastEnergyUpdate) / 5000); // каждые 5 сек
if (diffSec > 0 && energy < 10) {
    energy = Math.min(energy + diffSec, 10);
    localStorage.setItem("energy", energy);
}

// UI
function updateUI() {
    balanceEl.textContent = `${balance}`;
    energyEl.textContent = `${energy}/10`;
    levelEl.textContent = `${level}`;
    xpEl.textContent = `${xp}`;
    xpToNextEl.textContent = `${xpToNext}`;
    xpProgress.style.width = `${(xp / xpToNext) * 100}%`;
}

fightBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
});

fightBtn.addEventListener("click", () => {
    if (energy > 0) {
        balance += profit;
        energy -= 1;
        xp += xpPerFight;

        if (xp >= xpToNext) {
            xp = xp - xpToNext;
            level++;
            xpToNext = level * 100;
        }

        localStorage.setItem("balance", balance);
        localStorage.setItem("energy", energy);
        localStorage.setItem("xp", xp);
        localStorage.setItem("level", level);
        localStorage.setItem("lastEnergyUpdate", Date.now());

        updateUI();

        Telegram.WebApp.sendData(
            JSON.stringify({
                action: "fight",
                balance,
                energy,
                xp,
                level
            })
        );
    } else {
        alert("⚡ Not enough energy!");
    }
});

// Восстановление энергии в реальном времени
setInterval(() => {
    if (energy < 10) {
        energy += 1;
        localStorage.setItem("energy", energy);
        localStorage.setItem("lastEnergyUpdate", Date.now());
        updateUI();
    }
}, 5000);

updateUI();
