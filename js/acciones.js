/* =========================================================
   ACTIONS
========================================================= */
function loginAs(role){
  state.role = role;
  state.screen = role==='estudiante'?'studentDash': role==='docente'?'teacherDash':'adminDash';
  state.notifSeenCount = 0;
  resetInactivityTimer();
  toast('Sesión iniciada como '+role);
  render();
}
function logout(){
  clearTimeout(inactivityTimer);
  state.role='visitante'; state.screen='home'; state.bellOpen=false; state.avatarOpen=false;
  render();
}

function react(id, kind){
  const c = findContent(id);
  const flagKey = kind==='like' ? '_liked' : '_loved';
  const already = c[flagKey];
  if(already){
    c[flagKey]=false;
    if(kind==='like') c.likes--; else c.loves--;
  } else {
    c[flagKey]=true;
    if(kind==='like') c.likes++; else c.loves++;
    if(state.role==='estudiante') awardPoints(2);
  }
  render();
}

function toggleFavorite(id){
  const idx = state.student.favorites.indexOf(id);
  if(idx>=0){
    state.student.favorites.splice(idx,1);
  } else {
    state.student.favorites.push(id);
    if(state.role==='estudiante'){
      awardPoints(5);
      unlockBadge('b1');
      if(state.student.favorites.length>=5) unlockBadge('b3');
    }
  }
  render();
}

function submitComment(id, text){
  const c = findContent(id);
  const author = state.role==='docente' ? 'Prof. Camila Duarte' : 'Estudiante Demo';
  c.comments.push({author, text});
  if(state.role==='estudiante'){
    state.student.comments.push({itemId:id, text});
    awardPoints(10);
    unlockBadge('b2');
  } else {
    toast('Comentario publicado');
  }
  render();
}

function openModal(type, id){
  state.modal = {type, id};
  state.bellOpen=false; state.avatarOpen=false;
  if(type==='new-content'){ state.formType=null; state.formEvidence=false; }
  render();
}
function closeModal(){ state.modal=null; render(); }

function approveSubmission(id){
  const s = findSub(id);
  s.estado='aprobado';
  if(s.tipo==='Personaje'){
    // RF-07: Hall de la Fama, no Línea de Tiempo
    hallOfFame.push({
      id:'p_'+s.id, name:s.titulo, role:s.persona, year:Number(s.anio),
      achievement:s.descripcion, bio:(s.extra&&s.extra.bio)||s.descripcion, related:null
    });
  } else {
    content.push({
      id:'c_'+s.id, title:s.titulo, type:s.tipoEvidencia||'Documento', category:s.tipo,
      year:Number(s.anio), person:s.persona, desc:s.descripcion, author:s.autor,
      date:new Date().toISOString().slice(0,10), likes:0, loves:0, comments:[]
    });
  }
  state.modal = {type:'confirm-approve'};
  render();
}
function confirmReturn(id, obs){
  const s = findSub(id);
  s.estado='devuelto';
  s.observacion=obs;
  state.modal={type:'confirm-return'};
  render();
}
function resendSubmission(id){
  const s = findSub(id);
  s.estado='pendiente'; s.observacion='';
  toast('Contenido reenviado a validación');
  closeModal();
}

function attachEvidence(){
  state.formEvidence = !state.formEvidence;
  const btn = document.getElementById('evidenceBtn');
  if(btn){
    btn.classList.toggle('done', state.formEvidence);
    btn.textContent = state.formEvidence ? '✔ Evidencia adjunta: registro.pdf' : '📎 Haz clic para adjuntar evidencia';
  }
}

function submitValidationForm(tipo, data){
  const id = 's_'+Date.now().toString().slice(-6);
  const extra = {};
  Object.keys(data).forEach(k=>{ if(!['titulo','anio','descripcion','persona','tipoEvidencia'].includes(k)) extra[k]=data[k]; });
  submissions.push({
    id, tipo, titulo:data.titulo, anio:Number(data.anio), persona:data.persona||data.categoria||'—',
    descripcion:data.descripcion, autor:'Prof. Camila Duarte', fecha:new Date().toISOString().slice(0,10),
    estado:'pendiente', evidencia: state.formEvidence, tipoEvidencia:data.tipoEvidencia||'Fotografía', observacion:'', extra
  });
  state.modal = {type:'confirm-submit'};
  render();
}

