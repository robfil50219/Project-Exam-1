document.addEventListener('DOMContentLoaded', function() {
  // Fetch images for the carousel when the document is ready
  fetchImagesForCarousel();
});

async function fetchImagesForCarousel() {
  const carousel = document.querySelector('#carousel');
  const page = 1; 
  const postsPerPage = 8

  try {
    const response = await fetch(`https://blogg.journeywithrob.com/wp-json/wp/v2/posts?page=${page}&per_page=${postsPerPage}&_embed`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const posts = await response.json();

    // Filter posts to those with a featured image
    const images = posts.filter(post => post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'].length > 0)
                        .map(post => {
                          const media = post._embedded['wp:featuredmedia'][0];
                          return {
                            url: media.source_url,
                            alt: media.alt_text || 'Post image'
                          };
                        });
    createImageGroups(images);

    // Reinitialize the carousel functionality now that images are loaded
    initializeCarousel();
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function createImageGroups(images) {
  const carousel = document.querySelector('#carousel');
  carousel.innerHTML = ''; 

  // Determine group size, here assuming 4 images per group
  const groupSize = 4;
  for (let i = 0; i < images.length; i += groupSize) {
    const imageGroup = document.createElement('div');
    imageGroup.className = 'image-group';
    if (i === 0) imageGroup.classList.add('active'); 

    images.slice(i, i + groupSize).forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image.url;
      imgElement.alt = image.alt;
      imageGroup.appendChild(imgElement);
    });

    carousel.appendChild(imageGroup);
  }
}

function initializeCarousel() {
  const carousel = document.querySelector('#carousel');
  const groups = document.querySelectorAll('.carousel .image-group');
  let activeIndex = 0;
  let interval;

  function startInterval() {
    interval = setInterval(() => {
      groups[activeIndex].classList.remove('active');
      activeIndex = (activeIndex + 1) % groups.length;
      groups[activeIndex].classList.add('active');
    }, 3000); // Change image every 3 seconds
  }

  function stopInterval() {
    clearInterval(interval);
  }

  // Start the image swap interval and handle mouseenter/mouseleave
  startInterval();
  carousel.addEventListener('mouseenter', stopInterval);
  carousel.addEventListener('mouseleave', startInterval);
}

  
  
  
  
  

