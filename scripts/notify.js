class Notify {
  constructor(){

  }
  setUp(notification, username, notSetupMessage){
    //setup notification sound
    if (username !== username && notSetupMessage){
      notification.play()
        .catch(err => console.log(err));
    }

  }
}
