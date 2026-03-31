(() => {
  const headerWrap = document.querySelector('.header-wrap');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuToggle && headerWrap && mobileNav) {
    const setMenu = (open) => {
      headerWrap.classList.toggle('mobile-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      mobileNav.setAttribute('aria-hidden', String(!open));
    };

    menuToggle.addEventListener('click', () => {
      const open = !headerWrap.classList.contains('mobile-open');
      setMenu(open);
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) setMenu(false);
    });
  }

  const slides = [...document.querySelectorAll('.hero-slide')];
  const thumbs = [...document.querySelectorAll('.thumb')];
  const eyebrowText = document.getElementById('hero-eyebrow-text');
  const titleMain = document.getElementById('hero-title-main');
  const titleAccent = document.getElementById('hero-title-accent');
  const description = document.getElementById('hero-description');

  if (!slides.length) return;

  const slideContent = [
    {
      eyebrow: 'Trusted Technical Strength',
      titleMain: 'Discovering Resources',
      titleAccent: 'Unlocking Value',
      description:
        'Eldora Exploration & Mining Pvt. Ltd. delivers reliable, practical, and technically sound solutions across mineral exploration, mining project evaluation, strategic advisory services, and disciplined project acquisition screening.'
    },
    {
      eyebrow: 'Mining • Exploration • Advisory',
      titleMain: 'Technically\u00A0Strong',
      titleAccent: 'Globally\u00A0Positioned',
      description:
        'Eldora combines technical expertise, practical industry understanding, and an international outlook to support mining and exploration opportunities with confidence.'
    },
    {
      eyebrow: 'Growth-Oriented International Partner',
      titleMain: 'Built For Trust',
      titleAccent: 'Value\u00A0For\u00A0Money',
      description:
        'Eldora is committed to delivering practical, cost-effective, and technically reliable support that helps clients advance opportunities with confidence and long-term value in mind.'
    }
  ];

  let index = 0;
  let timer;

  const show = (i) => {
    index = (i + slides.length) % slides.length;

    slides.forEach((s, n) => s.classList.toggle('active', n === index));
    thumbs.forEach((t, n) => t.classList.toggle('active', n === index));

    const data = slideContent[index];
    if (eyebrowText) eyebrowText.textContent = data.eyebrow;
    if (titleMain) titleMain.textContent = data.titleMain;
    if (titleAccent) titleAccent.textContent = data.titleAccent;
    if (description) description.textContent = data.description;
  };

  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => show(index + 1), 5500);
  };

  document.querySelector('[data-prev]')?.addEventListener('click', () => {
    show(index - 1);
    restart();
  });

  document.querySelector('[data-next]')?.addEventListener('click', () => {
    show(index + 1);
    restart();
  });

  thumbs.forEach((t, n) => {
    t.addEventListener('click', () => {
      show(n);
      restart();
    });
  });

  show(0);
  restart();
})();