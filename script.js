
let balance = 0;
let energy = 10;
const profit = 10;
let xp = 0;
let level = 1;
let xpToNext = 100;

const balanceEl = document.getElementById("balance");
const energyEl = document.getElementById("energy");
const fightBtn = document.getElementById("fightBtn");
const xpEl = document.getElementById("xp");
const levelEl = document.getElementById("level");
const xpToNextEl = document.getElementById("xpToNext");

fightBtn.addEventListener("click", () => {
    if (energy > 0) {
        balance += profit;
        energy -= 1;
        xp += 10;

        if (xp >= xpToNext) {
            xp -= xpToNext;
            level += 1;
            xpToNext = Math.floor(xpToNext * 1.5);
        }

        balanceEl.textContent = `${balance}`;
        energyEl.textContent = `${energy}/10`;
        xpEl.textContent = xp;
        levelEl.textContent = level;
        xpToNextEl.textContent = xpToNext;

        Telegram.WebApp.sendData(JSON.stringify({
            action: "fight",
            balance: balance,
            energy: energy,
            xp: xp,
            level: level
        }));
    } else {
        alert("⚡ Not enough energy!");
    }
});

// Energy regeneration every 5 seconds
setInterval(() => {
    if (energy < 10) {
        energy += 1;
        energyEl.textContent = `${energy}/10`;
    }
}, 5000);
