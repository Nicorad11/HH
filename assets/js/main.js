/* Hunters House – små forbedringer. Siden virker også uden JavaScript. */
(function () {
  'use strict';

  /* Åbningstider i minutter efter midnat. 0 = søndag … 6 = lørdag. */
  var HOURS = {
    0: null,
    1: [540, 1050],
    2: [540, 1050],
    3: [540, 1050],
    4: [540, 1050],
    5: [540, 1110],
    6: [540, 840]
  };
  var DAYS = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];

  function fmt(min) {
    var h = Math.floor(min / 60);
    var m = min % 60;
    return h + '.' + (m < 10 ? '0' : '') + m;
  }

  /* Aktuel ugedag og tid i dansk tid – uanset hvor den besøgende befinder sig. */
  function nowInCopenhagen() {
    var parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Copenhagen',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(new Date());
    var get = function (type) {
      for (var i = 0; i < parts.length; i++) if (parts[i].type === type) return parts[i].value;
    };
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    return { day: day, minutes: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
  }

  function openingStatus(now) {
    var today = HOURS[now.day];
    if (today && now.minutes >= today[0] && now.minutes < today[1]) {
      return { open: true, text: 'Åbent nu · lukker kl. ' + fmt(today[1]) };
    }
    if (today && now.minutes < today[0]) {
      return { open: false, text: 'Lukket · åbner i dag kl. ' + fmt(today[0]) };
    }
    for (var i = 1; i <= 7; i++) {
      var d = (now.day + i) % 7;
      if (HOURS[d]) {
        var when = i === 1 ? 'i morgen' : DAYS[d];
        return { open: false, text: 'Lukket · åbner ' + when + ' kl. ' + fmt(HOURS[d][0]) };
      }
    }
  }

  function initStatus() {
    var el = document.querySelector('[data-status]');
    if (!el || !window.Intl) return;
    var now;
    try { now = nowInCopenhagen(); } catch (e) { return; }
    if (now.day < 0) return;

    var status = openingStatus(now);
    el.querySelector('[data-status-text]').textContent = status.text;
    el.classList.toggle('is-open', status.open);
    el.hidden = false;

    var rows = document.querySelectorAll('[data-days]');
    for (var i = 0; i < rows.length; i++) {
      var days = rows[i].getAttribute('data-days').split(' ');
      rows[i].classList.toggle('is-today', days.indexOf(String(now.day)) !== -1);
    }
  }

  function initNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.querySelector('[data-nav]');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    window.matchMedia('(min-width: 901px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  function initHeader() {
    var header = document.querySelector('[data-header]');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  initStatus();
  initNav();
  initHeader();
})();
