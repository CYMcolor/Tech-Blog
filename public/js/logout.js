//logout event handler
const logout=  async () => {
    alert('was clicked!');
    //send POST request for logout
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/javascript' },
    });

    // if sucessful redirect user to home
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document
  .querySelector('#logout')
  .addEventListener('click', logout);