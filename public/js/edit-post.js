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
    newTitleArea.classList.add('edit-title');
    newTitleArea.setAttribute('type','text');
    newTitleArea.value = oldTitle;
    newText.classList.add('edit-content');
    newText.classList.add(`${parent.id}-edit`);
    newText.innerHTML = oldContent;
    newSaveBtn.classList.add('btn');
    newSaveBtn.classList.add('save-edit-btn');
    // append to parent element
    parent.append(newBlock);
    newBlock.append(newTitleArea);
    newBlock.append(newText);
    newBlock.append(newSaveBtn);
};

//edit
const postEditButtons = document.querySelectorAll('.edit-btn-post');
postEditButtons.forEach((btn) =>{
      btn.addEventListener('click', editHandlerPost);
});