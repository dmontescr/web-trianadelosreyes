# Web Oficial de Triana de los Reyes — Escritora

Este repositorio contiene el código fuente de la página web oficial de la escritora **Triana de los Reyes**. Se ha diseñado con una estética editorial y premium, cuidando la tipografía, los colores de marca y la interactividad para ofrecer una experiencia inmersiva al lector.

## 🌟 Características Principales

*   **Diseño Editorial Premium**: Utiliza una paleta de colores cálida y sofisticada (crema `#faf6f0`, marrón oscuro `#70534c`, café de acento `#e8d8ce`) junto con las tipografías *Cormorant Garamond* (para un aire literario clásico) y *Plus Jakarta Sans* (para textos limpios y legibles).
*   **Efecto de Libros 3D Interactivos**: Las portadas de las novelas están maquetadas en tres dimensiones y rotan de forma interactiva en respuesta al cursor (*hover*).
*   **Protección de Derechos e Información**: Puesto que las novelas se encuentran en fase de pre-publicación y certámenes/concursos literarios (los cuales exigen estricto anonimato y novedad), los textos y detalles de las novelas están elegantemente **difuminados y pixelados** mediante filtros CSS, con tarjetas informativas nítidas superpuestas que aseguran la confidencialidad de las obras. Actualmente, la segunda novela se muestra como **"Próximamente"** sin una fecha específica para asegurar su elegibilidad en certámenes. Asimismo, se ha implementado protección a nivel de código para **deshabilitar el clic derecho y el arrastre de imágenes**, reduciendo la posibilidad de copias o descargas no autorizadas del material gráfico.
*   **Club de Lectura (Comunidad)**: Formulario de suscripción enlazado a una base de datos en la nube para que los lectores reciban boletines, anuncios de presentaciones, firmas de libros y fechas oficiales de publicación.
*   **Formulario de Contacto Integrado**: Permite a los lectores, prensa o editoriales enviar mensajes de manera directa. Al rellenar el formulario, redirige automáticamente al gestor de correo preconfigurando el asunto, cuerpo, destinatario nuestros correos personales.
*   **Diseño 100% Responsivo**: Adaptado perfectamente para una visualización óptima en ordenadores, tablets y dispositivos móviles, incluyendo un menú de navegación sticky colapsable.
*   **Paquete Completo de Favicons y PWA**: Icono del sitio personalizado con el logotipo de la mariposa negra con fondo 100% transparente y dimensiones optimizadas al ras, estandarizado para cumplir estrictamente con las directrices de Google Search Central (resoluciones en múltiplos de 48px: `48x48`, `96x96`, `192x192` y `favicon.ico` como fallback universal en la raíz) sin etiquetas redundantes que interfieran en el rastreo de Googlebot-Image, además de compatibilidad completa con Android Chrome, Apple iOS (`apple-touch-icon`), Windows Tiles (`browserconfig.xml`) y `manifest.json`.
*   **Optimización SEO Técnico y de Contenido**: 
    * Directivas de rastreo e indexación (`sitemap.xml` con fecha `lastmod` actualizada y `robots.txt`).
    * Configuración unificada de URLs canónicas y títulos orientados al posicionamiento de la entidad personal y profesional (`Triana de los Reyes | Escritora`).
    * Directivas avanzadas para buscadores: `<meta name="robots" content="max-image-preview:large">`, `<meta name="thumbnail">` directa, anotación Google `<PageMap>` explícita para miniaturas de búsqueda, precarga (`link rel="preload"`) e `itemprop="image"` asociadas a la foto oficial `triana-perfil.jpg`.
    * Optimización semántica de imágenes: inclusión de `alt` descriptivos (`Triana de los Reyes, escritora y novelista`) en la fotografía principal y atributos `role="presentation"` y `data-nosnippet` en todos los logotipos decorativos de la mariposa para asegurar que Google elija exclusivamente el retrato oficial como miniatura del resultado en todas las variantes de búsqueda.
    * Metadatos estructurados Schema JSON-LD organizados mediante un `@graph` que define explícitamente `ProfilePage` y la entidad `Person`/`Author`, enlazando perfiles sociales oficiales (`sameAs`), títulos profesionales (`jobTitle: ["Escritora", "Novelista", "Autora"]`), áreas de conocimiento (`knowsAbout`) y nombres alternativos para potenciar el grafo de conocimiento en Google.
    * Estructura semántica de encabezados (H1-H6) garantizando que el nombre de la autora en la cabecera actúe como el único `<h1>` del documento.
*   **Analítica y Seguimiento**: Integración de Google Analytics 4 (GA4) nativa en el `<head>` mediante `gtag.js` para la medición precisa del tráfico y comportamiento de los usuarios sin impactar el rendimiento de la web.
*   **Galería Documental Exclusiva (Acceso QR)**: Página oculta (`ataurique-y-organza-galeria-exclusiva.html`) accesible únicamente mediante el código QR impreso en la novela *Ataurique y Organza* (a través de la redirección temporal `302` desde `/qr-ao` configurada en `_redirects` para Cloudflare Pages):
    * Bloqueo estricto de indexación (`<meta name="robots" content="noindex, nofollow">` y `noimageindex`), sin enlaces desde menús, pie de página ni `sitemap.xml`.
    * Cuadrícula *masonry* cronológica responsiva (1 a 4 columnas) con las 52 fotografías históricas optimizadas en formato `.webp` (`loading="lazy"` y `decoding="async"`), manteniendo su relación de aspecto original (altura unificada a `1200 px` en verticales y anchura unificada a `1600 px` en horizontales, con un peso total de ~5,8 MB frente a los 74,6 MB originales).
    * Visor modal ligero (*Lightbox*) en Vanilla JS con soporte táctil (*swipe*), navegación por teclado, precarga de imágenes adyacentes y tarjeta editorial con la descripción de cada fotografía.

---

## 🛠️ Tecnologías Utilizadas

1.  **HTML5**: Marcado semántico y optimizado para SEO y accesibilidad.
2.  **Vanilla CSS & Tailwind CSS v4**: Diseño visual rápido y moderno utilizando el compilador en caliente de la nueva versión de Tailwind CSS y transiciones personalizadas en CSS nativo.
3.  **Vanilla JavaScript (ES6+)**:
    *   `IntersectionObserver` para activar animaciones fluidas de aparición (*fade-in-up*) al hacer scroll.
    *   Lógica interactiva del menú de navegación móvil responsive.
    *   Integración asíncrona (`fetch` no-cors) con Brevo para suscripción instantánea al Club de Lectores.
    *   Envío asíncrono con FormSubmit y toasts flotantes de confirmación para el formulario de contacto.
    *   Protección de propiedad intelectual mediante interceptación global de eventos de ratón para desactivar el menú contextual (`contextmenu`) y la acción de arrastre (`dragstart`) en imágenes.
4.  **Brevo (Email Marketing)**: Integración segura para la gestión automatizada de listas de correo, newsletters y campañas de email marketing del Club de Lectores sin exponer credenciales privadas en el cliente.
5.  **Scripts de Procesamiento de Imagen (Python / Pillow)**: Scripts auxiliares para automatizar el recorte de transparencias del logotipo, la compilación del set completo de favicons y el procesamiento por lotes de la galería fotográfica (`scripts/optimize_gallery.py`: corrección EXIF, recorte de bordes de escaneado, unificación proporcional de dimensiones y compresión a `.webp`).

---

## 📬 Integración del Club de Lectores (Brevo)

El formulario de suscripción del Club de Lectores está conectado a la plataforma de Email Marketing **Brevo** mediante un endpoint seguro de suscripción.

* **Lista de contactos vinculada**: `Club de lectores #6`
* **Envío asíncrono seguro**: Se realiza mediante `fetch` (modo `no-cors`), validando el correo, mostrando spinner de carga y feedback visual mediante toasts flotantes, con campos anti-spam honeypot (`email_address_check`) y localización en español (`locale: es`).

---

## 📁 Estructura del Proyecto

```text
├── index.html                                    # Estructura principal y contenido de la landing page
├── ataurique-y-organza-galeria-exclusiva.html    # Galería documental oculta para lectores (acceso vía QR)
├── _redirects                                    # Reglas de redirección para Cloudflare Pages (/qr-ao -> galería 302)
├── style.css                                     # Definición del tema de Tailwind v4 y clases 3D
├── script.js                                     # Interactividad, menú móvil e integración con Brevo
├── sitemap.xml                                   # Mapa del sitio para indexación en buscadores (SEO)
├── robots.txt                                    # Directivas de rastreo para rastreadores web (SEO)
├── images/                                       # Directorio de recursos gráficos e imágenes de marca
│   ├── logo mariposa.png                         # Logotipo oficial de la mariposa con fondo transparente
│   ├── triana-perfil.jpg                         # Fotografía oficial de la escritora
│   ├── triana-head.jpg                           # Imagen optimizada para cabeceras y vistas previas (Open Graph)
│   ├── triana-sobre-mi.jpg                       # Imagen de apoyo para la sección biográfica
│   ├── vestido-ataurique.webp                    # Ilustración con fondo transparente del boceto del vestido (cabecera galería)
│   └── galeria/                                  # 52 fotografías optimizadas en formato WebP (foto-01.webp a foto-52.webp)
├── scripts/                                      # Scripts de automatización y optimización
│   └── optimize_gallery.py                       # Script en Python/Pillow para recorte, escalado y conversión WebP por lotes
├── Docs/                                         # Carpeta con los documentos de texto originales (.docx)
│   ├── Triana de los Reyes - Biografia.docx
│   ├── Ataurique y Organza - Sinopsis.docx
│   └── La chica de la Buhardilla - Sinopsis.docx
├── favicon.ico                                   # Favicon multi-resolución para navegadores de escritorio
├── manifest.json                                 # Configuración PWA y de visualización en dispositivos móviles
└── README.md                                     # Documentación del proyecto (este archivo)
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

*   **Escritora:** Triana de los Reyes Gómez Soriano
*   **Desarrollo:** Daniel Montes Cruz
*   **Instagram Oficial:** [@trianadlosreyes](https://instagram.com/trianadlosreyes)
*   **X (Twitter):** [@t_dlosreyes](https://x.com/t_dlosreyes)
