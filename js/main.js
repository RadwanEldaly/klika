/**
 * KLIKA DIGITAL — Main Application Controller
 * Handles Bilingual State Switching, Lenis Smooth Scroll, Mobile Drawer,
 * Modal Lifecycles, Interactive Mockup Behaviors, and Toast Messages.
 */

window.KLIKA_LANG = localStorage.getItem('klika_preferred_lang') || 'ar';

window.App = {
  lenis: null,

  init() {
    this.initSmoothScroll();
    this.applyLanguage(window.KLIKA_LANG, false);
    this.bindLanguageSwitcher();
    this.bindNavigation();
    this.bindModals();
    this.bindServicePreviews();
    this.initMarquee();
    this.initAmbientMotion();

    // Initialize sub-systems
    if (window.Hero3DExperience) window.Hero3DExperience.init();
    if (window.BlogSystem) window.BlogSystem.init();
    if (window.ServiceModal && window.ServiceModal.enhanceSelects) window.ServiceModal.enhanceSelects();

    // Keyboard ESC listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (window.ServiceModal) window.ServiceModal.close();
        if (window.BlogSystem) window.BlogSystem.closeReader();
        this.closeMobileMenu();
      }
    });

    console.log('%cKLIKA DIGITAL%c Elite Digital Studio Experience Initialized',
      'background: #1ea6f6; color: #000; font-weight: bold; padding: 3px 8px; border-radius: 3px;',
      'color: #16e4cb; padding: 3px 6px;'
    );
  },

  initSmoothScroll() {
    if (typeof Lenis !== 'undefined') {
      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

      this.lenis = new Lenis({
        duration: isTouch ? 0.5 : 0.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.25,
        touchMultiplier: 1.0,
        syncTouch: false,
        infinite: false
      });

      window.lenis = this.lenis;

      // Connect Lenis cleanly to GSAP ScrollTrigger if available
      if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
        this.lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          this.lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        // Fallback RAF loop only if GSAP ticker is absent
        const raf = (time) => {
          this.lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }
    }
  },

  applyLanguage(lang, smoothTransition = true) {
    window.KLIKA_LANG = lang;
    localStorage.setItem('klika_preferred_lang', lang);

    const html = document.documentElement;
    const isAr = lang === 'ar';

    html.setAttribute('lang', lang);
    html.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    if (isAr) {
      html.classList.add('lang-ar');
      html.classList.remove('lang-en');
    } else {
      html.classList.add('lang-en');
      html.classList.remove('lang-ar');
    }

    const dict = window.KLIKA_TRANSLATIONS[lang] || window.KLIKA_TRANSLATIONS.ar;

    // Document Meta
    document.title = dict.docTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', dict.metaDesc);

    // Translate all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // Language switch button label
    const switchBtn = document.getElementById('btn-lang-switch');
    if (switchBtn) {
      switchBtn.textContent = dict.langSwitch;
      switchBtn.setAttribute('aria-label', dict.langSwitchLabel);
    }
    const mobileSwitchBtn = document.getElementById('mobile-lang-switch');
    if (mobileSwitchBtn) {
      mobileSwitchBtn.textContent = isAr ? 'English' : 'العربية';
    }

    // Refresh sub-modules
    if (window.BlogSystem) window.BlogSystem.renderPosts();
    if (window.ServiceModal && window.ServiceModal.activeServiceId) {
      window.ServiceModal.renderCustomFields();
    }
    if (window.Hero3DExperience) {
      window.Hero3DExperience.updateHudTelemetry(window.Hero3DExperience.currentIndex);
    }
    this.updateMarqueeItems(dict.marqueeItems);
  },

  bindLanguageSwitcher() {
    const switchBtn = document.getElementById('btn-lang-switch');
    if (switchBtn) {
      switchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const nextLang = window.KLIKA_LANG === 'ar' ? 'en' : 'ar';
        this.applyLanguage(nextLang);
      });
    }

    const mobileSwitchBtn = document.getElementById('mobile-lang-switch');
    if (mobileSwitchBtn) {
      mobileSwitchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const nextLang = window.KLIKA_LANG === 'ar' ? 'en' : 'ar';
        this.applyLanguage(nextLang);
        this.closeMobileMenu();
      });
    }
  },

  bindNavigation() {
    // Mobile Drawer Toggle
    const menuToggle = document.getElementById('btn-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const drawerClose = document.getElementById('btn-drawer-close');

    if (menuToggle && drawer) {
      menuToggle.addEventListener('click', () => {
        drawer.classList.add('open');
        if (drawerBackdrop) drawerBackdrop.classList.add('visible');
        document.body.style.overflow = 'hidden';
      });
    }

    const closeHandler = () => this.closeMobileMenu();
    if (drawerClose) drawerClose.addEventListener('click', closeHandler);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeHandler);

    // Anchor Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href === '#!') return;

        e.preventDefault();
        this.closeMobileMenu();

        const targetEl = document.querySelector(href);
        if (targetEl) {
          const navOffset = 64;
          const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;

          if (this.lenis) {
            this.lenis.scrollTo(targetY, { duration: 0.8 });
          } else {
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        }
      });
    });
  },

  closeMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    if (drawer) drawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('visible');
    document.body.style.overflow = '';
  },

  bindModals() {
    // Project Modal Close Handlers
    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('btn-modal-close');
    const modalBackdrop = document.getElementById('modal-backdrop');

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => window.ServiceModal.close());
    if (modalBackdrop) modalBackdrop.addEventListener('click', () => window.ServiceModal.close());

    // Service Select Dropdown inside Modal
    const select = document.getElementById('modal-service-select');
    if (select) {
      select.addEventListener('change', (e) => {
        window.ServiceModal.onServiceChange(e.target.value);
      });
    }

    // Modal Form Submission
    const form = document.getElementById('project-form');
    if (form) {
      form.addEventListener('submit', (e) => window.ServiceModal.handleSubmit(e));
    }

    const btnSuccessClose = document.getElementById('btn-success-close');
    if (btnSuccessClose) {
      btnSuccessClose.addEventListener('click', () => window.ServiceModal.close());
    }

    // Declarative CSP-Compliant Event Delegation for Modals and Actions
    document.addEventListener('click', (e) => {
      const modalBtn = e.target.closest('[data-open-modal]');
      if (modalBtn) {
        e.preventDefault();
        const serviceId = modalBtn.getAttribute('data-open-modal') || 'web-design';
        if (modalBtn.getAttribute('data-action') === 'close-reader-open-modal' && window.BlogSystem) {
          window.BlogSystem.closeReader();
        }
        if (window.ServiceModal) window.ServiceModal.open(serviceId);
        return;
      }

      const actionBtn = e.target.closest('[data-action]');
      if (actionBtn) {
        const action = actionBtn.getAttribute('data-action');
        if (action === 'reassemble-logo') {
          e.preventDefault();
          if (window.Hero3DExperience) window.Hero3DExperience.reassembleLogo();
        } else if (action === 'close-blog-reader') {
          e.preventDefault();
          if (window.BlogSystem) window.BlogSystem.closeReader();
        }
      }
    });

    // Blog Reader Close
    const readerModal = document.getElementById('blog-reader-modal');
    const readerClose = document.getElementById('btn-reader-close');
    const readerBackdrop = document.getElementById('reader-backdrop');
    if (readerClose) readerClose.addEventListener('click', () => window.BlogSystem.closeReader());
    if (readerBackdrop) readerBackdrop.addEventListener('click', () => window.BlogSystem.closeReader());
  },

  bindServicePreviews() {
    // Interactive switches in Service Mockups
    // 1. Web Design wireframe toggle
    const toggleWireframe = document.getElementById('wireframe-toggle-btn');
    const previewCanvas = document.getElementById('web-preview-mockup');
    if (toggleWireframe && previewCanvas) {
      toggleWireframe.addEventListener('click', () => {
        previewCanvas.classList.toggle('wireframe-mode');
        toggleWireframe.classList.toggle('active');
      });
    }

    // 2. Web Rental monthly/annual switch
    const rentalCycleRadios = document.querySelectorAll('input[name="rental-cycle"]');
    const rentalPriceVal = document.getElementById('rental-price-display');
    const rentalCycleLabel = document.getElementById('rental-cycle-label');
    if (rentalCycleRadios.length && rentalPriceVal) {
      rentalCycleRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.value === 'annual') {
            rentalPriceVal.textContent = '390';
            if (rentalCycleLabel) rentalCycleLabel.textContent = window.KLIKA_LANG === 'ar' ? '/ شهر (فاتورة سنوية)' : '/ mo (billed annually)';
          } else {
            rentalPriceVal.textContent = '490';
            if (rentalCycleLabel) rentalCycleLabel.textContent = window.KLIKA_LANG === 'ar' ? '/ شهر' : '/ month';
          }
        });
      });
    }

    // 3. Ecom Add-to-cart micro-interaction
    const addCartBtn = document.getElementById('ecom-add-cart-btn');
    const cartCountBadge = document.getElementById('ecom-cart-count');
    if (addCartBtn && cartCountBadge) {
      addCartBtn.addEventListener('click', () => {
        let current = parseInt(cartCountBadge.textContent, 10) || 0;
        cartCountBadge.textContent = current + 1;
        cartCountBadge.classList.add('pulse');
        setTimeout(() => cartCountBadge.classList.remove('pulse'), 400);
      });
    }
  },

  initMarquee() {
    const lang = window.KLIKA_LANG || 'ar';
    const dict = window.KLIKA_TRANSLATIONS[lang];
    this.updateMarqueeItems(dict.marqueeItems);
  },

  updateMarqueeItems(items) {
    const tracks = document.querySelectorAll('.marquee-track');
    if (!tracks.length || !items) return;

    const content = items.map((item) => `
      <span class="marquee-item">
        <span class="marquee-bullet">✦</span>
        <span class="marquee-text">${item}</span>
      </span>
    `).join('');

    tracks.forEach(track => {
      // Repeat 3 times to create uninterrupted infinite scroll
      track.innerHTML = content + content + content;
    });
  },

  initAmbientMotion() {
    const ambientBg = document.getElementById('ambient-bg');
    if (!ambientBg) return;

    // 1. Mouse & Touch spotlight positioning throttled via RAF (scoped to #ambient-bg, not :root)
    let pointerTicking = false;
    let pendingX = 50;
    let pendingY = 30;

    let isScrolling = false;
    let scrollTimer = null;

    const handlePointer = (e) => {
      // Prioritize scroll performance by pausing spotlight updates during active scroll
      if (isScrolling) return;

      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth / 2);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight / 3);
      pendingX = (clientX / window.innerWidth) * 100;
      pendingY = (clientY / window.innerHeight) * 100;

      if (!pointerTicking) {
        pointerTicking = true;
        requestAnimationFrame(() => {
          ambientBg.style.setProperty('--mouse-x', `${pendingX.toFixed(1)}%`);
          ambientBg.style.setProperty('--mouse-y', `${pendingY.toFixed(1)}%`);
          pointerTicking = false;
        });
      }
    };

    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('touchmove', handlePointer, { passive: true });

    // 2. Hardware-accelerated parallax transform on #ambient-bg
    let scrollTicking = false;
    const updateAmbientScroll = (scrollY) => {
      isScrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => { isScrolling = false; }, 80);

      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        const offset = (scrollY * 0.08).toFixed(1);
        ambientBg.style.transform = `translate3d(0, ${-offset}px, 0)`;
        scrollTicking = false;
      });
    };

    if (this.lenis) {
      this.lenis.on('scroll', (e) => {
        updateAmbientScroll(e.scroll);
      });
    } else {
      window.addEventListener('scroll', () => {
        updateAmbientScroll(window.scrollY);
      }, { passive: true });
    }
  },

  showToast(message) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'global-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 2800);
  }
};

// Global Helper Functions
window.openProjectModal = function(serviceId) {
  if (window.ServiceModal) {
    window.ServiceModal.open(serviceId);
  }
};

window.copyHexCode = function(hex, name) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(hex).then(() => {
      const lang = window.KLIKA_LANG || 'ar';
      const dict = window.KLIKA_TRANSLATIONS[lang];
      window.App.showToast(`${name}: ${hex} — ${dict.toastHexCopied}`);
    }).catch(() => {
      window.App.showToast(`${hex} copied`);
    });
  }
};

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});

