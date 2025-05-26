const bonuses = [
    { name: "Дополнительный ход", points: 10, img: "images/extra_turn.png" },
    { name: "Пропуск следующего игрока", points: 5, img: "images/skip_player.png" },
    { name: "Бонусная подсказка", points: 7, img: "images/hint.png" },
    { name: "Удвоение следующего хода", points: 15, img: "images/double_turn.png" },
    { name: "Обмен карточками с игроком", points: 8, img: "images/swap_cards.png" }
];

const drawButton = document.getElementById("drawCard");
const resetButton = document.getElementById("resetHistory");
const resultDiv = document.getElementById("result");
const historyDiv = document.getElementById("history");
const prizeImageDiv = document.getElementById("prizeImage");

let history = JSON.parse(localStorage.getItem("bonusHistory")) || [];

function updateHistoryDisplay() {
    historyDiv.innerHTML = "<strong>История бонусов:</strong><ul>" +
        history.map(entry => `<li>${entry.name} (+${entry.points} очков)</li>`).join("") +
        "</ul><strong>Всего очков:</strong> " + history.reduce((sum, b) => sum + b.points, 0);
}

function clearPrizeImage() {
    prizeImageDiv.innerHTML = "";
}

drawButton.addEventListener("click", () => {
    clearPrizeImage();
    const gotBonus = Math.random() < 0.5;
    if (gotBonus) {
        const bonus = bonuses[Math.floor(Math.random() * bonuses.length)];
        resultDiv.textContent = `Поздравляем! Вы получили: ${bonus.name} (+${bonus.points} очков)`;
        history.push(bonus);
        localStorage.setItem("bonusHistory", JSON.stringify(history));

        // Отобразить картинку приза
        const img = document.createElement("img");
        img.src = bonus.img;
        img.alt = bonus.name;
        img.style.maxWidth = "150px";
        img.style.marginTop = "10px";
        prizeImageDiv.appendChild(img);
    } else {
        resultDiv.textContent = "Увы! Бонус не получен.";
    }
    updateHistoryDisplay();
});

resetButton.addEventListener("click", () => {
    if (confirm("Вы уверены, что хотите сбросить очки?")) {
        history = [];
        localStorage.removeItem("bonusHistory");
        resultDiv.textContent = "";
        clearPrizeImage();
        updateHistoryDisplay();
    }
});

updateHistoryDisplay();