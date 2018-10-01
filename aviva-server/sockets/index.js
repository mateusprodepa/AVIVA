module.exports = {

  createSockets: function (io) {

    // Handling the client connection with the server through websockets
    io.sockets.on('connection', (socket) => {
      console.log("Nova conexão:" + socket.id);

      socket.on('disconnect', () => {
        console.log("O usuário de id " + socket.id + " foi desconectado");
      });

    });
  }

};
