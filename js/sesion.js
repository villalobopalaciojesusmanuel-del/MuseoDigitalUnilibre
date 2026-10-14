/* =========================================================
   SESIÓN: RNF-02 (expiración por inactividad)
   En producción: 30 minutos. En este demo: 2 minutos para poder evaluarlo.
========================================================= */
let inactivityTimer = null;
function resetInactivityTimer(){
  if(state.role==='visitante') return;
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(()=>{
    toast('⏱️ Tu sesión expiró por inactividad (RNF-02: 30 min en producción)','warn');
    logout();
  }, 120000);
}
['click','keydown'].forEach(ev=>document.addEventListener(ev, resetInactivityTimer));

