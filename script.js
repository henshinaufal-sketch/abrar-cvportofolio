const d = window.PORTFOLIO;
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

$('#eyebrow').textContent = d.eyebrow;
$('#headline').textContent = d.headline;
$('#intro').textContent = d.intro;
$('#researchStatement').textContent = d.researchStatement;
$('#social').textContent = d.social;
$('#footerName').textContent = `${d.name.toUpperCase()} — ${d.location.toUpperCase()}`;
$('#emailLink').href = `mailto:${d.email}`;
$('#linkedinLink').href = d.linkedin;
$('#socialLink').href = d.socialUrl || 'https://tiktok.com/@asnmedioker';

$('#stats').innerHTML = d.stats.map((item) => `
  <div class="stat">
    <strong>${item.value}</strong>
    <span>${item.label}</span>
  </div>
`).join('');

$('#focus').innerHTML = d.focus.map((item) => `
  <article class="focus-card">
    <div class="n">${item.n}</div>
    <h3>${item.title}</h3>
    <p>${item.text}</p>
  </article>
`).join('');

$('#projectsGrid').innerHTML = d.projects.map((item) => `
  <article class="project">
    <figure class="project-media">
      <img src="${item.image}" alt="${item.imageAlt}" loading="lazy" />
    </figure>
    <div class="project-body">
      <div class="project-meta">
        <span class="year">${item.year}</span>
        <span class="kicker">${item.kicker}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <div class="tags">${item.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
    </div>
  </article>
`).join('');

$('#careerList').innerHTML = d.career.map((item) => `
  <div class="timeline-row">
    <time>${item.period}</time>
    <div>
      <h3>${item.title}</h3>
      <p>${item.org}</p>
    </div>
  </div>
`).join('');

$('#skills').innerHTML = d.skills.map((skill) => `<span class="skill">${skill}</span>`).join('');

$('#gallery').innerHTML = d.gallery.map((item, index) => `
  <figure class="gallery-card">
    <button class="gallery-image-button" type="button" data-gallery-index="${index}" aria-label="Open ${item.title} photo">
      <span class="gallery-image"><img src="${item.image}" alt="${item.alt}" loading="lazy" /></span>
      <span class="gallery-view-hint" aria-hidden="true"><span>View photo</span><b>↗</b></span>
    </button>
    <figcaption>
      <span>${item.eyebrow}</span>
      <h3>${item.title}</h3>
      <p>${item.note}</p>
    </figcaption>
  </figure>
`).join('');

$('#education').innerHTML = `
  <h3>${d.education.school}</h3>
  <h4>${d.education.degree}</h4>
  <p><b>${d.education.period}</b> · ${d.education.gpa}</p>
  <p>${d.education.detail}</p>
`;

$('#highlights').innerHTML = d.highlights.map((item) => `<li>${item}</li>`).join('');

// Dashboard-style section navigation.
const menuToggle = $('#menuToggle');
const menuClose = $('#menuClose');
const navPanel = $('#navPanel');
const navBackdrop = $('#navBackdrop');
let menuIsOpen = false;

function setMenu(open) {
  menuIsOpen = open;
  navPanel.classList.toggle('open', open);
  navBackdrop.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  navPanel.setAttribute('aria-hidden', String(!open));
  navBackdrop.setAttribute('aria-hidden', String(!open));
  if (open) menuClose.focus();
}

menuToggle.addEventListener('click', () => setMenu(true));
menuClose.addEventListener('click', () => {
  setMenu(false);
  menuToggle.focus();
});
navBackdrop.addEventListener('click', () => setMenu(false));
$$('.dashboard-nav a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

// Gallery lightbox.
const lightbox = $('#lightbox');
const lightboxImage = $('#lightboxImage');
const lightboxEyebrow = $('#lightboxEyebrow');
const lightboxTitle = $('#lightboxTitle');
const lightboxNote = $('#lightboxNote');
const lightboxCounter = $('#lightboxCounter');
const lightboxClose = $('#lightboxClose');
const lightboxPrev = $('#lightboxPrev');
const lightboxNext = $('#lightboxNext');
let currentGalleryIndex = 0;
let lastGalleryTrigger = null;

function renderLightbox(index) {
  currentGalleryIndex = (index + d.gallery.length) % d.gallery.length;
  const item = d.gallery[currentGalleryIndex];
  lightboxImage.src = item.image;
  lightboxImage.alt = item.alt;
  lightboxEyebrow.textContent = item.eyebrow;
  lightboxTitle.textContent = item.title;
  lightboxNote.textContent = item.note;
  lightboxCounter.textContent = `${String(currentGalleryIndex + 1).padStart(2, '0')} / ${String(d.gallery.length).padStart(2, '0')}`;
}

function openLightbox(index, trigger) {
  lastGalleryTrigger = trigger;
  renderLightbox(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  if (lastGalleryTrigger) lastGalleryTrigger.focus();
}

$$('.gallery-image-button').forEach((button) => {
  button.addEventListener('click', () => openLightbox(Number(button.dataset.galleryIndex), button));
});
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => renderLightbox(currentGalleryIndex - 1));
lightboxNext.addEventListener('click', () => renderLightbox(currentGalleryIndex + 1));
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (lightbox.classList.contains('open')) {
      closeLightbox();
    } else if (menuIsOpen) {
      setMenu(false);
      menuToggle.focus();
    }
  }

  if (lightbox.classList.contains('open')) {
    if (event.key === 'ArrowLeft') renderLightbox(currentGalleryIndex - 1);
    if (event.key === 'ArrowRight') renderLightbox(currentGalleryIndex + 1);
  }
});
