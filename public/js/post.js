const newPost = async () => {
    //retrieve information
    const title = document.querySelector('.title').value;
    const content = document.querySelector('#new-post').value;
    // if valid info
    if(content && title){
        const response = await fetch(`/api/posts/`, {
            method: 'POST',
            body: JSON.stringify({title, content}),
            headers: { 'Content-Type': 'application/json' },
        });
        // if sucessful redirect 
        if(response.ok){
            //clear the text area and reload page
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document
  .querySelector('.save-btn')
  .addEventListener('click', newPost);

