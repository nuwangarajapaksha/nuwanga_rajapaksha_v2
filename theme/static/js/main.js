/* ═══════════════════════════════════════════════════════════════
   SOCIAL STRIP JAVASCRIPT (AUTO SCROLL + CONTROLS)
═══════════════════════════════════════════════════════════════ */

(function () {
  const track   = document.getElementById("socialTrack");
  const nextBtn = document.getElementById("socialNext");
  const prevBtn = document.getElementById("socialPrev");

  if (!track) return;

  // Duplicate cards for seamless infinite scrolling effect
  track.innerHTML = track.innerHTML.repeat(6);

  let position = 0;
  const speed  = 0.55;
  let isPaused = false;

  // Half width used to reset scroll position smoothly
  const halfWidth = () => track.scrollWidth / 2;

  // Pause animation on hover
  track.addEventListener("mouseenter", () => isPaused = true);
  track.addEventListener("mouseleave", () => isPaused = false);

  // Manual navigation controls
  nextBtn && nextBtn.addEventListener("click", () => position -= 380);
  prevBtn && prevBtn.addEventListener("click", () => position += 380);

  // Animation loop
  function animate() {
    if (!isPaused) position -= speed;

    // Reset for infinite loop effect
    if (Math.abs(position) >= halfWidth()) position = 0;

    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
})();


/* ═══════════════════════════════════════════════════════════════
   MOBILE DRAWER CONTROLS (OPEN / CLOSE)
═══════════════════════════════════════════════════════════════ */

function openDrawer() {
  document.getElementById('mobile-drawer').classList.remove('-translate-x-full');
  document.getElementById('drawer-backdrop').classList.remove('invisible', 'opacity-0');
  document.body.classList.add('overflow-hidden');
}

function closeDrawer() {
  document.getElementById('mobile-drawer').classList.add('-translate-x-full');
  document.getElementById('drawer-backdrop').classList.add('invisible', 'opacity-0');
  document.body.classList.remove('overflow-hidden');
}


/* ═══════════════════════════════════════════════════════════════
   HEADER SHADOW ON SCROLL
═══════════════════════════════════════════════════════════════ */

window.addEventListener('scroll', () => {
  const h = document.getElementById('site-header');

  if (window.scrollY > 20) {
    h.classList.add('shadow-lg', 'shadow-black/40');
  } else {
    h.classList.remove('shadow-lg', 'shadow-black/40');
  }
}, { passive: true });


/* ═══════════════════════════════════════════════════════════════
   ANNOUNCEMENT BAR (AUTO DISMISS ON SCROLL)
═══════════════════════════════════════════════════════════════ */

(function () {
  const BAR_KEY     = 'announceBarDismissed';
  const announceBar = document.getElementById('announce-bar');

  if (sessionStorage.getItem(BAR_KEY)) return;

  let dismissed = false;

  function dismissBar() {
    if (dismissed) return;
    dismissed = true;

    // Smooth collapse animation
    announceBar.style.transition =
      'max-height 500ms ease-in-out, opacity 500ms ease-in-out, padding 500ms ease-in-out';

    announceBar.style.opacity       = '0';
    announceBar.style.maxHeight     = '0';
    announceBar.style.paddingTop    = '0';
    announceBar.style.paddingBottom = '0';

    setTimeout(() => {
      announceBar.style.display = 'none';
      sessionStorage.setItem(BAR_KEY, '1');
    }, 500);

    window.removeEventListener('scroll', onScroll);
  }

  function onScroll() {
    if (window.scrollY > 0) dismissBar();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ═══════════════════════════════════════════════════════════════
   GOOGLE TRANSLATE INITIALIZER
═══════════════════════════════════════════════════════════════ */

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    autoDisplay: false,
    gaTrack: false,
    multilanguagePage: true,
  }, 'google_translate_element');
}


/* ═══════════════════════════════════════════════════════════════
   CUSTOM LANGUAGE SWITCHER (GOOGLE TRANSLATE INTEGRATION)
═══════════════════════════════════════════════════════════════ */

(function () {

  /* ── LANGUAGE CONFIG ── */
  var LANGUAGES = [
    { code: 'en', label: 'English', local: 'English', fi: 'gb' },
    { code: 'si', label: 'Sinhala', local: 'සිංහල', fi: 'lk' },
    { code: 'ta', label: 'Tamil', local: 'தமிழ்', fi: 'lk' },
    { code: 'fr', label: 'French', local: 'Français', fi: 'fr' },
    { code: 'de', label: 'German', local: 'Deutsch', fi: 'de' },
    { code: 'ja', label: 'Japanese', local: '日本語', fi: 'jp' },
    { code: 'zh-CN', label: 'Chinese', local: '中文', fi: 'cn' },
    { code: 'ar', label: 'Arabic', local: 'العربية', fi: 'sa' },
    { code: 'ko', label: 'Korean', local: '한국어', fi: 'kr' },
    { code: 'es', label: 'Spanish', local: 'Español', fi: 'es' },
    { code: 'hi', label: 'Hindi', local: 'हिन्दी', fi: 'in' },
    { code: 'ru', label: 'Russian', local: 'Русский', fi: 'ru' },
  ];

  /* ── COOKIE HELPERS ── */
  function getCookie(name) {
    var m = document.cookie.match(new RegExp('(?:^|;)\\s*' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }

  function getActiveLangCode() {
    var val = getCookie('googtrans');
    if (!val) return 'en';
    var parts = val.split('/');
    return parts[parts.length - 1] || 'en';
  }

  /* ── LANGUAGE SWITCH LOGIC ── */
  function translatePage(langCode) {
    if (langCode === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname + ';';
      window.location.reload();
      return;
    }

    var v = encodeURIComponent('/en/' + langCode);

    document.cookie = 'googtrans=' + v + '; path=/';
    document.cookie = 'googtrans=' + v + '; path=/; domain=' + window.location.hostname;

    var poll = setInterval(() => {
      var sel = document.querySelector('.goog-te-combo');
      if (sel) {
        clearInterval(poll);
        sel.value = langCode;
        sel.dispatchEvent(new Event('change'));
        updateUI(langCode);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(poll);
      window.location.reload();
    }, 800);
  }

  /* ── UI UPDATE ── */
  function updateUI(langCode) {
    var lang = LANGUAGES.find(l => l.code === langCode) || LANGUAGES[0];

    // Desktop trigger update
    var flagSpan = document.getElementById('lang-trigger-flag');
    var codeSpan = document.getElementById('lang-trigger-code');

    if (flagSpan) flagSpan.className = 'fi fi-' + lang.fi + ' lang-trigger-fi';
    if (codeSpan) codeSpan.textContent = lang.label;

    // Mobile active display update
    var mobileFlag  = document.getElementById('mobile-active-flag');
    var mobileLabel = document.getElementById('mobile-active-label');

    if (mobileFlag)  mobileFlag.className = 'fi fi-' + lang.fi + ' lang-trigger-fi';
    if (mobileLabel) mobileLabel.textContent = lang.label;

    // Desktop buttons active state
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      const active = btn.dataset.langBtn === langCode;
      btn.classList.toggle('lang-btn-active', active);

      const chk = btn.querySelector('[data-check]');
      if (chk) chk.style.display = active ? 'inline' : 'none';
    });

    // Mobile grid buttons active state
    document.querySelectorAll('[data-mobile-lang-btn]').forEach(btn => {
      const active = btn.dataset.mobileLangBtn === langCode;

      if (active) {
        btn.classList.add('lang-grid-btn-active');
        btn.classList.remove('border-white/[0.08]', 'bg-white/[0.03]');
      } else {
        btn.classList.remove('lang-grid-btn-active');
        btn.classList.add('border-white/[0.08]', 'bg-white/[0.03]');
      }
    });
  }

  /* ── DESKTOP BUTTON BUILDER ── */
  function buildDesktopButton(lang, activeLang) {
    const isActive = lang.code === activeLang;

    return `
      <button
        type="button"
        data-lang-btn="${lang.code}"
        onclick="window.__switchLang('${lang.code}')"
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer
        ${isActive
          ? 'lang-btn-active border-amber-400/20'
          : 'text-white/60 hover:text-amber-400 hover:bg-amber-400/5 border-transparent hover:border-amber-400/10'}">

        <span class="fi fi-${lang.fi} lang-list-fi shrink-0"></span>

        <span class="text-xs font-medium leading-none">${lang.label}</span>
        <span class="text-[10px] leading-none opacity-50">${lang.local}</span>

        <i data-check class="fa-solid fa-check text-amber-400 text-[10px] shrink-0"
           style="display:${isActive ? 'inline' : 'none'}"></i>
      </button>
    `;
  }

  /* ── MOBILE GRID BUTTON BUILDER ── */
  function buildMobileGridButton(lang, activeLang) {
    const isActive = lang.code === activeLang;

    return `
      <button
        type="button"
        data-mobile-lang-btn="${lang.code}"
        onclick="window.__switchLang('${lang.code}')"
        class="relative flex flex-col items-center justify-center gap-1 py-2.5 px-1 rounded-xl border transition-all duration-200 cursor-pointer
        ${isActive
          ? 'lang-grid-btn-active'
          : 'bg-white/[0.03] border-white/[0.08] hover:bg-amber-400/5 hover:border-amber-400/20'}">

        <span class="fi fi-${lang.fi} lang-grid-fi"></span>

        <span class="text-[9px] font-medium leading-none text-center w-full truncate px-0.5
          ${isActive ? 'text-amber-400' : 'text-white/50'}">
          ${lang.label}
        </span>

        ${isActive ? `<span class="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400"></span>` : ''}
      </button>
    `;
  }

  /* ── RENDER LISTS ── */
  function renderLists() {
    const active = getActiveLangCode();

    const desktop = document.getElementById('desktop-lang-list');
    if (desktop) {
      desktop.innerHTML = LANGUAGES.map(l => buildDesktopButton(l, active)).join('');
    }

    const grid = document.getElementById('mobile-lang-grid');
    if (grid) {
      grid.innerHTML = LANGUAGES.map(l => buildMobileGridButton(l, active)).join('');
    }

    updateUI(active);
  }

  window.__switchLang = function (code) {
    translatePage(code);
  };

  document.addEventListener('DOMContentLoaded', renderLists);

})();


/* ═══════════════════════════════════════════════════════════════
   CONTACT FORM AJAX HANDLER
═══════════════════════════════════════════════════════════════ */

document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const btn = document.getElementById("contact-submit-btn");
  const btnText = document.getElementById("contact-btn-text");
  const status = document.getElementById("contact-status");
  const csrfToken = form.querySelector("[name=csrfmiddlewaretoken]").value;

  const payload = {
    name: form.name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value,
    honeypot: form.honeypot.value,
  };

  btn.disabled = true;
  btnText.textContent = "Sending…";
  status.classList.add("hidden");

  try {
    const res = await fetch("/contact_submit/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    status.classList.remove("hidden");

    if (data.ok) {
      status.textContent = data.message || "Message sent!";
      status.className = "text-sm text-emerald-400";
      form.reset();
    } else {
      status.textContent = data.error || "Something went wrong. Please check the fields and try again.";
      status.className = "text-sm text-red-400";
    }

  } catch (err) {
    status.classList.remove("hidden");
    status.textContent = "Network error. Please try again.";
    status.className = "text-sm text-red-400";
  } finally {
    btn.disabled = false;
    btnText.textContent = "Send Message";
  }
});

function toggleStockDropdown(suffix, event) {
    if (event) event.stopPropagation();
    var dd = document.getElementById('stock-dropdown-' + suffix);
    if (dd) dd.classList.toggle('force-open');
}

document.addEventListener('click', function (event) {
    var dd = document.getElementById('stock-dropdown-mobile');
    var trigger = document.getElementById('stock-trigger-mobile');
    if (dd && trigger && !dd.contains(event.target) && !trigger.contains(event.target)) {
        dd.classList.remove('force-open');
    }
});