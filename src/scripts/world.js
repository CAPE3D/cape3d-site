import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initWorld(){
  const canvas=document.querySelector('#world-canvas');
  const section=document.querySelector('.world-section');
  if(!canvas||!section)return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let renderer;
  try{renderer=new THREE.WebGLRenderer({canvas,alpha:false,antialias:!matchMedia('(max-width: 760px)').matches,powerPreference:'high-performance'});}
  catch(e){section.classList.add('world-fallback');return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,innerWidth<760?1.25:1.8));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.42;
  const scene=new THREE.Scene();scene.background=new THREE.Color(0xf1f1ed);scene.fog=new THREE.FogExp2(0xf1f1ed,.028);
  const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(0,.2,9.2);
  scene.add(new THREE.HemisphereLight(0xffffff,0xb7bdc0,2.15));
  const key=new THREE.DirectionalLight(0xffffff,4.1);key.position.set(4,5,7);scene.add(key);
  const rim=new THREE.PointLight(0xc68a60,32,18);rim.position.set(-4,1,-2);scene.add(rim);
  const cool=new THREE.PointLight(0x9fb9c3,24,16);cool.position.set(4,-2,3);scene.add(cool);
  const stage=new THREE.Group();scene.add(stage);
  stage.position.x=innerWidth<760?.72:1.45;
  const assembly=new THREE.Group();stage.add(assembly);
  const steel=new THREE.MeshStandardMaterial({color:0xcbd0d0,metalness:.82,roughness:.24});
  const dark=new THREE.MeshStandardMaterial({color:0x566064,metalness:.78,roughness:.3});
  const copper=new THREE.MeshStandardMaterial({color:0xb77b51,metalness:.82,roughness:.25});
  const glass=new THREE.MeshPhysicalMaterial({color:0xdce8e8,metalness:.08,roughness:.1,transmission:.72,thickness:.45,transparent:true,opacity:.8,clearcoat:1});
  const hub=new THREE.Group();assembly.add(hub);
  const base=new THREE.Mesh(new THREE.CylinderGeometry(1.18,1.28,.48,96),dark);base.rotation.x=Math.PI/2;hub.add(base);
  const frontRing=new THREE.Mesh(new THREE.TorusGeometry(1.19,.105,24,120),steel);frontRing.position.z=.29;hub.add(frontRing);
  const innerRing=new THREE.Mesh(new THREE.TorusGeometry(.66,.055,18,100),copper);innerRing.position.z=.36;hub.add(innerRing);
  const bore=new THREE.Mesh(new THREE.CylinderGeometry(.49,.49,.58,80),dark);bore.rotation.x=Math.PI/2;bore.position.z=.08;hub.add(bore);
  const rearRing=new THREE.Mesh(new THREE.TorusGeometry(1.34,.035,12,120),copper);rearRing.position.z=-.28;hub.add(rearRing);
  const bladeGroup=new THREE.Group();hub.add(bladeGroup);
  // Twisted radial blades, built as curved precision surfaces.
  for(let i=0;i<13;i++){
    const a=i*Math.PI*2/13;
    const points=[];
    for(let j=0;j<=12;j++){
      const t=j/12,r=.43+t*.72,ang=a+.15+t*.42;
      points.push(new THREE.Vector3(Math.cos(ang)*r,Math.sin(ang)*r,.03+t*.13));
    }
    const curve=new THREE.CatmullRomCurve3(points);
    const blade=new THREE.Mesh(new THREE.TubeGeometry(curve,32,.055,8,false),steel);
    bladeGroup.add(blade);
    const fin=new THREE.Mesh(new THREE.BoxGeometry(.13,.55,.09),dark);
    fin.position.set(Math.cos(a)*.98,Math.sin(a)*.98,-.22);fin.rotation.z=a+.25;hub.add(fin);
  }
  const bolts=new THREE.Group();hub.add(bolts);
  const boltGeo=new THREE.CylinderGeometry(.07,.07,.075,16);
  for(let i=0;i<10;i++){const a=i*Math.PI*2/10;const b=new THREE.Mesh(boltGeo,copper);b.position.set(Math.cos(a)*1.18,Math.sin(a)*1.18,.39);b.rotation.x=Math.PI/2;bolts.add(b);}
  const casing=new THREE.Mesh(new THREE.TorusGeometry(1.58,.16,24,128),dark);casing.position.z=-.43;assembly.add(casing);
  const casingLip=new THREE.Mesh(new THREE.TorusGeometry(1.58,.025,10,128),steel);casingLip.position.z=-.27;assembly.add(casingLip);
  // Outer technical cage and exploded assembly components.
  const cage=new THREE.Group();assembly.add(cage);
  for(let i=0;i<24;i++){const a=i*Math.PI*2/24;const bar=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,2.9,6),copper);bar.position.set(Math.cos(a)*1.58,Math.sin(a)*1.58,0);bar.rotation.z=a+Math.PI/2;cage.add(bar);}
  const ghost=new THREE.Mesh(new THREE.TorusGeometry(1.82,.012,8,160),new THREE.MeshBasicMaterial({color:0x87989b,transparent:true,opacity:.34}));ghost.rotation.x=.9;stage.add(ghost);
  const scan=new THREE.Mesh(new THREE.TorusGeometry(2.1,.018,8,160),new THREE.MeshBasicMaterial({color:0xb77b51,transparent:true,opacity:.72}));scan.rotation.x=1.2;scan.rotation.y=.2;stage.add(scan);
  const particlesGeo=new THREE.BufferGeometry();const particleCount=420;const positions=new Float32Array(particleCount*3);
  for(let i=0;i<particleCount;i++){const r=2.2+Math.random()*4,a=Math.random()*Math.PI*2;positions[i*3]=Math.cos(a)*r;positions[i*3+1]=(Math.random()-.5)*6;positions[i*3+2]=Math.sin(a)*r;}
  particlesGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));
  const particles=new THREE.Points(particlesGeo,new THREE.PointsMaterial({color:0x9aa5a5,size:.018,transparent:true,opacity:.42}));scene.add(particles);
  // Lattice shell is a second material language, revealed mid-story.
  const lattice=new THREE.Group();stage.add(lattice);
  const nodes=[];const rings=9,segments=24;
  for(let y=0;y<rings;y++)for(let i=0;i<segments;i++){
    const v=y/(rings-1),theta=i/segments*Math.PI*2,r=1.72*Math.sin(v*Math.PI)**.65;
    nodes.push(new THREE.Vector3(Math.cos(theta)*r, (v-.5)*3.2, Math.sin(theta)*r));
  }
  const linePositions=[];
  for(let y=0;y<rings;y++)for(let i=0;i<segments;i++){
    const a=nodes[y*segments+i],b=nodes[y*segments+(i+1)%segments];linePositions.push(...a.toArray(),...b.toArray());
    if(y<rings-1){const c=nodes[(y+1)*segments+i],d=nodes[(y+1)*segments+(i+1)%segments];linePositions.push(...a.toArray(),...d.toArray(),...b.toArray(),...c.toArray());}
  }
  const latticeGeo=new THREE.BufferGeometry();latticeGeo.setAttribute('position',new THREE.Float32BufferAttribute(linePositions,3));
  const latticeLines=new THREE.LineSegments(latticeGeo,new THREE.LineBasicMaterial({color:0x829193,transparent:true,opacity:.0}));lattice.add(latticeLines);lattice.scale.setScalar(.001);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshBasicMaterial({color:0xf1f1ed}));floor.rotation.x=-Math.PI/2;floor.position.y=-3.25;scene.add(floor);
  const grid=new THREE.GridHelper(40,60,0xc0c7c5,0xdce0dc);grid.position.y=-3.23;grid.material.transparent=true;grid.material.opacity=.2;scene.add(grid);

  const originals=[];assembly.traverse(o=>{if(o.isObject3D&&o!==assembly)originals.push({o,p:o.position.clone(),r:o.rotation.clone(),s:o.scale.clone()});});
  const state={progress:0,mouseX:0,mouseY:0};
  const chapters=[...document.querySelectorAll('.world-chapter')];
  const counter=document.querySelector('#world-counter'),bar=document.querySelector('#world-progress');
  const updateChapter=p=>{const index=Math.min(3,Math.floor(p*4));chapters.forEach((el,i)=>el.classList.toggle('is-active',i===index));if(counter)counter.textContent=`0${index+1} — 04`;if(bar)bar.style.transform=`scaleX(${p})`;};
  const timeline=gsap.timeline({scrollTrigger:{trigger:section,start:'top top',end:'bottom bottom',scrub:reduce?false:1.15,onUpdate:self=>updateChapter(self.progress)}});
  timeline.to(stage.rotation,{y:Math.PI*.7,x:.22,duration:1,ease:'none'},0);
  timeline.to(camera.position,{x:1.0,y:.15,z:7.6,duration:1,ease:'none'},0);
  timeline.to(assembly.position,{x:-.35,duration:.2,ease:'none'},0);
  timeline.to(casing.position,{z:-1.25,duration:.24,ease:'power2.inOut'},.2);
  timeline.to(cage.position,{z:-1.7,duration:.24,ease:'power2.inOut'},.2);
  timeline.to(bladeGroup.rotation,{z:Math.PI*.7,duration:.3,ease:'none'},.22);
  timeline.to(ghost.material,{opacity:.8,duration:.2},.25);
  timeline.to(lattice.scale,{x:1,y:1,z:1,duration:.28,ease:'power3.out'},.43);
  timeline.to(latticeLines.material,{opacity:.9,duration:.2},.43);
  timeline.to(assembly.scale,{x:.76,y:.76,z:.76,duration:.25,ease:'power2.inOut'},.48);
  timeline.to(scan.rotation,{z:Math.PI*2,duration:.5,ease:'none'},.48);
  timeline.to(scan.material,{opacity:0,duration:.22},.72);
  timeline.to(lattice.scale,{x:.001,y:.001,z:.001,duration:.2,ease:'power2.in'},.72);
  timeline.to(latticeLines.material,{opacity:0,duration:.18},.72);
  timeline.to(casing.position,{z:-.43,duration:.16,ease:'power3.inOut'},.78);
  timeline.to(cage.position,{z:0,duration:.16,ease:'power3.inOut'},.78);
  timeline.to(bladeGroup.rotation,{z:0,duration:.16,ease:'power3.inOut'},.78);
  timeline.to(assembly.position,{x:0,duration:.16},.78);
  timeline.to(assembly.scale,{x:1,y:1,z:1,duration:.16},.78);
  // Closing frame returns to the opening pose: a visual loop, not an abrupt cut.
  timeline.to(stage.rotation,{y:Math.PI*2,x:0,duration:.22,ease:'power1.inOut'},.78);
  timeline.to(camera.position,{x:0,y:.2,z:9.2,duration:.22,ease:'power1.inOut'},.78);
  timeline.to(ghost.material,{opacity:.22,duration:.2},.8);

  const resize=()=>{const w=Math.max(1,canvas.clientWidth),h=Math.max(1,canvas.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();stage.position.x=innerWidth<760?.58:1.45;stage.scale.setScalar(innerWidth<760?.78:1);};
  const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
  const onPointer=e=>{state.mouseX=(e.clientX/innerWidth-.5)*2;state.mouseY=(e.clientY/innerHeight-.5)*2;};
  window.addEventListener('pointermove',onPointer,{passive:true});
  let raf=0;
  const render=()=>{if(!reduce){stage.rotation.y+=.00055;stage.rotation.x+=(state.mouseY*.055-stage.rotation.x)*.012;stage.rotation.z+=(state.mouseX*.035-stage.rotation.z)*.012;ghost.rotation.z-=.0007;particles.rotation.y+=.00015;}renderer.render(scene,camera);if(!document.hidden)raf=requestAnimationFrame(render);};
  render();
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else render();});
  window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);observer.disconnect();renderer.dispose();timeline.kill();},{once:true});
}
