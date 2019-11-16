class Authentication {
  constructor(start, main, logoutBtn, logoutText){
    this.start = start;
    this.main = main;
    this.logoutBtn = logoutBtn;
    this.logoutText = logoutText;
  }
  toggleChat(){
    if (!this.start.classList.contains("d-none")){
      this.start.classList.add("d-none");
    } else {
      this.start.classList.remove("d-none");
    }
    if (this.start.classList.contains("d-none")){
      this.main.classList.remove("d-none");
    } else {
      this.main.classList.add("d-none");
    }

  }
  login(div){
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

    div.innerHTML = html;

    const loginForm = document.querySelector(".login-form");

    loginForm.addEventListener("submit", e => {
      e.preventDefault();


      //get user info
      const userInfo = {
        email: loginForm.inputEmail,
        password: loginform.inputPassword
      };
    })

  }
  signup(div){
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

    div.innerHTML = html;

    const signupForm = document.querySelector(".signup-form");

    signupForm.addEventListener("submit", e => {
      e.preventDefault();


      //get user info

      const email = signupForm.inputEmail.value;
      let password;
      if (signupForm.inputPassword.value === signupForm.confirmPassword.value){
        password = signupForm.inputPassword.value;
      }

      //sign up the user
      auth.createUserWithEmailAndPassword(email, password)
        .then(cred => {
          console.log(cred.user);
          signupForm.innerHTML = "";
          this.toggleChat();
          this.logout()
        }).catch(err => {
          div.innerHTML = err;
        });



    })
  }
  logout(){
    this.logoutBtn.addEventListener("click", e => {
      e.preventDefault();
      if (this.logoutText.value === "logout"){

        auth.signOut();

      }
    })
  }


}
