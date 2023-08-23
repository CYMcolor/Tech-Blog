//get html elements
const titleArea = document.querySelector('.title');
const textArea = document.querySelector('#new-post');
const saveBtn = document.querySelector('.save-btn');
//every half second checks the title and text area is being used
setInterval(function() {
    if (document.activeElement === textArea || document.activeElement === titleArea ||  document.activeElement === saveBtn ) {
        // if active make text area bigger
        textArea.setAttribute('rows', '20');
        textArea.setAttribute('cols', '75');
    } else {
        // if not active make text area smaller
        textArea.setAttribute('rows', '3');
        textArea.setAttribute('cols', '50');
    }
},50);


const newPost = async () => {
    //retrieve information in inputs
    const title = titleArea.value;
    const content = textArea.value;
    
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