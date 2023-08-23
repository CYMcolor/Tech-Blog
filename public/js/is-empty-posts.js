const section = document.querySelector(".post-section");

console.log(section.textContent.trim() === '');
if(section.textContent.trim() === '')
{
    
    const noPosts = document.createElement('div');
    noPosts.innerHTML = 'There are no posts ¯\\_ (ツ)_/¯';
    noPosts.classList.add('no-posts-message');
    section.append(noPosts);
}