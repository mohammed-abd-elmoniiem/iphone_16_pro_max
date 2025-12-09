import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './style.css'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)


gsap.to('div.loading div',{
    duration:0.3,
    stagger:0.2,
    opacity:0,
    repeat:-1,yoyo:true
})



// const titleSplit = SplitText.create('#title',{type:'chars'
// })

// console.log(titleSplit)
// gsap.fromTo(titleSplit.chars,{
//     y:100,
//     opacity:1,

// },{
//     // y:'random(-100,100)',
//     // x:'random(-10,10)',
//     // scale:'random(0.2,3)',
//     repeat:5,
   
//     opacity:1,
//     rotateZ:360,
//     yoyo:true,
//     duration:2,
//     stagger:0.1,
//     delay:1,
//     color:'#ff55cc',
//     ease:'bounce',
//     onComplete:()=>{
//         titleSplit.revert()
//     }
// })


// const tl = gsap.timeline({
//     scrollTrigger:{
//         trigger:'#box',
//         // pin:true,
//         start:'bottom 50%',
//         end:'+=500',
//         scrub:true ,
//         snap:{
//         snapTo:'labels',
        
//     },
//     ease:'elastic'
   
//     }
   

   

// })

// tl.addLabel('start').to('#box',{scale:1.2,rotation:360,duration:1,translateY:200,ease:'bounce.out'})
// .addLabel('color').to('#box',{
//     backgroundColor:'#ff00ff',
//     x:200,
//     borderRadius:50,
//     duration:1
// }).to('#box',{
//     scale:2,
//     ease:'bounce.inOut',
//     duration:1
// })
// .to('#box',{
//     x:0,
//     y:0,
//     scale:0
// })