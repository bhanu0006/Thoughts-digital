// Initialize AOS animations
AOS.init({
  duration: 1000,
  once: true
});

// Mobile Menu Toggle
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});


const carousel = document.querySelector(".services-carousel");
const cards = document.querySelectorAll(".card");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;
const visibleCards = 3;
const totalCards = cards.length;

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 20; // include margin
  carousel.style.transform = `translateX(-${index * cardWidth}px)`;
}

// Next & Prev buttons
nextBtn.addEventListener("click", () => {
  index = (index + 1) % (totalCards - visibleCards + 1);
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + (totalCards - visibleCards + 1)) % (totalCards - visibleCards + 1);
  updateCarousel();
});

// Auto scroll every 5 seconds
let autoSlide = setInterval(() => {
  index = (index + 1) % (totalCards - visibleCards + 1);
  updateCarousel();
}, 3000);

// Pause on hover
document.querySelector(".services-wrapper").addEventListener("mouseenter", () => {
  clearInterval(autoSlide);
});

document.querySelector(".services-wrapper").addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => {
    index = (index + 1) % (totalCards - visibleCards + 1);
    updateCarousel();
  }, 3000);
});

//social media redirection

function openApp(appUrl, webUrl) {
  // Try opening the app
  let start = Date.now();
  let iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = appUrl;
  document.body.appendChild(iframe);

  // If after 800ms app didn’t open → fallback to browser
  setTimeout(() => {
    if (Date.now() - start < 1200) {
      window.open(webUrl, "_blank");
    }
    document.body.removeChild(iframe);
  }, 800);
}


//sidebar function
const sidebar = document.getElementById("floatingSidebar");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
});

// Contact Modal
const contactBtn = document.getElementById("contactBtn");
const contactModal = document.getElementById("contactModal");
const closeModal = document.getElementById("closeModal");

contactBtn.addEventListener("click", () => {
  contactModal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  contactModal.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (e.target === contactModal) {
    contactModal.classList.remove("active");
  }
});

