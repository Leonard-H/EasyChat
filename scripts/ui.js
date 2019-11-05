//render chaat templates to the DOM

//clear the list of chats (when the room changes)

class ChatUI {
  constructor(list, settingsDiv){
    this.list = list;
    this.settingsDiv = settingsDiv;
  }
  clear(){
    this.list.innerHTML = "";
  }
  btns(rooms, room){
    rooms.querySelectorAll("button").forEach(room => {
      room.style.color = "white";
    });
    room.style.color = "rgb(20, 20, 20)";
  }
  goToRecent(){
    this.list.children[this.list.childElementCount - 1].scrollIntoView();
  }
  setUp(data){
    const when = dateFns.distanceInWordsToNow(
      data.created_at.toDate(),
      { addSuffix: true }
    )
    const html = `
      <li class="list-group-item" id="${data.room}">
        <span class="username">${data.username}</span>
        <span class="message">${data.message}</span>
        <div class="time">${when}</div>
      </li>
    `;

    this.list.innerHTML += html;
  }
  //TODO: setup in app.js
  notify(notification, username){
    //audio stuff
    if (data.username !== username){
      notification.play()
        .catch(err => console.log(err));
    }
  }
  render(room){
    Array.from(this.list.children).forEach(child => {

      if (child.getAttribute("id") !== room && !child.classList.contains("d-none")){
        child.classList.add("d-none");
      } else if (child.getAttribute("id") === room && child.classList.contains("d-none")){
        child.classList.remove("d-none");
      }

    });
  }
  settings(){
    this.settingsDiv.classList.remove("d-none");
  }
  clearSettings(){
    this.settingsDiv.classList.add("d-none");
  }

}
.list.innerHTML = "";
  }
  btns(rooms, room){
    rooms.querySelectorAll("button").forEach(room => {
      room.style.color = "white";
    });
    room.style.color = "rgb(20, 20, 20)";
  }
  goToRecent(){
    this.list.children[this.list.childElementCount - 1].scrollIntoView();
  }
  setUp(data){
    const when = dateFns.distanceInWordsToNow(
      data.created_at.toDate(),
      { addSuffix: true }
    )
    const html = `
      <li class="list-group-item" id="${data.room}">
        <span class="username">${data.username}</span>
        <span class="message">${data.message}</span>
        <div class="time">${when}</div>
      </li>
    `;

    this.list.innerHTML += html;
  }
  //TODO: setup in app.js
  notify(notification, username){
    //audio stuff
    if (data.username !== username){
      notification.play()
        .catch(err => console.log(err));
    }
  }
  render(room){
    Array.from(this.list.children).forEach(child => {

      if (child.getAttribute("id") !== room && !child.classList.contains("d-none")){
        child.classList.add("d-none");
      } else if (child.getAttribute("id") === room && child.classList.contains("d-none")){
        child.classList.remove("d-none");
      }

    });
  }
  settings(){
    this.settingsDiv.classList.remove("d-none");
  }
  clearSettings(){
    this.settingsDiv.classList.add("d-none");
  }

}
