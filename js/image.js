// Get the modal
let overlay = document.getElementById("imageOverlay");

// Get the <span> element that closes the overlay
let close = document.querySelector(".image-overlay .close");


document.addEventListener('click', function(e) {
  if (e.target.closest('.post-image img')) {
    let imgSrc = e.target.src;
    let altText = e.target.alt;
    document.getElementById("overlayImage").src = imgSrc;
    document.getElementById("imageCaption").innerText = altText;
    overlay.style.display = "block";
  }
});

// When the user clicks on <span> (x), close the overlay
close.onclick = function() {
  overlay.style.display = "none";
}


