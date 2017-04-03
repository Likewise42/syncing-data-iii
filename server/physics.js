const sockets = require('./sockets.js');

let charList = {};
let io;

const jumpSpeed = 4;
const gravConst = 2;
const speed = 3;

const setupIO=(ioServer)=>{
  io = ioServer;
};
module.exports.setupIO = setupIO;

const setCharacterList = (characterList) =>{
  charList = characterList;
};
module.exports.setCharacterList = setCharacterList;

const setCharacter = (character) => {
  charList[character.hash] = character;
};
module.exports.setCharacter = setCharacter;

const deleteCharacter = (character) => {
  delete charList[character.hash];
};
module.exports.deleteCharacter = deleteCharacter;

const updateCharacter = (hash, data) =>{
  charList[hash].nextMove = data;
};
module.exports.updateCharacter = updateCharacter;

const applyGravity = (character) =>{
  const char = character;

  if(char.y < 500){
    char.y += gravConst;
  }

};

const simLoop = () =>{
  const keys = Object.keys(charList);
  const characters = charList;

  for(let i=0; i<keys.length; i++){
    const char = characters[keys[i]];
    if(char.nextMove){
      char.facingRight = char.nextMove.facingRight;
      char.moving = char.nextMove.moving;

      if(char.y === 500){
        char.jumping = char.nextMove.jumping;
        char.jumpTimer = 60;
      }
    }

    if(char.moving){
      if(char.facingRight){
        char.x += speed;
      }else{
        char.x -= speed;
      }
    }

    if(char.jumping){
      
      char.y -= jumpSpeed;

      char.jumpTimer--;
      if(char.jumpTimer <= 0){
        char.jumping = false;
      }

    }else{
      applyGravity(char);
    }
  }


};

setInterval(()=>{
  simLoop();
  io.sockets.in('room1').emit('physicsUpdate', charList);
}, 20);