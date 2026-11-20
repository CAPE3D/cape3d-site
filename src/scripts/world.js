import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export function initWorld(){
 const canvas=document.querySelector('#world-canvas'),section=document.querySelector('.world-section');if(!canvas||!section)return;
 const chapters=[...document.querySelectorAll('.world-chapter')],counter=document.querySelector('#world-counter'),step=document.querySelector('#world-step'),bar=document.querySelector('#world-progress');
 let renderer;try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:innerWidth>700,powerPreference:'high-performance'});}catch(e){section.classList.add('world-fallback');return;}
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,innerWidth<700?1.35:1.8));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.18;
 const scene=new THREE.Scene();scene.fog=new THREE.Fog(0xf7f9f7,10,24);
 const camera=new THREE.PerspectiveCamera(34,1,.1,80);camera.position.set(0,.15,9.5);
 scene.add(new THREE.HemisphereLight(0xffffff,0xc7d3cc,2.2));const key=new THREE.DirectionalLight(0xffffff,3.3);key.position.set(-4,6,8);scene.add(key);const rim=new THREE.PointLight(0xb8d2c5,38,18);rim.position.set(4,2,-3);scene.add(rim);const fill=new THREE.PointLight(0xffffff,22,16);fill.position.set(-4,-3,4);scene.add(fill);
 const sculpture=new THREE.Group();scene.add(sculpture);sculpture.position.set(innerWidth<760?1.0:1.55,.05,0);
 const core=new THREE.Group();sculpture.add(core);
 const ceramic=new THREE.MeshPhysicalMaterial({color:0xe5ece8,metalness:.16,roughness:.19,clearcoat:1,clearcoatRoughness:.1});
 const glass=new THREE.MeshPhysicalMaterial({color:0xcbded5,metalness:.08,roughness:.12,transmission:.58,thickness:.6,transparent:true,opacity:.9,clearcoat:1});
 const graphite=new THREE.MeshStandardMaterial({color:0x6c7c73,metalness:.72,roughness:.25});
 const accent=new THREE.MeshStandardMaterial({color:0xa6bdb1,metalness:.65,roughness:.22});
 const shell=new THREE.Mesh(new THREE.IcosahedronGeometry(1.42,5),glass);core.add(shell);
 const inner=new THREE.Mesh(new THREE.TorusKnotGeometry(.78,.19,220,18,3,5),ceramic);inner.rotation.set(.6,.2,.2);core.add(inner);
 const ringA=new THREE.Mesh(new THREE.TorusGeometry(1.78,.018,8,180),accent);ringA.rotation.set(1.1,.25,.3);core.add(ringA);
 const ringB=new THREE.Mesh(new THREE.TorusGeometry(2.02,.012,8,180),graphite);ringB.rotation.set(.25,1.15,.2);core.add(ringB);
 const cage=new THREE.Group();core.add(cage);for(let i=0;i<18;i++){const a=i*Math.PI*2/18;const rod=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,2.85,6),accent);rod.position.set(Math.cos(a)*1.28,Math.sin(a)*1.28,0);rod.rotation.z=a+Math.PI/2;cage.add(rod);}
 const nodes=new THREE.Group();scene.add(nodes);const nodeGeo=new THREE.SphereGeometry(.022,8,8);const nodeMat=new THREE.MeshBasicMaterial({color:0x9db2a7});for(let i=0;i<180;i++){const p=new THREE.Mesh(nodeGeo,nodeMat);const r=2.8+Math.random()*3.5,a=Math.random()*Math.PI*2;p.position.set(Math.cos(a)*r,(Math.random()-.5)*6,Math.sin(a)*r);nodes.add(p);}
 const floor=new THREE.Mesh(new THREE.CircleGeometry(3.2,80),new THREE.MeshBasicMaterial({color:0xe8efea,transparent:true,opacity:.32}));floor.rotation.x=-Math.PI/2;floor.position.set(sculpture.position.x,-2.3,0);scene.add(floor);
 const clock=new THREE.Clock();let scroll=0;
 const resize=()=>{const w=canvas.clientWidth||innerWidth,h=canvas.clientHeight||innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};resize();window.addEventListener('resize',resize);
 const mm=gsap.matchMedia();mm.add('(prefers-reduced-motion: no-preference)',()=>{ScrollTrigger.create({trigger:section,start:'top top',end:'bottom bottom',scrub:1,onUpdate:self=>{scroll=self.progress;const n=Math.min(3,Math.floor(scroll*4));chapters.forEach((c,i)=>c.classList.toggle('is-active',i===n));const label=`0${n+1} — 04`;if(counter)counter.textContent=label;if(step)step.textContent=`0${n+1} / 04`;if(bar)bar.style.width=`${scroll*100}%`;}});});
 function render(){const t=clock.getElapsedTime();core.rotation.y=t*.11+scroll*1.6;core.rotation.x=Math.sin(t*.18)*.12+scroll*.28;inner.rotation.z=t*.08+scroll*2.1;ringA.rotation.z=-scroll*1.8;ringB.rotation.x=.4+scroll*2.3;sculpture.position.y=.05+Math.sin(t*.55)*.09;camera.position.x=Math.sin(scroll*Math.PI*2)*.24;camera.position.y=.15+Math.sin(scroll*Math.PI)*.3;camera.position.z=9.5-scroll*1.1;camera.lookAt(0,0,0);nodes.rotation.y=t*.012-scroll*.55;nodes.rotation.x=Math.sin(t*.1)*.04;renderer.render(scene,camera);requestAnimationFrame(render);}render();
}
