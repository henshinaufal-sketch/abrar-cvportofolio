// Stack the Strata — a small "stack the falling block" mini-game
// themed around the site's rock-strata palette. Self-contained; relies
// on trapTabKey/focusableElements defined in script.js (loaded first).
(function () {
  const modal = document.getElementById('gameModal');
  if (!modal) return;

  const openBtn = document.getElementById('gamePlayBtn');
  const closeBtn = document.getElementById('gameClose');
  const panel = modal.querySelector('.game-panel');
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const overlay = document.getElementById('gameOverlay');
  const overlayText = document.getElementById('gameOverlayText');
  const overlayBtn = document.getElementById('gameOverlayBtn');
  const scoreEl = document.getElementById('gameScore');
  const bestEl = document.getElementById('gameBest');

  const COLORS = ['#c98a3d', '#a6512c', '#46586b', '#5b6b4d', '#7e3c1f'];
  const BASE_COLOR = '#3a2e1f';
  const BEST_KEY = 'geo-stack-best';
  const W = 340;
  const H = 480;
  const ROW_H = 26;
  const BASE_WIDTH = 170;

  let stack = [];
  let current = null;
  let dir = 1;
  let speed = 2.2;
  let score = 0;
  let best = 0;
  let running = false;
  let lastTriggerEl = null;

  function loadBest() {
    try { return Number(localStorage.getItem(BEST_KEY)) || 0; } catch (e) { return 0; }
  }
  function saveBest(value) {
    try { localStorage.setItem(BEST_KEY, String(value)); } catch (e) { /* ignore */ }
  }

  function setupCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawnNext() {
    const top = stack[stack.length - 1];
    const w = top.w;
    dir = Math.random() < 0.5 ? -1 : 1;
    current = {
      x: dir === 1 ? 0 : W - w,
      w,
      color: COLORS[stack.length % COLORS.length],
    };
  }

  function resetStack() {
    stack = [{ x: (W - BASE_WIDTH) / 2, w: BASE_WIDTH, color: BASE_COLOR }];
    score = 0;
    speed = 2.2;
    scoreEl.textContent = '0';
  }

  function startGame() {
    resetStack();
    spawnNext();
    running = true;
    overlay.classList.remove('show');
  }

  function drop() {
    if (!running || !current) return;
    const top = stack[stack.length - 1];
    const left = Math.max(current.x, top.x);
    const right = Math.min(current.x + current.w, top.x + top.w);
    const overlapW = right - left;

    if (overlapW <= 4) {
      endGame();
      return;
    }

    stack.push({ x: left, w: overlapW, color: current.color });
    score += 1;
    scoreEl.textContent = String(score);
    speed = Math.min(7, speed + 0.12);
    spawnNext();
  }

  function endGame() {
    running = false;
    current = null;
    if (score > best) {
      best = score;
      saveBest(best);
    }
    bestEl.textContent = String(best);
    overlayText.textContent = 'Column collapsed at height ' + score + '. Play again?';
    overlayBtn.textContent = 'Play again';
    overlay.classList.add('show');
  }

  function render() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(166, 81, 44, 0.05)';
    ctx.fillRect(0, 0, W, H);

    const visibleRows = Math.floor(H / ROW_H);
    const scrollRows = Math.max(0, stack.length - visibleRows + 2);

    stack.forEach((block, i) => {
      const rowFromBottom = stack.length - 1 - i;
      const row = rowFromBottom - scrollRows;
      if (row < -1 || row > visibleRows) return;
      const y = H - (row + 1) * ROW_H;
      ctx.fillStyle = block.color;
      ctx.fillRect(block.x, y, block.w, ROW_H - 3);
      ctx.strokeStyle = 'rgba(251, 246, 236, 0.18)';
      ctx.lineWidth = 1;
      ctx.strokeRect(block.x + 0.5, y + 0.5, block.w - 1, ROW_H - 4);
    });

    if (running && current) {
      const row = stack.length - scrollRows;
      const y = H - (row + 1) * ROW_H;
      ctx.fillStyle = current.color;
      ctx.fillRect(current.x, y, current.w, ROW_H - 3);
    }
  }

  function tick() {
    if (running && current) {
      current.x += dir * speed;
      if (current.x <= 0) { current.x = 0; dir = 1; }
      if (current.x + current.w >= W) { current.x = W - current.w; dir = -1; }
    }
    render();
    requestAnimationFrame(tick);
  }

  function openModal() {
    lastTriggerEl = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('game-open');

    best = loadBest();
    bestEl.textContent = String(best);
    resetStack();
    running = false;
    current = null;
    overlayText.textContent = 'Click to drop the first layer';
    overlayBtn.textContent = 'Start';
    overlay.classList.add('show');
    requestAnimationFrame(() => closeBtn.focus());
  }

  function closeModal() {
    running = false;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('game-open');
    if (lastTriggerEl) lastTriggerEl.focus();
  }

  function handleDropInput() {
    if (!modal.classList.contains('open')) return;
    if (!running) startGame();
    else drop();
  }

  setupCanvas();
  requestAnimationFrame(tick);

  if (openBtn) openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
  overlayBtn.addEventListener('click', handleDropInput);
  canvas.addEventListener('click', handleDropInput);

  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('open')) return;

    if (event.key === 'Escape') {
      closeModal();
      return;
    }
    if (event.key === 'Tab') {
      if (typeof trapTabKey === 'function') trapTabKey(panel, event);
      return;
    }
    if (event.key === ' ' || event.key === 'Enter') {
      if (document.activeElement === closeBtn) return;
      event.preventDefault();
      handleDropInput();
    }
  });
})();
