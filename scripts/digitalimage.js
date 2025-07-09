const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }else{
            entry.target.classList.remove("show");
        }
    })
})

const observer2 = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show2");
        }else{
            entry.target.classList.remove("show2");
        }
    })
})

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el)=> observer.observe(el));

const hiddenElements2 = document.querySelectorAll('.hidden2');
hiddenElements2.forEach((el)=> observer2.observe(el));


function copyToClipboard(event, email) {
    // Prevent the default behavior of opening the YouTube link
    event.preventDefault();

    // Create a temporary input to hold the email text
    const tempInput = document.createElement('input');
    tempInput.value = email; // Set the email to the input's value
    document.body.appendChild(tempInput); // Add input to the DOM
    tempInput.select(); // Select the content
    document.execCommand('copy'); // Copy the content to clipboard
    document.body.removeChild(tempInput); // Remove the input from the DOM

    // Optionally show a message
    alert('Email copied to clipboard: ' + email);
}



// Example: remember a dark‑mode preference
function applyTheme() {
    const theme = getCookie('theme') || 'light';
    document.documentElement.dataset.theme = theme;
  }
  
  function toggleTheme() {
    const newTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setCookie('theme', newTheme, 365);
    applyTheme();
  }
  
  document.addEventListener('DOMContentLoaded', applyTheme);
  