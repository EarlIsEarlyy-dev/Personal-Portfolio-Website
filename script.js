document.addEventListener('DOMContentLoaded', () => {
  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Project filter tabs ---- */
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  /* ---- Contact form (front-end only demo) ---- */
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      formMsg.style.color = '#e2932f';
      formMsg.textContent = 'Please fill in all fields before sending.';
      return;
    }

    // NOTE: This is a front-end only demo. To actually receive messages,
    // connect this form to a backend endpoint, a form service (e.g. Formspree),
    // or a mailto: action.
    formMsg.style.color = '#7fe0a3';
    formMsg.textContent = 'Message sent! I\'ll get back to you soon.';
    form.reset();
  });

  /* ---- Footer year ---- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const setActiveLink = () => {
    let currentId = sections[0]?.id;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120) currentId = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

});

const readMoreButtons = document.querySelectorAll(".read-more-btn");


readMoreButtons.forEach(button => {
    button.addEventListener("click", () => {
        const description = button.previousElementSibling;
        description.classList.toggle("expanded");
        if(description.classList.contains("expanded")){
            button.textContent = "Read Less";
        }
        else{
            button.textContent = "Read More...";
        }
    });
});

  let currentSlide = 0;
  let autoTimer;
  const cards = document.querySelectorAll('.testimonial-card');
  const dotsContainer = document.getElementById('sliderDots');

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    cards[currentSlide].classList.remove('active');
    document.querySelectorAll('.dot')[currentSlide].classList.remove('active');

    currentSlide = (index + cards.length) % cards.length;

    cards[currentSlide].classList.add('active');
    document.querySelectorAll('.dot')[currentSlide].classList.add('active');

    resetTimer();
  }

  function changeSlide(direction) {
    goToSlide(currentSlide + direction);
  }

  function resetTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => changeSlide(1), 60000); // 60 seconds
  }

  // Start auto-advance
  resetTimer();
