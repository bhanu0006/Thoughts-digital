// Initialize AOS animations
AOS.init({
  duration: 1000,
  once: true
});

// Mobile Menu Toggle
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("hidden");
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    navLinks.classList.add("hidden"); // Close menu on link click
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Services Carousel
const carousel = document.querySelector(".services-carousel");
const cards = document.querySelectorAll(".card");
const prevBtn = document.querySelector(".slide-btn.prev");
const nextBtn = document.querySelector(".slide-btn.next");

let index = 0;
let visibleCards = window.innerWidth < 768 ? 1 : 3; // 1 card on mobile, 3 on larger screens
const totalCards = cards.length;

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 20; // Include margin
  carousel.style.transform = `translateX(-${index * cardWidth}px)`;
}

// Update visibleCards on window resize
window.addEventListener("resize", () => {
  visibleCards = window.innerWidth < 768 ? 1 : 3;
  index = Math.min(index, totalCards - visibleCards);
  updateCarousel();
});

// Next & Prev buttons
nextBtn.addEventListener("click", () => {
  index = Math.min(index + 1, totalCards - visibleCards);
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  index = Math.max(index - 1, 0);
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

// Social Media Redirection
function openApp(appUrl, webUrl) {
  let start = Date.now();
  let iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = appUrl;
  document.body.appendChild(iframe);

  setTimeout(() => {
    if (Date.now() - start < 1200) {
      window.open(webUrl, "_blank");
    }
    document.body.removeChild(iframe);
  }, 800);
}

// Floating Sidebar
const sidebar = document.getElementById("floatingSidebar");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
});

// Contact Modal
const contactBtn = document.getElementById("contactBtn");
const contactModal = document.getElementById("contactModal");
const closeModal = document.getElementById("closeModal");
const getStartedBtn = document.getElementById("getStartedBtn"); // New button reference

contactBtn.addEventListener("click", () => {
  contactModal.classList.add("active");
  contactModal.classList.remove("hidden");
});

getStartedBtn.addEventListener("click", () => { // New event listener for Get Started
  contactModal.classList.add("active");
  contactModal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => {
  contactModal.classList.remove("active");
  contactModal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === contactModal) {
    contactModal.classList.remove("active");
    contactModal.classList.add("hidden");
  }
});



//whatsapp

function openWhatsApp() {
    let phone = "919876543210"; // change to your number
    let message = "Hello";      // optional message

    // Try to open WhatsApp app (mobile/desktop)
    let appLink = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
    let webLink = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

    // Create a hidden iframe to trigger WhatsApp app
    let iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = appLink;
    document.body.appendChild(iframe);

    // If app not installed, after 1s → fallback to web
    setTimeout(() => {
      window.open(webLink, "_blank");
      document.body.removeChild(iframe);
    }, 1000);
  }


  //why digital marketing is need.
  document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.why-digital-marketing');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
  });

  // Start Your Digital Journey Button
const ctaButton = document.querySelector(".cta-button");

ctaButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default anchor behavior
  contactModal.classList.add("active");
  contactModal.classList.remove("hidden");
});

  

