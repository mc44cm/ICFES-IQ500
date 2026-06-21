const WOMPI_LINK = ""; // Pega aquí tu link de cobro Wompi. Ejemplo: https://checkout.wompi.co/l/xxxxx
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const rawStore = {
  get:k=>JSON.parse(localStorage.getItem(k)||'null'),
  set:(k,v)=>localStorage.setItem(k,JSON.stringify(v)),
  remove:k=>localStorage.removeItem(k)
};
function slug(s){return (s||'estudiante').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'estudiante'}
let currentProfile = rawStore.get('currentProfile') || 'estudiante';
function key(k){return `iq500_${currentProfile}_${k}`}
const store = {get:k=>rawStore.get(key(k)), set:(k,v)=>rawStore.set(key(k),v), remove:k=>rawStore.remove(key(k))};
function toast(t){const el=$('#toast'); el.textContent=t; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'),2200)}
function update(){
  const tasks=$$('.task'); let done=0;
  tasks.forEach(t=>{t.checked=!!store.get('task_'+t.dataset.id); if(t.checked) done++});
  const total=tasks.length; const pct=Math.round(done/total*100)||0;
  $('#percent').textContent=pct+'%'; $('#points').textContent=done*50; $('#progressBar').style.width=pct+'%';
  const today=new Date().toDateString(); let streak=store.get('streak')||0;
  if(done>0 && store.get('lastDay')!==today){streak++; store.set('streak',streak); store.set('lastDay',today)}
  $('#streak').textContent=store.get('streak')||0;
}
function loadProfile(){
  const profileName = rawStore.get('profileName_'+currentProfile) || '';
  if(profileName) $('#studentName').value=profileName;
  const notes=store.get('notes'); $('#notes').value=notes || '';
  update();
}
function saveProfile(){
  const name=$('#studentName').value.trim() || 'Estudiante';
  currentProfile=slug(name);
  rawStore.set('currentProfile',currentProfile);
  rawStore.set('profileName_'+currentProfile,name);
  toast('👤 Perfil guardado. Tu progreso queda en este dispositivo.');
  loadProfile();
}
$$('.task').forEach(t=>t.addEventListener('change',e=>{store.set('task_'+e.target.dataset.id,e.target.checked); toast(e.target.checked?'✅ Tarea completada +50 IQ':'Tarea desmarcada'); update();}));
$('#saveName').onclick=saveProfile;
$('#resetProfile').onclick=()=>{if(confirm('¿Seguro que quieres reiniciar el progreso de este perfil?')){$$('.task').forEach(t=>store.remove('task_'+t.dataset.id)); store.remove('notes'); store.remove('streak'); store.remove('lastDay'); toast('Progreso reiniciado'); loadProfile();}};
$('#studentName').addEventListener('keydown',e=>{if(e.key==='Enter') saveProfile();});
$('#notes').addEventListener('input',e=>store.set('notes',e.target.value));
$('#themeBtn').onclick=()=>{document.body.classList.toggle('dark'); rawStore.set('dark',document.body.classList.contains('dark'))};
if(rawStore.get('dark')) document.body.classList.add('dark');
$('#menuBtn').onclick=()=>$('#navLinks').classList.toggle('open');
$('#searchPdf').addEventListener('input',e=>{const q=e.target.value.toLowerCase(); $$('.resource-card').forEach(c=>c.style.display=c.dataset.title.includes(q)?'flex':'none')});
$('#wompiBtn').onclick=(e)=>{if(!WOMPI_LINK){e.preventDefault(); toast('Configura tu link Wompi en script.js'); setTimeout(()=>location.href='https://wa.me/573007540786?text=Hola%2C%20quiero%20pagar%20el%20curso%20ICFES%20IQ500',900)}else{$('#wompiBtn').href=WOMPI_LINK;}};
loadProfile();
