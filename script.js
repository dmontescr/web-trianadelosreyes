document.addEventListener('DOMContentLoaded', () => {
  // --- INICIALIZACIÓN DE SUPABASE ---
  const supabaseUrl = 'https://kfuppexuvrxfyqbeslnu.supabase.co';
  const supabaseKey = 'sb_publishable_Ai2rFKZnWnbzYLAuvHKllQ_WgFBZJDM';
  let supabase = null;
  if (window.supabase) {
    supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
  }

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

      if (email === '') {
        showToast('Por favor, introduce un correo electrónico válido.', 'error');
        return;
      }

      // Envío del formulario
      const submitBtn = leadForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="inline-block animate-spin mr-2">✦</span> Enviando...';

      if (supabase) {
        supabase
          .from('subscribers')
          .insert([{ email: email }])
          .then(({ error }) => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            if (error) {
              console.error('Error al guardar en Supabase:', error);
              // 23505 es el código Postgres para restricción única (correo duplicado)
              if (error.code === '23505') {
                showToast('Este correo ya está registrado en el club de lectura.', 'error');
              } else {
                showToast('Hubo un problema al procesar tu suscripción. Inténtalo de nuevo.', 'error');
              }
            } else {
              showToast('¡Gracias por unirte! Te mantendremos al tanto de todas las novedades.');
              leadForm.reset();
            }
          });
      } else {
        // Fallback local si Supabase no está cargado
        setTimeout(() => {
          showToast('¡Gracias por unirte! Te mantendremos al tanto de todas las novedades.');
          leadForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 1000);
      }
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

      // Configuración de destinatario, copia y cuerpo
      const emailTo = 'tdelosreyesgomezsoriano@gmail.com';
      const emailCc = 'daniel.montes.cruz@gmail.com';
      const emailSubject = `Contacto Web Triana - ${subjectText}`;
      const emailBody = `Nombre completo: ${name}\nCorreo de contacto: ${email}\nMotivo: ${subjectText}\n\nMensaje:\n${message}`;

      // Crear enlace mailto
      const mailtoLink = `mailto:${emailTo}?cc=${emailCc}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      // Feedback visual del botón de envío
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="inline-block animate-spin mr-2">✦</span> Abriendo correo...';

      setTimeout(() => {
        // Redirigir a mailto
        window.location.href = mailtoLink;
        
        // Mostrar alerta visual de éxito y resetear formulario
        showToast('¡Redirigiendo a tu gestor de correo!');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1000);
    });
  }
});
