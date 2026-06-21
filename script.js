const checks = [...document.querySelectorAll('input[type="checkbox"][data-progress]')];
const barFill = document.getElementById('barFill');
const progressText = document.getElementById('progressText');
const progressPercent = document.getElementById('progressPercent');
const scoreRing = document.querySelector('.score-ring');
const resetBtn = document.getElementById('resetProgress');

function keyFor(item){ return 'iq500-progress-' + item.dataset.progress; }

function loadProgress(){
  checks.forEach(item => item.checked = localStorage.getItem(keyFor(item)) === 'true');
  updateProgress();
}

function updateProgress(){
  const total = checks.length;
  const done = checks.filter(item => item.checked).length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  barFill.style.width = percent + '%';
  progressText.textContent = `${done} de ${total} completados`;
  progressPercent.textContent = percent + '%';
  scoreRing.style.background = `conic-gradient(var(--purple) ${percent * 3.6}deg, #e2e8f0 0deg)`;
}

checks.forEach(item => {
  item.addEventListener('change', () => {
    localStorage.setItem(keyFor(item), item.checked);
    updateProgress();
  });
});

resetBtn.addEventListener('click', () => {
  checks.forEach(item => {
    item.checked = false;
    localStorage.removeItem(keyFor(item));
  });
  updateProgress();
});

loadProgress();
