// //temporary display check
// if (innerWidth < 600 || innerHeight < 866){
//   document.querySelector(".container").innerText = "Sorry, this app is not avalable for your device yet...";
// }


//dom query
const chatList = document.querySelector(".chat-list");
const settingsDiv = document.querySelector("form.settingsForm");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");
const chatWindow = document.querySelector(".chat-window");
const goToRecent = document.querySelector(".go-to-recent");
const notification = document.querySelector("audio.notification-sound");

//add a new chat
newChatForm.addEventListener("submit", e => {
  e.preventDefault();
  if (!username){
    alert("First get yourself a username.");
  } else {
    const messege = newChatForm.message.value.trim();
    newChatForm.reset();
    chatroom.addChat(messege)
      .catch(err => console.log(err));
  }
});

//update username
newNameForm.addEventListener("submit", e => {
  e.preventDefault();
  //update name via the chatroom class
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  //reset the form
  newNameForm.reset();
  //show then hide the update message
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => updateMssg.innerText = "", 3000)
});

//update the chat room
rooms.addEventListener("click", e => {
  if(e.target.tagName === "BUTTON"){

    chatUI.btns(rooms, e.target);

    //settings
    if (e.target.getAttribute("id") === "settings"){
      newNameForm.classList.add("d-none")
      newChatForm.classList.add("d-none")
      if (!goToRecent.classList.contains("d-none")){
        goToRecent.classList.add("d-none");
      }
      chatroom.updateRoom(e.target.getAttribute("id"));
      chatUI.settings();

    } else if (chatroom.room === "settings"){
      newNameForm.classList.remove("d-none");
      newChatForm.classList.remove("d-none");
      chatUI.clearSettings();
      chatroom.updateRoom(e.target.getAttribute("id"));
      chatUI.render(chatroom.room);
      if (!goToRecent.chatList.contains("d-none")){
        goToRecent.classList.add("d-none")
      }
      chatUI.goToRecent();

    } else {
      chatroom.updateRoom(e.target.getAttribute("id"));
      chatUI.render(chatroom.room);
      if (!goToRecent.classList.contains("d-none")){
        goToRecent.classList.add("d-none")
      }
      chatUI.goToRecent();
    }
  }
});

//chack local storage for a name
const username = localStorage.username ? localStorage.username : undefined;

//go to recent
chatWindow.addEventListener("scroll", () => {
  if (chatList.children[chatList.childElementCount - 1]){
    //!from plainjs.com: Get the position of an element relative to the document
    const rect = chatList.children[chatList.childElementCount - 1].getBoundingClientRect();
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offset = rect.top + scrollTop;
    if (offset > 1200){
      goToRecent.classList.remove("d-none");
      goToRecent.addEventListener("click", () => {
      chatUI.goToRecent();
      });
    } else if(!goToRecent.classList.contains("d-none")){
      goToRecent.classList.add("d-none");
    }
  }
});


//class instances
const chatUI = new ChatUI(chatList, settingsDiv);

const activeRoom = localStorage.activeRoom ? localStorage.activeRoom : "general";
chatUI.btns(rooms, document.querySelector(`#${activeRoom}`));

const chatroom = new Chatroom(activeRoom, username);

//get chats and render
chatroom.getChats(data => {
  chatUI.setUp(data);
  chatUI.goToRecent();
  chatUI.render(chatroom.room);
  //setup notification sound
  const notify = (notification, username) => {
    if (data.username !== username || true){
      notification.play()
        .catch(err => console.log(err));
    }
  }
})
  .catch(err => console.log(err));
