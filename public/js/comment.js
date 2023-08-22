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

const editHandlerComment = async (event) =>{
    const parent = event.target.parentNode;
    //save previous information
    let oldContent = parent.querySelector('.content').innerHTML.trim('');
    console.log('old content: ' + oldContent);
    //clears comment block
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
    //create new elements
    const newBlock = document.createElement('div');
    const newText = document.createElement('textarea');
    const newSaveBtn = document.createElement('button');
    newSaveBtn.innerHTML = 'Save';
    //add attributes
    newBlock.className = 'edit-comment';
    newText.classList.add('edit-content');
    newText.classList.add(`${parent.id}-edit`);
    newText.innerHTML = oldContent;
    newSaveBtn.classList.add('btn');
    newSaveBtn.classList.add('save-edit-btn');
    // append to parent element
    parent.append(newBlock);
    newBlock.append(newText);
    newBlock.append(newSaveBtn);
};

const saveEditCommentHandler  = async (event) =>{
    //checks to see if save button exits
    if(event.target.classList.contains('save-edit-btn'))
    {
        // gets the comment block element
        const parent = event.target.parentNode.parentNode;
        //gets comment id from parent data-id
        const comment_id = parent.getAttribute('data-id');
        //retrieve content information
        const newContent = await document.querySelector(`.${parent.id}-edit`).value;
        // if valid info
        if(parent.hasAttribute('data-id') && newContent){
            //update comment
            const response = await fetch(`/api/comments/${comment_id}`, {
                method: 'PUT',
                body: JSON.stringify({content: newContent}),
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
    }
};
// attach elments to event handlers
//save
document
  .querySelector('.save-btn')
  .addEventListener('click', newComment);
//delete
const commentDeleteButtons = document.querySelectorAll('.delete-btn-comment');
commentDeleteButtons.forEach((btn) =>{
      btn.addEventListener('click', deleteHandlerComment);
});
//edit
const commentEditButtons = document.querySelectorAll('.edit-btn-comment');
commentEditButtons.forEach((btn) =>{
      btn.addEventListener('click', editHandlerComment);
});
//save-edit
const commentBlock = document.querySelectorAll('.comment-block');
commentBlock.forEach((block) =>{
    block.addEventListener('click', saveEditCommentHandler);
});


