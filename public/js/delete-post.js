const deleteHandler = async (event) => {
    //checks the id of post
    let cofirmPost = confirm('Are you sure you want to delete post?');
    if(event.target.hasAttribute('data-id') && cofirmPost)
    {
        const post_id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            /*
            Finds the document location, to find if the user was on a single post page split the location name by '/'
            if it was on the single post page, the index 3 of the split location would be equal to 'post'
            doing this because if user delets a post on a single post page, the user would end on a blank page
            so it is better to redirect it to the user's previous page
            */
            const location = window.location.toString();
            const splitLocation = location.split('/');
            
            
            if(document.referrer == window.location && splitLocation[3] == 'post'){
                //if user refresed in single post page before deleting
                //return to dashboard
                document.location.replace('/dashboard');
            }else if(splitLocation[3] == 'post'){
                //takes user back to previous page is on single post page
                document.location.replace(document.referrer);
            }else{
                //anywhere else refreshes page
                document.location.reload();
            }    
                
        } else {
            alert('Failed to delete post');
        }  
    }
};

const deleteButtons = document.querySelectorAll('.delete-btn-post');
deleteButtons.forEach((btn) =>{
    btn.addEventListener('click', deleteHandler);
});
  
