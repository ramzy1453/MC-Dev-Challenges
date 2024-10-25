const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const width = canvas.width;
const height = canvas.height;

const equation = (alpha: number) => (x: number) =>
  x ** 2 / 3 + 0.9 * Math.sqrt(5 - x ** 2) * Math.sin(Math.PI * x * alpha);

function drawGraph(alpha: number, xMin: number, xMax: number) {
  ctx.clearRect(0, 0, width, height);

  const f = equation(alpha);

  ctx.beginPath();

  ctx.moveTo(0, height / 2);

  for (let x = xMin; x < xMax; x++) {
    const y = height / 2 - f((x - width / 2) / 100) * 100;
    ctx.lineTo(x, y);
  }

  ctx.stroke();
}

let alpha = 0;

let id = 0;
function animate() {
  drawGraph(alpha, 0, width);
  alpha += 0.01;
  id = requestAnimationFrame(animate);
}

const start = document.getElementById("start") as HTMLButtonElement;
const stop = document.getElementById("stop") as HTMLButtonElement;
const accelerate = document.getElementById("accelerate") as HTMLButtonElement;
const decelerate = document.getElementById("decelerate") as HTMLButtonElement;

accelerate.onclick = () => {
  alpha *= 1.1;
};

decelerate.onclick = () => {
  alpha /= 1.1;
};

start.onclick = animate;
stop.onclick = () => {
  cancelAnimationFrame(id);
};
