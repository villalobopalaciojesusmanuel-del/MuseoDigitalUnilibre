/* =========================================================
   MODALS
========================================================= */
function ModalHTML(){
  const m = state.modal;
  if(m.type==='detail') return ContentModal(findContent(m.id));
  if(m.type==='person') return PersonModal(findPerson(m.id));
  if(m.type==='profile') return ProfileModal();
  if(m.type==='contact') return ContactModal();
  if(m.type==='new-content') return NewContentTypeModal();
  if(m.type==='new-content-form') return NewContentFormModal(state.formType);
  if(m.type==='confirm-submit') return ConfirmModal('✅ Contenido enviado a validación', 'Un administrador revisará tu contenido y te notificaremos el resultado.');
  if(m.type==='submission-detail') return SubmissionDetailModal(findSub(m.id));
  if(m.type==='return-form') return ReturnFormModal(findSub(m.id));
  if(m.type==='confirm-approve') return ConfirmModal('✅ Contenido publicado', 'El contenido ya es visible para todos los visitantes del museo.');
  if(m.type==='confirm-return') return ConfirmModal('↩️ Contenido devuelto', 'Se notificó al docente con las observaciones registradas.');
  return '';
}

function ModalShell(inner, narrow){
  return `<div class="modal-overlay">
    <div class="modal ${narrow?'narrow':''}">${inner}</div>
  </div>`;
}

function ConfirmModal(title, body){
  const icon = title.split(' ')[0];
  const rest = title.substring(title.indexOf(' ')+1);
  return ModalShell(`
    <div class="modal-body" style="text-align:center;padding-top:34px">
      <div style="font-size:44px">${icon}</div>
      <h2 style="margin-top:10px">${rest}</h2>
      <p class="modal-desc" style="margin-top:8px">${body}</p>
      <button class="btn btn-primary" style="margin-top:20px" data-action="close-modal">Entendido</button>
    </div>`, true);
}

function ProfileModal(){
  return ModalShell(`
    <div class="modal-head"><h2>Mi perfil</h2><button class="modal-close" data-action="close-modal">✕</button></div>
    <div class="modal-body">
      <div class="form-group"><label>Nombre</label><input type="text" value="${displayName()}"></div>
      <div class="form-group"><label>Correo institucional</label><input type="email" value="${displayName().toLowerCase().replace(/[^a-z]/g,'.')}@unilibre.edu.co"></div>
      <div class="form-group"><label>Rol</label><input type="text" value="${state.role}" disabled></div>
      <div class="modal-actions"><button class="btn btn-ghost" data-action="close-modal">Cancelar</button><button class="btn btn-primary" data-action="save-profile">Guardar cambios</button></div>
    </div>`);
}

function ContactModal(){
  if(state.contactSent){
    return ModalShell(`
      <div class="modal-body" style="text-align:center;padding-top:34px">
        <div style="font-size:44px">✅</div>
        <h2 style="margin-top:10px">Mensaje enviado</h2>
        <p class="modal-desc" style="margin-top:8px">Gracias por escribirnos. El equipo del Museo Digital te responderá pronto a tu correo.</p>
      </div>`, true);
  }
  return ModalShell(`
    <div class="modal-head">
      <h2>¿Necesitas ayuda? 💬</h2>
      <button class="modal-close" data-action="close-modal">✕</button>
    </div>
    <div class="modal-body">
      <p class="modal-desc">Escríbele al equipo del Museo Digital y te responderemos a la brevedad.</p>
      <form data-action="contact-form">
        <div class="form-row">
          <div class="form-group"><label>Nombre</label><input name="nombre" type="text" value="${displayName()}" placeholder="Tu nombre" required></div>
          <div class="form-group"><label>Correo</label><input name="correo" type="email" placeholder="tucorreo@unilibre.edu.co" required></div>
        </div>
        <div class="form-group">
          <label>Asunto</label>
          <select name="asunto" required>
            <option value="">Selecciona...</option>
            <option>Duda sobre un contenido</option>
            <option>Problema técnico</option>
            <option>Sugerencia</option>
            <option>Otro</option>
          </select>
        </div>
        <div class="form-group">
          <label>Mensaje</label>
          <textarea name="mensaje" rows="4" placeholder="Cuéntanos en qué te podemos ayudar..." required></textarea>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-action="close-modal">Cancelar</button>
          <button type="submit" class="btn btn-primary">Enviar mensaje</button>
        </div>
      </form>
    </div>
  `);
}

function ContentModal(c){
  if(!c) return '';
  const cs = CAT_STYLE[c.category];
  const canInteract = state.role==='estudiante' || state.role==='docente'; // RF-10
  const isFav = state.student.favorites.includes(c.id);
  return ModalShell(`
    <div class="modal-head">
      <div><span class="tag" style="background:${cs.bg};color:${cs.fg}">${c.category}</span></div>
      <button class="modal-close" data-action="close-modal">✕</button>
    </div>
    <div class="modal-media" style="background:var(--gray-100)">${TYPE_ICON[c.type]}</div>
    <div class="modal-body">
      <h2>${c.title}</h2>
      <div class="modal-tags"><span class="tag" style="background:var(--gray-100);color:var(--gray-800)">${c.type}</span></div>
      <p class="modal-desc">${c.desc}</p>
      <div class="modal-meta-row"><span>📅 Año ${c.year}</span><span>👤 ${c.person}</span><span>✍️ ${c.author}</span></div>
      <div class="divider"></div>

      ${canInteract ? `
        <div class="interact-row" id="reactionRow">
          <button class="reaction-btn ${c._liked?'active':''}" data-action="react" data-id="${c.id}" data-value="like">👍 Me gusta (${c.likes})</button>
          <button class="reaction-btn ${c._loved?'active':''}" data-action="react" data-id="${c.id}" data-value="love">❤️ Me encanta (${c.loves})</button>
          <button class="reaction-btn ${isFav?'active':''}" data-action="favorite" data-id="${c.id}">⭐ ${isFav?'En favoritos':'Guardar en Favoritos'}</button>
        </div>
        <div class="comment-box">
          <form data-action="comment-form" data-id="${c.id}">
            <textarea name="text" placeholder="Escribe un comentario sobre este contenido..." required></textarea>
            <div style="display:flex;justify-content:flex-end;margin-top:8px"><button class="btn btn-primary btn-sm" type="submit">Publicar comentario</button></div>
          </form>
          ${c.comments.length? c.comments.slice().reverse().map(cm=>`<div class="comment-item"><b>${cm.author}</b> · ${cm.text}</div>`).join('') : ''}
        </div>
      ` : `
        <div class="locked-note">
          <span>🔒 Inicia sesión como estudiante o docente para comentar, reaccionar y guardar en favoritos.</span>
          <button class="btn btn-primary btn-sm" data-action="nav" data-value="login">Iniciar sesión</button>
        </div>
        <div class="interact-row" style="margin-top:10px">
          <span class="reaction-btn">👍 ${c.likes}</span>
          <span class="reaction-btn">❤️ ${c.loves}</span>
          <span class="reaction-btn">💬 ${c.comments.length} comentarios</span>
        </div>
      `}
    </div>
  `);
}

function PersonModal(p){
  if(!p) return '';
  const rel = p.related ? findContent(p.related) : null;
  return ModalShell(`
    <div class="modal-head">
      <div></div>
      <button class="modal-close" data-action="close-modal">✕</button>
    </div>
    <div class="modal-body" style="text-align:center">
      <div class="medallion" style="width:110px;height:110px;margin-bottom:10px"><div class="medallion-inner" style="font-size:28px">${initialsOf(p.name)}</div></div>
      <h2>${p.name}</h2>
      <div class="section-sub">${p.role} · ${p.year}</div>
      <div class="modal-tags" style="justify-content:center"><span class="tag" style="background:var(--red-50);color:var(--red-600)">${p.achievement}</span></div>
      <p class="modal-desc" style="text-align:left;margin-top:14px">${p.bio}</p>
      ${rel? `<div class="divider"></div><div style="text-align:left"><div class="section-sub" style="margin-bottom:8px">Contenido relacionado</div>${ContentCard(rel).replace('data-value="detail"','data-value="detail"')}</div>` : ''}
    </div>
  `);
}

function NewContentTypeModal(){
  const types = [
    {t:'Acontecimiento',ic:'📌'},{t:'Premio',ic:'🏆'},{t:'Proyecto',ic:'🚀'},{t:'Personaje',ic:'🎖️'},{t:'Evento',ic:'📅'}
  ];
  return ModalShell(`
    <div class="modal-head">
      <h2>Nuevo contenido</h2>
      <button class="modal-close" data-action="close-modal">✕</button>
    </div>
    <div class="modal-body">
      <p class="modal-desc">Selecciona el tipo de contenido que deseas registrar en el museo (RF-04 a RF-08).</p>
      <div class="type-grid">
        ${types.map(x=>`<button class="type-card" data-action="new-submission-type" data-value="${x.t}"><span class="ic">${x.ic}</span>${x.t}</button>`).join('')}
      </div>
    </div>
  `);
}

function FieldHTML(f){
  if(f.type==='select'){
    return `<div class="form-group"><label>${f.label}</label><select name="${f.name}" required><option value="">Selecciona...</option>${f.options.map(o=>`<option value="${o}">${o}</option>`).join('')}</select></div>`;
  }
  if(f.type==='textarea'){
    return `<div class="form-group"><label>${f.label}</label><textarea name="${f.name}" rows="3" placeholder="${f.ph||''}" required></textarea></div>`;
  }
  if(f.type==='checkbox'){
    return `<div class="form-group checkbox-row"><input type="checkbox" name="${f.name}" id="chk_${f.name}"><label for="chk_${f.name}" style="margin:0">${f.label}</label></div>`;
  }
  return `<div class="form-group"><label>${f.label}</label><input name="${f.name}" type="${f.type}" placeholder="${f.ph||''}" required></div>`;
}

function NewContentFormModal(tipo){
  const fields = FORM_FIELDS[tipo];
  return ModalShell(`
    <div class="modal-head">
      <h2>${TIPO_ICON[tipo]} Registrar ${tipo}</h2>
      <button class="modal-close" data-action="close-modal">✕</button>
    </div>
    <div class="modal-body">
      <form data-action="teacher-form" data-tipo="${tipo}">
        ${fields.map(FieldHTML).join('')}
        <div class="form-group">
          <label>Evidencia</label>
          <button type="button" class="evidence-box ${state.formEvidence?'done':''}" id="evidenceBtn" data-action="attach-evidence">
            ${state.formEvidence? '✔ Evidencia adjunta: registro_'+tipo.toLowerCase()+'.pdf' : '📎 Haz clic para adjuntar evidencia'}
          </button>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-action="close-modal">Cancelar</button>
          <button type="submit" class="btn btn-primary">Enviar a validación</button>
        </div>
      </form>
    </div>
  `);
}

function SubmissionDetailModal(s){
  if(!s) return '';
  const isAdmin = state.role==='administrador';
  const extraHTML = s.extra ? Object.entries(s.extra).filter(([k])=>k!=='bio' && k!=='calendario').map(([k,v])=>`<span>🔸 ${k}: ${v}</span>`).join('') : '';
  return ModalShell(`
    <div class="modal-head">
      <div><span class="tag" style="background:var(--gray-100);color:var(--gray-800)">${s.tipo}</span></div>
      <button class="modal-close" data-action="close-modal">✕</button>
    </div>
    <div class="modal-body">
      <h2>${s.titulo}</h2>
      <p class="modal-desc" style="margin-top:8px">${s.descripcion}</p>
      <div class="modal-meta-row"><span>📅 ${s.anio}</span><span>👤 ${s.persona}</span><span>✍️ ${s.autor}</span><span>🗓️ ${s.fecha}</span></div>
      <div class="modal-meta-row">${extraHTML}</div>
      <div class="modal-meta-row"><span>${s.evidencia? '📎 Evidencia adjunta ('+s.tipoEvidencia+')' : '⚠️ Sin evidencia adjunta'}</span></div>
      <div class="divider"></div>
      <span class="status-chip status-${s.estado}">${s.estado}</span>
      ${s.estado==='devuelto' && s.observacion? `<div class="locked-note" style="margin-top:12px;background:var(--danger-tint);color:var(--danger)"><span>${s.observacion}</span></div>`:''}

      ${isAdmin && s.estado==='pendiente' ? `
        <div class="modal-actions">
          <button class="btn btn-danger-outline" data-action="open-return" data-id="${s.id}">Devolver con observaciones</button>
          <button class="btn btn-success" data-action="approve" data-id="${s.id}">Aprobar y Publicar</button>
        </div>
      ` : ''}
      ${!isAdmin && s.estado==='devuelto' ? `
        <div class="modal-actions"><button class="btn btn-primary" data-action="resend" data-id="${s.id}">Reenviar a validación</button></div>
      ` : ''}
    </div>
  `);
}

function ReturnFormModal(s){
  return ModalShell(`
    <div class="modal-head">
      <h2>Devolver con observaciones</h2>
      <button class="modal-close" data-action="close-modal">✕</button>
    </div>
    <div class="modal-body">
      <p class="modal-desc">Explica al docente qué debe corregir en "<b>${s.titulo}</b>" antes de volver a enviarlo.</p>
      <form data-action="return-form" data-id="${s.id}">
        <div class="form-group">
          <label>Observaciones</label>
          <textarea name="observacion" rows="4" placeholder="Ej: La evidencia no corresponde al evento descrito..." required></textarea>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-action="close-modal">Cancelar</button>
          <button type="submit" class="btn btn-danger-outline">Confirmar devolución</button>
        </div>
      </form>
    </div>
  `);
}

