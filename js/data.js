/* =========================================================
   DATA
========================================================= */
const CAT_STYLE = {
  'Acontecimiento': {bg:'var(--red-50)', fg:'var(--red-600)'},
  'Premio':         {bg:'var(--warn-tint)', fg:'var(--warn)'},
  'Proyecto':       {bg:'#EAF2F1', fg:'#256b64'},
  'Evento':         {bg:'#EFEAF7', fg:'#5B4B8A'},
};
const TYPE_ICON = {'Fotografía':'📷','Video':'🎬','Documento':'📄'};
const TIPO_ICON = {'Acontecimiento':'📌','Premio':'🏆','Proyecto':'🚀','Personaje':'🎖️','Evento':'📅'};

let content = [
  {id:'c1',title:'Fundación del programa de Ing. de Sistemas',type:'Fotografía',category:'Acontecimiento',year:1978,person:'Consejo Fundador',desc:'Acta fotográfica de la firma que dio inicio oficial al programa académico.',author:'Prof. Elena Ríos',date:'2023-02-10',likes:34,loves:12,comments:[]},
  {id:'c2',title:'Primer laboratorio de cómputo',type:'Fotografía',category:'Acontecimiento',year:1985,person:'Ing. Marco Peña',desc:'Inauguración del primer laboratorio con terminales conectadas a un mainframe.',author:'Prof. Elena Ríos',date:'2023-02-14',likes:21,loves:8,comments:[]},
  {id:'c3',title:'Premio Nacional a la Innovación Curricular',type:'Documento',category:'Premio',year:1996,person:'Facultad de Ingeniería',desc:'Resolución oficial del reconocimiento otorgado por el rediseño curricular del programa.',author:'Prof. Diego Salas',date:'2023-03-02',likes:15,loves:5,comments:[]},
  {id:'c4',title:'Proyecto SIGA: primer sistema académico propio',type:'Documento',category:'Proyecto',year:2001,person:'Grupo de Software Universitario',desc:'Especificación técnica del primer sistema de información académica desarrollado por estudiantes.',author:'Prof. Diego Salas',date:'2023-03-18',likes:40,loves:19,comments:[]},
  {id:'c5',title:'Congreso Latinoamericano de Ingeniería de Software',type:'Video',category:'Evento',year:2005,person:'Comité Organizador',desc:'Registro audiovisual de la primera edición del congreso realizado en el campus.',author:'Prof. Elena Ríos',date:'2023-04-01',likes:29,loves:11,comments:[]},
  {id:'c6',title:'Acreditación de Alta Calidad',type:'Documento',category:'Premio',year:2009,person:'Consejo Nacional de Acreditación',desc:'Resolución de acreditación de alta calidad otorgada al programa.',author:'Prof. Diego Salas',date:'2023-04-22',likes:52,loves:24,comments:[]},
  {id:'c7',title:'Robot autónomo "Centauro I"',type:'Fotografía',category:'Proyecto',year:2012,person:'Semillero de Robótica',desc:'Primer prototipo robótico funcional desarrollado íntegramente por estudiantes del programa.',author:'Prof. Camila Duarte',date:'2023-05-06',likes:61,loves:30,comments:[]},
  {id:'c8',title:'Feria de Egresados y Emprendimiento',type:'Video',category:'Evento',year:2015,person:'Oficina de Egresados',desc:'Cobertura del primer encuentro de egresados emprendedores del programa.',author:'Prof. Camila Duarte',date:'2023-05-19',likes:18,loves:6,comments:[]},
  {id:'c9',title:'Laboratorio de Inteligencia Artificial',type:'Fotografía',category:'Acontecimiento',year:2018,person:'Grupo de Investigación IA-USB',desc:'Apertura del laboratorio especializado en inteligencia artificial y ciencia de datos.',author:'Prof. Camila Duarte',date:'2023-06-02',likes:47,loves:22,comments:[]},
  {id:'c10',title:'App universitaria "CampusGo"',type:'Documento',category:'Proyecto',year:2020,person:'Semillero SoftLab',desc:'Documentación técnica de la aplicación móvil institucional desarrollada por estudiantes.',author:'Prof. Diego Salas',date:'2023-06-28',likes:38,loves:14,comments:[]},
  {id:'c11',title:'Premio a la Mejor Tesis de Ingeniería de Sistemas',type:'Documento',category:'Premio',year:2022,person:'Andrea Gómez',desc:'Reconocimiento nacional por el trabajo de grado sobre optimización de redes.',author:'Prof. Elena Ríos',date:'2023-07-11',likes:33,loves:17,comments:[]},
  {id:'c12',title:'Hackatón de Ciberseguridad 2024',type:'Video',category:'Evento',year:2024,person:'Semillero CyberSec',desc:'Resumen audiovisual de la jornada de 24 horas de retos de ciberseguridad.',author:'Prof. Camila Duarte',date:'2024-03-15',likes:56,loves:27,comments:[]},
];

let hallOfFame = [
  {id:'p1',name:'Ing. Marco Peña',role:'Primer Director del Programa',year:1978,achievement:'Fundador y primer director del programa de Ingeniería de Sistemas.',bio:'Lideró la creación del plan curricular original y gestionó la dotación del primer laboratorio de cómputo de la universidad.',related:'c2'},
  {id:'p2',name:'Andrea Gómez',role:'Egresada destacada',year:2022,achievement:'Mejor Tesis de Grado a nivel nacional.',bio:'Su investigación sobre optimización de redes de telecomunicaciones fue reconocida por la Sociedad Colombiana de Ingeniería.',related:'c11'},
  {id:'p3',name:'Prof. Elena Ríos',role:'Decana emérita',year:2009,achievement:'Gestora de la Acreditación de Alta Calidad del programa.',bio:'Durante su gestión el programa alcanzó los más altos estándares de calidad académica del país.',related:'c6'},
  {id:'p4',name:'Semillero de Robótica',role:'Grupo estudiantil',year:2012,achievement:'Creadores del robot autónomo "Centauro I".',bio:'Grupo de estudiantes que representó a la universidad en competencias nacionales de robótica autónoma.',related:'c7'},
  {id:'p5',name:'Prof. Diego Salas',role:'Docente investigador',year:2001,achievement:'Impulsor del primer sistema académico institucional (SIGA).',bio:'Dirigió el desarrollo del primer software institucional construido enteramente por estudiantes del programa.',related:'c4'},
  {id:'p6',name:'Semillero CyberSec',role:'Grupo estudiantil',year:2024,achievement:'Organizadores de la Hackatón de Ciberseguridad 2024.',bio:'Grupo estudiantil enfocado en seguridad informática, referente en competencias tipo CTF a nivel regional.',related:'c12'},
];

// RF-04 a RF-08: campos específicos por tipo de contenido que registra el Docente
const FORM_FIELDS = {
  'Acontecimiento': [
    {name:'titulo', label:'Título del acontecimiento', type:'text', ph:'Ej: Apertura del laboratorio de IA'},
    {name:'anio', label:'Año', type:'number', ph:'2025'},
    {name:'categoria', label:'Categoría', type:'select', options:['Institucional','Académico','Tecnológico','Social']},
    {name:'tipoEvidencia', label:'Tipo de evidencia', type:'select', options:['Fotografía','Video','Documento']},
    {name:'descripcion', label:'Descripción', type:'textarea', ph:'Describe brevemente el acontecimiento...'},
  ],
  'Premio': [
    {name:'titulo', label:'Nombre del premio', type:'text', ph:'Ej: Mención de Honor en Ciencia de Datos'},
    {name:'anio', label:'Año', type:'number', ph:'2025'},
    {name:'lugar', label:'Lugar', type:'text', ph:'Ej: Bogotá, Colombia'},
    {name:'persona', label:'Participantes', type:'text', ph:'Ej: Grupo DataMinds'},
    {name:'tipoEvidencia', label:'Tipo de evidencia', type:'select', options:['Fotografía','Video','Documento']},
    {name:'descripcion', label:'Descripción', type:'textarea', ph:'Describe el premio o reconocimiento...'},
  ],
  'Proyecto': [
    {name:'titulo', label:'Nombre del proyecto', type:'text', ph:'Ej: Plataforma de tutorías entre pares'},
    {name:'anio', label:'Año', type:'number', ph:'2025'},
    {name:'linea', label:'Línea de investigación', type:'text', ph:'Ej: Software educativo'},
    {name:'persona', label:'Integrantes', type:'text', ph:'Ej: Semillero SoftLab'},
    {name:'impacto', label:'Impacto', type:'text', ph:'Ej: 300 estudiantes beneficiados'},
    {name:'tecnologias', label:'Tecnologías usadas', type:'text', ph:'Ej: React, Node.js, PostgreSQL'},
    {name:'tipoEvidencia', label:'Tipo de evidencia', type:'select', options:['Fotografía','Video','Documento']},
    {name:'descripcion', label:'Descripción', type:'textarea', ph:'Describe el proyecto...'},
  ],
  'Personaje': [
    {name:'titulo', label:'Nombre completo', type:'text', ph:'Ej: Ing. Laura Bernal'},
    {name:'anio', label:'Año destacado', type:'number', ph:'2025'},
    {name:'persona', label:'Tipo de persona', type:'select', options:['Docente','Estudiante','Egresado']},
    {name:'descripcion', label:'Logros', type:'textarea', ph:'Ej: Reconocida por su trabajo en transformación digital...'},
    {name:'bio', label:'Biografía', type:'textarea', ph:'Biografía breve...'},
  ],
  'Evento': [
    {name:'titulo', label:'Nombre del evento', type:'text', ph:'Ej: Semana de la Ingeniería 2025'},
    {name:'anio', label:'Año', type:'number', ph:'2025'},
    {name:'fecha', label:'Fecha completa', type:'date'},
    {name:'lugar', label:'Lugar', type:'text', ph:'Ej: Auditorio principal'},
    {name:'tipoEvidencia', label:'Tipo de evidencia (galería)', type:'select', options:['Fotografía','Video','Documento']},
    {name:'descripcion', label:'Descripción', type:'textarea', ph:'Describe el evento...'},
    {name:'calendario', label:'Publicar visible en el calendario institucional', type:'checkbox'},
  ],
};

let submissions = [
  {id:'s1',tipo:'Acontecimiento',titulo:'Nueva sede de Ingeniería inaugurada',anio:2025,persona:'Rectoría',descripcion:'Inauguración del nuevo edificio de laboratorios de ingeniería.',autor:'Prof. Camila Duarte',fecha:'2025-01-20',estado:'pendiente',evidencia:true,tipoEvidencia:'Fotografía',observacion:'',extra:{categoria:'Institucional'}},
  {id:'s2',tipo:'Premio',titulo:'Mención de Honor en Ciencia de Datos',anio:2025,persona:'Grupo DataMinds',descripcion:'Reconocimiento por el proyecto de analítica predictiva aplicada a movilidad urbana.',autor:'Prof. Diego Salas',fecha:'2025-01-18',estado:'pendiente',evidencia:true,tipoEvidencia:'Documento',observacion:'',extra:{lugar:'Medellín, Colombia'}},
  {id:'s3',tipo:'Proyecto',titulo:'Plataforma de tutorías entre pares',anio:2024,persona:'Semillero SoftLab',descripcion:'Sistema web para conectar estudiantes tutores con estudiantes en riesgo académico.',autor:'Prof. Camila Duarte',fecha:'2024-11-02',estado:'aprobado',evidencia:true,tipoEvidencia:'Documento',observacion:'',extra:{linea:'Software educativo',impacto:'120 estudiantes',tecnologias:'React, Firebase'}},
  {id:'s4',tipo:'Evento',titulo:'Semana de la Ingeniería 2024',anio:2024,persona:'Comité de Bienestar',descripcion:'Registro del evento anual con conferencias y talleres.',autor:'Prof. Elena Ríos',fecha:'2024-09-10',estado:'devuelto',evidencia:false,tipoEvidencia:'Fotografía',observacion:'La evidencia adjunta no corresponde al evento descrito. Por favor adjunta el registro fotográfico correcto y vuelve a enviar.',extra:{lugar:'Auditorio principal',calendario:true}},
  {id:'s5',tipo:'Personaje',titulo:'Ing. Laura Bernal',anio:2023,persona:'Egresado',descripcion:'Reconocida por su trabajo en transformación digital del sector público.',autor:'Prof. Diego Salas',fecha:'2025-01-05',estado:'pendiente',evidencia:false,tipoEvidencia:'Fotografía',observacion:'',extra:{bio:'Egresada del programa, actualmente lidera proyectos de gobierno digital.'}},
];

const BADGES = [
  {id:'b1', name:'Primer Paso', icon:'🌟', desc:'Guarda tu primer favorito'},
  {id:'b2', name:'Voz Activa', icon:'💬', desc:'Publica tu primer comentario'},
  {id:'b3', name:'Coleccionista', icon:'🗂️', desc:'Guarda 5 favoritos'},
  {id:'b4', name:'Nivel 2', icon:'🥈', desc:'Alcanza el nivel 2'},
  {id:'b5', name:'Nivel 3', icon:'🥇', desc:'Alcanza el nivel 3'},
];

const RANKING_MOCK = [
  {name:'Juliana Restrepo', points:410},
  {name:'Andrés Cárdenas', points:365},
  {name:'Camila Torres', points:298},
  {name:'Santiago Ruiz', points:210},
  {name:'Valentina Ospina', points:150},
];

