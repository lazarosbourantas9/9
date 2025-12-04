function registerObserver(className, visibleClass) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle(visibleClass, entry.isIntersecting);
    });
  });
  document.querySelectorAll(className).forEach(el => observer.observe(el));
}

registerObserver(".hidden", "show");
registerObserver(".hidden2", "show2");


// Copy email to clipboard
function copyToClipboard(event, email) {
    event.preventDefault();

    const tempInput = document.createElement('input');
    tempInput.value = email;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert('Email copied to clipboard: ' + email);
}

