# Museo Digital Interactivo · Ingeniería de Sistemas · Universidad Libre

Abre `index.html` en el navegador (no necesita servidor ni instalación).

```
museo-digital/
├── index.html              # Estructura HTML + carga de CSS y JS
├── assets/img/logo_ul.png  # Logo
├── css/                    # Estilos (se cargan en este orden)
│   ├── base.css            # Variables, reset, tipografía
│   ├── accesibilidad.css   # Modo alto contraste (RNF-04)
│   ├── layout.css · navbar.css · botones.css · hero.css
│   ├── sidebar-filtros.css · tarjetas-timeline.css · modal.css
│   ├── formularios-login.css · dashboard-tablas.css · feedback-misc.css
│   └── responsive.css      # Media queries
└── js/                     # Scripts (se cargan en este orden)
    ├── data.js             # Datos de ejemplo y formularios
    ├── state.js · helpers.js · sesion.js
    ├── render.js · componentes.js
    ├── pantallas-publicas.js    # Inicio, línea de tiempo, galería, hall, ranking
    ├── pantallas-usuarios.js    # Login y paneles estudiante/docente/admin
    ├── modales.js · acciones.js · eventos.js
    └── main.js             # Arranque
```
