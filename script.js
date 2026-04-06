document.addEventListener("DOMContentLoaded", function () {

  // ================= STICKY NAVBAR =================
  const header = document.getElementById("header");

  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("header-scrolled", window.scrollY > 50);
    });
  }

  // ================= MOBILE MENU =================
  const menu = document.getElementById("mobileMenu");
  const openBtn = document.getElementById("openMenu");
  const closeBtn = document.querySelector(".mobile-close-btn");
  const overlay = document.querySelector(".mobile-menu-overlay");
  const navLinks = document.querySelectorAll(".mobile-nav a");

  if (!menu || !openBtn) return; // safety

  const lines = openBtn.querySelectorAll("span");

  let isOpen = false;

  // GSAP Timeline
  let tl = gsap.timeline({ paused: true });

  tl.set(menu, { display: "block" })
    .to(overlay, { opacity: 1, duration: 0.3 })
    .to(".mobile-menu-content", {
      right: 0,
      duration: 0.5,
      ease: "power4.out"
    })
    .from(".menu-item, .quote-btn, .mobile-center-logo", {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.3");

  // ================= HAMBURGER =================
  function animateHamburger(open = true) {
    if (open) {
      gsap.to(lines[0], { y: 9, rotate: 45, duration: 0.3 });
      gsap.to(lines[1], { opacity: 0, duration: 0.2 });
      gsap.to(lines[2], { y: -9, rotate: -45, duration: 0.3 });
    } else {
      gsap.to(lines[0], { y: 0, rotate: 0, duration: 0.3 });
      gsap.to(lines[1], { opacity: 1, duration: 0.2 });
      gsap.to(lines[2], { y: 0, rotate: 0, duration: 0.3 });
    }
  }

  // ================= OPEN =================
  function openMenu() {
    if (isOpen) return;

    tl.play();
    animateHamburger(true);
    isOpen = true;
  }

  // ================= CLOSE =================
  function closeMenu() {
    if (!isOpen) return;

    gsap.to(".mobile-menu-content", {
      right: "-100%",
      duration: 0.4,
      ease: "power3.in"
    });

    if (overlay) {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          menu.style.display = "none";
        }
      });
    }

    animateHamburger(false);
    tl.pause(0);
    isOpen = false;
  }

  // ================= EVENTS =================
  openBtn.addEventListener("click", openMenu);

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  // 👉 FIXED: CLOSE ON LINK CLICK
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

});