const characterSize = 50;

const update = (data) =>{
  if(playerChar.changed){
    socket.emit('update',playerChar);
    playerChar={};
  }

  
  ctx.clearRect(0,0,500,500);
  
  const keys = Object.keys(charList);
  const characters = charList;
  
  console.dir(charList);
  
  ctx.fillStyle = "red";
  for(let i=0; i<keys.length; i++){
    const char = characters[keys[i]];
    
    
    ctx.rect(char.x,char.y,characterSize,characterSize);
    ctx.fill();
    
  }
  requestAnimationFrame(update);
}

const updateCharList = (data) =>{
  charList = data;
  //console.dir(data);
}