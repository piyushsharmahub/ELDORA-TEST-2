(() => {
  // Hamburger menu
  const headerWrap = document.querySelector(".header-wrap");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuToggle && headerWrap && mobileNav) {
    const setMenu = (open) => {
      headerWrap.classList.toggle("mobile-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      mobileNav.setAttribute("aria-hidden", String(!open));
    };

    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const open = !headerWrap.classList.contains("mobile-open");
      setMenu(open);
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        setMenu(false);
      }
    });

    document.addEventListener("click", (event) => {
      const isOpen = headerWrap.classList.contains("mobile-open");
      if (!isOpen) return;

      const clickedInsideMenu = mobileNav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        setMenu(false);
      }
    });
  }

  // Hero slider
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const thumbs = Array.from(document.querySelectorAll(".thumb"));
  const eyebrowText = document.getElementById("hero-eyebrow-text");
  const titleMain = document.getElementById("hero-title-main");
  const titleAccent = document.getElementById("hero-title-accent");
  const description = document.getElementById("hero-description");

  if (slides.length > 0) {
    const slideContent = [
      {
        eyebrow: "Trusted Technical Strength",
        titleMain: "Discovering Resources",
        titleAccent: "Unlocking Value",
        description:
          "Eldora Exploration & Mining Pvt. Ltd. delivers reliable, practical, and technically sound solutions across mineral exploration, mining project evaluation, strategic advisory services, and disciplined project acquisition screening.",
      },
      {
        eyebrow: "Mining • Exploration • Advisory",
        titleMain: "Technically\u00A0Strong",
        titleAccent: "Globally\u00A0Positioned",
        description:
          "Eldora combines technical expertise, practical industry understanding, and an international outlook to support mining and exploration opportunities with confidence.",
      },
      {
        eyebrow: "Growth-Oriented International Partner",
        titleMain: "Built For Trust",
        titleAccent: "Value\u00A0For\u00A0Money",
        description:
          "Eldora is committed to delivering practical, cost-effective, and technically reliable support that helps clients advance opportunities with confidence and long-term value in mind.",
      },
    ];

    let index = 0;
    let timer = null;

    const showSlide = (i) => {
      index = (i + slides.length) % slides.length;

      slides.forEach((slide, n) => {
        slide.classList.toggle("active", n === index);
      });

      thumbs.forEach((thumb, n) => {
        thumb.classList.toggle("active", n === index);
      });

      const data = slideContent[index];
      if (eyebrowText) eyebrowText.textContent = data.eyebrow;
      if (titleMain) titleMain.textContent = data.titleMain;
      if (titleAccent) titleAccent.textContent = data.titleAccent;
      if (description) description.textContent = data.description;
    };

    const restartTimer = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        showSlide(index + 1);
      }, 5500);
    };

    const prevBtn = document.querySelector("[data-prev]");
    const nextBtn = document.querySelector("[data-next]");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        showSlide(index - 1);
        restartTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        showSlide(index + 1);
        restartTimer();
      });
    }

    thumbs.forEach((thumb, n) => {
      thumb.addEventListener("click", () => {
        showSlide(n);
        restartTimer();
      });
    });

    showSlide(0);
    restartTimer();
  }

  // Remove duplicate "Contact Us" from hamburger menu
  document.querySelectorAll(".mobile-nav .mobile-cta").forEach((el) => {
    el.remove();
  });

  // Change India number everywhere on page
  const replaceIndiaNumber = () => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((node) => {
      if (node.nodeValue && node.nodeValue.includes("+91-9390521796")) {
        node.nodeValue = node.nodeValue.replace(
          /\+91-9390521796/g,
          "+91 9390521796"
        );
      }
    });
  };

  replaceIndiaNumber();
})();