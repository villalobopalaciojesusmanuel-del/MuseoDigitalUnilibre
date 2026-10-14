/* =========================================================
   RENDER: SHELL
========================================================= */
function render(){
  document.getElementById('app').innerHTML = NavHTML() + `<main id="main-content">${ScreenHTML()}</main>`;
  renderModal();
  document.getElementById('a11yFab').classList.toggle('on', state.highContrast);
}
function renderModal(){
  document.getElementById('modal-root').innerHTML = state.modal ? ModalHTML() : '';
}

function ShieldSVG(){
  return `<img src="assets/img/logo_ul.png" alt="Logotipo UL" width="40" height="46">`;
}


function NavHTML(){
  const links = [
    ['home','Inicio'], ['timeline','Línea del Tiempo'], ['gallery','Galerías'], ['hall','Hall de la Fama']
  ];
  const linkHTML = links.map(([id,label])=>
    `<button class="nav-link ${state.screen===id?'active':''}" data-action="nav" data-value="${id}">${label}</button>`
  ).join('');

  let right = '';
  if(state.role==='visitante'){
    right = `<button class="btn btn-outline-light btn-sm" data-action="nav" data-value="login">Iniciar sesión</button>`;
  } else {
    const notifs = getNotifications();
    const unread = Math.max(0, notifs.length - state.notifSeenCount);
    const dashMap = {estudiante:'studentDash', docente:'teacherDash', administrador:'adminDash'};
    const roleLabel = {estudiante:'🎓 Estudiante', docente:'🧑‍🏫 Docente', administrador:'🛠️ Administrador'};
    right = `
      <span class="role-badge">${roleLabel[state.role]}</span>
      <button class="btn btn-outline-light btn-sm" data-action="nav" data-value="${dashMap[state.role]}">Mi Panel</button>
      <div class="bell-wrap">
        <button class="bell-btn" data-action="toggle-bell" aria-label="Notificaciones">🔔${unread>0?`<span class="bell-badge">${unread}</span>`:''}</button>
        ${state.bellOpen? `<div class="panel-pop">
          <div class="ph">Notificaciones</div>
          ${notifs.length? notifs.map(n=>`<div class="notif-item">${n}</div>`).join('') : '<div class="notif-item">Sin notificaciones nuevas.</div>'}
        </div>` : ''}
      </div>
      <div class="avatar-wrap">
        <button class="avatar-circle" data-action="toggle-avatar" aria-label="Cuenta">${initialsOf(displayName())}</button>
        ${state.avatarOpen? `<div class="panel-pop">
          <div class="ph">${displayName()}</div>
          <button class="menu-item" data-action="open-modal" data-value="profile">👤 Mi perfil</button>
          <button class="menu-item danger" data-action="logout">⏻ Cerrar sesión</button>
        </div>` : ''}
      </div>
    `;
  }

  return `
  <div class="topnav">
    <div class="topnav-inner">
      <div class="brand" data-action="nav" data-value="home">
        <div class="shield">${ShieldSVG()}</div>
        <div>
          <div class="brand-word">Museo <b>Digital</b></div>
          <div class="brand-sub">Ing. Sistemas · Univ. Libre</div>
        </div>
      </div>
      <div class="nav-links">${linkHTML}</div>
      <div class="nav-right">
        ${right}
      </div>
    </div>
  </div>`;
}

