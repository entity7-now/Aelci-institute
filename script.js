// ============================================
// Splash / intro screen
// ============================================
const splashScreen = document.getElementById('splashScreen');

if (splashScreen) {
  document.body.classList.add('no-scroll');

  const dismissSplash = () => {
    splashScreen.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
    setTimeout(() => splashScreen.remove(), 650);
  };

  splashScreen.addEventListener('click', dismissSplash);
  splashScreen.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      dismissSplash();
    }
  });
}

// ============================================
// Mobile nav toggle
// ============================================
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// close mobile nav after clicking a link
nav.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// Hero headline — small rotating line
// ============================================
const heroLines = [
  'Say it clearly.',
  'Write it well.',
  'Speak with confidence.'
];
let heroIndex = 0;
const heroLineEl = document.getElementById('heroLine');

if (heroLineEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroLines.length;
    heroLineEl.style.opacity = '0';
    setTimeout(() => {
      heroLineEl.textContent = heroLines[heroIndex];
      heroLineEl.style.opacity = '1';
    }, 250);
  }, 3200);
  heroLineEl.style.transition = 'opacity 0.25s ease';
}

// ============================================
// Enrollment form validation
// ============================================
const form = document.getElementById('enrollForm');
const formSuccess = document.getElementById('formSuccess');

function setError(fieldName, message) {
  const errorEl = form.querySelector(`[data-error-for="${fieldName}"]`);
  if (errorEl) errorEl.textContent = message || '';
}

function validateForm() {
  let isValid = true;

  const name = form.name.value.trim();
  if (name.length < 2) {
    setError('name', 'Please enter your full name.');
    isValid = false;
  } else {
    setError('name', '');
  }

  const phone = form.phone.value.trim();
  const phonePattern = /^[0-9+\s-]{7,15}$/;
  if (!phonePattern.test(phone)) {
    setError('phone', 'Please enter a valid phone number.');
    isValid = false;
  } else {
    setError('phone', '');
  }

  const track = form.track.value;
  if (!track) {
    setError('track', 'Please choose a track.');
    isValid = false;
  } else {
    setError('track', '');
  }

  return isValid;
}

// ============================================
// Enrollment form -> opens WhatsApp with details pre-filled
// ============================================
const WHATSAPP_NUMBER = '923130216699'; // country code + number, no + or leading 0

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!validateForm()) {
    formSuccess.textContent = '';
    return;
  }

  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const trackLabels = {
    english: 'English Language',
    it: 'IT / Computer Courses',
    both: 'Both tracks'
  };
  const track = trackLabels[form.track.value] || form.track.value;
  const message = form.message.value.trim();

  let text = `Hello, I'd like to enroll.\n\nName: ${name}\nPhone: ${phone}\nInterested in: ${track}`;
  if (message) {
    text += `\nNote: ${message}`;
  }

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  formSuccess.textContent = 'Opening WhatsApp — just tap send there to reach us.';
  window.open(waLink, '_blank', 'noopener');

  form.reset();
});

// ============================================
// Footer year
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// Reveal course items on scroll
// ============================================
const revealTargets = document.querySelectorAll('.course-item, .method-card, .story-card');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}
