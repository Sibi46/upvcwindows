// Shasthik UPVC — shared site behaviour

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  // Highlight current page in nav
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });

  // Contact form: show success message on submit (FormSubmit redirects normally,
  // but we also handle inline fetch submission so the user stays on-page)
  var form = document.getElementById('enquiry-form');
  var successBox = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      })
        .then(function () {
          form.reset();
          if (successBox) successBox.style.display = 'block';
          form.style.display = 'none';
        })
        .catch(function () {
          // Fallback: if fetch fails (e.g. offline), submit normally
          form.submit();
        });
    });
  }

  // Hero image slider (home page)
  var track = document.getElementById('heroSliderTrack');
  if (track) {
    var slides = track.querySelectorAll('.hero-slide');
    var dots = document.querySelectorAll('.hero-dot');
    var index = 0;
    var timer;

    function goToSlide(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s) { s.classList.remove('active'); });
      slides[index].classList.add('active');
      dots.forEach(function (d) { d.classList.remove('active'); });
      if (dots[index]) dots[index].classList.add('active');
    }

    function startAutoplay() {
      timer = setInterval(function () { goToSlide(index + 1); }, 5000);
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        clearInterval(timer);
        goToSlide(parseInt(dot.dataset.index, 10));
        startAutoplay();
      });
    });

    startAutoplay();
  }
});
