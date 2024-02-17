document.addEventListener('DOMContentLoaded', function() {
  // Function to get the query parameter by name
  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  const postId = getQueryParam('postId'); 

  // Function to fetch and display the post
  function fetchAndDisplayPost(postId) {
    if (!postId) {
      console.error('No post ID provided');
      return;
    }

    fetch(`https://blogg.journeywithrob.com/wp-json/wp/v2/posts/${postId}?_embed`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(post => {
        // Populate the post data into the HTML
        document.querySelector('.post-title').textContent = post.title.rendered;
        document.querySelector('.post-content').innerHTML = post.content.rendered;
        if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] && post._embedded['wp:featuredmedia'][0].source_url) {
          document.querySelector('.post-image img').src = post._embedded['wp:featuredmedia'][0].source_url;
          document.querySelector('.post-image img').alt = post.title.rendered;
        } else {
          console.log('No featured image available for this post.');
          document.querySelector('.post-image').style.display = 'none'; 
        }
        if (post._embedded.author && post._embedded.author[0]) {
          document.querySelector('.author').textContent = post._embedded.author[0].name;
        } else {
          document.querySelector('.author').textContent = 'Unknown Author';
        }
        document.querySelector('.post-meta time').textContent = new Date(post.date).toLocaleDateString();
        document.querySelector('.post-meta time').setAttribute('datetime', post.date);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }

  fetchAndDisplayPost(postId); // Fetch and display the post
});




  
  
