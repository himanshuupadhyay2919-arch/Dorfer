/**
 * Dorfer Solutions — shared site behavior.
 * Vanilla JS, no dependencies. Loaded on every page.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initFooterYear();
    initHeaderScrollShadow();
    initMobileMenu();
    initOsPreference();
    initAccordions();
    initReviewFilters();
    initVideoCards();
    initEmergencyForm();
    initScrollReveal();
  });

  /* ---------------------------------------------------------------- */
  function initFooterYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------------- */
  function initHeaderScrollShadow() {
    var header = document.getElementById('site-header');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------- */
  function initMobileMenu() {
    var toggle = document.getElementById('mobile-menu-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;

    var close = function () {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    var open = function () {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.contains('is-open');
      isOpen ? close() : open();
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------------------------------------------------------------- */
  /* OS preference badges (Windows / Apple) — small personalization    */
  /* touch that persists across pages via localStorage.                */
  /* ---------------------------------------------------------------- */
  function initOsPreference() {
    var badges = document.querySelectorAll('[data-os-badge]');
    if (!badges.length) return;

    var STORAGE_KEY = 'dorfer_os_pref';
    var stored = null;
    try { stored = window.localStorage.getItem(STORAGE_KEY); } catch (e) { stored = null; }

    applyState(stored);

    badges.forEach(function (badge) {
      badge.addEventListener('click', function () {
        var os = badge.getAttribute('data-os-badge');
        var current = null;
        try { current = window.localStorage.getItem(STORAGE_KEY); } catch (e) { current = null; }
        var next = current === os ? null : os; // click again to clear
        try {
          if (next) window.localStorage.setItem(STORAGE_KEY, next);
          else window.localStorage.removeItem(STORAGE_KEY);
        } catch (e) { /* storage unavailable — continue without persistence */ }
        applyState(next);
      });
    });

    function applyState(os) {
      badges.forEach(function (b) {
        var match = b.getAttribute('data-os-badge') === os;
        b.setAttribute('aria-pressed', match ? 'true' : 'false');
      });
      document.querySelectorAll('[data-os-context]').forEach(function (el) {
        var copy = {
          windows: 'Showing fixes tailored for Windows PCs.',
          apple: 'Showing fixes tailored for Mac & Apple devices.'
        };
        if (os && copy[os]) {
          el.textContent = copy[os];
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      });
    }
  }

  /* ---------------------------------------------------------------- */
  function initAccordions() {
    var triggers = document.querySelectorAll('.accordion-trigger');
    if (!triggers.length) return;

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = trigger.closest('.accordion-item');
        var wasOpen = item.classList.contains('is-open');

        item.parentElement.querySelectorAll('.accordion-item').forEach(function (sibling) {
          sibling.classList.remove('is-open');
          var btn = sibling.querySelector('.accordion-trigger');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        if (!wasOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---------------------------------------------------------------- */
  function initReviewFilters() {
    var chips = document.querySelectorAll('[data-filter]');
    var cards = document.querySelectorAll('[data-category]');
    if (!chips.length || !cards.length) return;

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        chip.setAttribute('aria-pressed', 'true');
        var filter = chip.getAttribute('data-filter');

        cards.forEach(function (card) {
          var show = filter === 'all' || card.getAttribute('data-category') === filter;
          card.classList.toggle('hidden', !show);
        });
      });
    });
  }

  /* ---------------------------------------------------------------- */
  function initVideoCards() {
    var cards = document.querySelectorAll('.video-card');
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        card.classList.add('is-playing');
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.classList.add('is-playing');
        }
      });
    });
  }

  /* ---------------------------------------------------------------- */
  /* Emergency Help Desk form — no backend in this build, so we        */
  /* confirm receipt inline and keep the person oriented on next steps.*/
  /* ---------------------------------------------------------------- */
  function initEmergencyForm() {
    var form = document.getElementById('emergency-form');
    if (!form) return;
    var success = document.getElementById('emergency-form-success');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.classList.add('hidden');
      if (success) success.classList.remove('hidden');
    });
  }

  /* ---------------------------------------------------------------- */
  function initScrollReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(function (el) { observer.observe(el); });
  }
})();
