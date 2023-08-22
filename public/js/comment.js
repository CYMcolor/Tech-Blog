const newComment = async (event) => {
    //retrieve information
    const content = document.querySelector('#new-comment').value;
    // if valid info
    if(event.target.hasAttribute('data-id') && content){
        const post_id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/comments/`, {
            method: 'POST',
            body: JSON.stringify({content, post_id}),
            headers: { 'Content-Type': 'application/json' },
        });
        // if sucessful redirect 
        if(response.ok){
            //clear the text area and reload page
            document.location.reload();
            document.querySelector('#new-comment').innerHTML = '';
        } else {
            alert(response.statusText);
        }
    }
};

document
  .querySelector('.save-btn')
  .addEventListener('click', newComment);
