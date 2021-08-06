const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')


const registerUser = async(event)=>{
    // if(!username && !email){
    // }
    event.preventDefault();
    const data = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
         
        })
    })
    if (data.ok){
        window.location.replace('/login')
        document.getElementById('success').innerHTML="dsdsds"


    }else{
        console.log("user already")
        document.getElementById('status').innerHTML="Username or email  already taken "
    }
}


// login
const loginUser = async(event)=>{

  event.preventDefault();
  const data = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({
          username: document.getElementById("username").value,
          password: document.getElementById("password").value,
      })
  })
  if (data.ok){
    window.localStorage.setItem('username', document.getElementById("username").value)
    window.location.replace('/home')
  }else{
      console.log("user already")
      document.getElementById('status').innerHTML="Username or email  already taken "
  }
}
