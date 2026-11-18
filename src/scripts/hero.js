import * as THREE from 'three';

export function initHero(){
  const canvas=document.querySelector('#hero-canvas');
  if(!canvas)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let renderer;
  try{
    renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
  }catch(error){
    canvas.hidden=true;
    console.warn('CAPE3D: WebGL indisponible, le visuel statique reste affiché.',error);
    return;
  }
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(0,0,8.5);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,window.innerWidth<760?1.25:1.7));
  renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
  scene.add(new THREE.AmbientLight(0x8b9298,1.45));
  const key=new THREE.DirectionalLight(0xf5d5b6,4.2);key.position.set(4,5,6);scene.add(key);
  const rim=new THREE.PointLight(0xc17f4e,34,15);rim.position.set(-4,1,-2);scene.add(rim);
  const fill=new THREE.PointLight(0x9aa8b7,16,12);fill.position.set(3,-3,4);scene.add(fill);
  const assembly=new THREE.Group();scene.add(assembly);
  const metal=new THREE.MeshStandardMaterial({color:0x7f8588,metalness:.9,roughness:.23});
  const darkMetal=new THREE.MeshStandardMaterial({color:0x252b2e,metalness:.9,roughness:.3});
  const copper=new THREE.MeshStandardMaterial({color:0xb77c50,metalness:.84,roughness:.25});
  const core=new THREE.Mesh(new THREE.CylinderGeometry(1.15,1.15,.48,96),darkMetal);core.rotation.x=Math.PI/2;assembly.add(core);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(1.22,.12,20,100),metal);ring.position.z=.28;assembly.add(ring);
  const innerRing=new THREE.Mesh(new THREE.TorusGeometry(.72,.055,16,80),copper);innerRing.position.z=.34;assembly.add(innerRing);
  const innerCore=new THREE.Mesh(new THREE.CylinderGeometry(.43,.43,.25,64),metal);innerCore.rotation.x=Math.PI/2;innerCore.position.z=.28;assembly.add(innerCore);
  const boltGeo=new THREE.CylinderGeometry(.095,.095,.09,12);
  for(let i=0;i<8;i++){const a=i*Math.PI/4,b=new THREE.Mesh(boltGeo,copper);b.position.set(Math.cos(a)*1.22,Math.sin(a)*1.22,.4);b.rotation.x=Math.PI/2;assembly.add(b);}
  for(let i=0;i<12;i++){const a=i*Math.PI/6,f=new THREE.Mesh(new THREE.BoxGeometry(.13,.42,.18),darkMetal);f.position.set(Math.cos(a)*.94,Math.sin(a)*.94,-.15);f.rotation.z=a;assembly.add(f);}
  const outer=new THREE.Mesh(new THREE.TorusGeometry(1.58,.018,8,120),copper);outer.position.z=-.45;assembly.add(outer);
  const orbitGroup=new THREE.Group();scene.add(orbitGroup);
  const orbit=new THREE.Mesh(new THREE.TorusGeometry(2.15,.006,6,120),new THREE.MeshBasicMaterial({color:0x98795f,transparent:true,opacity:.35}));orbit.rotation.x=1.15;orbit.rotation.y=.3;orbitGroup.add(orbit);
  const orbit2=new THREE.Mesh(new THREE.TorusGeometry(2.4,.004,6,120),new THREE.MeshBasicMaterial({color:0x6b7478,transparent:true,opacity:.28}));orbit2.rotation.y=1.2;orbitGroup.add(orbit2);
  const pointer={x:0,y:0,tx:0,ty:0};
  const onPointer=e=>{const r=canvas.getBoundingClientRect();pointer.tx=((e.clientX-r.left)/r.width-.5)*2;pointer.ty=((e.clientY-r.top)/r.height-.5)*2;};
  canvas.addEventListener('pointermove',onPointer,{passive:true});canvas.addEventListener('pointerleave',()=>{pointer.tx=0;pointer.ty=0;});
  const resize=()=>{const w=Math.max(1,canvas.clientWidth),h=Math.max(1,canvas.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
  const observer=new ResizeObserver(resize);observer.observe(canvas);resize();
  let raf=0;
  const render=()=>{
    pointer.x+=(pointer.tx-pointer.x)*.035;pointer.y+=(pointer.ty-pointer.y)*.035;
    if(!reduced){assembly.rotation.y+=.0022;assembly.rotation.x=.12+pointer.y*.16;assembly.rotation.z=pointer.x*.12;orbitGroup.rotation.z-=.0007;}
    assembly.rotation.y+=pointer.x*.001;camera.position.x=pointer.x*.16;camera.position.y=-pointer.y*.12;camera.lookAt(0,0,0);renderer.render(scene,camera);
    if(!document.hidden)raf=requestAnimationFrame(render);
  };
  render();
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else render();});
  window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);observer.disconnect();renderer.dispose();},{once:true});
}
