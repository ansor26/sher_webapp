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
    } else {
        alert("⚡ Not enough energy!");
    }
});
