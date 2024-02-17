document.addEventListener('DOMContentLoaded', function() {
    // Fetch the latest two posts from your WordPress site
    fetch('https://blogg.journeywithrob.com/wp-json/wp/v2/posts?per_page=2&_embed')
        .then(response => response.json())
        .then(posts => {
            const postLinks = document.querySelectorAll('.post-link');

            posts.forEach((post, index) => {
                if (postLinks[index]) {
                    const postLink = postLinks[index];
                    const postContainer = postLink.querySelector('.new-post-content');

                    postLink.href = `post.html?postId=${post.id}`;

                    // Update the post title
                    const titleElement = postContainer.querySelector('h2');
                    titleElement.textContent = post.title.rendered;

                    // Update the post image
                    const imageElement = postContainer.querySelector('img');
                    if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url) {
                        imageElement.src = post._embedded['wp:featuredmedia'][0].source_url;
                        imageElement.alt = post.title.rendered;
                    } else {
                        
                        imageElement.style.display = 'none'; 
                    }

                    const excerptElement = postContainer.querySelector('p');
                    excerptElement.innerHTML = post.excerpt.rendered;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
});


