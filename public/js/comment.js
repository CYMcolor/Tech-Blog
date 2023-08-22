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
        } else {
            alert(response.statusText);
        }
    }
};

const deleteHandlerComment = async (event) => {
    //checks the id of comment
    let cofirm = confirm('Are you sure you want to delete?');
    if(event.target.hasAttribute('data-id') &&cofirm)
    {
        const comment_id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/comments/${comment_id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to delete comment');
        }  
    }
};

document
  .querySelector('.save-btn')
  .addEventListener('click', newComment);

const buttons = document.querySelectorAll('.delete-btn-comment');
buttons.forEach((btn) =>{
      btn.addEventListener('click', deleteHandlerComment);
});

