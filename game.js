window.addEventListener('resize', function () {
    window.location.reload();
}); //update size of game depending on size of screen




var wrapper = document.getElementById('wrapper');
var game = document.getElementById('game');
var scoreText = document.getElementById('scoreText');
var livesText = document.getElementById('livesText');
var containerStartGame = document.getElementById('containerStartGame');




var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;
wrapper.style.width = gameWidth + 'px';
wrapper.style.height = gameHeight + 'px';
var gameStarted = false;

//bricks
var numBricks = 30;
var brickWidth = 60;
var brickHeight = 20;
var spaceBetween = 20;
var bricks = [];


//paddle
var paddleWidth = 250;
var paddleHeight = 50;

//ball
var ballHW = 50;
var ball = {
  x: gameWidth / 2,     // Initial x position (centered horizontally)
  y: gameHeight - 150,  // Initial y position
  radius: ballHW / 2,   // Ball radius
  speed: 10,             // Speed of the ball
  dx: 4,                // Horizontal velocity of the ball
  dy: -4                // Vertical velocity of the ball
};

var score = 0;
var lives = 0;

startGame.innerText = 'Start game';


function movePaddleWithPointer(e) {
    var paddle = document.querySelector('.paddle');

    if (!gameStarted) {
        return;
    } else {
        // Calculate the new position of the paddle based on the position of the mouse
        var mouseX = e.clientX;
        var paddleNewPos = mouseX - paddleWidth / 2;
        // Make sure the paddle stays within the game boundaries
        if (paddleNewPos < 0) {
            paddleNewPos = 0;
        }
        if (paddleNewPos > gameWidth - paddleWidth) {
            paddleNewPos = gameWidth - paddleWidth;
        }
        // Move the paddle
        paddle.style.left = paddleNewPos + 'px';
    }
}


// Skapa en funktion för att skapa brickorna och fylla arrayen
function createBricks() {
    for (var i = 0; i < numBricks; i++) {
        var brick = {
            //x: i % 6 * (brickWidth + 10) + 30, // Exempelvis: var sjätte bricka på en ny rad
            //y: Math.floor(i / 6) * (brickHeight + 10) + 30,
            width: brickWidth,
            height: brickHeight,
            color: 'blue',
            brickCollided: false,
        };
        bricks.push(brick);
    }
}

// Funktion för att rita brickorna på spelplanen
function drawBricks() {
    // Rensa befintliga brickor från wrapper
    brickContainer.innerHTML = '';

    for (var i = 0; i < bricks.length; i++) {
        var brick = bricks[i];

        // Skapa ett element för brickan
        var brickEl = document.createElement('div');
        brickEl.classList.add('brick');
        brickEl.style.left = brick.x + 'px';
        brickEl.style.top = brick.y + 'px';
        brickEl.style.width = brick.width + 'px';
        brickEl.style.height = brick.height + 'px';
        brickEl.style.backgroundColor = brick.color;

        brickContainer.appendChild(brickEl);
    }
}

function createPaddle() {
    var paddleEl = document.createElement('div');
    paddleEl.classList.add('paddle');
    paddleEl.style.width = paddleWidth + 'px';
    paddleEl.style.height = paddleHeight + 'px';
    paddleEl.style.backgroundColor = 'blue';

    paddleContainer.appendChild(paddleEl);
}

function createBall() {
    var ballEl = document.createElement('div');
    ballEl.classList.add('ball');
    ballEl.style.width = ballHW + 'px';
    ballEl.style.height = ballHW + 'px';
    ballEl.style.backgroundColor = 'blue';
    ballEl.style.borderRadius = '50%';
    ballEl.style.position = 'absolute';
    ballEl.style.bottom = '100px';
    ballEl.style.left = '50%';

    game.appendChild(ballEl);
}

function detectCollision() {
    var ball = document.querySelector('.ball');
    var paddle = document.querySelector('.paddle');
  
    function checkCollision() {
      var ballRect = ball.getBoundingClientRect();
      var paddleRect = paddle.getBoundingClientRect();
  
      if (
        ballRect.right >= paddleRect.left &&
        ballRect.left <= paddleRect.right &&
        ballRect.bottom >= paddleRect.top &&
        ballRect.top <= paddleRect.bottom
      ) {
        // Collision detected!
        console.log('Collision!');
      }
    }
  
    // Call the collision detection function repeatedly
    setInterval(checkCollision, 10);
  }



function play() {
    containerStartGame.style.display = 'none';
    scoreText.innerText = 'Score: ' + score;
    livesText.innerText = 'Lives: ' + lives;
    gameStarted = true;

    createBall();
    createBricks();
    drawBricks();
    createPaddle();
    detectCollision();
    requestAnimationFrame(update);
}


function update() {
    // Update the ball's position based on its velocity
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    // Check for collisions with the walls
    if (ball.x + ball.radius > gameWidth || ball.x - ball.radius < 0) {
      ball.dx *= -1; // Reverse the horizontal velocity
    }
    if (ball.y - ball.radius < 0) {
      ball.dy *= -1; // Reverse the vertical velocity
    }
  
    // Check for collision with the paddle
    var paddle = document.querySelector('.paddle');
    var paddleRect = paddle.getBoundingClientRect();
  
    if (
      ball.y + ball.radius > paddleRect.top &&
      ball.y - ball.radius < paddleRect.bottom &&
      ball.x + ball.radius > paddleRect.left &&
      ball.x - ball.radius < paddleRect.right
    ) {
      // Collision with the paddle
      ball.dy *= -1; // Reverse the vertical velocity
    }
  
// Check for collision with the bricks
for (var i = 0; i < bricks.length; i++) {
    var brick = bricks[i];
    var brickEl = document.getElementsByClassName('brick')[i];
    var brickRect = brickEl.getBoundingClientRect();
  
    if (
      !brick.brickCollided && // Only check collision if the brick hasn't been collided with already
      ball.y + ball.radius > brickRect.top &&
      ball.y - ball.radius < brickRect.bottom &&
      ball.x + ball.radius > brickRect.left &&
      ball.x - ball.radius < brickRect.right
    ) {
      // Collision with a brick
      if (ball.y < brickRect.top || ball.y > brickRect.bottom) {
        // The collision is vertical, so only reverse the vertical velocity
        ball.dy *= -1;
      } else {
        // The collision is horizontal, so reverse both horizontal and vertical velocity
        ball.dx *= -1;
        ball.dy *= -1;
      }
  
      brickEl.style.opacity = '0'; // Make the collided brick invisible
      brick.brickCollided = true; // Set the collided brick's status to "collided"
      score++; // Increase the score
      scoreText.innerText = 'Score: ' + score; // Update the score text element
    }
  }

  
  
    // Update the ball's position on the screen
    var ballEl = document.querySelector('.ball');
    ballEl.style.left = ball.x - ball.radius + 'px';
    ballEl.style.top = ball.y - ball.radius + 'px';
  
    // Call the update function again in the next frame
    requestAnimationFrame(update);
  }


game.addEventListener('mousemove', movePaddleWithPointer);
game.addEventListener('touchmove', movePaddleWithPointer);