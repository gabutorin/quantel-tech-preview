
(function(){
  /* модалка «Отправить ТЗ» */
  var m=document.getElementById('lead-modal'), f=document.getElementById('lead-form'),
      body=document.getElementById('lead-body'), done=document.getElementById('lead-done');
  function open(t,c){ if(!m)return; if(t)document.getElementById('lead-title').textContent=t; if(c)document.getElementById('lead-ctx').textContent=c;
    if(f)f.reset(); var fl=document.getElementById('file-label'); if(fl)fl.textContent='Прикрепить ТЗ / спецификацию';
    if(body)body.hidden=false; if(done)done.hidden=true; m.hidden=false; document.documentElement.style.overflow='hidden'; }
  function close(){ if(m){m.hidden=true; document.documentElement.style.overflow='';} }
  document.addEventListener('click',function(e){
    var t=e.target.closest?e.target.closest('[data-lead]'):null;
    if(t){ e.preventDefault(); closeMenu(); open(t.getAttribute('data-lead-title'),t.getAttribute('data-lead-ctx')); return; }
    if(e.target.closest&&e.target.closest('[data-close]')) close();
  });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') close(); });
  var lf=document.getElementById('lead-file');
  if(lf)lf.addEventListener('change',function(){ var fl=document.getElementById('file-label'); if(fl)fl.textContent=(lf.files&&lf.files.length)?lf.files[0].name:'Прикрепить ТЗ / спецификацию'; });
  if(f)f.addEventListener('submit',function(e){ e.preventDefault(); if(!f.contact.value.trim()){f.contact.focus();return;}
    /* TODO: подключить реальную отправку (Formspree / e-mail / Telegram) */
    if(body)body.hidden=true; if(done)done.hidden=false; });

  /* бургер */
  var nl=document.getElementById('nav-links'), nb=document.getElementById('nav-burger');
  window.closeMenu=function(){ if(nl)nl.classList.remove('open'); if(nb)nb.setAttribute('aria-expanded','false'); };
  if(nb)nb.addEventListener('click',function(){ var o=nl.classList.toggle('open'); nb.setAttribute('aria-expanded',o?'true':'false'); });

  /* hero-canvas (только если есть #field) */
  var c=document.getElementById('field'); if(!c) return;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ctx=c.getContext('2d'), w,h,dpr,pts,raf, A='rgba(69,195,180,', V='rgba(69,195,180,';
  function size(){ dpr=Math.min(window.devicePixelRatio||1,2); w=c.clientWidth; h=c.clientHeight; c.width=w*dpr; c.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); }
  function init(){ size(); var n=Math.max(28,Math.min(70,Math.floor(w*h/36000))); pts=[]; for(var i=0;i<n;i++)pts.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,r:Math.random()*1.4+.5,v:Math.random()<.22}); }
  function frame(){ ctx.clearRect(0,0,w,h); for(var i=0;i<pts.length;i++){var a=pts[i]; a.x+=a.vx; a.y+=a.vy; if(a.x<0||a.x>w)a.vx*=-1; if(a.y<0||a.y>h)a.vy*=-1; for(var j=i+1;j<pts.length;j++){var b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d=dx*dx+dy*dy; if(d<15000){var o=(1-d/15000)*.08; ctx.strokeStyle=A+o+')'; ctx.lineWidth=1; ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}}
    for(var k=0;k<pts.length;k++){var p=pts[k]; ctx.beginPath(); ctx.fillStyle=(p.v?V:A)+'0.4)'; ctx.arc(p.x,p.y,p.r,0,6.2832); ctx.fill();} raf=requestAnimationFrame(frame); }
  function stat(){ ctx.clearRect(0,0,w,h); for(var k=0;k<pts.length;k++){var p=pts[k]; ctx.beginPath(); ctx.fillStyle=(p.v?V:A)+'0.35)'; ctx.arc(p.x,p.y,p.r,0,6.2832);ctx.fill();} }
  init(); if(reduce)stat(); else frame();
  var to; window.addEventListener('resize',function(){ clearTimeout(to); to=setTimeout(function(){ if(raf)cancelAnimationFrame(raf); init(); if(reduce)stat(); else frame(); },180); });
})();
