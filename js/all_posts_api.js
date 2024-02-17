document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('postsContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const showLessBtn = document.getElementById('showLessBtn');

    let loadedPosts = 0;
    const postsPerPage = 10; 
    let totalPosts = 0;
    let currentPage = 1;

    // Function to fetch posts
    function fetchPosts(page) {
        fetch(`https://blogg.journeywithrob.com/wp-json/wp/v2/posts?page=${page}&per_page=${postsPerPage}&_embed`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                totalPosts = parseInt(response.headers.get('X-WP-TotalPages'));
                return response.json();
            })
            .then(posts => {
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'post';

                    // Check if post has a featured image
                    const imageUrl = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] && post._embedded['wp:featuredmedia'][0].source_url ? post._embedded['wp:featuredmedia'][0].source_url : 'placeholder-image-url.jpg';

                    postElement.innerHTML = `
                        <h2>${post.title.rendered}</h2>
                        <img src="${imageUrl}" alt="${post.title.rendered}" />
                        <p>${post.excerpt.rendered}</p>
                        <a href="post.html?postId=${post.id}" target="_blank">Read More</a>
                    `;
                    postsContainer.appendChild(postElement);
                });
                loadedPosts += posts.length;
                if (currentPage >= totalPosts) {
                    loadMoreBtn.style.display = 'none';
                } else {
                    loadMoreBtn.style.display = 'block'; // Ensure loadMoreBtn is visible if there are more posts
                }
                // Toggle the buttons based on the number of loaded posts
                if (loadedPosts > postsPerPage) {
                    showLessBtn.style.display = 'block';
                } else {
                    showLessBtn.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }

    // Event listener for Load More button
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        fetchPosts(currentPage);
    });

    // Event listener for Show Less button
    showLessBtn.addEventListener('click', () => {
        postsContainer.innerHTML = ''; 
        loadedPosts = 0; 
        currentPage = 1; 
        fetchPosts(currentPage); 
    });

    // Initially load the first set of posts
    fetchPosts(currentPage);
});







