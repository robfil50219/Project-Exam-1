document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sortPosts');
    sortSelect.addEventListener('change', function() {
      sortPosts(this.value);
    });
  });
  
  function sortPosts(criteria) {
    // Assuming posts are stored in an array
    let posts = [...document.querySelectorAll('.post')]; // Make sure your posts have a class 'post'
    
    // Sort posts based on the criteria
    posts.sort((a, b) => {
      const dateA = new Date(a.dataset.date); // Assuming each post has a 'data-date' attribute
      const dateB = new Date(b.dataset.date);
      return criteria === 'newest' ? dateB - dateA : dateA - dateB;
    });
  
    // Clear existing posts
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';
  
    // Append sorted posts
    posts.forEach(post => {
      postsContainer.appendChild(post);
    });
  }
  