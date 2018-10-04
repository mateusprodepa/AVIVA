const _id = require('shortid');
const User = require('../models/User');
const Room = require('../models/Room');

module.exports = {

  createSockets: function (io) {

    // Handling the client connection with the io
    io.on('connection', (socket) => {
      console.log("Nova conexão: " + socket.id);

      socket.on('getRooms', (id) => {

        User.findOne({ id }, (err, user) => {

          if(err || !user)
            return socket.emit('unableToFindUser', 'Erro ao encontrar seu usuário no nosso banco de dados');


          const rooms = user.chatRooms;

          rooms.forEach(room => {
            socket.join(room.id);
          })

          socket.rooms = rooms;

          socket.emit('userRooms', rooms);

        });

      });

      socket.on('createNewRoom', (usersIds) => {

        usersIds.forEach(userId => {

          let killRoomCreationAttempt = false;

          User.findOne({ id: userId }, (err, user) => {


            if(err || !user || killRoomCreationAttempt) {
              killRoomCreationAttempt = true;
              return socket.emit('unableToFindUser', 'Erro ao encontrar seu usuário no nosso banco de dados');
            }

            const room = new Room(_id.generate(), usersIds);

            user.chatRooms.push(room);

            socket.join(room);

            user.save(err => socket.emit('unableToCreateRoom', 'Não foi possível criar a sala de conversa.'));

            socket.emit('userRooms', user.chatRooms);

          });
        })

      })

      socket.on('disconnect', () => {
        console.log("O usuário de id " + socket.id + " foi desconectado");

        // if(typeof socket.rooms !== 'array') {
        //   socket.rooms.forEach(room => socket.leave(room));
        // }

      });

    });
  }

};
