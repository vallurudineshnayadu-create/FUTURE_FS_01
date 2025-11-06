// Elements
const year = document.getElementById('year');
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('section'));

// Footer year
year.textContent = new Date().getFullYear();

// Mobile menu toggle
menuBtn.addEventListener('click', () => mobileNav.classList.toggle('hidden'));

// Close mobile menu after nav click
navLinks.forEach(link => link.addEventListener('click', () => {
  if (!mobileNav.classList.contains('hidden')) mobileNav.classList.add('hidden');
}));

/* ---------- Typing Animation ---------- */
const typedEl = document.getElementById('typed');
const phrases = ['Frontend Developer', 'UI/UX Enthusiast', 'React Learner', 'Problem Solver'];
const typeSpeed = 70, eraseSpeed = 45, holdTime = 1100;
let phraseIndex = 0, charIndex = 0, typing = true;

function typeLoop(){
  const current = phrases[phraseIndex];
  if (typing){
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length){ typing = false; return setTimeout(typeLoop, holdTime); }
    return setTimeout(typeLoop, typeSpeed);
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0){ typing = true; phraseIndex = (phraseIndex + 1) % phrases.length; }
    return setTimeout(typeLoop, eraseSpeed);
  }
}
document.addEventListener('DOMContentLoaded', () => typeLoop());

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll('[data-animate]');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.transition = 'opacity .6s ease, transform .6s ease';
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'none';
    }
  });
},{ threshold: .18 });
revealEls.forEach(el=>{ el.style.opacity = 0; el.style.transform = 'translateY(16px)'; io.observe(el); });

/* ---------- Active nav highlight ---------- */
const so = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`a.nav-link[href="#${id}"]`);
    if(entry.isIntersecting){
      document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active'));
      if(link) link.classList.add('active');
      history.replaceState(null, "", `#${id}`);
    }
  });
},{ threshold: .55 });
sections.forEach(s=>so.observe(s));

/* ---------- Micro tilt on project cards ---------- */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced){
  const tilts = document.querySelectorAll('.tilt');
  tilts.forEach(card=>{
    card.addEventListener('mousemove', (e)=>{
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -4;   // rotate X
      const ry = ((x / rect.width) - 0.5) * 4;     // rotate Y
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
      card.style.boxShadow = '0 18px 40px rgba(15,23,42,.12)';
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '';
    });
  });
}
