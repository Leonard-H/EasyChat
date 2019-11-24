class Authentication {
  constructor(start, div, main, logoutBtn, logoutText){
    this.start = start;
    this.div = div;
    this.main = main;
    this.logoutBtn = logoutBtn;
    this.logoutText = logoutText;
    this.user;
  }
  toggleChat(boolean){
    if (boolean){
      this.start.classList.add("d-none");
      this.div.classList.add("d-none");
      this.main.classList.remove("d-none");
    } else {
      this.start.classList.remove("d-none");
      this.div.classList.remove("d-none");
      this.main.classList.add("d-none");
    }

  }
  login(){
    const html = `
      <form class="login-form">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" required>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="inputPassword" placeholder="Password" required>
        </div>
        <button type="submit" class="btn">Submit</button>
      </form>
    `;

    this.div.innerHTML = html;

    const loginForm = document.querySelector(".login-form");
    loginForm.inputEmail.focus();

    loginForm.addEventListener("submit", e => {
      e.preventDefault();


      //get user info
      const email = loginForm.inputEmail.value;
      const password = loginForm.inputPassword.value;

      //loginForm.classList.add("d-none");

      auth.signInWithEmailAndPassword(email, password)
        .catch(err => {
          this.div.innerHTML = err;
        });

    })

  }
  signup(){
    const html = `
    <form class="signup-form">
      <div class="form-group">
        <label for="inputEmail">Email address</label>
        <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" required>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input type="password" class="form-control" id="inputPassword" placeholder="Password" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" class="form-control" id="confirmPassword" placeholder="Password" required>
      </div>
      <button type="submit" class="btn">Submit</button>
    </form>
    `;

    this.div.innerHTML = html;

    const signupForm = document.querySelector(".signup-form");
    signupForm.inputEmail.focus();

    signupForm.addEventListener("submit", e => {
      e.preventDefault();


      //get user info

      const email = signupForm.inputEmail.value;
      let password;

      //signupForm.classList.add("d-none");

      if (signupForm.inputPassword.value === signupForm.confirmPassword.value){
        password = signupForm.inputPassword.value;
      }

      //sign up the user
      auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
          console.log("something");
          db.collection("users").doc(cred.user.uid).set({
            username: null
          })
          .catch(err => console.log(err))
        })
        .catch(err => {
          this.div.innerHTML = err;
        });


    })
  }
  logout(){
    this.logoutBtn.addEventListener("click", e => {
      e.preventDefault();
      if (this.logoutText.value === "logout"){
        auth.signOut()
      }

    })
  }
  listener(callback){
    auth.onAuthStateChanged(user => {
      if (user){
        this.toggleChat(true);

      //get reference to user
      this.user = db.collection("users").doc(user.uid);

      callback(user);
      this.logout();


      } else {
        this.toggleChat(false);
        this.div.innerHTML = "";
        this.user = undefined;
      }
    });
  }
}
