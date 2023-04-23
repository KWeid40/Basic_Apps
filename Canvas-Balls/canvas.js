var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

document.getElementById('slider').addEventListener('change', function () {
  init();
});

var mouse = {
  x: undefined,
  y: undefined,
};

var maxRadius = 40;
var colorArray = ['#f72585', '#7209b7', '#480ca8', '#3f37c9', '#4895ef'];

//eventlistner
window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener('touchmove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

//Circle

function Circle(x, y, radius, dx, dy) {
  this.x = x;
  this.y = y;
  this.r = radius;
  this.minRadius = radius;
  this.dx = dx;
  this.dy = dy;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };
  this.update = function () {
    if (this.x > canvas.width - 30 || this.x < 30) {
      this.dx = -this.dx;
    } else if (this.y > canvas.height - 30 || this.y < 30) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //interaction to mouse
    if (
      mouse.x - this.x < 70 &&
      mouse.x - this.x > -70 &&
      mouse.y - this.y < 70 &&
      mouse.y - this.y > -70
    ) {
      if (this.r < maxRadius) {
        this.r += 1;
      }
    } else if (this.r > this.minRadius) {
      this.r -= 1;
    }

    this.draw();
  };
}

var circleArray = [];

function init() {
  balls = document.getElementById('slider').value;
  circleArray = [];
  for (var i = 0; i < balls; i++) {
    var radius = Math.floor(Math.random() * 6) + 1;
    var xPos = Math.random() * (canvas.width - radius * 2) + radius;
    var yPos = Math.random() * (canvas.height - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 3;
    var dy = (Math.random() - 0.5) * 3;
    var radius;
    circleArray.push(new Circle(xPos, yPos, radius, dx, dy));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
init();
animate();

document.body.style.background = 'url(' + canvas.toDataURL() + ')';
