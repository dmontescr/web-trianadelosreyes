# Web Oficial de Triana de los Reyes — Escritora

Este repositorio contiene el código fuente de la página web oficial de la escritora **Triana de los Reyes**. Se ha diseñado con una estética editorial y premium, cuidando la tipografía, los colores de marca y la interactividad para ofrecer una experiencia inmersiva al lector.

## 🌟 Características Principales

*   **Diseño Editorial Premium**: Utiliza una paleta de colores cálida y sofisticada (crema `#faf6f0`, marrón oscuro `#70534c`, café de acento `#e8d8ce`) junto con las tipografías *Cormorant Garamond* (para un aire literario clásico) y *Plus Jakarta Sans* (para textos limpios y legibles).
*   **Efecto de Libros 3D Interactivos**: Las portadas de las novelas están maquetadas en tres dimensiones y rotan de forma interactiva en respuesta al cursor (*hover*).
*   **Protección de Derechos e Información**: Puesto que las novelas se encuentran en fase de pre-publicación y certámenes/concursos literarios (los cuales exigen estricto anonimato y novedad), los textos y detalles de las novelas están elegantemente **difuminados y pixelados** mediante filtros CSS, con tarjetas informativas nítidas superpuestas que aseguran la confidencialidad de las obras.
*   **Club de Lectura (Comunidad)**: Formulario de suscripción enlazado a una base de datos en la nube para que los lectores reciban boletines, anuncios de presentaciones, firmas de libros y fechas oficiales de publicación.
*   **Formulario de Contacto Integrado**: Permite a los lectores, prensa o editoriales enviar mensajes de manera directa. Al rellenar el formulario, redirige automáticamente al gestor de correo preconfigurando el asunto, cuerpo, destinatario (`tdelosreyesgomezsoriano@gmail.com`) y copia de seguridad (`daniel.montes.cruz@gmail.com`).
*   **Diseño 100% Responsivo**: Adaptado perfectamente para una visualización óptima en ordenadores, tablets y dispositivos móviles, incluyendo un menú de navegación sticky colapsable.
*   **Paquete Completo de Favicons**: Icono del sitio personalizado con el logotipo de la mariposa negra sobre un círculo crema sólido (`#faf6f0`), adaptado a todos los formatos estándar (Android, Apple, navegadores modernos y de escritorio) para óptima visualización en temas oscuros y claros.

---

## 🛠️ Tecnologías Utilizadas

1.  **HTML5**: Marcado semántico y optimizado para SEO.
2.  **Vanilla CSS & Tailwind CSS v4**: Diseño visual rápido y moderno utilizando el compilador en caliente de la nueva versión de Tailwind CSS y transiciones personalizadas en CSS nativo.
3.  **Vanilla JavaScript (ES6+)**:
    *   `IntersectionObserver` para activar animaciones fluidas de aparición (*fade-in-up*) al hacer scroll.
    *   Lógica interactiva del menú de navegación móvil.
    *   Control de redirección y toasts de confirmación del formulario de contacto.
4.  **Supabase Client SDK**: Integración directa en el cliente para la gestión de las suscripciones de los usuarios en tiempo real.
5.  **Scripts de Procesamiento de Imagen (Python / Pillow)**: Scripts auxiliares para automatizar el recorte de transparencias del logotipo y la compilación del set completo de favicons con el círculo de fondo corporativo.

---

## 💾 Integración y Configuración del Backend (Supabase)

El formulario de suscripción está enlazado directamente a una base de datos en Supabase. Para que el sistema funcione correctamente, la base de datos debe disponer de una tabla con la siguiente estructura y políticas de seguridad (RLS):

### Sentencia SQL de Inicialización

Ejecuta este código en el **SQL Editor** de tu panel de control de Supabase:

```sql
-- 1. Crear la tabla para almacenar los correos
create table if not exists "Comunidad - Lead Magnet" (
  id bigint primary key generated always as identity,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Habilitar Row Level Security (RLS) para mayor seguridad
alter table "Comunidad - Lead Magnet" enable row level security;

-- 3. Crear una política para permitir que cualquier usuario anónimo (la web pública) inserte registros
create policy "Permitir inserciones públicas" on "Comunidad - Lead Magnet"
  for insert
  with check (true);
```

---

## 📁 Estructura del Proyecto

```text
├── index.html                  # Estructura principal y contenido de la landing page
├── style.css                   # Definición del tema de Tailwind v4 y clases 3D
├── script.js                   # Interactividad, menú móvil e integración con Supabase
├── images/                     # Directorio de recursos gráficos e imágenes de marca
│   ├── logo mariposa.png       # Logotipo oficial de la mariposa con fondo transparente
│   ├── triana-perfil.jpg       # Fotografía de perfil de la escritora
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
