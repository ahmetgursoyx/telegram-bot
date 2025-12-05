const wheel = document.getElementById("wheel");
const ctx = wheel.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultText = document.getElementById("result");

const options = [
  "🎥 1 Özel Video",
  "🔴 Canlı Show",
  "❌ Boş",
  "💎 VIP Abonelik"
];

let startAngle = 0;

function drawWheel() {
  const arc = Math.PI * 2 / options.length;
  for (let i = 0; i < options.length; i++) {
    const angle = startAngle + i * arc;
    ctx.beginPath();
    ctx.fillStyle = ["#ff4444", "#44ff44", "#4444ff", "#ffaa00"][i];
    ctx.moveTo(200, 200);
    ctx.arc(200, 200, 200, angle, angle + arc);
    ctx.fill();
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(angle + arc / 2);
    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.fillText(options[i], 50, 10);
    ctx.restore();
  }
}

drawWheel();

spinBtn.onclick = async () => {

  // ⭐ Telegram Stars ödeme sistemi
  try {
    await Telegram.WebApp.openInvoice({
      title: "Spin Wheel",
      description: "1 çevirme hakkı",
      currency: "XTR",
      prices: [{ label: "Spin", amount: 500 }]
    });
  } catch (e) {
    alert("Ödeme iptal edildi!");
    return;
  }

  // 🔥 Çark dönme animasyonu
  let angle = Math.random() * 360 + 1800;
  let duration = 3000;
  let start = null;

  function rotate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const currentAngle = angle * (progress / duration);
    startAngle = (currentAngle * Math.PI / 180) % (Math.PI * 2);
    drawWheel();

    if (progress < duration) requestAnimationFrame(rotate);
    else showResult(angle);
  }

  requestAnimationFrame(rotate);
};

function showResult(angle) {
  const normalized = (angle % 360);
  const index = Math.floor(normalized / (360 / options.length));
  resultText.innerHTML = "🎉 Kazandın: " + options[options.length - 1 - index];
}
