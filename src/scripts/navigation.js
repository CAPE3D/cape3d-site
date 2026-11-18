export function initNavigation(){
  const header=document.querySelector('.site-header');
  const toggle=document.querySelector('.menu-toggle');
  const close=()=>{header?.classList.remove('menu-open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Ouvrir le menu');};
  toggle?.addEventListener('click',()=>{
    const open=header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');
  });
  header?.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
}
