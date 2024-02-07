document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#carousel');
    const groups = document.querySelectorAll('.carousel .image-group');
    let activeIndex = 0;
    let interval;
  
    // Function to start the image swap interval
    function startInterval() {
      interval = setInterval(() => {
        groups[activeIndex].style.opacity = '0';
  
        setTimeout(() => {
          groups[activeIndex].classList.remove('active');
          activeIndex = (activeIndex + 1) % groups.length;
          groups[activeIndex].classList.add('active');
          groups[activeIndex].style.opacity = '1';
        }, 500); 
      }, 1500); 
    }
  
    // Function to stop the image swap interval
    function stopInterval() {
      clearInterval(interval);
    }
  
    // Initially start the interval
    startInterval();
  
    // Stop the interval when hovering over the carousel
    carousel.addEventListener('mouseenter', stopInterval);
  
    // Restart the interval when not hovering over the carousel
    carousel.addEventListener('mouseleave', startInterval);
  });
  
  
  
  
  

