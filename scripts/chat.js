//updating the username

//updating the rooms

class Chatroom {
  constructor(room, username){
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }

  //adding new chat documents
  async addChat(message){
    //format a chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    //seve the chat document
    const response = await this.chats.add(chat);
    return response;
  }

  //setting up a real-time listener toget new chats
  async getChats(callback){
    this.unsub = this.chats
      .orderBy("created_at")
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach((change, index) => {
          if (change.type === "added"){
            //update UI
            callback(change.doc.data());
          }
        });
      });
  }
  updateName(username){
    this.username = username;
    localStorage.username = username;
  }
  updateRoom(room){
    this.room = room;
    localStorage.activeRoom = room;
  }
}
