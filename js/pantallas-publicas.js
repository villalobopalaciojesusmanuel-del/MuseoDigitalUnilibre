/* ---------- HOME ---------- */
function HomeScreen(){
  const featured = content.slice(-4).reverse();
  const featuredPeople = hallOfFame.slice(0,3);
  const slide = HERO_SLIDES[state.heroSlide];
  return `
  <div class="hero-banner">
    <div class="hexbg"></div>
    <div class="hero-content">
      <div class="hero-text">
        <h1>${slide.title}</h1>
        <p>${slide.sub}</p>
        ${state.role==='visitante' ? `<button class="btn btn-primary" style="margin-top:16px" data-action="nav" data-value="login">Iniciar sesión</button>` : ''}
      </div>
      <div class="hero-illustration">
        <img src="assets/img/logo_ul.png" alt="Logotipo UL" style="width: 100%; height: 100%; object-fit: contain;">
      </div>
    </div>
    <div class="hero-arrows">
      <button class="hero-arrow" data-action="hero-prev" aria-label="Anterior">‹</button>
      <button class="hero-arrow" data-action="hero-next" aria-label="Siguiente">›</button>
    </div>
    <div class="hero-dots">${HERO_SLIDES.map((_,i)=>`<span class="hero-dot ${i===state.heroSlide?'active':''}"></span>`).join('')}</div>
  </div>
  <div class="container">
    <div class="section">
      <div class="layout-2col">
        <div>
          ${FilterBar()}
          <div class="section-head">
            <div><h2 class="section-title"><span class="kicker">Explorar</span>Contenido público</h2><div class="section-sub">${filteredContent().length} resultados</div></div>
          </div>
          ${filteredContent().length? `<div class="grid">${filteredContent().map(ContentCard).join('')}</div>` : EmptyState()}
        </div>
        <aside>${Sidebar()}</aside>
      </div>
    </div>

    <div class="section">
      <div class="section-head">
        <h2 class="section-title"><span class="kicker">Cronología</span>Línea del Tiempo destacada</h2>
        <button class="link-more" data-action="nav" data-value="timeline">Ver línea completa →</button>
      </div>
      <div class="grid">${featured.map(ContentCard).join('')}</div>
    </div>

    <div class="section">
      <div class="section-head">
        <h2 class="section-title"><span class="kicker">Reconocimientos</span>Hall de la Fama</h2>
        <button class="link-more" data-action="nav" data-value="hall">Ver todos →</button>
      </div>
      <div class="grid">${featuredPeople.map(HofCard).join('')}</div>
    </div>
  </div>`;
}

function EmptyState(){
  return `<div class="empty-state"><div class="ic">🔍</div><p>No se encontraron resultados con los filtros seleccionados.</p></div>`;
}

/* ---------- TIMELINE ---------- */
function TimelineScreen(){
  const items = filteredContent().sort((a,b)=>a.year-b.year);
  return `<div class="container">
    <div class="section">
      <h2 class="section-title"><span class="kicker">Cronología completa</span>Línea del Tiempo</h2>
      <div class="section-sub">Haz clic en cualquier medalla para ver el detalle del acontecimiento.</div>
      ${FilterBar()}
    </div>
    ${items.length? `
    <div class="timeline-wrap">
      <div class="timeline-track">
        <div class="timeline-line"></div>
        ${items.map((c,i)=>`
        <div class="timeline-node ${i%2===0?'up':'down'}">
          <div class="tl-card" data-action="open-modal" data-value="detail" data-id="${c.id}">
            <div class="tl-year">${c.year}</div>
            <div class="tl-title">${c.title}</div>
          </div>
          <div class="medal" data-action="open-modal" data-value="detail" data-id="${c.id}"></div>
        </div>`).join('')}
      </div>
    </div>` : `<div class="container">${EmptyState()}</div>`}
  </div>`;
}

/* ---------- GALLERY ---------- */
function GalleryScreen(){
  const items = filteredContent();
  return `<div class="container">
    <div class="section">
      <h2 class="section-title"><span class="kicker">Multimedia</span>Galerías</h2>
      <div class="section-sub">Fotografías, videos y documentos del programa.</div>
      ${FilterBar()}
      ${items.length? `<div class="grid">${items.map(ContentCard).join('')}</div>` : EmptyState()}
    </div>
  </div>`;
}

/* ---------- HALL DE LA FAMA ---------- */
function HofCard(p){
  return `<div class="hof-card" data-action="open-modal" data-value="person" data-id="${p.id}">
    <div class="medallion"><div class="medallion-inner">${initialsOf(p.name)}</div></div>
    <div class="hof-name">${p.name}</div>
    <div class="hof-role">${p.role}</div>
    <div class="hof-year">${p.year}</div>
  </div>`;
}
function HallScreen(){
  return `<div class="container">
    <div class="section">
      <h2 class="section-title"><span class="kicker">Reconocimientos</span>Hall de la Fama</h2>
      <div class="section-sub">Personas y grupos que marcaron la historia del programa.</div>
      <div class="grid">${hallOfFame.map(HofCard).join('')}</div>
    </div>
  </div>`;
}

/* ---------- RANKING (RF-11) ---------- */
function RankingScreen(){
  const me = {name:'Tú · Estudiante Demo', points: state.student.points, isMe:true};
  const all = RANKING_MOCK.concat(state.role==='estudiante'?[me]:[]).sort((a,b)=>b.points-a.points);
  const medals = ['🥇','🥈','🥉'];
  return `<div class="container">
    <div class="section">
      <h2 class="section-title"><span class="kicker">Gamificación</span>Ranking de Estudiantes</h2>
      <div class="section-sub">Clasificación por puntos acumulados en el museo.</div>
      <div class="table-card" style="margin-top:18px">
        ${all.map((r,i)=>`
        <div class="rank-row ${r.isMe?'me':''}">
          <div class="rank-pos">${medals[i]||('#'+(i+1))}</div>
          <div class="rank-name">${r.name}</div>
          <div class="rank-pts">${r.points} pts</div>
        </div>`).join('')}
      </div>
      ${state.role!=='estudiante' ? `<div class="empty-state"><div class="ic">🎓</div><p>Inicia sesión como estudiante para ver tu posición en el ranking.</p></div>` : ''}
    </div>
  </div>`;
}

