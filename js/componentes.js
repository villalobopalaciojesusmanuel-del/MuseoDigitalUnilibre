/* =========================================================
   SCREEN ROUTER
========================================================= */
function ScreenHTML(){
  switch(state.screen){
    case 'home': return HomeScreen();
    case 'timeline': return TimelineScreen();
    case 'gallery': return GalleryScreen();
    case 'hall': return HallScreen();
    case 'login': return LoginScreen();
    case 'studentDash': return StudentDash();
    case 'teacherDash': return TeacherDash();
    case 'adminDash': return AdminDash();
    case 'ranking': return RankingScreen();
    default: return HomeScreen();
  }
}

/* ---------- SIDEBAR (estilo e-Libre) ---------- */
function Sidebar(){
  const isGuest = state.role==='visitante';
  return `<div>
    <div class="sidebar-card sidebar-greet">
      <b>${isGuest?'Bienvenido/a':'Buenos días'}</b>
      <div class="name">${isGuest? 'Explora el museo' : displayName()}</div>
    </div>
    <div class="sidebar-card">
      <div class="sidebar-title">¿Necesitas ayuda?</div>
      <button class="btn btn-outline-red btn-sm btn-block" data-action="contact-cta">Escríbenos</button>
      <div class="help-illustration">💬🧑‍💻</div>
    </div>
    <div class="sidebar-card">
      <div class="sidebar-title">Buscar contenido</div>
      <form class="sidebar-search" data-action="search-form">
        <input name="q" type="text" placeholder="Título, persona o palabra clave" value="${state.searchQuery}">
      </form>
    </div>
    ${state.role==='estudiante' ? `
    <div class="sidebar-card">
      <div class="sidebar-title">Mi progreso</div>
      <div style="font-size:13px">Nivel ${levelOf(state.student.points)} · ${state.student.points} pts</div>
      <div class="progress-track"><div class="progress-fill" style="width:${state.student.points%100}%"></div></div>
      <button class="btn btn-ghost btn-sm btn-block" style="margin-top:10px" data-action="nav" data-value="ranking">Ver ranking 🏆</button>
    </div>` : ''}
  </div>`;
}

/* ---------- FILTER BAR (shared) ---------- */
function FilterBar(){
  const opt = (key,label,options)=>{
    const open = state.openDropdown===key;
    const active = state.filters[key]!=='all';
    const itemsHTML = [`<button class="dropdown-item ${state.filters[key]==='all'?'sel':''}" data-action="set-filter" data-key="${key}" data-value="all">Todos</button>`]
      .concat(options.map(o=>`<button class="dropdown-item ${state.filters[key]==String(o)?'sel':''}" data-action="set-filter" data-key="${key}" data-value="${o}">${o}</button>`)).join('');
    return `
    <div class="filter-wrap">
      <button class="filter-btn ${active?'on':''}" data-action="toggle-dropdown" data-value="${key}">${label}${active?': '+state.filters[key]:''} ▾</button>
      ${open?`<div class="dropdown-panel">${itemsHTML}</div>`:''}
    </div>`;
  };
  return `<div class="filterbar">
    ${opt('year','Año', years())}
    ${opt('category','Categoría', Object.keys(CAT_STYLE))}
    ${opt('person','Persona', persons())}
    ${opt('type','Tipo', Object.keys(TYPE_ICON))}
  </div>`;
}

/* ---------- CARD ---------- */
function ContentCard(c){
  const cs = CAT_STYLE[c.category];
  return `
  <div class="card" data-action="open-modal" data-value="detail" data-id="${c.id}">
    <div class="card-media">
      <span class="card-cat" style="background:${cs.bg};color:${cs.fg}">${c.category}</span>
      <span class="card-type">${c.type}</span>
      ${TYPE_ICON[c.type]}
    </div>
    <div class="card-body">
      <div class="card-title">${c.title}</div>
      <div class="card-meta">${c.year} · ${c.person}</div>
      <div class="card-desc">${c.desc}</div>
      <div class="card-foot"><span>👍 ${c.likes+c.loves}</span><span>💬 ${c.comments.length}</span></div>
    </div>
  </div>`;
}

