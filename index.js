document.addEventListener("DOMContentLoaded", () => {
  const animationSettings = [
    {
      selector: ".animate-spin-in",
      initStyle: { opacity: "0", transform: "rotate(-10deg) scale(0.9)" },
      show: (el) => {
        el.style.opacity = "1";
        el.style.transform = "rotate(0) scale(1)";
      },
    },
    {
      selector: ".animate-fade-in-down",
      initStyle: { opacity: "0", transform: "translateY(20px)" },
      show: (el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      },
    },
    {
      selector: ".animate-cool-slide",
      initStyle: { opacity: "0", transform: "translateX(30px)" },
      show: (el) => {
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
      },
    },
    {
      selector: ".animate-slide-in",
      initStyle: { opacity: "0", transform: "translateY(20px)" },
      show: (el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      },
    },
    {
      selector: ".animate-water-ripple",
      initStyle: { opacity: "0", transform: "translateY(20px) scale(0.95)" },
      show: (el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0) scale(1)";
      },
    },
    {
      selector: ".animate-fade-in-up",
      initStyle: { opacity: "0", transform: "translateY(20px)" },
      show: (el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      },
    },
  ];

  animationSettings.forEach(({ selector, initStyle, show }) => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) show(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => {
      Object.assign(el.style, initStyle);
      observer.observe(el);
    });

    window.addEventListener("unload", () => {
      elements.forEach((el) => observer.unobserve(el));
    });
  });

  const menu = document.getElementById("mobile-menu");
  const menuButton = document.querySelector(
    '[aria-label="Open menu"], [onclick="toggleMobileMenu()"], #menu-toggle'
  );

  function toggleMobileMenu(event) {
    if (!menu) {
      console.error("Mobile menu element not found.");
      return;
    }
    event && event.stopPropagation();
    menu.classList.toggle("hidden");
    menu.classList.toggle("animate-fade-in-down");
    if (menuButton && menuButton.hasAttribute("aria-expanded")) {
      const isHidden = menu.classList.contains("hidden");
      menuButton.setAttribute("aria-expanded", String(!isHidden));
    }
  }

  function closeMobileMenu() {
    if (!menu) return;
    menu.classList.add("hidden");
    menu.classList.remove("animate-fade-in-down");
    if (menuButton && menuButton.hasAttribute("aria-expanded")) {
      menuButton.setAttribute("aria-expanded", "false");
    }
  }

  if (menu && menuButton) {
    menuButton.addEventListener("click", toggleMobileMenu);

    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        if (!menu.classList.contains("hidden")) {
          closeMobileMenu();
        }
      }
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  }
});

  const slides = document.querySelectorAll(".carousel-slide")
let currentSlide = 0

function showSlide(index){

slides.forEach((slide,i)=>{

if(i === index){
slide.style.opacity = "1"
}else{
slide.style.opacity = "0"
}

})

}

document.getElementById("carousel-next").addEventListener("click",()=>{

currentSlide++
if(currentSlide >= slides.length){
currentSlide = 0
}

showSlide(currentSlide)

})

document.getElementById("carousel-prev").addEventListener("click",()=>{

currentSlide--
if(currentSlide < 0){
currentSlide = slides.length - 1
}

showSlide(currentSlide)

})

setInterval(()=>{

currentSlide++
if(currentSlide >= slides.length){
currentSlide = 0
}

showSlide(currentSlide)

},5000)