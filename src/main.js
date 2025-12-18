import './style.css'

import  * as THREE from 'three'
import { OrbitControls, FlyControls, EffectComposer, RenderPass, GTAOPass, GlitchPass } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

import * as CANNON from 'cannon-es'

import GUI from 'lil-gui';
import gsap from 'gsap';
// import { button } from 'motion/react-client';


// gui ++++++++++++++++++++++++++++++++++++++++++

const gui = new GUI()







const canvasElement = document.getElementById('canvas');

const canvasSize ={
    width:function(){return canvasElement.getBoundingClientRect().width},
    height:function(){return canvasElement.getBoundingClientRect().height},
    aspect:function(){return this.width()/this.height()},


}



// intialize scene ,camera , renderer++++++++++++++++++++++++++++++++++++++++++

const scene = new THREE.Scene()
// scene.fog = new THREE.Fog(0xffffff,0.1,10)
// scene.overrideMaterial = new THREE.MeshDepthMaterial()

 const frutm = 20
const camera = new  THREE.PerspectiveCamera(90,canvasSize.aspect(),0.1,2000)
// const camera = new  THREE.OrthographicCamera(-0.5*frutm , 0.5*frutm ,-0.5*frutm ,0.5*frutm,0.1,2000)

camera.position.set(0,0,6)
camera.lookAt(new THREE.Vector3(0,0,0))
scene.add(camera)


const renderer = new THREE.WebGLRenderer({antialias:true , canvas:canvasElement});
renderer.setSize(canvasSize.width(),canvasSize.height());
renderer.setPixelRatio ( window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.render(scene,camera)

const renderTarget = new THREE.WebGLRenderTarget(800,600,{
    samples:30
})

// renderer.shadowMap.enabled = true

const effectComposer = new EffectComposer(renderer,renderTarget);

const renderPass = new RenderPass(scene,camera);
effectComposer.addPass(renderPass);

const gtaPass = new GTAOPass(scene,camera);
// effectComposer.addPass(gtaPass)

// const glitch = new GlitchPass();

// effectComposer.addPass(glitch)


// --------------------------------------------------------------------------


// loader ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const glbLoader = new GLTFLoader()
const TXLoader = new THREE.TextureLoader()
// --------------------------------------------------------------------



// objects+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

glbLoader.load('/models/iphone_16_pro_max.glb',
  model=>{
  console.log(model)
  


  const tl = gsap.timeline();

tl.to('div.loading',{
    duration:1,
    opacity:0,
    onComplete:()=>{
      document.querySelector('div.loading').remove();
      scene.add(model.scene);
    }
  })
tl.to(model.scene.position,{
  duration:2,
  z:3
})

  
tl.to(model.scene.rotation,{
  duration:4,
  
  y:Math.PI*2,
  // z:5
})

tl.to(model.scene.rotation,{
  duration:4,

  z:Math.PI *0.5,
  // z:5
})


tl.to(model.scene.rotation,{
  duration:4,
  
  x:Math.PI*2,
  // z:5
})
tl.to(model.scene.position,{
  duration:2,
  z:5
})


}
,process=>{
  console.log('progress=>'+ String(Math.round((process.loaded/process.total)*100)).padStart(3,' ') +'%')
},
error=>{
  console.log(error)
})


// --------------------------------------------------------------------objects

// controls +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// const control = new OrbitControls(camera,canvasElement);

// control.update()


// -----------------------------------------------------------------controls


// gsap animation 




//  animation +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const clock = new THREE.Clock()
let eTime = 0
function animate(){
    // world.step(1/60,clock.getDelta(),3)
//  console.log(sphereBody.position)

    eTime= clock.getElapsedTime()

    
    // console.log(eTime , clock.getDelta());
// control.update(clock.getDelta())


    // camera.lookAt(new THREE.Vector3(0,0,0))

    // renderer.render(scene,camera);
    effectComposer.render(scene,camera)
    requestAnimationFrame(animate)
}
animate()

// --------------------------------------------------------------------animation


// lights +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const dirLight = new THREE.DirectionalLight(0xffffff,2)
dirLight.position.set(5,10,5);
dirLight.castShadow =true

const dirLight2 = new THREE.DirectionalLight(0xffffff,1.5)
dirLight2.position.set(-5,3,-5);
dirLight2.castShadow =true


const amLight = new THREE.AmbientLight(0xffffff,3)

const pointLight = new THREE.PointLight(0xffad14,3,6);
pointLight.castShadow=true;

const hemiLight = new THREE.HemisphereLight(0xffeeff,0x001111,2);


scene.add(dirLight ,dirLight2,hemiLight)


// --------------------------------------------------------------------------lights





// resize ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

window.addEventListener('resize',(eve)=>{
    canvasElement.style.cssText = 'width:100vw ;height:100vh';
      console.log(canvasSize.aspect())
    camera.aspect = canvasSize.aspect()
    renderer.setSize(canvasSize.width(),canvasSize.height())
    renderer.setPixelRatio = Math.min(window.devicePixelRatio , 2);
    camera.updateProjectionMatrix()
    renderer.render(scene,camera)
    
})



// --------------------------------------------------------------------------------