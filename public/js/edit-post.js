const editHandlerPost = async (event) =>{
    console.log('edit post button was clicked');
    const parent = event.target.parentNode;
    //save previous information
    const oldTitle = parent.querySelector('h2').querySelector('.title').innerHTML.trim('');
    const oldContent = parent.querySelector('.content').innerHTML.trim('');
    console.log('old title: ' + oldTitle);
    console.log('old content: ' + oldContent);
    //clears comment block
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
    //create new elements
    const newBlock = document.createElement('div');
    const newTitleArea = document.createElement('input');
    const newText = document.createElement('textarea');
    const newSaveBtn = document.createElement('button');
    newSaveBtn.innerHTML = 'Save';
    // //add attributes
    newBlock.className = 'edit-post';
    // title stuff
    newTitleArea.classList.add('edit-title');
    newTitleArea.setAttribute('type','text');
    newTitleArea.value = oldTitle;
    //text area stuff
    newText.classList.add('edit-content');
    newText.classList.add(`${parent.id}-edit`);
    newText.setAttribute('rows', '20');
    newText.setAttribute('cols', '75');
    newText.innerHTML = oldContent;
    // save button stuff
    newSaveBtn.classList.add('btn');
    newSaveBtn.classList.add('save-edit-btn');
    // append to parent element
    parent.append(newBlock);
    newBlock.append(newTitleArea);
    newBlock.append(newText);
    newBlock.append(newSaveBtn);
};

const saveEditPostHandler  = async (event) =>{
    //checks to see if save button exits
    if(event.target.classList.contains('save-edit-btn'))
    {
        // gets the comment block element
        const parent = event.target.parentNode.parentNode;
        //gets comment id from parent data-id
        const post_id = parent.getAttribute('data-id');
        //retrieve content information
        const newContent = await document.querySelector(`.${parent.id}-edit`).value;
        const newTitle = document.querySelector('.edit-title').value;
        console.log(newContent);
        console.log(newTitle);
        // if valid info
        if(parent.hasAttribute('data-id') && newTitle && newContent){
            //update comment
            const response = await fetch(`/api/posts/${post_id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: newTitle,
                    content: newContent
                }),
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
// edit
const postEditButtons = document.querySelectorAll('.edit-btn-post');
postEditButtons.forEach((btn) =>{
      btn.addEventListener('click', editHandlerPost);
});
// save editconst
const postBlock = document.querySelectorAll('.post-block');
postBlock.forEach((block) =>{
    block.addEventListener('click', saveEditPostHandler);
});