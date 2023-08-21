//login event handler
const loginFormHandler =  async (event) => {
    event.preventDefault();
    // login form varables from form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    // if both fields are there
    if (username && password) {
        // send post request to API user for (session)
        const response = await fetch('api/users/login',{
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: { 'Content-Type': 'application/json'},
        });
        // if sucessful redirect user to dashboard
        if(response.ok){
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } 
};

// signup handler
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const repassword = document.querySelector('#re-password-signup').value.trim();

  if (password != repassword ){
    document.getElementById('password-warning').innerHTML = "Passwords does not match";
  } else if (password.length < 8){
    document.getElementById('password-warning').innerHTML = "Password must be at least 8 characters long";
    //alert("Password must be at least 8 characters long");
  } else if(password && repassword && username){
    //send an api POST request to users
    const response = await fetch('api/users/',{
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: { 'Content-Type': 'application/json'},
    });

    // if sucessful redirect user to dashboard
    if(response.ok){
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
  }
};

// login event
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// signup event
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);