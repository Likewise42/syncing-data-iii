class Character{
  constructor(hash) {
    this.hash = hash;
    
    this.x = 250;
    this.y = 0;
    
    this.prevX = 0;
    this.prevY = 0;
    
    this.destX = 0;
    this.destY = 0;
    
    this.height = 50;
    this.width = 50;
    
    this.alpha = 0;
    this.facingRight = true;
    
    this.moving = false;
    
    this.jumping = false;
    this.jumpTimer = 0;
    
    this.nextMove;
  }
}

module.exports = Character;