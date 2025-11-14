document.addEventListener('DOMContentLoaded',function(){
  // create custom cursor element
  let customCursor = document.createElement('div');
  customCursor.id = 'custom-cursor';
  document.body.appendChild(customCursor);
  let cursorVisible = true;
  document.addEventListener('mousemove', function(e){
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
  });
  // scale cursor when hovering interactive elements
  function enterInteractive(){ customCursor.style.transform = 'translate(-50%,-50%) scale(1.9)'; customCursor.style.opacity = '0.95' }
  function leaveInteractive(){ customCursor.style.transform = 'translate(-50%,-50%) scale(1)'; customCursor.style.opacity = '1' }
  document.querySelectorAll('a, button, .work-card, .btn').forEach(el=>{
    el.addEventListener('mouseenter', enterInteractive);
    el.addEventListener('mouseleave', leaveInteractive);
  });
  // hide cursor when leaving window
  document.addEventListener('mouseout', function(e){
    if(!e.relatedTarget){ customCursor.style.opacity = '0' }
  });
  // set year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // work cards -> modal
  const modal = document.getElementById('case-modal');
  const modalContent = document.getElementById('case-content');
  const closeBtn = document.querySelector('.modal-close');

  function openModal(html){
    modalContent.innerHTML = html;
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    modalContent.innerHTML = '';
  }
  closeBtn && closeBtn.addEventListener('click',closeModal);
  modal && modal.addEventListener('click',function(e){if(e.target===modal) closeModal();});

  document.querySelectorAll('.work-card').forEach(card=>{
    card.addEventListener('click',function(){
      const id = this.dataset.case;
      // simple placeholder content per case
      const cases = {
        'case-1':'<h3>Direct-to-Consumer Apparel — Summary</h3><p>Improved creative strategy and scaled winning audiences. Results: 3.4x ROAS in 10 weeks. Tactics: UGC-style ads, lookalike scaling, and landing page A/B tests.</p>',
        'case-2':'<h3>Subscription Service — Summary</h3><p>Expanded audience mapping and reduced CAC by 28% through multi-ad set sequencing and creative variant testing.</p>',
        'case-3':'<h3>Lead Gen (B2B) — Summary</h3><p>Optimized lead capture funnel and scaled qualified leads 4x while keeping CPL within targets using LinkedIn + programmatic hybrid approach.</p>'
      };
      openModal(cases[id]||'<p>Case details coming soon.</p>');
    });
  });

  // mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if(menuToggle && nav){
    menuToggle.addEventListener('click',function(){
      nav.classList.toggle('open');
    });
  }

  // keyboard close (Esc) for modal and nav
  document.addEventListener('keydown',function(e){
    if(e.key === 'Escape'){
      if(modal && modal.getAttribute('aria-hidden') === 'false') closeModal();
      if(nav && nav.classList.contains('open')) nav.classList.remove('open');
    }
  });

  // contact form (Formspree) - progressive enhancement: use fetch so we can show status without leaving page
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if(form){
    form.addEventListener('submit',async function(e){
      e.preventDefault();
      status.textContent = 'Sending...';
      const data = new FormData(form);
      // For Netlify Forms, post to the current page if no explicit action is set
      const action = form.getAttribute('action') || window.location.pathname;
      try{
        const res = await fetch(action,{
          method:form.method||'POST',
          headers: { 'Accept': 'application/json' },
          body: data
        });
        if(res.ok){
          status.textContent = 'Thanks — I will reply within 48 hours.';
          form.reset();
        } else {
          const json = await res.json().catch(()=>null);
          status.textContent = json && json.error ? json.error : 'Submission failed. Please try again or email directly.';
        }
      }catch(err){
        status.textContent = 'Network error. Please try again later.';
        console.error(err);
      }
    });
  }
});
