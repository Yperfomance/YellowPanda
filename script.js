const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const resultText = document.getElementById('result');

const prizes = [
    '10% знижка',
    '20% знижка',
    '50% знижка',
    'Безкоштовна доставка',
    'Подарунок-сюрприз',
    '40% знижка на другий товар'
];

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F4D03F', '#9B59B6', '#F39C12'];

let startAngle = 0;
const arc = Math.PI / (prizes.length / 2);
let spinTimeout = null;
let spinAngleStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < prizes.length; i++) {
        const angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, angle, angle + arc, false);
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.fill();

        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle + arc / 2);
        ctx.fillText(prizes[i], 80, 10);
        ctx.restore();
    }

    // Стрілка
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 10, 10);
    ctx.lineTo(canvas.width / 2 + 10, 10);
    ctx.lineTo(canvas.width / 2, 40);
    ctx.fill();
}

function rotateWheel() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotate();
}

function rotate() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }

    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;
    drawWheel();
    spinTimeout = setTimeout(rotate, 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    const degrees = startAngle * (180 / Math.PI) + 90;
    const arcd = arc * (180 / Math.PI);
    const index = Math.floor((360 - (degrees % 360)) / arcd);
    resultText.innerText = `🎉 Ваш виграш: ${prizes[index]}`;
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

spinButton.addEventListener('click', rotateWheel);
drawWheel();
