// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show2");
        } else {
            entry.target.classList.remove("show2");
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const hiddenElements2 = document.querySelectorAll('.hidden2');
hiddenElements2.forEach((el) => observer2.observe(el));

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

// Cookie management functions
function setCookie(name, value, days = 365) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; Secure`;
}

function getCookie(name) {
    const pattern = `(?:^|; )${encodeURIComponent(name)}=([^;]*)`;
    const match = document.cookie.match(new RegExp(pattern));
    return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name) {
    setCookie(name, '', -1);
}

// Cookie banner logic
function showBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.hidden = false;
}

function hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.hidden = true;
}

document.addEventListener('DOMContentLoaded', () => {
    if (!getCookie('cookieConsent')) showBanner();

    const acceptButton = document.getElementById('accept-cookies');
    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            setCookie('cookieConsent', 'yes');
            hideBanner();
        });
    }
});