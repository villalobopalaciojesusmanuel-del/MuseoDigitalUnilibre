/* =========================================================
   EVENT DELEGATION
========================================================= */
document.addEventListener('click', function(e){
  const insideFilter = e.target.closest('.filter-wrap');
  const insideBell = e.target.closest('.bell-wrap');
  const insideAvatar = e.target.closest('.avatar-wrap');
  let needsRender = false;

  if(!insideFilter && state.openDropdown){ state.openDropdown = null; needsRender = true; }
  if(!insideBell && state.bellOpen){ state.bellOpen = false; needsRender = true; }
  if(!insideAvatar && state.avatarOpen){ state.avatarOpen = false; needsRender = true; }

  if(e.target.classList && e.target.classList.contains('modal-overlay')){
    closeModal(); return;
  }

  const el = e.target.closest('[data-action]');
  if(!el){ if(needsRender) render(); return; }

  const action = el.dataset.action;
  const id = el.dataset.id;
  const value = el.dataset.value;

  switch(action){
    case 'nav':
      state.screen = value; state.bellOpen=false; state.avatarOpen=false; render();
      window.scrollTo({top:0,behavior:'smooth'});
      return;
    case 'toggle-dropdown':
      state.openDropdown = state.openDropdown===value ? null : value; render(); return;
    case 'toggle-bell':
      state.bellOpen = !state.bellOpen; state.avatarOpen=false;
      if(state.bellOpen) state.notifSeenCount = getNotifications().length;
      render(); return;
    case 'toggle-avatar':
      state.avatarOpen = !state.avatarOpen; state.bellOpen=false; render(); return;
    case 'toggle-contrast':
      state.highContrast = !state.highContrast;
      document.body.classList.toggle('high-contrast', state.highContrast);
      document.getElementById('a11yFab').classList.toggle('on', state.highContrast);
      toast(state.highContrast? '🔆 Modo de alto contraste activado' : 'Modo de alto contraste desactivado');
      return;
    case 'set-filter':
      state.filters[el.dataset.key] = value; state.openDropdown=null; render(); return;
    case 'hero-prev':
      state.heroSlide = (state.heroSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length; render(); return;
    case 'hero-next':
      state.heroSlide = (state.heroSlide + 1) % HERO_SLIDES.length; render(); return;
    case 'open-modal':
      openModal(value, id); return;
    case 'close-modal':
      closeModal(); return;
    case 'save-profile':
      toast('Perfil actualizado'); closeModal(); return;
    case 'contact-cta':
      if(state.role==='visitante'){
        toast('🔒 Inicia sesión para escribirnos');
        state.screen = 'login'; render();
      } else {
        openModal('contact');
      }
      return;
    case 'login-as':
      loginAs(value); return;
    case 'logout':
      logout(); return;
    case 'react':
      react(id, value); return;
    case 'favorite':
      toggleFavorite(id); return;
    case 'new-submission-type':
      state.formType = value; state.formEvidence=false; state.modal={type:'new-content-form'}; render(); return;
    case 'attach-evidence':
      attachEvidence(); return;
    case 'open-return':
      state.modal = {type:'return-form', id}; render(); return;
    case 'approve':
      approveSubmission(id); return;
    case 'resend':
      resendSubmission(id); return;
  }
  if(needsRender) render();
});

document.addEventListener('submit', function(e){
  const form = e.target;
  if(!form.dataset.action) return;
  e.preventDefault();
  const fd = new FormData(form);
  const data = Object.fromEntries(fd.entries());
  // checkboxes ausentes no llegan en FormData; normalizamos calendario
  if(form.dataset.tipo==='Evento') data.calendario = fd.has('calendario');

  if(form.dataset.action==='search-form'){
    state.searchQuery = (data.q||'').trim().toLowerCase();
    render();
  }
  if(form.dataset.action==='comment-form'){
    submitComment(form.dataset.id, data.text);
  }
  if(form.dataset.action==='teacher-form'){
    submitValidationForm(form.dataset.tipo, data);
  }
  if(form.dataset.action==='return-form'){
    confirmReturn(form.dataset.id, data.observacion);
  }
  if(form.dataset.action==='contact-form'){
    state.contactSent = true;
    render();
    setTimeout(()=>{ state.contactSent=false; closeModal(); }, 1600);
  }
});

