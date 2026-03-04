/* =============================================
   tcaoanhvo — Sorting Visualizer Engine
   Shared by all 5 sorting pages
   ============================================= */
'use strict';

/* ── Copy buttons ── */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const code = btn.closest('.code-block').querySelector('pre').innerText;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = '✓ Copied';
      btn.classList.add('copied');
      setTimeout(() => { btn.innerHTML = '<span>⎘</span> Copy'; btn.classList.remove('copied'); }, 2000);
    });
  });
});

/* ── SortVisualizer class ── */
class SortVisualizer {
  constructor(opts) {
    this.containerId = opts.containerId || 'sortVis';
    this.logId       = opts.logId       || 'sortLog';
    this.statsIds    = opts.statsIds    || {};   // { comparisons, swaps, passes }
    this.delay       = opts.delay       || 300;
    this.running     = false;
    this._resolve    = null;
    this.comparisons = 0;
    this.swaps       = 0;
    this.passes      = 0;
  }

  setDelay(ms) { this.delay = ms; }

  /* Render array as bars */
  render(arr, states = {}) {
    const container = document.getElementById(this.containerId);
    if (!container) return;
    const maxVal = Math.max(...arr, 1);
    container.innerHTML = arr.map((v, i) => {
      const cls = states[i] || 'default';
      const h   = Math.max(6, Math.round((v / maxVal) * 110));
      return `<div class="sort-bar-col">
        <div class="sort-bar ${cls}" style="height:${h}px"></div>
        <span class="sort-bar-val">${v}</span>
      </div>`;
    }).join('');
  }

  /* Append to log */
  log(html) {
    const el = document.getElementById(this.logId);
    if (!el) return;
    el.innerHTML += html + '<br>';
    el.scrollTop = el.scrollHeight;
  }

  clearLog() {
    const el = document.getElementById(this.logId);
    if (el) el.innerHTML = '';
  }

  /* Update stat counters */
  updateStats() {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    if (this.statsIds.comparisons) set(this.statsIds.comparisons, this.comparisons);
    if (this.statsIds.swaps)       set(this.statsIds.swaps,       this.swaps);
    if (this.statsIds.passes)      set(this.statsIds.passes,      this.passes);
  }

  resetStats() {
    this.comparisons = 0; this.swaps = 0; this.passes = 0;
    this.updateStats();
  }

  async sleep() {
    return new Promise(r => {
      const t = setTimeout(r, this.delay);
      this._lastTimer = t;
    });
  }

  stop() { this.running = false; }
}

/* ── Shared utilities ── */
function parseArray(str) {
  return str.split(/[\s,]+/).map(Number).filter(x => !isNaN(x) && x !== '' && x > 0);
}

function randomArray(n = 10, max = 90) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * max) + 5);
}
