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

/* ═══════════════════════════════════════════
   GLOBAL FUNCTIONS — must be at window scope
   because HTML onclick="" attributes call them
   ═══════════════════════════════════════════ */

/* Mobile menu (sidebar drawer) */
function toggleMenu(force) {
  var open = typeof force === 'boolean' ? force : !document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open', open);
  var btn = document.getElementById('menu-btn');
  if (btn) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Close' : 'Menu';
  }
}
function closeMenu() { toggleMenu(false); }

/* Dark mode */
function setDarkIcons(isDark) {
  document.querySelectorAll('.dark-icon').forEach(function (icon) {
    icon.classList.toggle('fa-moon', !isDark);
    icon.classList.toggle('fa-sun', isDark);
  });
}
function toggleDark() {
  var isDark = !document.body.classList.contains('dark');
  document.body.classList.toggle('dark', isDark);
  setDarkIcons(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/* Download CV */
function downloadCV(e) {
  e.preventDefault();
  // Simulate file download (replace with actual file URL in production)
  var link = document.createElement('a');
  link.href = '/src/files/Jezreel_D_Busico_DEVELOPER.pdf';
  link.download = 'Jezreel_D_Busico_DEVELOPER.pdf';
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
    setDarkIcons(true);
  }

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
  function highlightNav() {
    var current = sections.length ? sections[0].getAttribute('id') : '';
    sections.forEach(function (s) {
      if (window.pageYOffset >= s.offsetTop - 120) current = s.getAttribute('id');
    });
    /* The last section is too short to reach the top — highlight it at the bottom of the page */
    if (sections.length && window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1].getAttribute('id');
    }
    navLinks.forEach(function (link) {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

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

  /* ── Poster preview (matches the project tiles) ────────────────── */
  function makePoster(data) {
    function span(cls, text) {
      var el = document.createElement('span');
      el.className = cls;
      el.textContent = text;
      return el;
    }
    var num = (data.label.match(/^\d+/) || [''])[0];
    var poster = document.createElement('div');
    poster.className = 'poster';
    poster.style.setProperty('--tone', data.color);
    poster.setAttribute('aria-hidden', 'true');
    poster.appendChild(span('poster-num', num));
    poster.appendChild(span('poster-kicker', data.label.replace(' — ', ' / ')));
    var foot = span('poster-foot', '');
    foot.appendChild(span('poster-name', data.title));
    foot.appendChild(span('poster-facts', data.tags.slice(0, 3).join(' · ')));
    poster.appendChild(foot);
    return poster;
  }

  /* ── Open modal ─────────────────────────────────────────────────── */
  window.openCaseStudy = function (id) {
    var data = CS_DATA[id];
    if (!data) return;

    /* header */
    document.getElementById('cs-modal-label').textContent = data.label;
    document.getElementById('cs-modal-title').textContent = data.title;

    /* poster preview */
    var previewWrap = document.getElementById('cs-preview-svg');
    previewWrap.textContent = '';
    previewWrap.appendChild(makePoster(data));

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

/* API TERMINAL DEMO — types a request, then prints the response */

(function () {
  var DEMOS = {
    taskapi: {
      cmd: [
        [['t-prompt', '$ '], ['', 'curl -X POST /api/v1/tasks \\']],
        [['', '    -H "Authorization: Bearer •••" \\']],
        [['', '    -d \'{"title":"Ship v2","category_id":3}\'']],
      ],
      out: [
        [['t-status', 'HTTP/1.1 201 Created']],
        [['', '{ '], ['t-key', '"data"'], ['', ': { '], ['t-key', '"id"'], ['', ': '], ['t-num', '42'], ['', ', '], ['t-key', '"title"'], ['', ': '], ['t-str', '"Ship v2"'], ['', ',']],
        [['', '    '], ['t-key', '"is_completed"'], ['', ': '], ['t-num', 'false'], ['', ',']],
        [['', '    '], ['t-key', '"category"'], ['', ': { '], ['t-key', '"id"'], ['', ': '], ['t-num', '3'], ['', ', '], ['t-key', '"name"'], ['', ': '], ['t-str', '"Work"'], ['', ' } } }']],
      ],
    },
    ecommerceapi: {
      cmd: [
        [['t-prompt', '$ '], ['', 'curl -X POST /api/v1/orders \\']],
        [['', '    -H "Authorization: Bearer •••" \\']],
        [['', '    -d \'{"shipping_address":"Cebu City"}\'']],
      ],
      out: [
        [['t-status', 'HTTP/1.1 201 Created']],
        [['', '{ '], ['t-key', '"order"'], ['', ': { '], ['t-key', '"id"'], ['', ': '], ['t-num', '128'], ['', ', '], ['t-key', '"status"'], ['', ': '], ['t-str', '"pending"'], ['', ',']],
        [['', '    '], ['t-key', '"total"'], ['', ': '], ['t-str', '"2499.00"'], ['', ' } }']],
        [['t-dim', '# reverb ← order.status.updated: "processing"']],
      ],
    },
  };

  function seg(cls, text) {
    var span = document.createElement('span');
    if (cls) span.className = cls;
    span.textContent = text;
    return span;
  }

  function renderAll(body, demo) {
    body.textContent = '';
    demo.cmd.concat(demo.out).forEach(function (line) {
      line.forEach(function (s) { body.appendChild(seg(s[0], s[1])); });
      body.appendChild(document.createTextNode('\n'));
    });
    body.appendChild(seg('api-term-caret', ''));
  }

  function play(body, demo) {
    var caret = seg('api-term-caret', '');
    body.textContent = '';
    body.appendChild(caret);

    /* flatten the command into single characters */
    var chars = [];
    demo.cmd.forEach(function (line, li) {
      line.forEach(function (s) {
        s[1].split('').forEach(function (ch) { chars.push([s[0], ch]); });
      });
      if (li < demo.cmd.length - 1) chars.push(['', '\n']);
    });

    var i = 0;
    (function typeNext() {
      if (i < chars.length) {
        body.insertBefore(seg(chars[i][0], chars[i][1]), caret);
        i++;
        setTimeout(typeNext, chars[i - 1][1] === '\n' ? 180 : 22);
        return;
      }
      body.insertBefore(document.createTextNode('\n'), caret);
      var li = 0;
      (function printNext() {
        if (li >= demo.out.length) return;
        demo.out[li].forEach(function (s) { body.insertBefore(seg(s[0], s[1]), caret); });
        body.insertBefore(document.createTextNode('\n'), caret);
        li++;
        setTimeout(printNext, li === 1 ? 450 : 120);
      })();
    })();
  }

  function init() {
    var terms = document.querySelectorAll('.api-term');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    terms.forEach(function (term) {
      var demo = DEMOS[term.dataset.api];
      var body = term.querySelector('.api-term-body');
      if (!demo || !body) return;

      if (reduce || !('IntersectionObserver' in window)) {
        renderAll(body, demo);
        return;
      }
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          play(body, demo);
          io.disconnect();
        }
      }, { threshold: 0.5 });
      io.observe(term);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

/* FOOTER YEAR — always show the current year */
(function () {
  var el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* PROFILE CARD — top of the right rail on wide screens,
   moves into the sidebar when the rail is hidden */
(function () {
  var card = document.getElementById('profile-card');
  var railSlot = document.getElementById('profile-slot-rail');
  var sideSlot = document.getElementById('profile-slot-side');
  if (!card || !railSlot || !sideSlot || !window.matchMedia) return;

  var wide = window.matchMedia('(min-width: 1280px)');
  function place() {
    var target = wide.matches ? railSlot : sideSlot;
    if (card.parentNode !== target) target.appendChild(card);
  }
  place();
  if (wide.addEventListener) wide.addEventListener('change', place);
  else if (wide.addListener) wide.addListener(place);
})();
