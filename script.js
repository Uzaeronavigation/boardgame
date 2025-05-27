const bonuses = [
  { name: "Бонус 10 очков", points: 10, img: "images/10.jpg" },
  { name: "Бонус 20 очков", points: 20, img: "images/20.jpg" },
  { name: "Бонус 30 очков", points: 30, img: "images/30.jpg" },
  { name: "Бонус 40 очков", points: 40, img: "images/40.jpg" },
  { name: "Бонус 50 очков", points: 50, img: "images/50.jpg" }
];

// остальной код без изменений, например:
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
  drawButton.classList.add("loading");

  setTimeout(() => {
     drawButton.classList.remove("loading");

  clearPrizeImage();
  const gotBonus = Math.random() < 0.5;
  if (gotBonus) {
    const bonus = bonuses[Math.floor(Math.random() * bonuses.length)];
    resultDiv.textContent = `Поздравляем! Вы получили: ${bonus.name} (+${bonus.points} очков)`;
    history.push(bonus);
    localStorage.setItem("bonusHistory", JSON.stringify(history));

    const img = document.createElement("img");
    img.src = bonus.img;
    img.alt = bonus.name;
    img.style.maxWidth = "200px";
    img.style.marginTop = "10px";
    prizeImageDiv.appendChild(img);
  } else {
    resultDiv.textContent = "Увы! Бонус не получен.";
  }
  updateHistoryDisplay();
}, 270);
});

resetButton.addEventListener("click", () => {
  const totalPoints = history.reduce((sum, b) => sum +b.points, 0);
  alert(`Игра завершена! Ваше колличество очков: ${totalPoints}`);

  if (confirm("Вы уверены, что хотите сбросить очки?")) {
    history = [];
    localStorage.removeItem("bonusHistory");
    resultDiv.textContent = "";
    clearPrizeImage();
    updateHistoryDisplay();
  }
});

updateHistoryDisplay();