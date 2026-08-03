document.addEventListener('DOMContentLoaded', () => {
  // --- CONFIGURACIÓN DE BREVO (EMAIL MARKETING) ---
  const BREVO_FORM_ACTION_URL = 'https://17747fd8.sibforms.com/serve/MUIFAH0lstrhJ6ztEqhvXgZbfmXqtGewuwOjTzPJLGBGfsE-wU5EyzVz5ihG0YyW3jfttSQsrwN8782k5f9OmbC-WM2cybnv9VDbZBLcbfyvSTnTXhZ1agKZnIJIiUv_dy7dyLGS_2TWudb1YDZuIriFAXFFH09iqPBhwrIM9jE4MEdz4PUI5lpjx2INEeFnW-Vg9X0fGCjK5RPMew==';

  // --- MENU RESPONSIVE (MOBILE MENU) ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMenu() {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    menuIconOpen.classList.toggle('hidden');
    menuIconClose.classList.toggle('hidden');
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', toggleMenu);
  }

  // Cerrar menú móvil al pulsar un enlace
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMenu();
      }
    });
  });

  // --- ANIMACIONES CON INTERSECTION OBSERVER ---
  const animatedElements = document.querySelectorAll('.fade-in-up-scroll');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target); // Detener observación tras animar
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  // --- TOAST NOTIFICATIONS (MENSAJES DE ÉXITO) ---
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message, type = 'success') {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    
    // Resetear clases de color
    toast.className = 'fixed bottom-5 right-5 z-50 transform translate-y-20 opacity-0 transition-all duration-500 ease-out flex items-center p-4 rounded-lg shadow-xl border';
    
    if (type === 'success') {
      toast.classList.add('bg-white', 'border-brand-primary/20', 'text-brand-dark');
    } else {
      toast.classList.add('bg-red-50', 'border-red-200', 'text-red-800');
    }

    // Mostrar
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    // Ocultar tras 4 segundos
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 4000);
  }

  // --- FORMULARIO DE LEAD MAGNET (CLUB DE LECTURA) ---
  const leadForm = document.getElementById('lead-magnet-form');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('lead-email');
      const email = emailInput ? emailInput.value.trim() : '';

      if (email === '' || !email.includes('@')) {
        showToast('Por favor, introduce un correo electrónico válido.', 'error');
        return;
      }

      // Feedback visual del botón de envío
      const submitBtn = leadForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="inline-block animate-spin mr-2">✦</span> Enviando...';

      // Si aún no se ha configurado la URL de Brevo, ofrecemos modo simulación para pruebas
      if (!BREVO_FORM_ACTION_URL) {
        console.info('Brevo: BREVO_FORM_ACTION_URL no está configurada aún en script.js. Ejecutando en modo de prueba.');
        setTimeout(() => {
          showToast('¡Gracias por unirte! Te mantendremos al tanto de todas las novedades.');
          leadForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 800);
        return;
      }

      // Preparar los datos del formulario para enviar a Brevo
      const formData = new FormData(leadForm);
      if (!formData.get('EMAIL')) {
        formData.append('EMAIL', email);
      }
      if (!formData.has('email_address_check')) {
        formData.append('email_address_check', '');
      }
      if (!formData.has('locale')) {
        formData.append('locale', 'es');
      }

      // Enviar solicitud POST al endpoint seguro de suscripción de Brevo
      fetch(BREVO_FORM_ACTION_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Permite el envío cross-origin seguro sin revelar credenciales privadas
      })
        .then(() => {
          showToast('¡Gracias por unirte! Te mantendremos al tanto de todas las novedades.');
          leadForm.reset();
        })
        .catch((error) => {
          console.error('Error al suscribir en Brevo:', error);
          showToast('Hubo un problema al procesar tu suscripción. Inténtalo de nuevo.', 'error');
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        });
    });
  }

  // --- FORMULARIO DE CONTACTO ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subjectSelect = document.getElementById('contact-subject');
      const subjectValue = subjectSelect.value;
      const subjectText = subjectSelect.options[subjectSelect.selectedIndex].text;
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !subjectValue || !message) {
        showToast('Por favor, rellena todos los campos requeridos.', 'error');
        return;
      }

      // Feedback visual del botón de envío
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="inline-block animate-spin mr-2">✦</span> Enviando...';

      // Enviar usando el servicio FormSubmit vía AJAX
      fetch('https://formsubmit.co/ajax/tdelosreyesgomezsoriano@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Nombre: name,
          Email: email,
          _subject: `Contacto Web Triana - ${subjectText}`,
          Mensaje: message,
          _cc: 'daniel.montes.cruz@gmail.com'
        })
      })
      .then(response => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (response.ok) {
          showToast('¡Mensaje enviado con éxito! Te responderemos muy pronto.');
          contactForm.reset();
        } else {
          showToast('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.', 'error');
        }
      })
      .catch(error => {
        console.error('Error al enviar mensaje:', error);
        showToast('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.', 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      });
    });
  }
  // --- PROTECCIÓN DE IMÁGENES (DESHABILITAR CLIC DERECHO Y ARRASTRE) ---
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });

  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
    }
  });
});
