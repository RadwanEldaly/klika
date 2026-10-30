/**
 * KLIKA DIGITAL — Services Architecture & Adaptive Modal Brief System
 * 9 Distinct Services with Custom Presentation Patterns and Dynamic Ingestion Fields.
 */

window.KLIKA_SERVICES = [
  {
    id: "web-design",
    key: "s1",
    tagAr: "الخدمة 01 // تصميم مخصص",
    tagEn: "SERVICE 01 // BESPOKE DESIGN",
    badgeAr: "تصميم فريد 100%",
    badgeEn: "100% Custom Craft",
    accent: "#1ea6f6",
    customFieldId: "fWebsiteType",
    customFieldType: "select",
    customFieldOptionsAr: [
      "موقع شركات ومؤسسات كبرى",
      "موقع تعريفي وبورتفوليو احترافي",
      "موقع لشركة ناشئة أو تطبيق SaaS",
      "منصة خدمات متقدمة مع بوابات دفع"
    ],
    customFieldOptionsEn: [
      "Corporate Enterprise Website",
      "Professional Brand & Portfolio",
      "Tech Startup / SaaS Product",
      "Advanced Multi-Service Portal"
    ]
  },
  {
    id: "web-rental",
    key: "s2",
    tagAr: "الخدمة 02 // حلول مرنة",
    tagEn: "SERVICE 02 // FLEXIBLE RENTAL",
    badgeAr: "بدون تكلفة بناء كاملة",
    badgeEn: "Zero Heavy Upfront",
    accent: "#7f52f5",
    customFieldId: "fRentalTerm",
    customFieldType: "select",
    customFieldOptionsAr: [
      "خطة سنوية موفرة (شاملة الدومين والصيانة)",
      "خطة نصف سنوية مرنة",
      "خطة شهرية قابلة للإلغاء بأي وقت"
    ],
    customFieldOptionsEn: [
      "Annual Plan (Domain & Maintenance Included)",
      "Semi-Annual Flexible Plan",
      "Monthly Plan (Cancel Anytime)"
    ]
  },
  {
    id: "google-maps",
    key: "s3",
    tagAr: "الخدمة 03 // ظهور محلي",
    tagEn: "SERVICE 03 // LOCAL AUTHORITY",
    badgeAr: "تصدر النتائج القريبة",
    badgeEn: "Top Local Pack",
    accent: "#16e4cb",
    customFieldId: "fMapLocation",
    customFieldType: "text",
    placeholderAr: "مثال: الرياض - عيادة طبية / مقهى / مكتب هندسي",
    placeholderEn: "e.g. Riyadh - Dental Clinic / Cafe / Law Firm"
  },
  {
    id: "seo",
    key: "s4",
    tagAr: "الخدمة 04 // تصدر عضوي",
    tagEn: "SERVICE 04 // ORGANIC SEO",
    badgeAr: "فهرسة وأداء تقني",
    badgeEn: "Technical Indexation",
    accent: "#1ea6f6",
    customFieldId: "fSeoUrl",
    customFieldType: "url",
    placeholderAr: "https://yourwebsite.com",
    placeholderEn: "https://yourwebsite.com"
  },
  {
    id: "lms",
    key: "s5",
    tagAr: "الخدمة 05 // منصات تعليمية",
    tagEn: "SERVICE 05 // ACADEMY & LMS",
    badgeAr: "حماية وبث سلس",
    badgeEn: "Protected Video Streaming",
    accent: "#7f52f5",
    customFieldId: "fLmsCourses",
    customFieldType: "select",
    customFieldOptionsAr: [
      "منصة دورات مسجلة ومحمية (1 - 10 دورات)",
      "أكاديمية تدريبية كبرى (أكثر من 10 دورات)",
      "منصة تدريب تفاعلي مباشر وبث حي مع اختبارات"
    ],
    customFieldOptionsEn: [
      "Protected Video Platform (1 - 10 Courses)",
      "Comprehensive Enterprise Academy (10+ Courses)",
      "Live Interactive Cohort & Quiz Platform"
    ]
  },
  {
    id: "ecom",
    key: "s6",
    tagAr: "الخدمة 06 // تجارة إلكترونية",
    tagEn: "SERVICE 06 // HIGH-CONVERSION COMMERCE",
    badgeAr: "دفع سريع وسلات نشطة",
    badgeEn: "Frictionless Checkout",
    accent: "#16e4cb",
    customFieldId: "fEcomProducts",
    customFieldType: "select",
    customFieldOptionsAr: [
      "متجر منتجات محدودة (1 - 20 منتج)",
      "متجر متوسط مع تصنيفات وفلاتر (20 - 200 منتج)",
      "متجر ضخم وتكامل مع أنظمة المخازن وERP"
    ],
    customFieldOptionsEn: [
      "Boutique Storefront (1 - 20 SKUs)",
      "Mid-Scale Store with Filters (20 - 200 SKUs)",
      "Enterprise Multi-Category Store & ERP Sync"
    ]
  },
  {
    id: "mobile-apps",
    key: "s7",
    tagAr: "الخدمة 07 // تطبيقات الهواتف",
    tagEn: "SERVICE 07 // MOBILE SYSTEMS",
    badgeAr: "iOS & Android",
    badgeEn: "iOS & Android Ready",
    accent: "#1ea6f6",
    customFieldId: "fAppPlatform",
    customFieldType: "select",
    customFieldOptionsAr: [
      "تطبيق لكلا النظامين iOS وAndroid",
      "تطبيق نظام iOS فقط (آبل)",
      "تطبيق نظام Android فقط"
    ],
    customFieldOptionsEn: [
      "Both iOS & Android (Cross-Platform / Native)",
      "iOS Only (Apple Ecosystem)",
      "Android Only"
    ]
  },
  {
    id: "google-ads",
    key: "s8",
    tagAr: "الخدمة 08 // إعلانات جوجل",
    tagEn: "SERVICE 08 // HIGH-INTENT SEARCH",
    badgeAr: "استهداف مشترين جاهزين",
    badgeEn: "Ready-To-Buy Audiences",
    accent: "#7f52f5",
    customFieldId: "fBudgetRange",
    customFieldType: "select",
    customFieldOptionsAr: [
      "ميزانية تجريبية: 3,000 - 6,000 ريال شهرياً",
      "ميزانية نمو: 6,000 - 15,000 ريال شهرياً",
      "ميزانية توسع: أكثر من 15,000 ريال شهرياً"
    ],
    customFieldOptionsEn: [
      "Pilot Budget: $1,000 - $2,000 / mo",
      "Growth Budget: $2,000 - $5,000 / mo",
      "Scale Budget: $5,000+ / mo"
    ]
  },
  {
    id: "meta-ads",
    key: "s9",
    tagAr: "الخدمة 09 // إعلانات ميتا",
    tagEn: "SERVICE 09 // META SOCIAL CAMPAIGNS",
    badgeAr: "إنستغرام وفيسبوك",
    badgeEn: "Instagram & Facebook",
    accent: "#16e4cb",
    customFieldId: "fMetaPlatforms",
    customFieldType: "select",
    customFieldOptionsAr: [
      "إنستغرام وفيسبوك معاً (أعلى وصول وتحويل)",
      "إنستغرام بشكل أساسي (ريلز وتصاميم بصرية)",
      "فيسبوك والحملات التفاعلية المباشرة"
    ],
    customFieldOptionsEn: [
      "Both Instagram & Facebook (Max Conversion)",
      "Instagram Primary (Reels & High Visual Focus)",
      "Facebook Primary & Messenger Lead Gen"
    ]
  }
];

// Service Modal Controller
window.ServiceModal = {
  activeServiceId: null,

  open(serviceId) {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    this.activeServiceId = serviceId || 'web-design';
    this.resetFormState();
    this.syncSelect();
    this.renderCustomFields();
    this.enhanceSelects();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(() => {
      const firstInput = modal.querySelector('input:not([type="hidden"]), select');
      if (firstInput) firstInput.focus();
    }, 100);
  },

  close() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  },

  syncSelect() {
    const select = document.getElementById('modal-service-select');
    if (select && this.activeServiceId) {
      select.value = this.activeServiceId;
    }
  },

  onServiceChange(newId) {
    this.activeServiceId = newId;
    this.syncSelect();
    this.renderCustomFields();
    this.enhanceSelects();
  },

  renderCustomFields() {
    const container = document.getElementById('modal-custom-fields');
    if (!container) return;

    const lang = window.KLIKA_LANG || 'ar';
    const dict = window.KLIKA_TRANSLATIONS[lang] || window.KLIKA_TRANSLATIONS.ar;
    const sObj = window.KLIKA_SERVICES.find(s => s.id === this.activeServiceId) || window.KLIKA_SERVICES[0];

    const labelText = dict[sObj.customFieldId] || "تفاصيل متخصصة";
    let fieldHtml = '';

    if (sObj.customFieldType === 'select') {
      const options = lang === 'en' ? sObj.customFieldOptionsEn : sObj.customFieldOptionsAr;
      const optsHtml = options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
      fieldHtml = `
        <div class="form-group animate-fade">
          <label class="form-label" for="custom-field-input">${labelText} <span class="req-star">*</span></label>
          <div class="select-wrap">
            <select id="custom-field-input" name="service_spec" class="form-input" required>
              ${optsHtml}
            </select>
            <div class="select-chevron">▾</div>
          </div>
        </div>
      `;
    } else {
      const placeholder = lang === 'en' ? (sObj.placeholderEn || '') : (sObj.placeholderAr || '');
      fieldHtml = `
        <div class="form-group animate-fade">
          <label class="form-label" for="custom-field-input">${labelText} <span class="req-star">*</span></label>
          <input type="${sObj.customFieldType || 'text'}" id="custom-field-input" name="service_spec" class="form-input" placeholder="${placeholder}" required />
        </div>
      `;
    }

    container.innerHTML = fieldHtml;
    this.enhanceSelects();
  },

  enhanceSelects() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    modal.querySelectorAll('.select-wrap').forEach(wrap => {
      const select = wrap.querySelector('select');
      if (!select) return;

      // Remove previous custom trigger and dropdown if present
      const oldTrigger = wrap.querySelector('.custom-select-trigger');
      if (oldTrigger) oldTrigger.remove();
      const oldDropdown = wrap.querySelector('.custom-select-dropdown');
      if (oldDropdown) oldDropdown.remove();

      // Hide chevron because custom trigger has its own icon
      const chevron = wrap.querySelector('.select-chevron');
      if (chevron) chevron.style.display = 'none';

      // Keep native select synchronized and styled in dark mode
      select.style.position = 'absolute';
      select.style.opacity = '0';
      select.style.pointerEvents = 'none';
      select.style.height = '0';
      select.style.width = '0';
      select.style.margin = '0';
      select.style.padding = '0';
      select.style.border = 'none';

      // Build Trigger
      const trigger = document.createElement('div');
      trigger.className = 'custom-select-trigger';
      trigger.setAttribute('tabindex', '0');
      trigger.setAttribute('role', 'combobox');
      trigger.setAttribute('aria-expanded', 'false');

      const triggerLabel = document.createElement('span');
      triggerLabel.className = 'trigger-label';

      const triggerChevron = document.createElement('span');
      triggerChevron.className = 'select-chevron-icon';
      triggerChevron.textContent = '▾';
      triggerChevron.style.color = 'var(--text-tertiary)';

      trigger.appendChild(triggerLabel);
      trigger.appendChild(triggerChevron);

      // Build Dropdown Menu
      const dropdown = document.createElement('div');
      dropdown.className = 'custom-select-dropdown';
      dropdown.setAttribute('role', 'listbox');

      const serviceColors = {
        'web-design': '#1ea6f6',
        'web-rental': '#7f52f5',
        'google-maps': '#16e4cb',
        'seo': '#1ea6f6',
        'lms': '#7f52f5',
        'ecom': '#16e4cb',
        'mobile-apps': '#1ea6f6',
        'google-ads': '#7f52f5',
        'meta-ads': '#16e4cb'
      };

      const updateTriggerValue = () => {
        const selectedOpt = select.options[select.selectedIndex] || select.options[0];
        if (!selectedOpt) return;
        const val = selectedOpt.value;
        const text = selectedOpt.textContent;
        const color = serviceColors[val] || '#1ea6f6';

        triggerLabel.innerHTML = `
          <span class="option-dot" style="background:${color}; box-shadow:0 0 8px ${color}"></span>
          <span style="color:#ffffff; font-weight:600;">${text}</span>
        `;
      };

      updateTriggerValue();

      // Populate options
      Array.from(select.options).forEach((opt) => {
        const item = document.createElement('div');
        item.className = 'custom-option' + (opt.selected ? ' selected' : '');
        item.setAttribute('data-value', opt.value);
        item.setAttribute('role', 'option');

        const color = serviceColors[opt.value] || '#1ea6f6';
        item.innerHTML = `
          <div class="custom-option-main">
            <span class="option-dot" style="background:${color}; box-shadow:0 0 6px ${color}"></span>
            <span style="color:#f5f5f7;">${opt.textContent}</span>
          </div>
          ${opt.selected ? '<span class="option-check">✓</span>' : ''}
        `;

        item.addEventListener('click', (e) => {
          e.stopPropagation();
          select.value = opt.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          dropdown.querySelectorAll('.custom-option').forEach(o => {
            o.classList.remove('selected');
            const ch = o.querySelector('.option-check');
            if (ch) ch.remove();
          });
          item.classList.add('selected');
          const check = document.createElement('span');
          check.className = 'option-check';
          check.textContent = '✓';
          item.appendChild(check);

          updateTriggerValue();
          closeDropdown();
        });

        dropdown.appendChild(item);
      });

      const openDropdown = () => {
        document.querySelectorAll('.custom-select-dropdown.open').forEach(d => {
          if (d !== dropdown) d.classList.remove('open');
        });
        dropdown.classList.add('open');
        trigger.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      };

      const closeDropdown = () => {
        dropdown.classList.remove('open');
        trigger.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      };

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (dropdown.classList.contains('open')) {
          closeDropdown();
        } else {
          openDropdown();
        }
      });

      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (dropdown.classList.contains('open')) closeDropdown();
          else openDropdown();
        } else if (e.key === 'Escape') {
          closeDropdown();
        }
      });

      wrap.appendChild(trigger);
      wrap.appendChild(dropdown);
    });

    // Close on click outside
    if (!window._customSelectDocumentBound) {
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.select-wrap')) {
          document.querySelectorAll('.custom-select-dropdown.open').forEach(d => {
            d.classList.remove('open');
            const tr = d.parentElement.querySelector('.custom-select-trigger');
            if (tr) tr.classList.remove('active');
          });
        }
      });
      window._customSelectDocumentBound = true;
    }
  },

  resetFormState() {
    const form = document.getElementById('project-form');
    const successBox = document.getElementById('modal-success-box');
    if (form) {
      form.reset();
      form.style.display = 'flex';
      const errors = form.querySelectorAll('.input-error');
      errors.forEach(e => e.remove());
      const inputs = form.querySelectorAll('.error');
      inputs.forEach(i => i.classList.remove('error'));
    }
    if (successBox) {
      successBox.style.display = 'none';
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const lang = window.KLIKA_LANG || 'ar';
    const dict = window.KLIKA_TRANSLATIONS[lang];

    // Clear old errors
    form.querySelectorAll('.input-error').forEach(el => el.remove());
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    let isValid = true;

    // Validate Name
    const nameInput = form.querySelector('[name="client_name"]');
    if (!nameInput.value.trim()) {
      showError(nameInput, dict.errName);
      isValid = false;
    }

    // Validate Email
    const emailInput = form.querySelector('[name="client_email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, dict.errEmail);
      isValid = false;
    }

    // Validate Phone
    const phoneInput = form.querySelector('[name="client_phone"]');
    if (!phoneInput.value.trim() || phoneInput.value.trim().length < 6) {
      showError(phoneInput, dict.errPhone);
      isValid = false;
    }

    // Validate Custom Field
    const customInput = form.querySelector('[name="service_spec"]');
    if (customInput && !customInput.value.trim()) {
      showError(customInput, dict.errCustomField);
      isValid = false;
    }

    if (!isValid) return;

    // Honest handling: simulate submission & save to localStorage, prepare WhatsApp direct fallback
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>${dict.formSubmitting}</span>`;

    const inquiryData = {
      id: 'REQ-' + Date.now().toString(36).toUpperCase(),
      date: new Date().toISOString(),
      serviceId: this.activeServiceId,
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      spec: customInput ? customInput.value.trim() : '',
      notes: (form.querySelector('[name="client_notes"]') || {}).value || '',
      lang: lang
    };

    // Store in localStorage so leads are never lost even without an active server endpoint
    try {
      const existing = JSON.parse(localStorage.getItem('klika_inquiries') || '[]');
      existing.push(inquiryData);
      localStorage.setItem('klika_inquiries', JSON.stringify(existing));
    } catch (err) {
      console.warn('[KLIKA Storage] Could not cache inquiry locally:', err);
    }

    // Mock network latency for realistic UX
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      form.style.display = 'none';
      const successBox = document.getElementById('modal-success-box');
      if (successBox) {
        successBox.style.display = 'flex';

        // Prepare direct WhatsApp link with pre-filled message
        const waBtn = document.getElementById('modal-wa-link');
        if (waBtn) {
          const waMsg = encodeURIComponent(
            `السلام عليكم كليكا ديجيتال، لقد أرسلت طلب مشروع جديد (${inquiryData.id}) بخصوص: ${inquiryData.serviceId}.\nالاسم: ${inquiryData.name}\nالملاحظة: ${inquiryData.spec}`
          );
          waBtn.href = `https://wa.me/966500000000?text=${waMsg}`;
        }
      }
    }, 600);

    function showError(inputEl, msg) {
      inputEl.classList.add('error');
      const err = document.createElement('span');
      err.className = 'input-error animate-fade';
      err.textContent = msg;
      inputEl.parentNode.appendChild(err);
    }
  }
};
