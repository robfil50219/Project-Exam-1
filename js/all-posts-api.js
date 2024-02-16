document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('postsContainer');
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.textContent = 'Load More';
    const showLessBtn = document.createElement('button');
    showLessBtn.textContent = 'Show Less';
    showLessBtn.style.display = 'none'; 

    let loadedPosts = 0;
    const initialLoad = 10; 
    let totalPostsAvailable = 0; 

    function fetchPosts(offset = 0, perPage = 10) {
        fetch(`https://www.journeywithrob.com/wp-json/wp/v2/posts?_embed&per_page=${perPage}&offset=${offset}`)
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.innerHTML = `
                        <a href="${post.link}" target="_blank">
                            <div class="post-preview">
                                <h2>${post.title.rendered}</h2>
                                ${post.featured_media ? `<img src="${post._embedded['wp:featuredmedia'][0].source_url}" alt="${post.title.rendered}">` : ''}
                                <p>${post.excerpt.rendered}</p>
                            </div>
                        </a>
                    `;
                    postsContainer.appendChild(postElement);
                });
                loadedPosts += posts.length;
                if (loadedPosts >= totalPostsAvailable) {
                    loadMoreBtn.style.display = 'none';
                }
                if (loadedPosts > initialLoad) {
                    showLessBtn.style.display = 'inline';
                }
            })
            .catch(error => console.error('Error loading posts:', error));
    }

    function loadMorePosts() {
        fetchPosts(loadedPosts, initialLoad);
    }

    function showLess() {
        while (postsContainer.firstChild && loadedPosts > initialLoad) {
            postsContainer.removeChild(postsContainer.lastChild);
            loadedPosts--;
        }
        showLessBtn.style.display = 'none';
        loadMoreBtn.style.display = 'inline';
    }

    // Initially load posts
    fetchPosts(0, initialLoad);

    // Append buttons after the postsContainer
    postsContainer.after(loadMoreBtn);
    postsContainer.after(showLessBtn);

    loadMoreBtn.addEventListener('click', loadMorePosts);
    showLessBtn.addEventListener('click', showLess);
});



