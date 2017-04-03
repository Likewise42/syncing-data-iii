'use strict';

var canvas = void 0;
var ctx = void 0;
var socket = void 0;
var hash = void 0;

var charList = {};
var playerChar = {};

var keyDownHandler = function keyDownHandler(e) {
  var keyPressed = e.which;

  // A OR LEFT
  if (keyPressed === 65 || keyPressed === 37) {
    playerChar.facingRight = false;
    playerChar.moving = true;
    playerChar.changed = true;
  }
  // D OR RIGHT
  else if (keyPressed === 68 || keyPressed === 39) {
      playerChar.facingRight = true;
      playerChar.moving = true;
      playerChar.changed = true;
    }
    //space
    else if (keyPressed === 32) {
        playerChar.jumping = true;
        playerChar.changed = true;
      }
};

//handler for key up events
var keyUpHandler = function keyUpHandler(e) {
  var keyPressed = e.which;

  console.log("key up");

  // A OR LEFT
  if (keyPressed === 65 || keyPressed === 37) {
    playerChar.facingRight = false;
    playerChar.moving = false;
    playerChar.changed = true;
  }
  // D OR RIGHT
  else if (keyPressed === 68 || keyPressed === 39) {
      playerChar.facingRight = true;
      playerChar.moving = false;
      playerChar.changed = true;
    }
    //space
    else if (keyPressed === 32) {
        playerChar.jumping = false;
        playerChar.changed = true;
      }
};

var init = function init() {
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');

  socket = io.connect();

  socket.on('physicsUpdate', updateCharList);

  document.body.addEventListener('keydown', keyDownHandler);
  document.body.addEventListener('keyup', keyUpHandler);

  document.body.addEventListener('click', function () {
    ctx.clearRect(0, 0, 500, 500);
  });

  ctx.fillStyle = "red";

  window.requestAnimationFrame(update);
};

window.onload = init;
"use strict";

var characterSize = 50;

var update = function update(data) {
  if (playerChar.changed) {
    socket.emit('update', playerChar);
    playerChar = {};
  }

  ctx.clearRect(0, 0, 500, 500);

  var keys = Object.keys(charList);
  var characters = charList;

  ctx.fillStyle = "red";
  for (var i = 0; i < keys.length; i++) {
    var char = characters[keys[i]];

    ctx.fillRect(char.x, char.y - characterSize, characterSize, characterSize);
  }
  requestAnimationFrame(update);
};

var updateCharList = function updateCharList(data) {
  charList = data;
  //console.dir(data);
};
