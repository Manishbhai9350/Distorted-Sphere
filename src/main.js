import './style.css'
import * as THREE from 'three';
import devebVertex from './shaders/deveb.vertex.glsl'
import devebFrag from './shaders/deveb.frag.glsl'
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis()

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

const Canvas = document.querySelector('canvas')

Canvas.width = window.innerWidth
Canvas.height = window.innerHeight

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const Controls = new OrbitControls(camera,Canvas)
Controls.enableDamping = true 
Controls.dampingFactor = .1

// Create a renderer
const renderer = new THREE.WebGLRenderer({canvas:Canvas,antialias:true,alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio,2))

const uniforms = {
  uPI:{value:Math.PI},
  uTime:{value:0},
  uNoiseMul:{value:.4},
  uPosMul:{value:3},
  uSpeed:{value:.4},
  uScrollProg:{value:0}
}

// Gui.add(uniforms.uNoiseMul,'value').min(0).max(3).step(.001).name('Noise Mul')
// Gui.add(uniforms.uPosMul,'value').min(0).max(5).step(.001).name('Position Mul')
// Gui.add(uniforms.uSpeed,'value').min(0).max(3).step(.001).name('Speed')

// Create a sphere geometry
// const geometry = new THREE.IcosahedronGeometry(2,40);
// const geometry = new THREE.PlaneGeometry(3,3,50,50);

// Create a shader material
// const material = new THREE.ShaderMaterial({
//   vertexShader,
//   fragmentShader,
//   uniforms,
// });

// Create a mesh with the geometry and material
// const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

const uniforms2 = {
  uPI:{value:Math.PI},
  time:{value:0},
  uScrollProg:{value:0},
  displace:{value:.016},
  pointscale:{value:1},
  decay:{value:1.18},
  size:{value:innerWidth < 600 ? 1.45 : 1},
  complex:{value:.714},
  waves:{value:.6},
  eqcolor:{value:.714},
  rcolor:{value:.1},
  gcolor:{value:.13},
  bcolor:{value:.4},
  fragment:{value:false},
}

// Gui.add(uniforms2.displace,'value').min(0).max(3).step(.001).name('Displace')
// Gui.add(uniforms2.pointscale,'value').min(0).max(3).step(.001).name('Point Scale')
// Gui.add(uniforms2.decay,'value').min(0).max(3).step(.001).name('Decay')
// Gui.add(uniforms2.size,'value').min(0).max(3).step(.001).name('Size')
// Gui.add(uniforms2.complex,'value').min(0).max(3).step(.001).name('Complex')
// Gui.add(uniforms2.waves,'value').min(0).max(3).step(.001).name('Waves')
// Gui.add(uniforms2.eqcolor,'value').min(0).max(3).step(.001).name('EQ Color')
// Gui.add(uniforms2.rcolor,'value').min(0).max(3).step(.001).name('r Color')
// Gui.add(uniforms2.gcolor,'value').min(0).max(3).step(.001).name('g Color')
// Gui.add(uniforms2.bcolor,'value').min(0).max(3).step(.001).name('b Color')
// Gui.add(uniforms2.bcolor,'value').min(0).max(3).step(.001).name('b Color')
// Gui.add(uniforms2.uScrollProg,'value').min(0).max(1).step(.001).name('Scroll Prog')
// Gui.add(uniforms2.fragment,'value').name('Fragment')
// Gui.hide()



const sphere2 = new THREE.Mesh(
  new THREE.IcosahedronGeometry(2,30),
  new THREE.ShaderMaterial({
    vertexShader:devebVertex,
    fragmentShader,
    uniforms:uniforms2,
    opacity:0,
    transparent:true,
  })
)
sphere2.position.y = -2.5

scene.add(sphere2)

gsap.to(sphere2.position,{
  y:.7,
  ease:'power3',
  scrollTrigger:{
    trigger:".page2",
    start:'top bottom',
    end:'top -60%',
    scrub:1,
    onUpdate:({progress}) => {
      if(progress > .5){
        gsap.killTweensOf(uniforms2.uScrollProg)
        gsap.to(uniforms2.uScrollProg,{
          value:1,
          duration:2
        })
      } else {
        gsap.killTweensOf(uniforms2.uScrollProg)
        gsap.to(uniforms2.uScrollProg,{
          value:0,
          duration:2
        })
      }
    }
  }
})

document.querySelector('.magin-button').addEventListener('click',e => {
  const TL = gsap.timeline()
  gsap.killTweensOf(TL)
  TL.to(uniforms2.uScrollProg,{
    value:0 ,
    duration:1,
    eaes:'expo.inOut'
  })
  TL.to(uniforms2.uScrollProg,{
    value:1,
    duration:1.6
  })
})

document.querySelector('.code-button').addEventListener('mouseenter',e => {
  gsap.to(uniforms2.uScrollProg,{
    value:1,
    duration:1.6
  })
})
document.querySelector('.code-button').addEventListener('mouseleave',e => {
  gsap.to(uniforms2.uScrollProg,{
    value:0,
    duration:1.6
  })
})

const Clock = new THREE.Clock()

// Animation loop
function animate() {
  // uniforms.uTime.value = Clock.getElapsedTime()
  uniforms2.time.value = Clock.getElapsedTime() * .3
  Controls.update()
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate)

function Resize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if(innerWidth < 600) {
      uniforms2.size.value = 1.4
    }
}

// Handle window resize
window.addEventListener('resize', Resize)

window.addEventListener('resize', Resize);