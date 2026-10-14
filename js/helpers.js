/* =========================================================
   HELPERS
========================================================= */
function findContent(id){ return content.find(c=>c.id===id); }
function findPerson(id){ return hallOfFame.find(p=>p.id===id); }
function findSub(id){ return submissions.find(s=>s.id===id); }
function years(){ return [...new Set(content.map(c=>c.year))].sort((a,b)=>a-b); }
function persons(){ return [...new Set(content.map(c=>c.person))]; }
function displayName(){
  if(state.role==='estudiante') return 'Estudiante Demo';
  if(state.role==='docente') return 'Prof. Camila Duarte';
  if(state.role==='administrador') return 'Admin Sistema';
  return 'Visitante';
}
function initialsOf(name){ return name.split(' ').map(w=>w[0]).filter(Boolean).slice(0,2).join('').toUpperCase(); }

function filteredContent(){
  return content.filter(c=>{
    if(state.filters.year!=='all' && c.year!==Number(state.filters.year)) return false;
    if(state.filters.category!=='all' && c.category!==state.filters.category) return false;
    if(state.filters.person!=='all' && c.person!==state.filters.person) return false;
    if(state.filters.type!=='all' && c.type!==state.filters.type) return false;
    if(state.searchQuery){
      const q = state.searchQuery;
      if(!(c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.person.toLowerCase().includes(q))) return false;
    }
    return true;
  });
}

/* RF-12: notificaciones dinámicas según el rol */
function getNotifications(){
  if(state.role==='docente'){
    return submissions.filter(s=>s.autor==='Prof. Camila Duarte' && s.estado!=='pendiente')
      .map(s=> s.estado==='aprobado' ? `✅ Tu contenido "${s.titulo}" fue aprobado y publicado.` : `↩️ Tu contenido "${s.titulo}" fue devuelto: ${s.observacion}`);
  }
  if(state.role==='administrador'){
    const p = submissions.filter(s=>s.estado==='pendiente').length;
    return p>0 ? [`🕓 Tienes ${p} contenido(s) esperando validación.`] : ['✅ No hay contenidos pendientes.'];
  }
  if(state.role==='estudiante'){
    return state.student.badges.map(id=>'🏅 Insignia desbloqueada: '+BADGES.find(b=>b.id===id).name).concat(
      ['👋 ¡Sigue explorando el museo para ganar más puntos!']
    );
  }
  return [];
}

function toast(msg, cls){
  const root = document.getElementById('toast-root');
  const el = document.createElement('div');
  el.className = 'toast'+(cls?(' '+cls):'');
  el.textContent = msg;
  root.appendChild(el);
  setTimeout(()=>{ el.style.transition='opacity .3s'; el.style.opacity='0'; setTimeout(()=>el.remove(),300); }, 2800);
}

function awardPoints(n){
  const before = levelOf(state.student.points);
  state.student.points += n;
  const after = levelOf(state.student.points);
  toast('+'+n+' puntos');
  if(after>before){
    setTimeout(()=>toast('🎉 ¡Subiste a nivel '+after+'!','levelup'), 400);
    if(after>=2) unlockBadge('b4');
    if(after>=3) unlockBadge('b5');
  }
}
function unlockBadge(id){
  if(state.student.badges.includes(id)) return;
  state.student.badges.push(id);
  const b = BADGES.find(x=>x.id===id);
  setTimeout(()=>toast('🏅 Insignia desbloqueada: '+b.name), 800);
}

