document.addEventListener('DOMContentLoaded', function () {
    const postImages = document.querySelectorAll('.post-image img'); 
    const overlay = document.getElementById('imageOverlay');
    const overlayImage = document.getElementById('overlayImage');

    // Function to show the overlay with the clicked image
    postImages.forEach(image => {
        image.addEventListener('click', function () {
            overlayImage.src = this.src; 
            overlayImage.alt = this.alt; 
            overlay.style.display = 'flex'; 
        });
    });

    // Hide the overlay when it's clicked
    overlay.addEventListener('click', function () {
        this.style.display = 'none';
    });
});