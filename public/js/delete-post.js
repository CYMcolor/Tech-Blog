const deleteHandler = async (event) => {
    //checks the id of post
    let cofirm = confirm('Are you sure you want to delete?');
    if(event.target.hasAttribute('data-id') && cofirm)
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
            if(splitLocation[3] == 'post')
                //takes user back to previous page
                document.location.replace(document.referrer);
            else
                //refreshes page
                document.location.reload();
        } else {
            alert('Failed to delete post');
        }  
    }
};

const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach((btn) =>{
    btn.addEventListener('click', deleteHandler);
});
  
