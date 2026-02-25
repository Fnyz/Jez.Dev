/* ═══════════════════════════════════════════════════════════
   ANTI-INSPECT PROTECTION — Prevents DevTools usage
   ═══════════════════════════════════════════════════════════ */
(function() {
  // Disable right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // Disable common DevTools keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // F12
    if (e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+C (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
      e.preventDefault();
      return false;
    }
    // Cmd+Option+I (Mac)
    if (e.metaKey && e.altKey && e.keyCode === 73) {
      e.preventDefault();
      return false;
    }
    // Cmd+Option+J (Mac)
    if (e.metaKey && e.altKey && e.keyCode === 74) {
      e.preventDefault();
      return false;
    }
    // Cmd+Option+C (Mac)
    if (e.metaKey && e.altKey && e.keyCode === 67) {
      e.preventDefault();
      return false;
    }
  });

  // DevTools detection and debugger trigger
  var devtoolsOpen = false;
  var threshold = 160;

  // Method 1: Check for console.log timing
  setInterval(function() {
    var before = new Date().getTime();
    debugger;
    var after = new Date().getTime();
    if (after - before > 100) {
      document.body.innerHTML = '';
      window.location.reload();
    }
  }, 1000);

  // Method 2: Check window size differences
  setInterval(function() {
    var widthThreshold = window.outerWidth - window.innerWidth > threshold;
    var heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
      devtoolsOpen = true;
      debugger;
    }
  }, 500);

  // Method 3: Console detection
  var element = new Image();
  Object.defineProperty(element, 'id', {
    get: function() {
      devtoolsOpen = true;
      debugger;
      throw new Error('DevTools detected');
    }
  });
  setInterval(function() {
    console.log(element);
    console.clear();
  }, 1000);

})();

// loading screen
const socket = document.querySelector('.socket');
window.addEventListener('load', ()=> {
  const loadingTimeout = setTimeout(()=>{
      socket.style.display = "none";
      clearTimeout(loadingTimeout);
  },1000);
});

// Hamburger menu toggle
 const hamburger = document.querySelector('.hamburger');
  const menu = document.getElementById('mobile-menu');
  const checkbox = hamburger ? hamburger.querySelector('input[type="checkbox"]') : null;
  
  if (hamburger && menu && checkbox) {
    checkbox.addEventListener('change', function () {
      if (this.checked) {
        menu.classList.add('open');
        hamburger.classList.add('active');
      } else {
        menu.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  }

/* ═══════════════════════════════════════════
   GLOBAL FUNCTIONS — must be at window scope
   because HTML onclick="" attributes call them
   ═══════════════════════════════════════════ */

/* Mobile menu */
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const hamburger = document.querySelector('.hamburger');
  const checkbox = hamburger ? hamburger.querySelector('input[type="checkbox"]') : null;
  
  menu.classList.toggle('open');
  if (hamburger) hamburger.classList.toggle('active');
  if (checkbox) checkbox.checked = !checkbox.checked;
}

/* Dark mode */
function toggleDark() {
  var isDark = !document.body.classList.contains('dark');
  document.body.classList.toggle('dark', isDark);
  var icon = document.getElementById('darkIcon');
  if (icon) icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/* Download CV */
function downloadCV(e) {
  e.preventDefault();
  // Simulate file download (replace with actual file URL in production)
  var link = document.createElement('a');
  link.href = '/src/files/Jezreel_Busico_Resume(Developer).pdf'; // Replace with actual CV file URL
  link.download = 'Jezreel_Busico_Resume(Developer).pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* Contact form */
function handleSubmit(e) {
  e.preventDefault();
  var btn = document.getElementById('submit-btn');
  var success = document.getElementById('form-success');
  if (btn) {
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right:8px;"></i> Sending...';
    btn.disabled = true;
  }
  setTimeout(function () {
    if (btn) btn.style.display = 'none';
    if (success) success.classList.remove('hidden');
  }, 1500);
}

/* ─── Testimonial Carousel (global — called by onclick in HTML) ─── */
var _carousel = {
  current: 0,
  total: 2,
  timer: null,
  update: function () {
    var track = document.getElementById('testimonialTrack');
    if (!track) return;
    track.style.transform = 'translateX(-' + (this.current * 100) + '%)';
    var dots = document.querySelectorAll('.carousel-dot');
    var cur = this.current;
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === cur);
    });
  },
  move: function (dir) {
    this.current = (this.current + dir + this.total) % this.total;
    this.update();
    this.resetTimer();
  },
  goTo: function (index) {
    this.current = index;
    this.update();
    this.resetTimer();
  },
  resetTimer: function () {
    var self = this;
    clearInterval(this.timer);
    this.timer = setInterval(function () { self.move(1); }, 5000);
  }
};

function moveCarousel(dir) { _carousel.move(dir); }
function goToSlide(index)   { _carousel.goTo(index); }

/* ═══════════════════════════════════════════
   DOM-READY — everything that needs the DOM
   ═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

  /* Apply saved dark theme */
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    var icon = document.getElementById('darkIcon');
    if (icon) icon.className = 'fa-solid fa-sun';
  }

  /* ── Typing effect ── */
  var phrases = [
    'Robust backend APIs.',
    'Scalable web applications.',
    'Intuitive mobile apps.',
    'Clean database architecture.',
    'Full-stack solutions.'
  ];
  var phraseIdx = 0, charIdx = 0, deleting = false;
  var typingEl = document.getElementById('typing-text');

  function type() {
    if (!typingEl) return;
    var current = phrases[phraseIdx];
    if (!deleting) {
      charIdx++;
      typingEl.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      charIdx--;
      typingEl.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 45 : 80);
  }
  setTimeout(type, 900);

  /* ── Back to top ── */
  var btt = document.getElementById('back-to-top');
  if (btt) {
    function checkScroll() {
      if (window.pageYOffset > 400 || document.documentElement.scrollTop > 400) {
        btt.classList.add('visible');
      } else {
        btt.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', checkScroll, { passive: true });
    document.addEventListener('scroll', checkScroll, { passive: true });
  }

  /* ── Active nav highlight ── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', function () {
    var current = '';
    sections.forEach(function (s) {
      if (window.pageYOffset >= s.offsetTop - 120) current = s.getAttribute('id');
    });
    navLinks.forEach(function (link) {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, { passive: true });

  /* ── Scroll reveal ── */
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Proficiency bars ── */
  if ('IntersectionObserver' in window) {
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var fill = entry.target.querySelector('.prof-bar-fill');
          if (fill) fill.style.width = fill.dataset.width + '%';
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.prof-bar-wrap').forEach(function (wrap) {
      barObserver.observe(wrap);
    });
  }

  /* ── Start carousel auto-play ── */
  var carouselEl = document.getElementById('testimonialCarousel');
  if (carouselEl) {
    _carousel.resetTimer();
    carouselEl.addEventListener('mouseenter', function () { clearInterval(_carousel.timer); });
    carouselEl.addEventListener('mouseleave', function () { _carousel.resetTimer(); });
    var touchStartX = 0;
    carouselEl.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
    carouselEl.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) _carousel.move(diff > 0 ? 1 : -1);
    });
  }

}); 

//   ═══════════════════════════════════════════════════════════
//  EMAILJS — standalone, does not touch existing handleSubmit
//  ═══════════════════════════════════════════════════════════ 

(function () {
  // Load credentials from external config file (not tracked in git)
  var EJS_PUBLIC_KEY  = typeof EMAIL_CONFIG !== 'undefined' ? EMAIL_CONFIG.PUBLIC_KEY : 'YOUR_PUBLIC_KEY';
  var EJS_SERVICE_ID  = typeof EMAIL_CONFIG !== 'undefined' ? EMAIL_CONFIG.SERVICE_ID : 'YOUR_SERVICE_ID';
  var EJS_TEMPLATE_ID = typeof EMAIL_CONFIG !== 'undefined' ? EMAIL_CONFIG.TEMPLATE_ID : 'YOUR_TEMPLATE_ID';

  var configured = (
    EJS_PUBLIC_KEY  && EJS_PUBLIC_KEY  !== 'YOUR_PUBLIC_KEY' &&
    EJS_SERVICE_ID  && EJS_SERVICE_ID  !== 'YOUR_SERVICE_ID' &&
    EJS_TEMPLATE_ID && EJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID'
  );

  if (configured) {
    emailjs.init({ publicKey: EJS_PUBLIC_KEY });
  }

  /* Override handleSubmit only when EmailJS is configured */
  if (configured) {
    window.handleSubmit = function (e) {
      e.preventDefault();

      var btn      = document.getElementById('submit-btn');
      var success  = document.getElementById('form-success');
      var errorMsg = document.getElementById('form-error');

      var fname   = (document.getElementById('cf-firstname')  || {}).value || '';
      var lname   = (document.getElementById('cf-lastname')   || {}).value || '';
      var email   = (document.getElementById('cf-email')      || {}).value || '';
      var subject = (document.getElementById('cf-subject')    || {}).value || 'Portfolio Inquiry';
      var message = (document.getElementById('cf-message')    || {}).value || '';

      if (btn) {
        btn.innerHTML  = '<i class="fa-solid fa-spinner fa-spin" style="margin-right:8px;"></i> Sending...';
        btn.disabled   = true;
        btn.classList.add('sending');
      }
      if (errorMsg) errorMsg.style.display = 'none';

      const params = {
        from_name: fname + ' ' + lname,
        from_email: email,
        subject: subject,
        message: message
      }

      // Send the email using EmailJS
      emailjs.send(EJS_SERVICE_ID, EJS_TEMPLATE_ID, params).then(function () {
        if (btn)     btn.style.display = 'none';
        if (success) success.classList.remove('hidden');
        document.getElementById('contact-form').reset();
      }, function (err) {
        if (btn) {
          btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane text-sm"></i>';
          btn.disabled  = false;
          btn.classList.remove('sending');
        }
        if (errorMsg) errorMsg.style.display = 'block';
        console.error('EmailJS error:', err);
      });
    };
  }
  /* If NOT configured, the original handleSubmit (fake demo) still runs */
})();

{/* 
<!-- ═══════════════════════════════════════════════════════════
     CASE STUDY MODAL — standalone, does not touch existing JS
     ═══════════════════════════════════════════════════════════ -->
*/}

(function () {

  /* ── Case study data loaded from external data.js file ───────────
     CS_DATA object is now globally available from /src/data.js
  ──────────────────────────────────────────────────────────────── */

  /* ── SVG mockup generator (matches project cards) ──────────────── */
  function makeSVG(bg, ac, type) {
    var svgs = {
      dashboard: '<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="220" fill="' + bg + '"/><rect width="600" height="26" fill="' + ac + '" opacity="0.15"/><circle cx="14" cy="13" r="4" fill="#ef4444" opacity="0.7"/><circle cx="26" cy="13" r="4" fill="#f59e0b" opacity="0.7"/><circle cx="38" cy="13" r="4" fill="#22c55e" opacity="0.7"/><rect x="56" y="7" width="240" height="12" rx="6" fill="white" opacity="0.45"/><rect x="0" y="26" width="100" height="194" fill="' + ac + '" opacity="0.1"/><rect x="10" y="42" width="55" height="7" rx="3" fill="' + ac + '" opacity="0.5"/><rect x="114" y="34" width="110" height="48" rx="5" fill="white" opacity="0.65"/><rect x="238" y="34" width="110" height="48" rx="5" fill="white" opacity="0.65"/><rect x="362" y="34" width="110" height="48" rx="5" fill="white" opacity="0.65"/><rect x="476" y="34" width="112" height="48" rx="5" fill="white" opacity="0.65"/><rect x="124" y="44" width="40" height="5" rx="2" fill="' + ac + '" opacity="0.4"/><rect x="124" y="56" width="65" height="12" rx="3" fill="' + ac + '" opacity="0.6"/><rect x="248" y="44" width="40" height="5" rx="2" fill="' + ac + '" opacity="0.4"/><rect x="248" y="56" width="55" height="12" rx="3" fill="' + ac + '" opacity="0.6"/><rect x="372" y="44" width="40" height="5" rx="2" fill="' + ac + '" opacity="0.4"/><rect x="372" y="56" width="60" height="12" rx="3" fill="' + ac + '" opacity="0.6"/><rect x="486" y="44" width="40" height="5" rx="2" fill="' + ac + '" opacity="0.4"/><rect x="486" y="56" width="50" height="12" rx="3" fill="' + ac + '" opacity="0.6"/><rect x="114" y="94" width="310" height="120" rx="5" fill="white" opacity="0.5"/><rect x="140" y="128" width="18" height="72" rx="2" fill="' + ac + '" opacity="0.3"/><rect x="165" y="115" width="18" height="85" rx="2" fill="' + ac + '" opacity="0.5"/><rect x="190" y="106" width="18" height="94" rx="2" fill="' + ac + '" opacity="0.7"/><rect x="215" y="120" width="18" height="80" rx="2" fill="' + ac + '" opacity="0.4"/><rect x="240" y="112" width="18" height="88" rx="2" fill="' + ac + '" opacity="0.55"/><rect x="265" y="104" width="18" height="96" rx="2" fill="' + ac + '" opacity="0.75"/><rect x="436" y="94" width="152" height="120" rx="5" fill="white" opacity="0.5"/></svg>',
      hrm: '<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="220" fill="' + bg + '"/><rect width="600" height="26" fill="' + ac + '" opacity="0.18"/><circle cx="14" cy="13" r="4" fill="#ef4444" opacity="0.7"/><circle cx="26" cy="13" r="4" fill="#f59e0b" opacity="0.7"/><circle cx="38" cy="13" r="4" fill="#22c55e" opacity="0.7"/><rect x="14" y="36" width="120" height="44" rx="5" fill="white" opacity="0.6"/><rect x="148" y="36" width="120" height="44" rx="5" fill="white" opacity="0.6"/><rect x="282" y="36" width="120" height="44" rx="5" fill="white" opacity="0.6"/><rect x="416" y="36" width="170" height="44" rx="5" fill="white" opacity="0.6"/><rect x="24" y="46" width="45" height="5" rx="2" fill="' + ac + '" opacity="0.4"/><rect x="24" y="58" width="80" height="10" rx="2" fill="' + ac + '" opacity="0.55"/><rect x="158" y="46" width="45" height="5" rx="2" fill="' + ac + '" opacity="0.4"/><rect x="158" y="58" width="70" height="10" rx="2" fill="' + ac + '" opacity="0.55"/><rect x="14" y="92" width="370" height="120" rx="5" fill="white" opacity="0.5"/><circle cx="38" cy="120" r="8" fill="' + ac + '" opacity="0.25"/><rect x="52" y="116" width="90" height="5" rx="2" fill="' + ac + '" opacity="0.3"/><rect x="295" y="114" width="55" height="12" rx="6" fill="#22c55e" opacity="0.35"/><circle cx="38" cy="144" r="8" fill="' + ac + '" opacity="0.2"/><rect x="52" y="140" width="80" height="5" rx="2" fill="' + ac + '" opacity="0.25"/><rect x="295" y="138" width="55" height="12" rx="6" fill="#f59e0b" opacity="0.35"/><circle cx="38" cy="168" r="8" fill="' + ac + '" opacity="0.22"/><rect x="52" y="164" width="100" height="5" rx="2" fill="' + ac + '" opacity="0.28"/><rect x="295" y="162" width="55" height="12" rx="6" fill="#22c55e" opacity="0.35"/><circle cx="38" cy="192" r="8" fill="' + ac + '" opacity="0.2"/><rect x="52" y="188" width="75" height="5" rx="2" fill="' + ac + '" opacity="0.22"/><rect x="295" y="186" width="55" height="12" rx="6" fill="#22c55e" opacity="0.3"/><rect x="396" y="92" width="190" height="120" rx="5" fill="white" opacity="0.5"/></svg>',
      iot: '<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="220" fill="' + bg + '"/><line x1="0" y1="55" x2="600" y2="55" stroke="' + ac + '" stroke-width="0.5" opacity="0.12"/><line x1="0" y1="110" x2="600" y2="110" stroke="' + ac + '" stroke-width="0.5" opacity="0.12"/><line x1="0" y1="165" x2="600" y2="165" stroke="' + ac + '" stroke-width="0.5" opacity="0.12"/><line x1="150" y1="0" x2="150" y2="220" stroke="' + ac + '" stroke-width="0.5" opacity="0.1"/><line x1="300" y1="0" x2="300" y2="220" stroke="' + ac + '" stroke-width="0.5" opacity="0.1"/><line x1="450" y1="0" x2="450" y2="220" stroke="' + ac + '" stroke-width="0.5" opacity="0.1"/><circle cx="300" cy="110" r="60" fill="' + ac + '" opacity="0.07"/><circle cx="300" cy="110" r="38" fill="' + ac + '" opacity="0.11"/><circle cx="300" cy="110" r="20" fill="' + ac + '" opacity="0.22"/><path d="M268 68 Q300 40 332 68" stroke="' + ac + '" stroke-width="2" fill="none" opacity="0.4"/><path d="M250 50 Q300 12 350 50" stroke="' + ac + '" stroke-width="1.5" fill="none" opacity="0.22"/><line x1="300" y1="110" x2="76" y2="50" stroke="' + ac + '" stroke-width="1" opacity="0.28" stroke-dasharray="4,3"/><line x1="300" y1="110" x2="524" y2="50" stroke="' + ac + '" stroke-width="1" opacity="0.28" stroke-dasharray="4,3"/><line x1="300" y1="110" x2="76" y2="175" stroke="' + ac + '" stroke-width="1" opacity="0.28" stroke-dasharray="4,3"/><line x1="300" y1="110" x2="524" y2="175" stroke="' + ac + '" stroke-width="1" opacity="0.28" stroke-dasharray="4,3"/><rect x="42" y="28" width="68" height="44" rx="7" fill="white" opacity="0.72"/><rect x="490" y="28" width="68" height="44" rx="7" fill="white" opacity="0.72"/><rect x="42" y="152" width="68" height="44" rx="7" fill="white" opacity="0.72"/><rect x="490" y="152" width="68" height="44" rx="7" fill="white" opacity="0.72"/><rect x="288" y="100" width="24" height="20" rx="2" fill="white" opacity="0.85"/></svg>',
      mobile: '<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="220" fill="' + bg + '"/><circle cx="490" cy="50" r="70" fill="' + ac + '" opacity="0.06"/><rect x="155" y="10" width="100" height="200" rx="14" fill="white" opacity="0.82"/><rect x="161" y="16" width="88" height="188" rx="10" fill="' + bg + '" opacity="0.55"/><rect x="192" y="18" width="26" height="5" rx="2" fill="' + ac + '" opacity="0.28"/><rect x="161" y="24" width="88" height="28" fill="' + ac + '" opacity="0.22"/><rect x="168" y="31" width="45" height="7" rx="3" fill="' + ac + '" opacity="0.55"/><rect x="168" y="62" width="76" height="28" rx="5" fill="white" opacity="0.68"/><rect x="168" y="96" width="76" height="28" rx="5" fill="white" opacity="0.5"/><rect x="168" y="130" width="76" height="28" rx="5" fill="white" opacity="0.5"/><rect x="168" y="168" width="76" height="28" rx="5" fill="' + ac + '" opacity="0.22"/><rect x="345" y="18" width="100" height="200" rx="14" fill="white" opacity="0.82"/><rect x="351" y="24" width="88" height="188" rx="10" fill="' + bg + '" opacity="0.55"/><rect x="382" y="26" width="26" height="5" rx="2" fill="' + ac + '" opacity="0.28"/><rect x="351" y="34" width="88" height="28" fill="' + ac + '" opacity="0.18"/><rect x="358" y="42" width="45" height="7" rx="3" fill="' + ac + '" opacity="0.45"/><rect x="358" y="72" width="36" height="36" rx="6" fill="' + ac + '" opacity="0.28"/><rect x="399" y="72" width="36" height="36" rx="6" fill="' + ac + '" opacity="0.18"/><rect x="358" y="114" width="36" height="36" rx="6" fill="' + ac + '" opacity="0.18"/><rect x="399" y="114" width="36" height="36" rx="6" fill="' + ac + '" opacity="0.3"/><rect x="358" y="168" width="77" height="28" rx="5" fill="' + ac + '" opacity="0.25"/></svg>',
      inventory: '<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="220" fill="' + bg + '"/><rect width="600" height="26" fill="' + ac + '" opacity="0.15"/><circle cx="14" cy="13" r="4" fill="#ef4444" opacity="0.7"/><circle cx="26" cy="13" r="4" fill="#f59e0b" opacity="0.7"/><circle cx="38" cy="13" r="4" fill="#22c55e" opacity="0.7"/><rect x="14" y="34" width="240" height="26" rx="5" fill="white" opacity="0.58"/><rect x="268" y="34" width="90" height="26" rx="5" fill="' + ac + '" opacity="0.22"/><rect x="14" y="68" width="574" height="24" rx="3" fill="' + ac + '" opacity="0.1"/><rect x="14" y="96" width="574" height="22" rx="0" fill="white" opacity="0.38"/><rect x="14" y="118" width="574" height="22" rx="0" fill="white" opacity="0.25"/><rect x="14" y="140" width="574" height="22" rx="0" fill="white" opacity="0.38"/><rect x="14" y="162" width="574" height="22" rx="0" fill="white" opacity="0.25"/><rect x="14" y="184" width="574" height="22" rx="0" fill="white" opacity="0.38"/><rect x="400" y="100" width="55" height="13" rx="6" fill="#22c55e" opacity="0.3"/><rect x="400" y="122" width="55" height="13" rx="6" fill="#ef4444" opacity="0.2"/><rect x="400" y="144" width="55" height="13" rx="6" fill="#22c55e" opacity="0.3"/><rect x="400" y="166" width="55" height="13" rx="6" fill="#f59e0b" opacity="0.28"/><rect x="400" y="188" width="55" height="13" rx="6" fill="#22c55e" opacity="0.3"/></svg>',
      sales: '<svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="220" fill="' + bg + '"/><rect width="600" height="26" fill="' + ac + '" opacity="0.15"/><circle cx="14" cy="13" r="4" fill="#ef4444" opacity="0.7"/><circle cx="26" cy="13" r="4" fill="#f59e0b" opacity="0.7"/><circle cx="38" cy="13" r="4" fill="#22c55e" opacity="0.7"/><rect x="14" y="34" width="306" height="180" rx="5" fill="white" opacity="0.38"/><rect x="24" y="44" width="55" height="6" rx="3" fill="' + ac + '" opacity="0.4"/><rect x="24" y="60" width="84" height="60" rx="5" fill="white" opacity="0.68"/><rect x="116" y="60" width="84" height="60" rx="5" fill="white" opacity="0.68"/><rect x="208" y="60" width="84" height="60" rx="5" fill="white" opacity="0.68"/><rect x="36" y="68" width="60" height="32" rx="3" fill="' + ac + '" opacity="0.18"/><rect x="128" y="68" width="60" height="32" rx="3" fill="' + ac + '" opacity="0.14"/><rect x="220" y="68" width="60" height="32" rx="3" fill="' + ac + '" opacity="0.18"/><rect x="24" y="130" width="84" height="60" rx="5" fill="white" opacity="0.68"/><rect x="116" y="130" width="84" height="60" rx="5" fill="white" opacity="0.68"/><rect x="208" y="130" width="84" height="60" rx="5" fill="white" opacity="0.68"/><rect x="332" y="34" width="256" height="180" rx="5" fill="white" opacity="0.5"/><rect x="344" y="44" width="75" height="6" rx="3" fill="' + ac + '" opacity="0.45"/><rect x="344" y="68" width="130" height="5" rx="2" fill="' + ac + '" opacity="0.28"/><rect x="344" y="84" width="110" height="5" rx="2" fill="' + ac + '" opacity="0.22"/><rect x="344" y="100" width="120" height="5" rx="2" fill="' + ac + '" opacity="0.25"/><rect x="344" y="120" width="65" height="7" rx="3" fill="' + ac + '" opacity="0.38"/><rect x="460" y="118" width="76" height="12" rx="3" fill="' + ac + '" opacity="0.55"/><rect x="344" y="148" width="232" height="50" rx="7" fill="' + ac + '" opacity="0.28"/></svg>',
    };
    return svgs[type] || svgs['dashboard'];
  }

  /* ── Open modal ─────────────────────────────────────────────────── */
  window.openCaseStudy = function (id) {
    var data = CS_DATA[id];
    if (!data) return;

    /* header */
    document.getElementById('cs-modal-label').textContent = data.label;
    document.getElementById('cs-modal-title').textContent = data.title;

    /* svg preview */
    var svgWrap = document.getElementById('cs-preview-svg');
    svgWrap.innerHTML = makeSVG(data.svgBg, data.svgAc, data.svgType);
    svgWrap.style.background = data.svgBg;

    /* meta row */
    var metaRow = document.getElementById('cs-meta-row');
    metaRow.innerHTML = data.meta.map(function (m) {
      return '<div class="cs-meta-item"><div class="cs-meta-key">' + m.key + '</div><div class="cs-meta-val">' + m.val + '</div></div>';
    }).join('');

    /* body */
    var bullets = data.contributions.map(function (c) { return '<li>' + c + '</li>'; }).join('');
    var tags    = data.tags.map(function (t) { return '<span class="cs-tag">' + t + '</span>'; }).join('');

    document.getElementById('cs-body-content').innerHTML =
      '<h3 class="cs-section-title">Overview</h3>' +
      '<p class="cs-text">' + data.overview + '</p>' +
      '<h3 class="cs-section-title">The Challenge</h3>' +
      '<p class="cs-text">' + data.challenge + '</p>' +
      '<h3 class="cs-section-title">My Contributions</h3>' +
      '<ul class="cs-bullets">' + bullets + '</ul>' +
      '<h3 class="cs-section-title">Outcome</h3>' +
      '<p class="cs-text">' + data.outcome + '</p>' +
      '<h3 class="cs-section-title">Tech Stack</h3>' +
      '<div class="cs-tag-row">' + tags + '</div>';

    /* footer buttons */
    var footer = document.getElementById('cs-modal-footer');
    var liveBtnHtml = data.live
      ? '<a href="' + data.live + '" target="_blank" class="cs-btn cs-btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> View Live</a>'
      : '';
    footer.innerHTML =
      (data.github === 'javascript:void(0)' ? '' : `<a href="${data.github}" ${data.github === 'javascript:void(0)' ? 'onclick="return false;"' : 'target="_blank"'} class="cs-btn cs-btn-outline"><i class="fa-brands fa-github"></i> GitHub</a>`) 
      + liveBtnHtml + '<button class="cs-btn cs-btn-outline" onclick="closeCaseStudyBtn()" style="margin-left:auto;"><i class="fa-solid fa-xmark"></i> Close</button>';
      
    /* show */
    document.getElementById('cs-modal-backdrop').classList.add('cs-open');
    document.body.style.overflow = 'hidden';
  };

  /* ── Close modal ─────────────────────────────────────────────────── */
  window.closeCaseStudyBtn = function () {
    document.getElementById('cs-modal-backdrop').classList.remove('cs-open');
    document.body.style.overflow = '';
  };

  window.closeCaseStudy = function (e) {
    if (e.target === document.getElementById('cs-modal-backdrop')) {
      window.closeCaseStudyBtn();
    }
  };

  /* Escape key closes modal */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') window.closeCaseStudyBtn();
  });

})();

{/* PROJECT FILTER — standalone, does not touch existing JS */}

(function () {
  function initFilter() {
    var btns  = document.querySelectorAll('.proj-filter-btn');
    var cards = document.querySelectorAll('#proj-grid .project-card');

    /* Count badges */
    var counts = { all: 0, web: 0, mobile: 0, backend: 0 };
    cards.forEach(function (card) {
      var cats = (card.dataset.category || '').split(' ');
      counts.all++;
      cats.forEach(function (c) { if (counts[c] !== undefined) counts[c]++; });
    });
    Object.keys(counts).forEach(function (k) {
      var el = document.getElementById('pcount-' + k);
      if (el) el.textContent = counts[k];
    });

    function filter(cat) {
      /* Update active button */
      btns.forEach(function (b) {
        b.classList.toggle('proj-active', b.dataset.filter === cat);
      });

      /* Show / hide cards */
      cards.forEach(function (card) {
        var cats = (card.dataset.category || '').split(' ');
        var show = cat === 'all' || cats.indexOf(cat) !== -1;
        card.style.display = show ? '' : 'none';
      });
    }

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filter(btn.dataset.filter);
      });
    });

    /* Init counts on load */
    filter('all');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFilter);
  } else {
    initFilter();
  }
})();
