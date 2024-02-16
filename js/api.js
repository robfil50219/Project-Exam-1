document.addEventListener('DOMContentLoaded', function() {
    fetch('https://www.journeywithrob.com/wp-json/wp/v2/posts?_embed&slug=embracing-the-future-how-emerging-technologies-are-redefining-coding')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const post = data[0]; 
          
          
          const postTitleElement = document.querySelector('.post-title');
          postTitleElement.textContent = post.title.rendered;
  
          
          const postContentSection = document.querySelector('.post-content');
          postContentSection.innerHTML = post.content.rendered;
  
          
          const postImageFigure = document.querySelector('.post-image');
          if (post._embedded['wp:featuredmedia']) {
            const image = post._embedded['wp:featuredmedia'][0];
            postImageFigure.querySelector('img').src = image.source_url;
            postImageFigure.querySelector('img').alt = image.alt_text || 'Post Image';
            postImageFigure.querySelector('figcaption').innerHTML = image.caption.rendered || '';
          } else {

            postImageFigure.style.display = 'none';
          }
        }
      })
      .catch(error => console.error('Error loading post:', error));
  });
  
  
