export function initProgress(){
  const bar=document.querySelector('.scroll-progress span');
  if(!bar)return;
  let ticking=false;
  const update=()=>{
    const max=document.documentElement.scrollHeight-window.innerHeight;
    const value=max>0?window.scrollY/max:0;
    bar.style.transform=`scaleX(${Math.min(1,Math.max(0,value))})`;
    ticking=false;
  };
  const request=()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}};
  window.addEventListener('scroll',request,{passive:true});
  window.addEventListener('resize',request,{passive:true});
  update();
}
