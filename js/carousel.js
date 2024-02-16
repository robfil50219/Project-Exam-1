document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('#carousel');
  const groups = document.querySelectorAll('.carousel .image-group');
  let activeIndex = 0;
  let interval;

  // Function to start the image swap interval
  function startInterval() {
    interval = setInterval(() => {
      groups[activeIndex].classList.remove('active');
      activeIndex = (activeIndex + 1) % groups.length;
      groups[activeIndex].classList.add('active');
    }, 3000); 
  }
  function stopInterval() {
    clearInterval(interval);
  }
  startInterval();
  carousel.addEventListener('mouseenter', stopInterval);
  carousel.addEventListener('mouseleave', startInterval);
});

  
  
  
  
  

