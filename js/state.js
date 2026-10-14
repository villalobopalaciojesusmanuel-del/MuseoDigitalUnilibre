/* =========================================================
   STATE
========================================================= */
const state = {
  screen:'home',
  role:'visitante', // visitante | estudiante | docente | administrador
  filters:{year:'all',category:'all',person:'all',type:'all'},
  searchQuery:'',
  openDropdown:null,
  modal:null,
  student:{points:80, badges:[], favorites:[], comments:[]},
  formType:null,
  formEvidence:false,
  heroSlide:0,
  bellOpen:false,
  avatarOpen:false,
  notifSeenCount:0,
  highContrast:false,
  contactSent:false,
};

const HERO_SLIDES = [
  {title:'Bienvenido/a al <b>Museo Digital</b>', sub:'Recorre la historia del programa de Ingeniería de Sistemas: acontecimientos, premios, proyectos y las personas que la construyeron.'},
  {title:'Explora, comenta y <b>gana puntos</b>', sub:'Inicia sesión como estudiante para reaccionar, comentar y guardar tus contenidos favoritos.'},
];

function levelOf(points){ return 1 + Math.floor(points/100); }

