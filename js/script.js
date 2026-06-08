const canvas = document.getElementById("blueprintCanvas");
const ctx = canvas.getContext("2d");
const dateText = document.getElementById("dateText");
const saluteForm = document.getElementById("saluteForm");
const nameInput = document.getElementById("nameInput");
const saluteEngineerType = document.getElementById("saluteEngineerType");
const saluteTitle = document.getElementById("saluteTitle");
const saluteMessage = document.getElementById("saluteMessage");
const engineerType = document.getElementById("engineerType");
const engineerMessage = document.getElementById("engineerMessage");

const engineerMessages = {
  general: "En cada obra, sistema, máquina, proceso y mejora tecnológica hay disciplina, creatividad y compromiso. Este 8 de junio reconocemos el trabajo de las ingenieras e ingenieros que impulsan comunidades más seguras, eficientes y conectadas.",
  sistemas: "Al Ingeniero de Sistemas: gracias por crear plataformas, automatizar procesos, proteger información y convertir la tecnología en soluciones útiles para las personas y las organizaciones.",
  electrico: "Al Ingeniero Eléctrico: gracias por diseñar, mantener y mejorar la energía que mueve industrias, hogares, ciudades y proyectos esenciales para el desarrollo del país.",
  civil: "Al Ingeniero Civil: gracias por levantar infraestructura segura, planificar espacios y construir obras que conectan comunidades y sostienen el crecimiento del Perú.",
  industrial: "Al Ingeniero Industrial: gracias por optimizar procesos, mejorar la productividad y encontrar mejores formas de trabajar con calidad, orden y visión estratégica.",
  mecanico: "Al Ingeniero Mecánico: gracias por diseñar, mantener y perfeccionar máquinas, sistemas y soluciones que hacen posible la producción, el transporte y la innovación.",
  ambiental: "Al Ingeniero Ambiental: gracias por cuidar los recursos, prevenir impactos y proponer soluciones que equilibran desarrollo, tecnología y responsabilidad con el entorno."
};

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(canvas.offsetWidth * ratio);
  canvas.height = Math.floor(canvas.offsetHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawBlueprint(time = 0) {
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#4d0719";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255, 244, 207, 0.14)";
  ctx.lineWidth = 1;
  const step = 36;
  const drift = (time / 60) % step;

  for (let x = -step + drift; x < width + step; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = -step + drift; y < height + step; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(214, 162, 58, 0.82)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width * 0.58, height * 0.25);
  ctx.lineTo(width * 0.83, height * 0.25);
  ctx.lineTo(width * 0.83, height * 0.62);
  ctx.lineTo(width * 0.66, height * 0.62);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 244, 207, 0.68)";
  ctx.lineWidth = 2;
  drawCircle(width * 0.69, height * 0.44, 70 + Math.sin(time / 650) * 4);
  drawCircle(width * 0.69, height * 0.44, 34);

  for (let i = 0; i < 12; i += 1) {
    const angle = (Math.PI * 2 * i) / 12 + time / 2200;
    const x1 = width * 0.69 + Math.cos(angle) * 52;
    const y1 = height * 0.44 + Math.sin(angle) * 52;
    const x2 = width * 0.69 + Math.cos(angle) * 86;
    const y2 = height * 0.44 + Math.sin(angle) * 86;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(255, 244, 207, 0.44)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width * 0.56, height * 0.74);
  ctx.lineTo(width * 0.89, height * 0.74);
  ctx.moveTo(width * 0.6, height * 0.7);
  ctx.lineTo(width * 0.6, height * 0.78);
  ctx.moveTo(width * 0.85, height * 0.7);
  ctx.lineTo(width * 0.85, height * 0.78);
  ctx.stroke();

  requestAnimationFrame(drawBlueprint);
}

function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function setDateText() {
  const today = new Date();
  const isEngineerDay = today.getMonth() === 5 && today.getDate() === 8;
  dateText.textContent = isEngineerDay ? "Hoy, 8 de junio" : "Cada 8 de junio";
}

saluteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const specialty = saluteEngineerType.value;

  if (name) {
    saluteTitle.textContent = `¡Feliz Día del Ingeniero, ${name}, ${specialty}!`;
    saluteMessage.textContent = `Tu talento como ${specialty.toLowerCase()} ayuda a construir un Perú con mejores soluciones.`;
  } else {
    saluteTitle.textContent = "¡Feliz Día del Ingeniero!";
    saluteMessage.textContent = "Gracias por construir soluciones con conocimiento, ética y visión de país.";
  }
});

engineerType.addEventListener("change", () => {
  engineerMessage.textContent = engineerMessages[engineerType.value];
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
setDateText();
requestAnimationFrame(drawBlueprint);
