let canvas;
let ctx;
let socket;
let hash;

let charList = {};
let playerChar = {};

const keyDownHandler = (e) =>{
  var keyPressed = e.which;

  // A OR LEFT
  if(keyPressed === 65 || keyPressed === 37) {
    playerChar.facingRight = false;
    playerChar.moving = true;
    playerChar.changed = true;
  }
  // D OR RIGHT
  else if(keyPressed === 68 || keyPressed === 39) {
    playerChar.facingRight = true;
    playerChar.moving = true;
    playerChar.changed = true;
  }
  //space
  else if(keyPressed === 32){
    playerChar.jumping = true;
    playerChar.changed = true;
  }
};

//handler for key up events
const keyUpHandler = (e) => {
  var keyPressed = e.which;
  
  // A OR LEFT
  if(keyPressed === 65 || keyPressed === 37) {
    playerChar.facingRight = false;
    playerChar.moving = false;
  }
  // D OR RIGHT
  else if(keyPressed === 68 || keyPressed === 39) {
    playerChar.facingRight = true;
    playerChar.moving = false;
  }
  //space
  else if(keyPressed === 32){
    playerChar.jumping = false;
  }
};

const init = () =>{
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');
  
  socket = io.connect();
  
  socket.on('physicsUpdate', updateCharList);
  
  document.body.addEventListener('keydown', keyDownHandler);
  document.body.addEventListener('keyup', keyUpHandler);
  
  document.body.addEventListener('onclick',()=>{
    ctx.clearRect(0,0,500,500);
  });
  
  ctx.fillStyle = "red";
  
  window.requestAnimationFrame(update);
};

window.onload = init;