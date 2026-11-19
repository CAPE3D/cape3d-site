import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function initMotion(){
  document.documentElement.classList.add('js-ready');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){document.querySelectorAll('.reveal').forEach(el=>{el.style.opacity=1;el.style.transform='none';});return;}
  gsap.utils.toArray('.reveal').forEach(el=>gsap.fromTo(el,{opacity:0,y:28},{opacity:1,y:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));
  gsap.from('.hero-copy > *',{y:24,opacity:0,duration:1,stagger:.12,ease:'power3.out',delay:.18});
  gsap.from('.hero-stage',{opacity:0,scale:.96,duration:1.35,ease:'power2.out',delay:.25});
  gsap.to('.hero-grid',{yPercent:8,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  gsap.to('.hero-poster',{yPercent:7,scale:1.06,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  gsap.to('.stage-index',{y:80,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  gsap.utils.toArray('.expertise-visual img').forEach(img=>gsap.fromTo(img,{scale:1.08},{scale:1, ease:'none',scrollTrigger:{trigger:img,start:'top bottom',end:'bottom top',scrub:true}}));
}
