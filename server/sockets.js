const xxh = require('xxhashjs');
const Character = require('./Character.js');
const physics = require('./physics.js');

let io;

const setupSockets = (ioServer) => {
  io = ioServer;

  io.on('connection', (sock) => {
    const socket = sock;
    
    console.log("user joined");

    socket.join('room1');

    const hash = xxh.h32(`${socket.id}${new Date().getTime()}`, 0xCAFEBABE).toString(16);

    nCharacter = new Character(hash);
    
    physics.setCharacter(nCharacter);

    socket.hash = hash;

    socket.on('update', (data) => {
      nCharacter.nextMove = data;
      physics.setCharacter(nCharacter);
    });

    socket.on('disconnect', (data)=>{
      //io.sockets.in('room1').emit('left', characters[socket.hash]);
      
      physics.deleteCharacter(nCharacter);
      
      socket.leave('room1');
    });
  });
}

module.exports.setupSockets = setupSockets;