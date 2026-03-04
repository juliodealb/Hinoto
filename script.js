/**
 * BAÑOS HINOTO - INODOROS INTELIGENTES JAPONESES
 * Premium Conversion-Optimized JavaScript
 * 
 * Estrategia: CRO, psicología del consumidor de lujo,
 * tracking de conversiones y UX fluida
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // INITIALIZATION
    // ==========================================
    
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    console.log('🚽 Baños Hinoto - Inodoros Inteligentes Japoneses Premium');
    
    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    
    const navbar = document.getElementById('navbar');
    const logoText = document.getElementById('logo-text');
    
    function handleNavbarScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleNavbarScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // ==========================================
    // MOBILE MENU
    // ==========================================
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('active');
            
            // Track mobile menu interaction
            trackEvent('MobileMenu', 'toggle', mobileMenu.classList.contains('active') ? 'open' : 'close');
        });
        
        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================
    
    const revealElements = document.querySelectorAll([
        '.problem-section',
        '.solution-section',
        '.benefit-header',
        '.benefit-card',
        '.how-header',
        '.how-step',
        '.gallery-header',
        '.testimonial-header',
        '.testimonial-card',
        '.urgency-section',
        '.form-header',
        '.form-container'
    ].join(', '));
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // ==========================================
    // FORM HANDLING & CONVERSION TRACKING
    // ==========================================
    
    const leadForm = document.getElementById('lead-form');
    
    if (leadForm) {
        leadForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 mr-3 animate-spin"></i> Procesando...';
            lucide.createIcons();
            
            // Collect data
            const formData = new FormData(leadForm);
            const data = Object.fromEntries(formData.entries());
            
            // Track lead initiation (Facebook Pixel)
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Formulario Principal - Inodoros Inteligentes',
                    content_category: data.tipo || 'no_especificado',
                    value: 0,
                    currency: 'MXN'
                });
            }
            
            // Track Google Analytics event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'submit_form', {
                    event_category: 'lead',
                    event_label: data.tipo || 'no_especificado'
                });
            }
            
            // Simulate API call - REEMPLAZAR CON TU ENDPOINT REAL
            try {
                // Ejemplo: await fetch('https://tu-api.com/leads', { method: 'POST', body: formData });
                await fetch(leadForm.action, {
  method: "POST",
  body: formData,
  headers: {
    "Accept": "application/json"
  }
});
                
                // Success
                showFormSuccess(leadForm);
                
                // Track success
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'LeadSubmitted', {
                        content_name: 'Formulario Completado',
                        status: 'success'
                    });
                }
                
            } catch (error) {
                console.error('Form submission error:', error);
                showFormError(submitBtn, originalContent);
            }
        });
    }
    
    function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('📊 Lead Data Captured:', data);
                // Simulación: 95% éxito, 5% error para testing
                if (Math.random() > 0.05) {
                    resolve({ success: true, data: data });
                } else {
                    reject(new Error('Network error'));
                }
            }, 1500);
        });
    }
    
    function showFormSuccess(form) {
        const container = form.parentElement;
        
        const successHTML = `
            <div class="bg-white p-12 rounded-3xl text-center animate-fade-in">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i data-lucide="check" class="w-10 h-10 text-green-600"></i>
                </div>
                <h3 class="font-sans text-2xl font-semibold text-hinoto-black mb-4">¡Gracias por tu interés!</h3>
                <p class="text-gray-600 mb-6">Hemos recibido tu solicitud. Un especialista de Baños Hinoto te contactará en <strong>menos de 24 horas</strong> con tu propuesta personalizada.</p>
                <p class="text-sm text-gray-400 mb-8">Mientras tanto, ¿tienes preguntas? Escríbenos por WhatsApp:</p>
                <a href="https://wa.me/5213314793497?text=Hola,%20acabo%20de%20enviar%20mi%20solicitud%20de%20cotización" 
                   target="_blank"
                   class="inline-flex items-center bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition-colors">
                    <i data-lucide="message-circle" class="w-5 h-5 mr-3"></i>
                    Chatear por WhatsApp
                </a>
            </div>
        `;
        
        container.innerHTML = successHTML;
        lucide.createIcons();
        
        // Scroll to success message
        container.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    function showFormError(button, originalContent) {
        button.disabled = false;
        button.innerHTML = '<i data-lucide="alert-circle" class="w-5 h-5 mr-3"></i> Error, intenta de nuevo';
        button.classList.remove('bg-hinoto-black');
        button.classList.add('bg-red-600');
        lucide.createIcons();
        
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.classList.add('bg-hinoto-black');
            button.classList.remove('bg-red-600');
            lucide.createIcons();
        }, 3000);
    }
    
    // ==========================================
    // TRACKING & ANALYTICS HELPERS
    // ==========================================
    
    function trackEvent(category, action, label) {
        console.log('📈 Event:', { category, action, label });
        
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
    }
    
    function trackConversion(eventName, params) {
        console.log('🎯 Conversion:', eventName, params);
        
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, params);
        }
    }
    
    // Track all CTA clicks
    document.querySelectorAll('a[href="#contacto"], a[href="#modelos"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const text = this.textContent.trim();
            trackEvent('CTA', 'click', text);
            
            // Smooth scroll with offset for fixed header
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });
    
    // Track WhatsApp clicks
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            trackConversion('Contact', {
                method: 'WhatsApp',
                source: 'floating_button'
            });
        });
    }
    
    // ==========================================
    // SMOOTH SCROLL POLYFILL
    // ==========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });
    
    // ==========================================
    // URGENCY COUNTER (OPTIONAL)
    // ==========================================
    
    // Uncomment to add a countdown timer
    /*
    function initCountdown() {
        const countdownEl = document.getElementById('urgency-timer');
        if (!countdownEl) return;
        
        let hours = 23, minutes = 59, seconds = 59;
        
        setInterval(() => {
            seconds--;
            if (seconds < 0) { seconds = 59; minutes--; }
            if (minutes < 0) { minutes = 59; hours--; }
            if (hours < 0) { hours = 23; }
            
            countdownEl.textContent = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
        }, 1000);
    }
    initCountdown();
    */
    
    // ==========================================
    // EXIT INTENT POPUP (OPTIONAL)
    // ==========================================
    
    let exitIntentShown = false;
    
    document.addEventListener('mouseout', function(e) {
        if (exitIntentShown) return;
        if (e.clientY < 10) { // Mouse near top of viewport
            exitIntentShown = true;
            // Show exit intent modal here if desired
            console.log('🚪 Exit intent detected');
        }
    });
    
});

// ==========================================
// LAZY LOADING IMAGES (Performance)
// ==========================================

if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}
