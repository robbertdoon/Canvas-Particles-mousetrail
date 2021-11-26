const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
const particlesArray = [];
let hue = 0;

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  // nodig om andere delen vd code deze waardes te kunnen toedelen
  x: undefined,
  y: undefined,
};

canvas.addEventListener('click', function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener('mousemove', function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < 3; i++) {
    particlesArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = 'hsl(' + hue + ', 100%, 50%)';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    c.fillStyle = this.color;
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    c.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        c.beginPath();
        c.strokeStyle = particlesArray[i].color;
        c.lineWidth = 0.2;
        c.moveTo(particlesArray[i].x, particlesArray[i].y);
        c.lineTo(particlesArray[j].x, particlesArray[j].y);
        c.stroke();
        c.closePath();
      }
    }
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      console.log(particlesArray.length);
      i--;
    }
  }
}

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  // c.fillStyle = 'rgba(0,0,0,0.02)';
  // c.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += 0.5;
  requestAnimationFrame(animate);
}
animate();
