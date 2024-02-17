document.addEventListener("DOMContentLoaded", function() {
    // Listen for clicks on images with the class 'clickable-image'
    document.body.addEventListener('click', function(event) {
      if (event.target.classList.contains('clickable-image')) {
        var src = event.target.getAttribute('src');
        var overlayImage = document.getElementById('overlayImage');
        var imageOverlay = document.getElementById('imageOverlay');
        overlayImage.src = src; 
        imageOverlay.style.display = 'flex'; // Show the overlay
      }
    });
  
    // Hide the overlay when it's clicked
    document.getElementById('imageOverlay').addEventListener('click', function() {
      this.style.display = 'none'; 
    });
  });