// Переменные для баланса, энергии и дохода за клик
let balance = 0;
let energy = 10;
let maxEnergy = 10;
let profitPerTap = 10;

// Обработчик клика на кнопку "Fight!"
document.getElementById("fightBtn").addEventListener("click", function() {
    if (energy > 0) {
        balance += profitPerTap; // Увеличиваем баланс
        energy--; // Уменьшаем энергию

        // Обновляем текст на странице
        document.getElementById("balance").textContent = "Balance: " + balance + " Sher Coins";
        document.getElementById("energy").textContent = "Energy: " + energy + "/" + maxEnergy + " ⚡";
    } else {
        alert("No energy left! Wait for recharge."); // Если энергия закончилась
    }
});

// 🔄 Автоматическое восстановление энергии (1 ⚡ каждую 5 секунд)
setInterval(() => {
    if (energy < maxEnergy) {
        energy++;
        document.getElementById("energy").textContent = "Energy: " + energy + "/" + maxEnergy + " ⚡";
    }
}, 5000);
