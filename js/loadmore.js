document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('postsContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const showLessBtn = document.getElementById('showLessBtn'); 

    let loadLimit = 10;
    let loadedPosts = 0;
    let initialLoad = 10; // Initial number of posts to show

    showLessBtn.style.display = 'none';

    function createPost() {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `<h3>Post Title</h3><p>Post content here...</p>`;
        return postDiv;
    }

    function loadPosts() {
        let postsToLoad = Math.min(loadLimit, 20 - loadedPosts);
        for (let i = 0; i < postsToLoad; i++) {
            const post = createPost();
            postsContainer.appendChild(post);
            loadedPosts++;
        }
        if (loadedPosts >= 20) {
            loadMoreBtn.style.display = 'none';
        }
        if (loadedPosts > initialLoad) {
            showLessBtn.style.display = 'inline'; // Show the Show Less button
        }
    }

    function removePosts() {
        while (loadedPosts > initialLoad) {
            if (postsContainer.lastChild) {
                postsContainer.removeChild(postsContainer.lastChild);
                loadedPosts--;
            }
        }
        showLessBtn.style.display = 'none'; // Hide the Show Less button
        if (loadedPosts < 20) {
            loadMoreBtn.style.display = 'inline'; 
        }
    }

    loadPosts(); // Initially load the first set of posts

    loadMoreBtn.addEventListener('click', loadPosts); 
    showLessBtn.addEventListener('click', removePosts); 
});



