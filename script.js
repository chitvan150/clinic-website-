// Global Section and Nav Elements Array Setup
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // Toggle Navigation Shadow styling when scroll metrics change
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);

  // Toggle visible conditional rules for Scroll-to-Top node
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 300);

  // Track scroll parameters to update Active Nav Links natively
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// IntersectionObserver Configuration handling Viewport Entry Fades
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { 
    if(e.isIntersecting) {
      e.target.classList.add('visible'); 
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Mobile Navigation Panel Controllers
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}
async function sendAI(){

let symptom=
document.getElementById(
"chatInput"
).value;


let response=
await fetch(
"http://127.0.0.1:5000/predict",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

symptom:symptom

})

});

let data=
await response.json();

document.getElementById(
"chatMessages"
).innerHTML+=

"<div><b>AI:</b>"
+data.reply+
"</div>";

}