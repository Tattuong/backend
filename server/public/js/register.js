
// const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

//validate form

    // form.addEventListener("submit", e => {
    //   e.preventDefault();

    //   //hide errors
    //   hideError(username);
    //   hideError(email);
    //   hideError(password);

    //   const usernameValue = username.value.trim();
    //   const emailValue = email.value.trim();
    //   const passwordValue = password.value.trim();



    //   if (usernameValue && emailValue && passwordValue) {
    //       if(passwordValue.length < 6){
    //           showError(password, 'pass word')
    //           return
    //     } else{
    //     switch ("") {
    //       case usernameValue:   
    //         showError(username, "please enter your username!");
    //       case emailValue:
    //         showError(email, "please enter your email!");
    //       case passwordValue:
    //         showError(password, "please enter your password!");
    //     }
    //   }
    // }
    // })

    // function showError(input, message) {
    //   const formControl = input.parentElement;
    //   const errMsg = formControl.querySelector(".error-msg");
    //   formControl.className = "form-control error";
    //   errMsg.innerText = message;
    // }


const registerUser = async (event) => {
  event.preventDefault();
  registerAPI(
    document.getElementById("username").value,
    document.getElementById("email").value,
    document.getElementById("password").value
  )
    .then(async (res) => {
      if (res.ok) {
        window.location.replace("/login");
        // function registerUser(event) {
        //     toast({
        //       title: "Thành công!",
        //       message: "Bạn đã đăng ký thành công.",
        //       type: "success",
        //       duration: 5000
        //     });
        //   }
      } else {
        console.log("user already");
        document.getElementById("status").innerHTML =
          "Username or email  already taken ";
      }
    })
    .catch((err) => {
      console.error("Error:", error);
    });
};



// login
const loginUser = async (event) => {
  event.preventDefault();
  loginAPI(
    document.getElementById("username").value,
    document.getElementById("password").value
  )
    .then(async (res) => {
      if (res.ok) {
        const resData = await res.json();
        window.localStorage.setIte2m("AUTH", resData.accessToken);
        window.location.replace("/home");
      } else {
        console.log("user already");
        document.getElementById("status").innerHTML =
          "Username or Password error";
      }
    })
    .catch((err) => {
      console.error("Error:", error);
    });
};
