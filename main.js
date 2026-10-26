const navToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
    nav.classList.remove('is-open');
    navToggle?.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.focus();
  }
});

const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
if ('IntersectionObserver' in window && sectionLinks.length) {
  const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => {
        const active = link.hash === `#${entry.target.id}` ||
          (entry.target.id === 'locales' && link.hash === '#visitanos');
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-26% 0px -62% 0px' });
  ['carta', 'locales', 'nosotros', 'instagram'].forEach((id) => {
    const section = document.getElementById(id);
    if (section) activeSectionObserver.observe(section);
  });
}

const filterButtons = [...document.querySelectorAll('.filter-chip')];
const menuCards = [...document.querySelectorAll('.menu-card')];
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    menuCards.forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !visible);
      if (visible) {
        card.classList.remove('is-arriving');
        requestAnimationFrame(() => card.classList.add('is-arriving'));
      }
    });
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
