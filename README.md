# iPre 2025 - Frontend Evaluación de Videos

## Descripción del proyecto

Este repositorio contiene el frontend de una aplicación web para la **evaluación de videos** académicos o de proyecto. 

Permite a los usuarios:
- Subir videos para evaluación.
- Gestionar rúbricas de evaluación.
- Visualizar y calificar videos según criterios definidos.
- Consultar trabajos, videos y espacios de trabajo asociados.

La aplicación está construida con **React** y **Vite**, utilizando **React Router** para el enrutamiento y estilos personalizados con CSS (y configuración de Tailwind disponible).

## Instrucciones de instalación

### Prerrequisitos

- Node.js (versión recomendada: LTS actual)
- npm o yarn (los ejemplos usan `npm`)

### Pasos para ejecutar el proyecto en local

1. Clonar el repositorio:

```bash
git clone https://github.com/domiSoto/iPre2025-2-video-eval-frontend.git
cd iPre2025-2-video-eval-frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el entorno de desarrollo:

```bash
npm run dev
```

4. Abrir la aplicación en el navegador:

Vite te mostrará una URL (por defecto `http://localhost:5173`), ábrela en tu navegador.

## Dependencias principales

Las dependencias más relevantes del proyecto son:

- `react`: Librería principal para construir la interfaz de usuario.
- `react-dom`: Renderizado de componentes React en el DOM.
- `react-router-dom`: Enrutamiento entre páginas y vistas.
- `axios`: Cliente HTTP para comunicarse con el backend (por ejemplo, para obtener evaluaciones de videos).
- `react-icons`: Conjunto de íconos listos para usar en los componentes.

Dependencias de desarrollo:

- `vite`: Herramienta de build y servidor de desarrollo.
- `@vitejs/plugin-react-swc`: Plugin para integrar React con Vite usando SWC.
- `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`: Configuración y reglas de ESLint para mantener un código consistente.

## Estructura del proyecto

A continuación se describe la estructura principal del proyecto y la función de cada carpeta/archivo relevante:

- `index.html`: Punto de entrada HTML de la aplicación que carga el bundle de Vite.
- `package.json`: Define las dependencias, scripts y metadatos del proyecto.
- `vite.config.js`: Configuración de Vite para el bundling y el servidor de desarrollo.
- `tailwind.config.js`: Configuración de Tailwind CSS (si se utiliza utilidades de Tailwind en estilos).
- `eslint.config.js`: Configuración principal de ESLint para el proyecto.

### Carpeta `src/`

Contiene todo el código fuente de la aplicación React:

- `main.jsx`: Punto de entrada de React, donde se monta el componente raíz en el DOM.
- `App.jsx`: Componente principal de la aplicación, suele contener el layout base y el enrutamiento de alto nivel.
- `Routing.jsx`: Configuración de rutas de la aplicación (por ejemplo, rutas para dashboard, evaluación de videos, etc.).
- `index.css`: Estilos globales de la aplicación.
- `App.css`: Estilos específicos para el componente `App`.

Componentes/páginas principales (normalmente emparejados con su propio archivo CSS):

- `Navbar.jsx` / `Navbar.css`: Barra de navegación principal de la aplicación.
- `Dashboard.jsx` / `Dashboard.css`: Vista principal o panel de control del usuario.
- `UploadVideo.jsx` / `UploadVideo.css`: Pantalla para subir nuevos videos.
- `EvaluateVideo.jsx` / `EvaluateVideo.css`: Pantalla para visualizar un video y ver/ingresar su evaluación según la rúbrica.
- `CreateRubric.jsx` / `CreateRubric.css`: Pantalla para crear o editar rúbricas de evaluación.
- `MyVideos.jsx` / `MyVideos.css`: Listado de videos del usuario.
- `MyWorkspaces.jsx` / `MyWorkspaces.css`: Gestión de espacios de trabajo.
- `Workspace.jsx` / `Workspace.css`: Detalle de un espacio de trabajo específico.

## Scripts disponibles

En `package.json` se definen los siguientes scripts útiles:

- `npm run dev`: Inicia el servidor de desarrollo con Vite.
- `npm run build`: Genera una build optimizada para producción.
- `npm run preview`: Levanta un servidor para previsualizar la build de producción.
- `npm run lint`: Ejecuta ESLint sobre el código del proyecto.
