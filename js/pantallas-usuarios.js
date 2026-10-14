/* ---------- LOGIN ---------- */
function LoginScreen(){
  return `<div class="container">
    <div class="login-wrap">
      <h2 class="section-title">Iniciar sesión</h2>
      <p class="section-sub">Prototipo académico: selecciona un perfil de demostración para continuar.</p>
      <div class="form-group" style="margin-top:20px">
        <label>Correo institucional</label>
        <input type="email" placeholder="usuario@unilibre.edu.co">
      </div>
      <div class="form-group">
        <label>Contraseña</label>
        <input type="password" placeholder="••••••••">
        <div class="helper-text">🔒 RNF-02: tu contraseña se almacena cifrada (hash) y tu sesión expira tras inactividad.</div>
      </div>
      <div class="role-pick">
        <button class="role-card" data-action="login-as" data-value="estudiante"><span class="ic">🎓</span><b>Estudiante</b><span>Comenta, reacciona y gana puntos</span></button>
        <button class="role-card" data-action="login-as" data-value="docente"><span class="ic">🧑‍🏫</span><b>Docente</b><span>Registra contenido histórico</span></button>
        <button class="role-card" data-action="login-as" data-value="administrador"><span class="ic">🛠️</span><b>Administrador</b><span>Valida y publica contenido</span></button>
        <button class="role-card" data-action="nav" data-value="home"><span class="ic">👁️</span><b>Continuar como visitante</b><span>Solo explorar contenido público</span></button>
      </div>
    </div>
  </div>`;
}

/* ---------- STUDENT DASHBOARD ---------- */
function StudentDash(){
  const st = state.student;
  const lvl = levelOf(st.points);
  const pct = st.points % 100;
  const favs = st.favorites.map(findContent).filter(Boolean);
  return `<div class="container">
    <div class="section">
      <div class="dash-head">
        <div class="avatar-lg">ED</div>
        <div style="flex:1;min-width:200px">
          <h2 class="section-title">Hola, Estudiante Demo 👋</h2>
          <div class="section-sub">Nivel ${lvl} · ${st.points} puntos acumulados</div>
          <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        </div>
        <button class="btn btn-ghost" data-action="nav" data-value="ranking">Ver ranking 🏆</button>
        <button class="btn btn-primary" data-action="nav" data-value="home">Seguir explorando</button>
      </div>

      <div class="stat-cards">
        <div class="stat-card"><div class="n">${st.points}</div><div class="l">Puntos totales</div></div>
        <div class="stat-card"><div class="n">Nivel ${lvl}</div><div class="l">${100-pct} pts para el siguiente nivel</div></div>
        <div class="stat-card"><div class="n">${st.badges.length}/${BADGES.length}</div><div class="l">Insignias desbloqueadas</div></div>
        <div class="stat-card"><div class="n">${favs.length}</div><div class="l">Favoritos guardados</div></div>
      </div>

      <div class="section-head"><h2 class="section-title">Mis insignias</h2></div>
      <div class="badges-grid">
        ${BADGES.map(b=>`<div class="badge-chip ${st.badges.includes(b.id)?'':'locked'}"><span class="ic">${b.icon}</span><b>${b.name}</b><span>${b.desc}</span></div>`).join('')}
      </div>

      <div class="section-head" style="margin-top:30px"><h2 class="section-title">Mis favoritos</h2></div>
      ${favs.length? `<div class="grid">${favs.map(ContentCard).join('')}</div>` : `<div class="empty-state"><div class="ic">⭐</div><p>Aún no has guardado favoritos. Explora contenido y usa el botón "Guardar en Favoritos".</p></div>`}

      <div class="section-head" style="margin-top:30px"><h2 class="section-title">Mis comentarios recientes</h2></div>
      ${st.comments.length? st.comments.slice().reverse().map(cm=>`<div class="comment-item"><b>${findContent(cm.itemId)?findContent(cm.itemId).title:''}</b><br>${cm.text}</div>`).join('') : `<div class="empty-state"><div class="ic">💬</div><p>Todavía no has comentado ninguna publicación.</p></div>`}
    </div>
  </div>`;
}

/* ---------- TEACHER DASHBOARD ---------- */
function TeacherDash(){
  const mine = submissions.filter(s=>s.autor==='Prof. Camila Duarte');
  return `<div class="container">
    <div class="section">
      <div class="dash-head">
        <div class="avatar-lg">CD</div>
        <div style="flex:1;min-width:200px">
          <h2 class="section-title">Panel del Docente</h2>
          <div class="section-sub">Registra y da seguimiento a tu contenido histórico</div>
        </div>
        <button class="btn btn-primary" data-action="open-modal" data-value="new-content">+ Nuevo contenido</button>
      </div>

      <div class="stat-cards">
        <div class="stat-card"><div class="n">${mine.filter(s=>s.estado==='pendiente').length}</div><div class="l">Pendientes de validación</div></div>
        <div class="stat-card"><div class="n">${mine.filter(s=>s.estado==='aprobado').length}</div><div class="l">Publicados</div></div>
        <div class="stat-card"><div class="n">${mine.filter(s=>s.estado==='devuelto').length}</div><div class="l">Devueltos</div></div>
      </div>

      <div class="section-head"><h2 class="section-title">Mis contenidos enviados</h2></div>
      <div class="table-card">
        <div class="trow head"><div>Título</div><div>Tipo</div><div>Fecha</div><div>Estado</div><div></div></div>
        ${mine.map(s=>`
        <div class="trow">
          <div><b>${TIPO_ICON[s.tipo]||''} ${s.titulo}</b></div>
          <div>${s.tipo}</div>
          <div style="font-family:var(--font-mono);font-size:12px">${s.fecha}</div>
          <div><span class="status-chip status-${s.estado}">${s.estado}</span></div>
          <div><button class="btn btn-ghost btn-sm" data-action="open-modal" data-value="submission-detail" data-id="${s.id}">Ver</button></div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

/* ---------- ADMIN DASHBOARD ---------- */
function AdminDash(){
  const pending = submissions.filter(s=>s.estado==='pendiente');
  const history = submissions.filter(s=>s.estado!=='pendiente');
  const totalInteractions = content.reduce((a,c)=>a+c.likes+c.loves+c.comments.length,0);
  const catCounts = Object.keys(CAT_STYLE).map(cat=>({cat, n:content.filter(c=>c.category===cat).length}));
  catCounts.push({cat:'Personajes (Hall de la Fama)', n:hallOfFame.length});
  const maxN = Math.max(...catCounts.map(c=>c.n),1);
  return `<div class="container">
    <div class="section">
      <div class="dash-head">
        <div class="avatar-lg" style="background:var(--black)">AD</div>
        <div style="flex:1;min-width:200px">
          <h2 class="section-title">Panel de Administración</h2>
          <div class="section-sub">Validación de contenido y métricas institucionales</div>
        </div>
      </div>

      <div class="stat-cards">
        <div class="stat-card"><div class="n">${content.length}</div><div class="l">Contenidos publicados</div></div>
        <div class="stat-card"><div class="n">${hallOfFame.length}</div><div class="l">Egresados / personajes destacados</div></div>
        <div class="stat-card"><div class="n">${pending.length}</div><div class="l">Pendientes de validación</div></div>
        <div class="stat-card"><div class="n">${totalInteractions}</div><div class="l">Interacciones totales</div></div>
      </div>

      <div class="section-head"><h2 class="section-title">Impacto institucional por categoría</h2></div>
      <div class="table-card" style="padding:20px 22px">
        ${catCounts.map(c=>`
        <div class="bar-row">
          <div class="bar-label">${c.cat}</div>
          <div class="bar-track"><div class="bar-fill" style="width:${(c.n/maxN)*100}%"></div></div>
          <div class="bar-num">${c.n}</div>
        </div>`).join('')}
      </div>

      <div class="section-head" style="margin-top:30px"><h2 class="section-title">Cola de validación (${pending.length})</h2></div>
      ${pending.length? `<div class="table-card">
        <div class="trow head"><div>Título</div><div>Tipo</div><div>Docente</div><div>Fecha</div><div></div></div>
        ${pending.map(s=>`
        <div class="trow">
          <div><b>${TIPO_ICON[s.tipo]||''} ${s.titulo}</b></div>
          <div>${s.tipo}</div>
          <div>${s.autor}</div>
          <div style="font-family:var(--font-mono);font-size:12px">${s.fecha}</div>
          <div><button class="btn btn-primary btn-sm" data-action="open-modal" data-value="submission-detail" data-id="${s.id}">Revisar</button></div>
        </div>`).join('')}
      </div>` : `<div class="empty-state"><div class="ic">✅</div><p>No hay contenido pendiente de validación.</p></div>`}

      <div class="section-head" style="margin-top:30px"><h2 class="section-title">Historial de validación</h2></div>
      <div class="table-card">
        <div class="trow head"><div>Título</div><div>Tipo</div><div>Docente</div><div>Estado</div><div></div></div>
        ${history.map(s=>`
        <div class="trow">
          <div><b>${TIPO_ICON[s.tipo]||''} ${s.titulo}</b></div>
          <div>${s.tipo}</div>
          <div>${s.autor}</div>
          <div><span class="status-chip status-${s.estado}">${s.estado}</span></div>
          <div><button class="btn btn-ghost btn-sm" data-action="open-modal" data-value="submission-detail" data-id="${s.id}">Ver</button></div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

