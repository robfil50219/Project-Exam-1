document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('postsContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    let loadLimit = 10; // Change to 10 posts to load each time
    let loadedPosts = 0; // Counter for the number of loaded posts

    // Function to create a dummy post
    function createPost() {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `<h3>Post Title</h3><p>Post content here...</p>`;
        return postDiv;
    }

    // Function to load posts
    function loadPosts() {
        // Calculate how many posts to load to not exceed 20 total
        let postsToLoad = Math.min(loadLimit, 20 - loadedPosts);
        for (let i = 0; i < postsToLoad; i++) {
            const post = createPost();
            postsContainer.appendChild(post);
            loadedPosts++;
        }
        // Hide the "Load More" button if 20 posts are loaded
        if (loadedPosts >= 20) {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Initially load the first set of 10 posts
    loadPosts();

    // Load more posts on button click
    loadMoreBtn.addEventListener('click', () => {
        loadPosts();
    });
});


