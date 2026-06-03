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

// Tag filter — card tags are interactive, no separate filter bar
(function () {
  const grid = document.querySelector('.project-grid');
  const cards = Array.from(document.querySelectorAll('.project-card'));
  const allTags = document.querySelectorAll('.skill-tag');
  let activeFilter = null;

  // Store original DOM order
  cards.forEach((card, i) => { card.dataset.order = i; });

  allTags.forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const clicked = tag.textContent.trim();

      if (activeFilter === clicked) {
        // Reset — same tag clicked again anywhere
        reset();
      } else {
        // Activate filter
        activeFilter = clicked;
        updateTagHighlights();
        reorderCards();

        // Scroll to top of work section on filter
        document.getElementById('work').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  function reset() {
    activeFilter = null;
    updateTagHighlights();
    restoreOrder();
  }

  function updateTagHighlights() {
    allTags.forEach(tag => {
      if (activeFilter && tag.textContent.trim() === activeFilter) {
        tag.classList.add('active');
      } else {
        tag.classList.remove('active');
      }
    });
  }

  function reorderCards() {
    const matching = cards.filter(card => {
      const tags = card.querySelector('.skill-tags').dataset.tags || '';
      return tags.split(',').map(t => t.trim()).includes(activeFilter);
    });
    const rest = cards.filter(card => !matching.includes(card));

    matching.forEach(card => grid.appendChild(card));
    rest.forEach(card => grid.appendChild(card));
  }

  function restoreOrder() {
    [...cards]
      .sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order))
      .forEach(card => grid.appendChild(card));
  }
})();
