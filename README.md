# Web Oficial de Triana de los Reyes — Escritora

Este repositorio contiene el código fuente de la página web oficial de la escritora **Triana de los Reyes**. Se ha diseñado con una estética editorial y premium, cuidando la tipografía, los colores de marca y la interactividad para ofrecer una experiencia inmersiva al lector.

## 🌟 Características Principales

*   **Diseño Editorial Premium**: Utiliza una paleta de colores cálida y sofisticada (crema `#faf6f0`, marrón oscuro `#70534c`, café de acento `#e8d8ce`) junto con las tipografías *Cormorant Garamond* (para un aire literario clásico) y *Plus Jakarta Sans* (para textos limpios y legibles).
*   **Efecto de Libros 3D Interactivos**: Las portadas de las novelas están maquetadas en tres dimensiones y rotan de forma interactiva en respuesta al cursor (*hover*).
*   **Protección de Derechos e Información**: Puesto que las novelas se encuentran en fase de pre-publicación y certámenes/concursos literarios (los cuales exigen estricto anonimato y novedad), los textos y detalles de las novelas están elegantemente **difuminados y pixelados** mediante filtros CSS, con tarjetas informativas nítidas superpuestas que aseguran la confidencialidad de las obras. Actualmente, la segunda novela se muestra como **"Próximamente"** sin una fecha específica para asegurar su elegibilidad en certámenes. Asimismo, se ha implementado protección a nivel de código para **deshabilitar el clic derecho y el arrastre de imágenes**, reduciendo la posibilidad de copias o descargas no autorizadas del material gráfico.
*   **Club de Lectura (Comunidad)**: Formulario de suscripción enlazado a una base de datos en la nube para que los lectores reciban boletines, anuncios de presentaciones, firmas de libros y fechas oficiales de publicación.
*   **Formulario de Contacto Integrado**: Permite a los lectores, prensa o editoriales enviar mensajes de manera directa. Al rellenar el formulario, redirige automáticamente al gestor de correo preconfigurando el asunto, cuerpo, destinatario nuestros correos personales.
*   **Diseño 100% Responsivo**: Adaptado perfectamente para una visualización óptima en ordenadores, tablets y dispositivos móviles, incluyendo un menú de navegación sticky colapsable.
*   **Paquete Completo de Favicons y PWA**: Icono del sitio personalizado con el logotipo de la mariposa negra con fondo 100% transparente y dimensiones maximizadas al ras (para evitar doble círculo blanco y márgenes excesivos en buscadores), adaptado y estandarizado para todos los formatos (Android Chrome, Apple iOS mediante `apple-touch-icon`, Windows Tiles mediante `browserconfig.xml` y navegadores de escritorio). Incluye un archivo `manifest.json` optimizado para cumplir con todos los estándares técnicos y asegurar la visualización correcta de los favicons en todas las plataformas y buscadores. Adicionalmente, se incluye un `favicon.svg` generado con incrustación Base64 para maximizar la puntuación en validadores estrictos.
*   **Optimización SEO Técnico y de Contenido**: Incorporación de directivas de rastreo e indexación (`sitemap.xml` con fecha `lastmod` actualizada al 22 de julio de 2026 y `robots.txt`), configuraciones de URL canónicas para unificar la indexación, descripción de cabecera optimizada para motores de búsqueda, etiqueta `<meta name="robots" content="max-image-preview:large">`, etiqueta `<meta name="thumbnail">` directa, anotación Google `<PageMap>` explícita para miniaturas de búsqueda, precarga (`link rel="preload"`) e `itemprop="image"` asociadas a `triana-perfil.jpg`. Además, se incluye el atributo `data-nosnippet` en las imágenes secundarias/logotipos de la mariposa para evitar que Google las seleccione como miniatura en la SERP sin afectar al favicon. Etiquetas meta enriquecidas para redes sociales (Open Graph y Twitter Cards) y metadatos estructurados Schema JSON-LD organizados mediante un `@graph` que define explícitamente la página como `ProfilePage` y la relaciona con la entidad `Person`/`Author` mediante `mainEntity`, conectando inequívocamente su dominio e identidad digital. Todos los metadatos están unificados con el descriptor **«Escritora»** como único título profesional. Asimismo, se ha optimizado la estructura semántica de encabezados (H1-H6) garantizando que el nombre de la autora en la cabecera actúe como el único `<h1>` del documento.

---

## 🛠️ Tecnologías Utilizadas

1.  **HTML5**: Marcado semántico y optimizado para SEO.
2.  **Vanilla CSS & Tailwind CSS v4**: Diseño visual rápido y moderno utilizando el compilador en caliente de la nueva versión de Tailwind CSS y transiciones personalizadas en CSS nativo.
3.  **Vanilla JavaScript (ES6+)**:
    *   `IntersectionObserver` para activar animaciones fluidas de aparición (*fade-in-up*) al hacer scroll.
    *   Lógica interactiva del menú de navegación móvil.
    *   Control de redirección y toasts de confirmación del formulario de contacto.
    *   Protección de propiedad intelectual mediante interceptación global de eventos de ratón para desactivar el menú contextual (`contextmenu`) y la acción de arrastre (`dragstart`) en imágenes.
4.  **Brevo (Email Marketing)**: Integración mediante formulario de suscripción seguro y asíncrono (AJAX) para la gestión automatizada de listas de correo, newsletters y campañas de email marketing del Club de Lectores.
5.  **Scripts de Procesamiento de Imagen (Python / Pillow)**: Scripts auxiliares para automatizar el recorte de transparencias del logotipo y la compilación del set completo de favicons con fondo transparente y escala maximizada.

---

## 📬 Integración y Configuración del Club de Lectores (Brevo)

El formulario de suscripción del Club de Lectores está conectado a la plataforma de Email Marketing **Brevo**.

### Pasos para conectar tu cuenta de Brevo:

1. **Crear o acceder a tu cuenta en Brevo**: Inicia sesión en [app.brevo.com](https://app.brevo.com/).
2. **Crear una Lista de Contactos**: Ve a **Contactos** > **Listas** y crea una lista (por ejemplo: *«Club de Lectores Triana»*).
3. **Crear un Formulario de Suscripción**:
   - Ve a **Contactos** > **Formularios** y pulsa en **Crear un nuevo formulario de suscripción**.
   - Asigna un nombre al formulario y selecciona la lista de contactos creada en el paso 2.
   - Configura las opciones de suscripción deseadas (confirmación simple o doble opt-in).
4. **Obtener la URL de Acción del Formulario**:
   - En el paso final (**Compartir** / **HTML**), copia la URL que aparece dentro del atributo `action="..."` (ejemplo: `https://xxxxxx.sibforms.com/serve/MUIEAB...`).
5. **Configurar en el Proyecto**:
   - Abre el archivo `script.js`.
   - Pega tu URL en la variable `BREVO_FORM_ACTION_URL`:
     ```javascript
     const BREVO_FORM_ACTION_URL = 'https://xxxxxx.sibforms.com/serve/MUIEAB...';
     ```
   - ¡Listo! Las altas se sincronizarán en tiempo real directamente con tu lista de Brevo.

---

## 📁 Estructura del Proyecto

```text
├── index.html                  # Estructura principal y contenido de la landing page
├── style.css                   # Definición del tema de Tailwind v4 y clases 3D
├── script.js                   # Interactividad, menú móvil e integración con Brevo
├── sitemap.xml                 # Mapa del sitio para indexación en buscadores (SEO)
├── robots.txt                  # Directivas de rastreo para rastreadores web (SEO)
├── images/                     # Directorio de recursos gráficos e imágenes de marca
│   ├── logo mariposa.png       # Logotipo oficial de la mariposa con fondo transparente
│   ├── triana-perfil.jpg       # Fotografía de perfil de la escritora
│   ├── triana-head.jpg         # Imagen optimizada para cabeceras y vistas previas en redes sociales (Open Graph)
│   └── triana-sobre-mi.jpg     # Imagen de apoyo para la sección biográfica
├── Docs/                       # Carpeta con los documentos de texto originales (.docx)
│   ├── Triana de los Reyes - Biografia.docx
│   ├── Ataurique y Organza - Sinopsis.docx
│   └── La chica de la Buhardilla - Sinopsis.docx
├── favicon.ico                 # Favicon multi-resolución para navegadores de escritorio
├── manifest.json               # Configuración PWA y de visualización en dispositivos móviles
└── README.md                   # Documentación del proyecto (este archivo)
```

---

## 🚀 Ejecución en Local

Para ver y probar la página web en tu ordenador localmente, puedes levantar un servidor web sencillo. 

Si tienes Python instalado, ejecuta el siguiente comando en la raíz del proyecto:

```bash
python3 -m http.server 8000
```

Luego, abre tu navegador y entra en la dirección:
[http://localhost:8000](http://localhost:8000)

---

## ✒️ Autora y Contacto

*   **Escritora:** Triana de los Reyes Gomez Soriano
*   **Desarrollo:** Daniel Montes Cruz
*   **Instagram Oficial:** [@trianadlosreyes](https://instagram.com/trianadlosreyes)
