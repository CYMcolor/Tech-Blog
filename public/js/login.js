//login event handler
const loginFormHandler =  async (event) => {
    event.preventDefault();
    // login form varables from form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    // if both fields are there
    if (username && password) {
        // send post request to API user
        const response = await fetch('api/users/login',{
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: { 'Content-Type': 'application/json'},
        });
        // if sucessful redirect user to dashboard (not avaibile currently)
        if(response.ok){
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } 
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);