class Room {

  constructor(id, clients) {
    this.id = id;
    this.clients = clients;
    this.messages = {};
  }

}

module.exports = Room;
