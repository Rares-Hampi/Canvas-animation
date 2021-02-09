let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

// c.fillStyle = "rgb(255,215,0)";
// c.fillRect(100, 100, 100, 100); //x,y, width, height
// c.fillStyle = "rgb(255, 0, 76)";
// c.fillRect(400, 100, 100, 100); //x,y, width, height
// c.fillStyle = "rgb(17, 0, 255)";
// c.fillRect(300, 300, 100, 100); //x,y, width, height

// c.beginPath();
// c.moveTo(50, 300); //x,y
// c.lineTo(300, 100); //x,y
// c.lineTo(400, 300); //x,y
// c.strokeStyle = "#0f5a5e";
// c.stroke();

// //c.beginPath();
// //c.arc(500, 500, 30, 0, Math.PI * 2, false); //arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void
// //c.strokeStyle = "red";
// //c.stroke();

// for (let i = 0; i < 3; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
//   c.strokeStyle = color;
//   c.stroke();
// }
//c.beginPath();
//c.arc(500, 500, 30, 0, Math.PI * 2, false); //arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void
//c.strokeStyle = "red";
//c.stroke();

let mouse = {
  x: undefined,
  y: undefined,
};

let color = [
  "rgb(37, 207, 7)",
  " rgb(7, 10, 207)",
  "rgb(200, 7, 207)",
  "rgb(207, 7, 74)",
  "#fff",
];
let maxRadius = 70;
let minRadius = 3;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = color[Math.floor(Math.random() * color.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); //arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): void
    c.fillStyle = this.color;
    c.fill();
  };
  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity

    if (
      mouse.x - this.x < 70 &&
      mouse.x - this.x > -70 &&
      mouse.y - this.y < 70 &&
      mouse.y - this.y > -70
    ) {
      if (this.radius < maxRadius) {
        this.radius += 3;
      }
    } else if (this.radius > minRadius) {
      this.radius -= 2;
    }
    this.draw();
  };
}

let circleArray = [];
for (let i = 0; i < 1500; i++) {
  let radius = Math.random() * 3 + 1;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = (Math.random() - 0.5) * 10;
  let dy = (Math.random() - 0.5) * 10;

  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
