const html = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

// Theme: respect system preference, then localStorage override
const saved = localStorage.getItem('theme');
const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
html.dataset.theme = saved || system;
updateToggleLabel();

toggle.addEventListener('click', () => {
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  html.dataset.theme = next;
  localStorage.setItem('theme', next);
  updateToggleLabel();
});

function updateToggleLabel() {
  const isDark = html.dataset.theme === 'dark';
  toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

// Hamburger menu
hamburger.addEventListener('click', () => {
  const isOpen = !mobileNav.hidden;
  mobileNav.hidden = isOpen;
  hamburger.setAttribute('aria-expanded', String(!isOpen));
  hamburger.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
});

// Close mobile nav when a link is clicked
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.hidden = true;
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
  });
});

// Active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => observer.observe(section));

// Tag filter
const filterBtns = document.querySelectorAll('.tag-filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // Update active button state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide cards
    projectCards.forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        const tags = card.querySelector('.skill-tags').dataset.tags || '';
        const matches = tags.split(',').map(t => t.trim()).includes(filter);
        card.classList.toggle('hidden', !matches);
      }
    });

    // Reorder: move matching cards to top
    const grid = document.querySelector('.project-grid');
    if (filter !== 'all') {
      const matching = [...projectCards].filter(card => {
        const tags = card.querySelector('.skill-tags').dataset.tags || '';
        return tags.split(',').map(t => t.trim()).includes(filter);
      });
      const nonMatching = [...projectCards].filter(card => {
        const tags = card.querySelector('.skill-tags').dataset.tags || '';
        return !tags.split(',').map(t => t.trim()).includes(filter);
      });
      matching.forEach(card => grid.appendChild(card));
      nonMatching.forEach(card => grid.appendChild(card));
    } else {
      // Restore original order via data-order attribute
      [...projectCards]
        .sort((a, b) => (a.dataset.order || 0) - (b.dataset.order || 0))
        .forEach(card => grid.appendChild(card));
    }

    // Scroll to work section (mobile UX)
    const workSection = document.getElementById('work');
    workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Set original order on cards for restoration
projectCards.forEach((card, i) => {
  card.dataset.order = i;
});
