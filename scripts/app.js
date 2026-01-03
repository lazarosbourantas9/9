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