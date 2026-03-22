function registerObserver(className, visibleClass) {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(visibleClass);
        // Optimization: Stop observing once the element is shown
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(className).forEach(el => observer.observe(el));
}

registerObserver(".hidden", "show");
registerObserver(".hidden2", "show2");

async function copyToClipboard(event, email) {
  event.preventDefault();
  try {
    await navigator.clipboard.writeText(email);
    alert('Email copied to clipboard: ' + email);
  } catch (err) {
    // Fallback for older browsers or insecure contexts
    const tempInput = document.createElement('input');
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Email copied to clipboard: ' + email);
  }
}

// ================= CUSTOM CURSOR =================
(function () {
  var dot = document.querySelector('.cursor-dot');
  var glow = document.querySelector('.cursor-glow');
  if (!dot || !glow) return;

  var mouseX = 0;
  var mouseY = 0;
  var glowX = 0;
  var glowY = 0;
  var cursorVisible = false;

  function onFirstMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glowX = mouseX;
    glowY = mouseY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';

    // Now show cursor and hide default
    dot.style.opacity = '1';
    glow.style.opacity = '1';
    document.documentElement.classList.add('elite-cursor');
    cursorVisible = true;

    // Switch to normal move handler
    document.removeEventListener('mousemove', onFirstMove);
    document.addEventListener('mousemove', onMove);
  }

  function onMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  }

  // Listen for first mouse movement
  document.addEventListener('mousemove', onFirstMove);

  // Smooth trailing glow via requestAnimationFrame
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // Hover detection for clickable elements
  var hoverTargets = 'a, button, [onclick], .expertise-header, input[type="submit"], .nav-scroll, .cv-button';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest && e.target.closest(hoverTargets)) {
      dot.classList.add('hovering');
      glow.classList.add('hovering');
    }
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest && e.target.closest(hoverTargets)) {
      dot.classList.remove('hovering');
      glow.classList.remove('hovering');
    }
  });
})();

// ================= 3D TILT CARDS =================
(function () {
  var MAX_TILT = 6;

  var cards = document.querySelectorAll('.news-div2, .expertise-div');
  if (!cards.length) return;

  for (var i = 0; i < cards.length; i++) {
    (function (card) {
      card.classList.add('tilt-card');

      // Create shine overlay
      var shine = document.createElement('div');
      shine.classList.add('card-shine');
      card.appendChild(shine);

      card.addEventListener('mousemove', function (e) {
        // Disable transition during movement for instant response
        card.style.transition = 'none';

        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;

        var tiltY = ((x - centerX) / centerX) * MAX_TILT;
        var tiltX = ((centerY - y) / centerY) * MAX_TILT;

        card.style.transform = 'perspective(800px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) scale3d(1.02, 1.02, 1.02)';
        card.style.boxShadow = (-tiltY * 1.5) + 'px ' + (tiltX * 1.5) + 'px 30px rgba(255, 255, 255, 0.08)';

        var percentX = (x / rect.width) * 100;
        var percentY = (y / rect.height) * 100;
        shine.style.setProperty('--shine-x', percentX + '%');
        shine.style.setProperty('--shine-y', percentY + '%');
      });

      card.addEventListener('mouseleave', function () {
        // Re-enable transition for smooth snap-back
        card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    })(cards[i]);
  }
})();
