var canvas = document.getElementById('snake-canvas');
canvas.width = 300;
canvas.height = 300;
const scale = 20;
var c = canvas.getContext('2d');
var reset = false;
var direction;
var speed = 1000;
var score = 0;
var midSnake = [];
var midFruit = [];
var snakeBody = [];
var tails = 1;

var startx = 20;
var starty = 20;

//snake move
var dx = 0;
var yx = 0;

//set direction
document.onkeydown = checkKey;

function checkKey(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 37:
      //alert('left');
      if (!(direction == 'right')) {
        direction = 'left';
        dx = -scale;
        dy = 0;
      }
      break;
    case 38:
      //alert('up');
      if (!(direction == 'down')) {
        direction = 'up';
        dx = 0;
        dy = -scale;
      }
      break;
    case 39:
      //alert('right');
      if (!(direction == 'left')) {
        direction = 'right';
        dx = scale;
        dy = 0;
      }
      break;
    case 40:
      //alert('down');
      if (!(direction == 'up')) {
        direction = 'down';
        dx = 0;
        dy = scale;
      }
      break;
  }
}

function Snake() {
  this.xPos = startx;
  this.yPos = starty;
  this.start = function () {
    this.xPos = startx;
    this.yPos = starty;
    this.draw();
  };

  this.draw = function () {
    c.beginPath();
    c.rect(this.xPos, this.yPos, 20, 20);
    c.fillStyle = '#ffffff';
    c.fill();
    c.stroke();
  };
  this.update = function () {
    this.xPos += dx;
    this.yPos += dy;
    midSnake[0] = this.xPos + 10;
    midSnake[1] = this.yPos + 10;
    if (wallCheck(this.xPos, this.yPos)) {
      if (bodyCheck(this.xPos, this.yPos, snakeBody)) {
        this.draw();
      } else {
        gamereset();
      }
    } else {
      gamereset();
    }
  };
}

function Snaketail(x, y) {
  this.x = x;
  this.y = y;

  this.draw = function () {
    c.beginPath();
    c.rect(this.x, this.y, 20, 20);
    c.fillStyle = '#000fff';
    c.fill();
    c.stroke();
  };
}

function wallCheck(x, y) {
  var result = false;
  if (x > -1 && x < canvas.width - 19 && y > -1 && y < canvas.width - 19) {
    result = true;
  }
  return result;
}
function bodyCheck(headX, headY, tails) {
  var result = true;
  for (var i = 0; i < tails.length; i++) {
    var xDis = tails[i].x - headX;
    var yDis = tails[i].y - headY;
    if (xDis < 19 && xDis > -19 && yDis == 0) {
      result = false;
    } else if (yDis < 19 && yDis > -19 && xDis == 0) {
      result = false;
    }
  }
  return result;
}

function Fruit() {
  this.new = function () {
    this.x = randomRangeWithIncrements(0, canvas.width, 20);
    this.y = randomRangeWithIncrements(0, canvas.height, 20);
    console.log(bodyCheck(this.x, this.y, snakeBody));
    while (bodyCheck(this.x, this.y, snakeBody) == false) {
      console.log('while');
      this.x = randomRangeWithIncrements(0, canvas.width, 20);
      this.y = randomRangeWithIncrements(0, canvas.height, 20);
    }
    this.draw();
    midFruit[0] = this.x + 10;
    midFruit[1] = this.y + 10;
  };

  this.draw = function () {
    c.beginPath();
    c.rect(this.x, this.y, 20, 20);
    c.fillStyle = '#FF0000';
    c.fill();
    c.stroke();
  };
  this.update = function () {};
}

function eatFruit() {
  var result = false;
  var xDis = midFruit[0] - midSnake[0];
  var yDis = midFruit[1] - midSnake[1];
  if (xDis < 20 && xDis > -20 && yDis == 0) {
    result = true;
  } else if (yDis < 20 && yDis > -20 && xDis == 0) {
    result = true;
  }
  return result;
}

function startSnake() {
  dx = scale;
  dy = 0;
  speed = 1000;
  reset = false;
  fruit.new();
  animate();
}

function gamereset() {
  score = 0;
  tails = 1;
  snake.start();
  reset = true;
  snakeBody = [];
  console.log('reset');
}
function randomRangeWithIncrements(min, max, inc) {
  min = min;
  inc = inc;
  if (!max) {
    return new Error('need to define a max');
  }

  return Math.floor((Math.random() * (max - min)) / inc) * inc + min;
}

var snake = new Snake();
var x = 20;
var y = 20;
var fruit = new Fruit();

function animate() {
  if (!reset) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    if (eatFruit()) {
      fruit.new();
      score += 1;
      tails += 1;
      if (speed > 100) {
        speed -= 50;
      }
      document.getElementById('score').textContent = 'Score: ' + score;
    }

    snake.update();
    for (var i = 0; i < snakeBody.length; i++) {
      var part = snakeBody[i];
      part.draw();
    }
    snakeBody.push(new Snaketail(snake.xPos, snake.yPos));
    if (snakeBody.length > tails) {
      snakeBody.shift();
    }
    setTimeout(animate, speed);
  } else {
    c.clearRect(0, 0, canvas.width, canvas.height);
  }
}
setTimeout(animate, speed);
