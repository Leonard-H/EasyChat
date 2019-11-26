// if (navigator.platform === "Android" || navigator.platform === "iPod" || navigator.platform === "iPhone"){
//   document.write("Your device isn't supported by this program");
// }

//dom query
const main = document.querySelector(".main");
const chatList = document.querySelector(".chat-list");
const settingsDiv = document.querySelector("form.settings-form");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const forms = { newChatForm, newNameForm };
const updateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");
const chatWindow = document.querySelector(".chat-window");
const goToRecent = document.querySelector(".go-to-recent");
const notification = document.querySelector("audio.notification-sound");
const loginBtn = document.querySelector(".login");
const signupBtn = document.querySelector(".signup");
const authForm = document.querySelector(".auth-form");
const accountDetails = document.querySelector(".account-details");

//add a new chat
newChatForm.addEventListener("submit", e => {
  e.preventDefault();
  if (!chatroom.username){
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
  //update name via the chatroom classq
  const newName = newNameForm.name.value.trim();
  username = newName;
  chatroom.updateName(newName, authentication.user);


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

      goToRecent.classList.add("d-none");
      chatroom.updateRoom(e.target.getAttribute("id"));
      chatUI.setUpSettings(forms);

    } else if (chatroom.room === "settings"){

      chatUI.removeSettings(forms);
      chatroom.updateRoom(e.target.getAttribute("id"));
      chatUI.render(chatroom.room);
      goToRecent.classList.add("d-none")
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
const templates = new Templates();

const chatUI = new ChatUI(chatList, settingsDiv);

const authentication = new Authentication(document.querySelector(".start"),
                                          authForm,
                                          main,
                                          document.querySelector(".logout-btn"),
                                          document.querySelector(".logout-text"),
                                          );

authentication.listener(user => {
  //get username from database
  authentication.user
    .get()
    .then(user => {
      const data = user.data();
      chatroom.username = data.username;
      chatroom.room =  data.room;
      chatUI.btns(rooms, document.querySelector(`#${data.room}`));
    });

  //get chats and render
  chatroom.getChats((data, boolean, index) => {
    chatUI.setUp(data);
    chatUI.goToRecent();
    chatUI.render(chatroom.room);


    //code checks if there is more than one message (aka startup) to prevent notification
    let notSetupMessage = false;
    if (boolean && !index){
      notSetupMessage = true;
    }

    //setup notification sound
    notify.setUp(notification, chatroom.username, notSetupMessage);
  })
    .catch(err => console.log(err));

  //account info
  const html = `
    <small class="text-muted">logged in as: ${user.email}</small>
  `;
  accountDetails.innerHTML = html;

});

const chatroom = new Chatroom();

const notify = new Notify();



//auth
signupBtn.addEventListener("click", () => {
  authentication.signup()
})

loginBtn.addEventListener("click", () => {
  authentication.login()
});

settingsDiv.addEventListener("submit", e => e.preventDefault());



//store data such as username in firebase
window.onbeforeunload = event => {
  authentication.user
    .update({
      username: chatroom.username,
      room: chatroom.room
    });
};



//developer tool: delete tests
const deleteTests = () => {

db.collection("chats").where("message", "==", "test")
	.get()
	.then((querySnapshot) => {
		querySnapshot.forEach(test => {
      db.collection("chats").doc(test.id).delete();
		});
	})

}
