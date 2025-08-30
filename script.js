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

//navbar
  let lastScrollTop = 0;
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scrolling down → hide navbar
      navbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up → show navbar
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // avoid negative values
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
const getStartedBtn = document.getElementById("getStartedBtn");
const contactForm = document.getElementById("contactForm");

// Your WhatsApp number
const whatsappNumber = "+918019627590";
const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}`;

// Simple device detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

contactBtn.addEventListener("click", () => {
  contactModal.classList.add("active");
  contactModal.classList.remove("hidden");
});

getStartedBtn.addEventListener("click", () => {
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

// Form submission handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form fields
  const name = contactForm.querySelector('input[name="name"]').value.trim();
  const email = contactForm.querySelector('input[name="email"]').value.trim();
  const phone = contactForm.querySelector('input[name="phone"]').value.trim();
  const message = contactForm.querySelector('textarea[name="message"]').value.trim();

  // Validate all fields are filled
  if (!name || !email || !phone || !message) {
    alert("Please fill in all fields before submitting.");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate phone format
  const phoneRegex = /^\+?\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    alert("Please enter a valid phone number (10-15 digits).");
    return;
  }

  // Construct WhatsApp message
  const whatsappMessage = `New Lead📩:%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(message)}`;

  // Create full WhatsApp URL with pre-filled message
  const fullUrl = `${whatsappUrl}&text=${whatsappMessage}`;

  // Log URL for debugging
  console.log("WhatsApp URL:", fullUrl);

  // Open WhatsApp link
  // On mobile, this should open the WhatsApp app; on desktop, it should open WhatsApp Web
  window.open(fullUrl, '_blank');

  // Show success message and reset form
  alert("Thank you for Your Time! We'll contact you via WhatsApp.");
  contactForm.reset();
  contactModal.classList.remove("active");
  contactModal.classList.add("hidden");
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

  


