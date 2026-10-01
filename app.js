const demoPages=[null];
let magazines=JSON.parse(localStorage.getItem('magazines')||'[]');
let currentPages=[];let currentIndex=0;
function allMags(){return [{id:'demo',title:'The New Era',description:'A sample digital edition.',pages:demoPages},...magazines]}
function render(){const el=document.getElementById('magazines');const data=allMags();el.innerHTML=data.map((m,i)=>`<article class="card"><div class="card-cover"><small>ISSUE ${String(i+1).padStart(2,'0')}</small><b>${esc(m.title).toUpperCase()}</b><small>MAGAZINE.</small></div><h4>${esc(m.title)}</h4><p>${esc(m.description||'Digital edition')}</p><button class="button" onclick="openMagazine('${m.id}')">Read →</button></article>`).join('')}
function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function openDemo(){openMagazine('demo')}
function openMagazine(id){const m=allMags().find(x=>x.id===id);if(!m)return;currentPages=m.pages||[];currentIndex=0;document.getElementById('readerTitle').textContent=m.title;document.getElementById('reader').classList.remove('hidden');showPage()}
function closeReader(){document.getElementById('reader').classList.add('hidden')}
function showPage(){const img=document.getElementById('pageImage'),ph=document.getElementById('pagePlaceholder');document.getElementById('counter').textContent=`${currentIndex+1} / ${Math.max(currentPages.length,1)}`;if(currentPages[currentIndex]){img.src=currentPages[currentIndex];img.style.display='block';ph.style.display='none'}else{img.style.display='none';ph.style.display='block';ph.style.width='min(600px,90vw)';ph.style.height='75vh';ph.style.background='linear-gradient(145deg,#292929,#777)';ph.style.display='flex';ph.style.alignItems='center';ph.style.justifyContent='center';ph.style.fontSize='42px';ph.style.fontWeight='700';ph.textContent='SAMPLE PAGE'}}
function nextPage(){if(currentPages.length>1&&currentIndex<currentPages.length-1){currentIndex++;showPage()}}
function prevPage(){if(currentIndex>0){currentIndex--;showPage()}}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeReader();if(e.key==='ArrowRight')nextPage();if(e.key==='ArrowLeft')prevPage()});
render();