/* =====================================================================
   AjoProof landing page
   - The hero card, stamps, SMS slip, receipt printer and rolling numbers
     run on plain JS + Web Animations, so they work the moment the page
     is parsed, even on a slow connection.
   - GSAP + ScrollTrigger + Lenis (self-hosted in /vendor) are loaded after
     first paint and only drive the pinned ledger in section 03 and smooth
     scrolling. If they fail to load, the page still works.
   ===================================================================== */
(function () {
  'use strict';

  /* -------------------------------------------------------------------
     CONFIG: change URLs here. Every link with data-url="key" reads its
     href from CONFIG.urls[key]. (The href in index.html is only the
     fallback for visitors without JavaScript; keep them in sync.)
     ------------------------------------------------------------------- */
  var CONFIG = {
    urls: {
      collectorSignup: '/app/signup?role=collector',
      saverSignup: '/app/signup?role=saver',
      lenders: 'mailto:lenders@ajoproof.ng?subject=Sample%20savings%20history%20report',
      login: '/app/login'
    },
    // The hero card. Change names here and in the card markup in index.html.
    card: {
      saver: 'Mama Bisi',
      collector: 'Alhaja Kudi, Kuto',
      number: '0412',
      daily: 1000,
      month: 'OCT',
      autoDays: 23,          // boxes stamped automatically on load; the rest are left for the visitor
      firstTime: '07:42'
    },
    // The "Try it" receipt printer.
    printer: {
      collector: 'ALHAJA KUDI, KUTO',
      phone: '0803 XXX XXXX',
      min: 100,
      max: 500000
    },
    vendor: {
      gsap: 'vendor/gsap.min.js',
      scrollTrigger: 'vendor/ScrollTrigger.min.js',
      lenis: 'vendor/lenis.min.js'
    }
  };

  var doc = document;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var STAMP_EASE = 'cubic-bezier(0.23, 1, 0.32, 1)'; // ≈ GSAP power4.out
  var canAnimate = !reduce && typeof Element.prototype.animate === 'function';

  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }
  function pad(n, w) { n = String(n); while (n.length < (w || 2)) n = '0' + n; return n; }
  function naira(n) {
    var parts = Math.round(n * 100) / 100;
    var whole = Math.floor(parts).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return whole + '.' + pad(Math.round((parts % 1) * 100));
  }
  function nowHM() { var d = new Date(); return pad(d.getHours()) + ':' + pad(d.getMinutes()); }
  var MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  function today() { var d = new Date(); return pad(d.getDate()) + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear(); }
  // Small seeded random so the stamps fall the same way on every visit.
  function seeded(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function onView(el, fn, threshold) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); fn(); } });
    }, { threshold: threshold || 0.4 });
    io.observe(el);
  }

  /* ----- URLs from CONFIG ----- */
  $$('[data-url]').forEach(function (a) {
    var u = CONFIG.urls[a.getAttribute('data-url')];
    if (u) a.setAttribute('href', u);
  });

  /* ===================================================================
     STAMP: scale 1.25 → 1, rotate into place, ink soaks in. 220ms.
     The surface it lands on shakes 2px.
     =================================================================== */
  function impact(el, o) {
    o = o || {};
    if (!canAnimate) return;
    var unit = o.unit || '%';
    var base = 'translate(' + (o.x || 0) + unit + ',' + (o.y || 0) + unit + ') rotate(' + (o.r || 0) + 'deg)';
    var op = o.o == null ? 1 : o.o;
    el.animate([
      { transform: base.replace(/rotate\(([-\d.]+)deg\)/, function (m, r) { return 'rotate(' + (+r + (o.spin || 9)) + 'deg)'; }) + ' scale(' + (o.scale || 1.25) + ')', opacity: 0 },
      { opacity: op * 0.72, offset: 0.28 },
      { transform: base + ' scale(1)', opacity: op * 0.8 }
    ], { duration: o.dur || 220, easing: STAMP_EASE });
    // ink spreads into the paper
    el.animate([
      { opacity: op * 0.8, transform: base + ' scale(1)' },
      { opacity: op, transform: base + ' scale(1.012)' }
    ], { duration: 420, delay: o.dur || 220, easing: 'ease-out', fill: 'forwards' });
  }

  function shake(el, amt) {
    if (!canAnimate || !el) return;
    var b = getComputedStyle(el).transform;
    b = b === 'none' ? '' : b + ' ';
    var a = amt || 2;
    el.animate([
      { transform: b + 'translate(0,0)' },
      { transform: b + 'translate(' + a + 'px,' + (a / 2) + 'px)' },
      { transform: b + 'translate(' + (-a) + 'px,' + (-a / 2) + 'px)' },
      { transform: b + 'translate(' + (a / 2) + 'px,0)' },
      { transform: b + 'translate(0,0)' }
    ], { duration: 170, delay: 120, easing: 'linear' });
  }

  function stampSVG(look) {
    return '<svg class="stamp" viewBox="0 0 100 100" aria-hidden="true" style="--r:' + look.r + 'deg;--x:' + look.x + '%;--y:' + look.y + '%;--o:' + look.o + '">' +
      '<g filter="url(#ink-s' + look.f + ')"><use href="#s-paid"/></g></svg>';
  }

  /* ===================================================================
     01 HERO: the living ajo card
     =================================================================== */
  function initHero() {
    var card = $('[data-card="hero"]');
    if (!card) return;
    var stage = card.closest('.hero__stage');
    var boxes = $$('button.box', card);
    var sms = $('#hero-sms');
    var smsTime = $('[data-sms="time"]', sms);
    var smsDate = $('[data-sms="date"]', sms);
    var smsBody = $('[data-sms="body"]', sms);
    var C = CONFIG.card;
    var paid = {};
    var count = 0;
    var autoDone = false;
    var rand = seeded(412);
    var looks = boxes.map(function () {
      return {
        r: Math.round(rand() * 36 - 18),
        x: +(rand() * 8 - 4).toFixed(1),
        y: +(rand() * 8 - 4).toFixed(1),
        f: 1 + Math.floor(rand() * 3),
        o: +(0.8 + rand() * 0.16).toFixed(2)
      };
    });

    function stampBox(i, animate, big) {
      var day = i + 1;
      if (paid[day]) return false;
      paid[day] = true; count++;
      var b = boxes[i], L = looks[i];
      b.classList.add('is-paid');
      b.setAttribute('aria-pressed', 'true');
      b.setAttribute('aria-label', 'Day ' + day + ', paid ₦' + naira(C.daily));
      b.insertAdjacentHTML('beforeend', stampSVG(L));
      if (animate) {
        impact(b.lastElementChild, { r: L.r, x: L.x, y: L.y, o: L.o, scale: big ? 1.4 : 1.25, dur: big ? 260 : 220 });
        shake(card, big ? 3 : 2);
      }
      return true;
    }

    function smsLines(day, time) {
      var total = count * C.daily;
      var lines = [
        C.saver + ', we received NGN' + naira(C.daily) + ' for DAY ' + day + '/31.',
        'Card total: NGN' + naira(total) + '.',
        'Collector: ' + C.collector + '.',
        'Ref AJP-' + C.number + '-' + pad(day, 3) + '.'
      ];
      if (count === 31) lines.push('Card complete. Your savings history is ready.');
      lines.push('Owo re wa lailewu.');
      smsTime.textContent = time;
      smsDate.textContent = pad(day) + ' ' + C.month;
      smsBody.innerHTML = '';
      lines.forEach(function (t, k) {
        var s = doc.createElement('span');
        s.className = 'ln';
        s.textContent = (k ? ' ' : '') + t;
        smsBody.appendChild(s);
      });
    }

    function revealLines() {
      var lns = $$('.ln', smsBody);
      lns.forEach(function (l, k) {
        if (!canAnimate) { l.classList.add('on'); return; }
        setTimeout(function () { l.classList.add('on'); }, 260 + k * 40); // 40ms per line
      });
    }

    function printSMS(day, time) {
      if (!canAnimate) { smsLines(day, time); sms.classList.add('is-out'); revealLines(); return; }
      if (sms.classList.contains('is-out')) {
        sms.classList.remove('is-out');
        setTimeout(function () { smsLines(day, time); sms.classList.add('is-out'); revealLines(); }, 300);
      } else {
        smsLines(day, time); sms.classList.add('is-out'); revealLines();
      }
    }

    function finishAuto() {
      autoDone = true;
      stage.classList.add('is-ready');
      printSMS(C.autoDays, C.firstTime);
    }

    // Visitor taps an empty box
    boxes.forEach(function (b, i) {
      b.addEventListener('click', function () {
        if (!stampBox(i, true, false)) return;
        if (autoDone) printSMS(i + 1, nowHM());
      });
    });

    if (!canAnimate) {
      for (var i = 0; i < C.autoDays; i++) stampBox(i, false);
      finishAuto();
      return;
    }

    // Fast, then slowing: each gap is longer than the last.
    function run() {
      var i = 0, N = C.autoDays;
      function next() {
        if (i >= N) { setTimeout(finishAuto, 260); return; }
        var k = i / (N - 1);
        stampBox(i, true, i === N - 1);
        i++;
        setTimeout(next, 55 + 560 * Math.pow(k, 3));
      }
      setTimeout(next, 500);
    }
    onView(card, run, 0.35);
  }

  /* ===================================================================
     02 PROBLEM: COLLECTOR NOT FOUND
     =================================================================== */
  function initProblem() {
    var fig = $('.problem__card');
    var stampEl = $('[data-bigstamp]', fig);
    if (!fig || !stampEl) return;
    onView(fig, function () {
      setTimeout(function () {
        stampEl.classList.add('is-stamped');
        impact(stampEl, { r: -9, unit: 'px', scale: 1.3, dur: 260, spin: 6 });
        shake($('.torn', fig), 3);
      }, 250);
    }, 0.45);
  }

  /* ===================================================================
     Rolling ledger digits
     =================================================================== */
  function initRolls() {
    $$('[data-roll]').forEach(function (el) {
      var value = el.textContent.trim();
      el.textContent = '';
      var sr = doc.createElement('span');
      sr.className = 'sr-only';
      sr.textContent = value;
      el.appendChild(sr);
      var digits = value.split('');
      var nd = digits.filter(function (c) { return /\d/.test(c); }).length;
      var di = 0;
      digits.forEach(function (ch) {
        var out;
        if (/\d/.test(ch)) {
          out = doc.createElement('span');
          out.className = 'roll__col';
          var strip = doc.createElement('span');
          strip.className = 'roll__strip';
          for (var k = 0; k < 20; k++) {
            var d = doc.createElement('span');
            d.textContent = k % 10;
            strip.appendChild(d);
          }
          // later digits roll further and longer, like a ledger total settling
          var turns = 10 + (+ch);
          strip.style.setProperty('--to', turns);
          strip.style.setProperty('--dur', (1.1 + (di / Math.max(1, nd - 1)) * 0.7).toFixed(2) + 's');
          out.appendChild(strip);
          di++;
        } else {
          out = doc.createElement('span');
          out.textContent = ch;
        }
        out.setAttribute('aria-hidden', 'true');
        el.appendChild(out);
      });
      if (!canAnimate) {
        $$('.roll__strip', el).forEach(function (s) { s.style.transform = 'translateY(' + (-s.style.getPropertyValue('--to')) + 'em)'; });
        return;
      }
      onView(el, function () { el.classList.add('is-rolled'); }, 0.6);
    });
  }

  /* ===================================================================
     03 HOW IT WORKS: stacked pages (small screens / reduced motion)
     =================================================================== */
  function initMiniStamps() {
    $$('[data-mini]').forEach(function (el) {
      onView(el, function () {
        setTimeout(function () {
          el.classList.add('is-stamped');
          impact(el, { r: -4, unit: 'px', scale: 1.3 });
        }, 200);
      }, 0.9);
    });
  }

  /* ===================================================================
     04 TRY IT: receipt printer
     =================================================================== */
  function initPrinter() {
    var form = $('#recorder');
    if (!form) return;
    var nameIn = $('#r-name'), amtIn = $('#r-amt');
    var nameErr = $('#r-name-err'), amtErr = $('#r-amt-err');
    var receipt = $('#receipt');
    var feed = receipt.parentNode;
    var led = $('[data-led]');
    var soundBtn = $('#sound');
    var P = CONFIG.printer;
    var day = 0, total = 0, busy = false;

    /* --- Sound: off by default. A soft tick per line, a thunk for the stamp. --- */
    var ctx = null, soundOn = false, noise = null;
    function ensureAudio() {
      if (ctx) return;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.05), ctx.sampleRate);
      var ch = noise.getChannelData(0);
      for (var i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
    }
    function tick() {
      if (!soundOn || !ctx) return;
      var t = ctx.currentTime;
      var src = ctx.createBufferSource(); src.buffer = noise;
      var f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2600 + Math.random() * 700; f.Q.value = 4;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.16, t + 0.002);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.028);
      src.connect(f); f.connect(g); g.connect(ctx.destination);
      src.start(t); src.stop(t + 0.04);
    }
    function thunk() {
      if (!soundOn || !ctx) return;
      var t = ctx.currentTime;
      var o = ctx.createOscillator(); o.type = 'sine';
      o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(55, t + 0.09);
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.32, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + 0.14);
    }
    soundBtn.addEventListener('click', function () {
      ensureAudio();
      if (ctx && ctx.state === 'suspended') ctx.resume();
      soundOn = !soundOn;
      soundBtn.setAttribute('aria-pressed', String(soundOn));
      $('[data-sound-state]', soundBtn).textContent = soundOn ? 'on' : 'off';
      if (soundOn) tick();
    });

    /* --- Validation --- */
    function setErr(input, el, msg) {
      if (msg) { el.textContent = msg; el.hidden = false; input.setAttribute('aria-invalid', 'true'); }
      else { el.textContent = ''; el.hidden = true; input.removeAttribute('aria-invalid'); }
    }
    function parseAmount(v) { return +(String(v).replace(/[₦,\s]/g, '')); }
    amtIn.addEventListener('blur', function () {
      var n = parseAmount(amtIn.value);
      if (n && isFinite(n)) amtIn.value = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
    amtIn.addEventListener('input', function () { amtIn.value = amtIn.value.replace(/[^\d,]/g, ''); });

    function validate() {
      var name = nameIn.value.replace(/\s+/g, ' ').trim();
      var raw = amtIn.value.trim();
      var amt = parseAmount(raw);
      var ok = true;
      if (!name) { setErr(nameIn, nameErr, "Enter the saver's name."); ok = false; }
      else setErr(nameIn, nameErr, '');
      if (!raw || !isFinite(amt) || amt <= 0) { setErr(amtIn, amtErr, 'Enter the amount in naira, like 1,000.'); ok = false; }
      else if (amt < P.min) { setErr(amtIn, amtErr, 'The smallest amount is ₦' + P.min.toLocaleString('en-NG') + '.'); ok = false; }
      else if (amt > P.max) { setErr(amtIn, amtErr, "That's more than ₦" + P.max.toLocaleString('en-NG') + '. Check the amount.'); ok = false; }
      else setErr(amtIn, amtErr, '');
      if (!ok) (nameIn.getAttribute('aria-invalid') ? nameIn : amtIn).focus();
      return ok ? { name: name, amt: Math.round(amt) } : null;
    }

    /* --- Printing --- */
    function line(cls, a, b) {
      var p = doc.createElement('p');
      if (cls) p.className = cls;
      if (b != null) {
        p.classList.add('r-row');
        var s1 = doc.createElement('span'); s1.textContent = a;
        var s2 = doc.createElement('span'); s2.textContent = b;
        p.appendChild(s1); p.appendChild(s2);
      } else if (a != null) {
        p.textContent = a;
      }
      return p;
    }

    function buildLines(v) {
      var d = new Date();
      return [
        line('r-c r-b', 'AJOPROOF'),
        line('r-c', 'Daily contribution receipt'),
        line('r-rule'),
        line('', 'DATE', today() + ' ' + nowHM()),
        line('', 'SAVER', v.name.toUpperCase().slice(0, 22)),
        line('', 'COLLECTOR', P.collector),
        line('r-rule'),
        line('r-big', 'PAID TODAY', '₦' + naira(v.amt)),
        line('', 'DAY', pad(day) + ' / 31'),
        line('', 'CARD TOTAL', '₦' + naira(total)),
        line('', 'STATUS', 'WITH COLLECTOR'),
        line('r-rule'),
        line('', 'SMS SENT TO', P.phone),
        line('', 'REF', 'AJP-' + CONFIG.card.number + '-' + pad(d.getDate()) + pad(d.getMonth() + 1) + '-' + pad(day, 3)),
        line('r-rule'),
        line('r-c r-yo', 'Owó rẹ wà láìléwu.'),
        line('r-c r-dim', 'Your money is safe.'),
        line('r-rule'),
        line('r-zone', "COLLECTOR'S STAMP")
      ];
    }

    function tearOff() {
      var old = receipt.cloneNode(true);
      old.removeAttribute('id'); old.removeAttribute('role'); old.removeAttribute('aria-live');
      old.setAttribute('aria-hidden', 'true');
      old.classList.add('is-gone');
      feed.appendChild(old);
      if (canAnimate) {
        var a = old.animate([
          { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
          { transform: 'translate(60px, 80px) rotate(9deg)', opacity: 0 }
        ], { duration: 480, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'forwards' });
        a.onfinish = function () { old.remove(); };
      } else { old.remove(); }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy) return;
      var v = validate();
      if (!v) return;
      busy = true;
      day = day % 31 + 1;
      if (day === 1) total = 0;
      total += v.amt;

      var hadPrint = receipt.hasAttribute('data-printed');
      if (hadPrint) tearOff();
      receipt.setAttribute('data-printed', '');
      receipt.setAttribute('aria-busy', 'true');
      var linesBox = $('[data-receipt-lines]', receipt);
      linesBox.innerHTML = '';
      var oldStamp = $('.receipt__stamp', receipt);
      if (oldStamp) oldStamp.remove();
      led.classList.add('is-on');

      var lines = buildLines(v);
      var step = canAnimate ? 40 : 0; // 40ms per line
      lines.forEach(function (p, k) {
        if (!step) { linesBox.appendChild(p); return; }
        setTimeout(function () { linesBox.appendChild(p); tick(); }, (hadPrint ? 200 : 0) + k * step);
      });
      setTimeout(function () {
        receipt.insertAdjacentHTML('beforeend',
          '<svg class="receipt__stamp" viewBox="0 0 100 100" aria-hidden="true"><g filter="url(#ink-s2)"><use href="#s-paid"/></g></svg>');
        var s = receipt.lastElementChild;
        s.style.transform = 'rotate(-14deg)';
        impact(s, { r: -14, unit: 'px', scale: 1.3 });
        thunk();
        shake(receipt, 2);
        led.classList.remove('is-on');
        receipt.removeAttribute('aria-busy');
        busy = false;
      }, (hadPrint ? 200 : 0) + lines.length * step + 140);
    });
  }

  /* ===================================================================
     GSAP + ScrollTrigger + Lenis (loaded after first paint)
     =================================================================== */
  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = doc.createElement('script');
      s.src = src; s.async = true;
      s.onload = res; s.onerror = rej;
      doc.head.appendChild(s);
    });
  }
  var motionLoading = null;
  function loadMotion() {
    if (motionLoading || reduce) return motionLoading;
    motionLoading = Promise.all([
      loadScript(CONFIG.vendor.gsap).then(function () { return loadScript(CONFIG.vendor.scrollTrigger); }),
      loadScript(CONFIG.vendor.lenis).catch(function () {})
    ]).then(initMotion).catch(function () { /* static layout stays; nothing breaks */ });
    return motionLoading;
  }

  function initMotion() {
    var gsap = window.gsap, ST = window.ScrollTrigger;
    if (!gsap || !ST) return;
    gsap.registerPlugin(ST);

    /* --- Smooth scroll --- */
    if (window.Lenis) {
      var lenis = new window.Lenis({ lerp: 0.12 });
      lenis.on('scroll', ST.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
      doc.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href^="#"]');
        if (!a || a.getAttribute('href').length < 2) return;
        var target = doc.getElementById(a.getAttribute('href').slice(1));
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: 0, duration: 1.1 });
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        history.pushState(null, '', a.getAttribute('href'));
      });
    }

    /* --- 03: the ledger book, pinned and scrubbed --- */
    var how = $('#how');
    if (!how) return;
    var leaves = $$('.leaf', how);
    var steps = $$('.how__steps li', how);
    var sWith = $('[data-status="with"]', how);
    var sSec = $('[data-status="secured"]', how);
    var statusBox = $('.status', how);
    var TURNS = [[0.14, 0.44], [0.58, 0.88]];
    var STAMP_WITH = 0.05, STAMP_SECURED = 0.5;

    function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

    var mm = gsap.matchMedia();
    mm.add('(min-width: 960px) and (min-height: 620px)', function () {
      how.classList.add('how--book');
      var withOn = false, secOn = false, cur = -1;

      function setStep(ix) {
        if (ix === cur) return;
        cur = ix;
        steps.forEach(function (li, k) {
          li.classList.toggle('is-active', k === ix);
          if (k === ix) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
        });
      }
      function toggleStamp(el, on, r) {
        if (on) { el.classList.add('is-stamped'); impact(el, { r: r, unit: 'px', scale: 1.25, spin: 6 }); }
        else { el.classList.remove('is-stamped'); }
      }
      function render(p) {
        TURNS.forEach(function (t, i) {
          var k = Math.min(1, Math.max(0, (p - t[0]) / (t[1] - t[0])));
          var e = easeInOut(k);
          var leaf = leaves[i];
          leaf.style.transform = 'perspective(2200px) rotateY(' + (-180 * e).toFixed(2) + 'deg)';
          leaf.style.zIndex = k > 0 ? 10 + i : 3 - i;
          leaf.style.setProperty('--shade', (Math.sin(e * Math.PI) * 0.16).toFixed(3));
        });
        var w = p >= STAMP_WITH, s = p >= STAMP_SECURED;
        if (w !== withOn) { withOn = w; toggleStamp(sWith, w, -3); }
        if (s !== secOn) { secOn = s; toggleStamp(sSec, s, 5); statusBox.classList.toggle('is-secured', s); }
        setStep(p < 0.29 ? 0 : p < 0.73 ? 1 : 2);
      }

      var st = ST.create({
        trigger: how,
        start: 'top top',
        end: '+=260%',
        pin: true,
        anticipatePin: 1,
        onUpdate: function (self) { render(self.progress); },
        onRefresh: function (self) { render(self.progress); }
      });
      render(st.progress || 0);

      return function () {
        how.classList.remove('how--book');
        leaves.forEach(function (l) { l.style.transform = ''; l.style.zIndex = ''; l.style.removeProperty('--shade'); });
        [sWith, sSec].forEach(function (el) { el.classList.remove('is-stamped'); });
        statusBox.classList.remove('is-secured');
      };
    });
    ST.refresh();
  }

  /* ----- Boot ----- */
  initHero();
  initProblem();
  initRolls();
  initMiniStamps();
  initPrinter();

  // GSAP/ScrollTrigger/Lenis only matter on wide screens (pinned ledger, wheel scrolling).
  // Phones skip the download entirely; if the window grows past 960px we load them then.
  var wideMQ = window.matchMedia('(min-width: 960px)');
  if (!reduce && !wideMQ.matches) {
    var onWide = function (e) { if (e.matches) loadMotion(); };
    if (wideMQ.addEventListener) wideMQ.addEventListener('change', onWide); else wideMQ.addListener(onWide);
  }
  if (!reduce && wideMQ.matches) {
    var kick = function () { loadMotion(); };
    ['scroll', 'pointerdown', 'keydown', 'touchstart'].forEach(function (ev) {
      window.addEventListener(ev, kick, { once: true, passive: true });
    });
    window.addEventListener('load', function () {
      if ('requestIdleCallback' in window) window.requestIdleCallback(kick, { timeout: 1500 });
      else setTimeout(kick, 600);
    });
  }
})();
