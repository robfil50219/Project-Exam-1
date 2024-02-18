document.addEventListener('DOMContentLoaded', function() {
  const postWrapper = document.querySelector('.post-wrapper');
  const prevBtn = document.querySelector('.arrow.prev');
  const nextBtn = document.querySelector('.arrow.next');

  let currentPage = 1;
  const postsPerPage = 4;

  // Fetch and display initial set of posts
  fetchAndDisplayPosts(currentPage);

  // Event listeners for navigation buttons
  prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
          currentPage--;
          fetchAndDisplayPosts(currentPage);
      }
  });

  nextBtn.addEventListener('click', () => {
      currentPage++;
      fetchAndDisplayPosts(currentPage);
  });

  // Function to fetch and display posts
  async function fetchAndDisplayPosts(page) {
      try {
          const response = await fetch(`https://blogg.journeywithrob.com/wp-json/wp/v2/posts?page=${page}&per_page=${postsPerPage}&_embed`);
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const posts = await response.json();

          // Clear previous posts
          postWrapper.innerHTML = '';

          // Populate posts
          posts.forEach(post => {
              const postElement = document.createElement('div');
              postElement.classList.add('post');
              postElement.innerHTML = `
                  <h3>${post.title.rendered}</h3>
                  <p>${post.excerpt.rendered}</p>
                  <a href="post.html?postId=${post.id}" target="_blank">Read More</a>
              `;
              postWrapper.appendChild(postElement);
          });
      } catch (error) {
          console.error('Error fetching or displaying posts:', error);
      }
  }
});


  
  
  
  

