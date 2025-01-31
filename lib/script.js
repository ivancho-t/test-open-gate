const sliderButton = document.getElementById("slider-button");
const sliderContainer = document.querySelector(".slider-container");
const lockIcon = document.getElementById("lock-icon");

let isSliding = false; // Track if the user is sliding

sliderButton.addEventListener("touchstart", (e) => {
  isSliding = true; // Start sliding
});

sliderButton.addEventListener("touchmove", (e) => {
  if (!isSliding) return;

  const containerRect = sliderContainer.getBoundingClientRect();
  const buttonRect = sliderButton.getBoundingClientRect();

  let newLeft = e.touches[0].clientX - containerRect.left - buttonRect.width / 2;

  // Prevent the button from moving outside the container
  newLeft = Math.max(0, Math.min(newLeft, containerRect.width - buttonRect.width));

  sliderButton.style.left = `${newLeft}px`;

  // Check if the button has reached the end of the track
  if (newLeft >= containerRect.width - buttonRect.width) {
    lockIcon.textContent = "🔓"; // Change to unlocked padlock icon
    window.location.href = "https://www.google.com"; // Redirect to Google
    isSliding = false; // Stop further movement
    return; // Exit early
  }
});

sliderButton.addEventListener("touchend", () => {
  if (!isSliding) return;

  const containerRect = sliderContainer.getBoundingClientRect();
  
  // Reset button position if not fully slid to the right
  const currentLeft = parseFloat(sliderButton.style.left || "0");
  
  if (currentLeft < containerRect.width - sliderButton.offsetWidth) {
    sliderButton.style.left = "0"; // Reset position
    lockIcon.textContent = "🔒"; // Reset to locked padlock icon
    isSliding = false; // Stop sliding
  }
});

// Add your code here

