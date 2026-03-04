/* =============================================
   tcaoanhvo — Main JavaScript
   ============================================= */

'use strict';

// ── Copy Button ──────────────────────────────
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const block = btn.closest('.code-block');
    const code  = block.querySelector('pre').innerText;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = '✓ Copied';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = '<span>⎘</span> Copy';
        btn.classList.remove('copied');
      }, 2000);
    });
  });
});

// ── Active nav link ───────────────────────────
(function markActive() {
  const path = location.pathname;
  document.querySelectorAll('.nav__links a, .sidebar__menu a').forEach(a => {
    if (a.getAttribute('href') && path.endsWith(a.getAttribute('href'))) {
      a.classList.add('active');
    }
  });
})();

// ── Smooth scroll for anchor links ───────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Intersection Observer for animations ─────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.card, .callout, .code-block, .demo-section').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity .45s ease, transform .45s ease';
  observer.observe(el);
});

// ── Search (client-side simple filter) ────────
const searchInput = document.querySelector('.nav__search input');
if (searchInput) {
  const pages = [
    { title: 'Tìm Min Max', url: '../algorithms/basics/min-max.html', tags: 'tìm kiếm min max nhỏ nhất lớn nhất array mảng' },
    { title: 'Bubble Sort – Sắp xếp nổi bọt', url: '../algorithms/sorting/bubble-sort.html', tags: 'sắp xếp sort bubble' },
    { title: 'Binary Search – Tìm kiếm nhị phân', url: '../algorithms/searching/binary-search.html', tags: 'tìm kiếm nhị phân binary search' },
    { title: 'Linear Search – Tìm kiếm tuyến tính', url: '../algorithms/searching/linear-search.html', tags: 'tìm kiếm tuyến tính linear' },
    { title: 'Selection Sort – Sắp xếp chọn', url: '../algorithms/sorting/selection-sort.html', tags: 'sắp xếp selection sort chọn' },
    { title: 'Fibonacci', url: '../algorithms/basics/fibonacci.html', tags: 'fibonacci dãy số đệ quy' },
  ];

  let dropdown = null;

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    if (dropdown) { dropdown.remove(); dropdown = null; }
    if (!q) return;

    const results = pages.filter(p =>
      p.title.toLowerCase().includes(q) || p.tags.includes(q)
    ).slice(0, 5);

    if (results.length === 0) return;

    dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown';
    dropdown.style.cssText = `
      position:absolute; top:54px; right:24px;
      background:#fff; border:1px solid #e8e8ed;
      border-radius:12px; box-shadow:0 8px 30px rgba(0,0,0,.12);
      min-width:280px; z-index:2000; overflow:hidden;
    `;
    results.forEach(r => {
      const item = document.createElement('a');
      item.href = r.url;
      item.innerHTML = `<span style="font-size:14px;color:#1d1d1f">${r.title}</span>`;
      item.style.cssText = 'display:block;padding:11px 16px;color:#1d1d1f;font-size:14px;border-bottom:1px solid #f5f5f7;';
      item.addEventListener('mouseenter', () => item.style.background = '#f5f5f7');
      item.addEventListener('mouseleave', () => item.style.background = '');
      dropdown.appendChild(item);
    });
    document.querySelector('.nav').appendChild(dropdown);
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav__search') && dropdown) {
      dropdown.remove(); dropdown = null;
    }
  });
}
