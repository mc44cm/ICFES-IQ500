const checks=[...document.querySelectorAll('.progress-check')];
const percent=document.getElementById('percent');
const points=document.getElementById('points');
const fill=document.getElementById('progressFill');
const menuBtn=document.getElementById('menuBtn');
const navLinks=document.getElementById('navLinks');

menuBtn?.addEventListener('click',()=>navLinks.classList.toggle('open'));

function loadProgress(){
  const saved=JSON.parse(localStorage.getItem('iq500_progress')||'{}');
  checks.forEach(ch=>{
    ch.checked=!!saved[ch.dataset.task];
    ch.closest('.day-card').classList.toggle('done',ch.checked);
  });
  updateStats();
}

function saveProgress(){
  const data={};
  checks.forEach(ch=>data[ch.dataset.task]=ch.checked);
  localStorage.setItem('iq500_progress',JSON.stringify(data));
  localStorage.setItem('iq500_last_visit',new Date().toISOString());
}

function updateStats(){
  const done=checks.filter(ch=>ch.checked).length;
  const total=checks.length || 1;
  const p=Math.round((done/total)*100);
  percent.textContent=p+'%';
  points.textContent=done*50;
  fill.style.width=p+'%';
}

checks.forEach(ch=>{
  ch.addEventListener('change',()=>{
    ch.closest('.day-card').classList.toggle('done',ch.checked);
    saveProgress();
    updateStats();
  });
});

loadProgress();
