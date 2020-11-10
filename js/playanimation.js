let animationStart, animationEnd;

let playanimationStart = (dir) => {
  let a = dir == 1 ? document.querySelector("#nextpage") : document.querySelector("#prepage");
  
  a.setAttribute('animation-mixer',{clip: "*",loop: "repeat", repetitions: 1});
  animationStart(dir);
  a.removeAttribute('animation-mixer');
}

AFRAME.registerComponent('playanimation', {    

  init: function () {        
    let playanimation = document.querySelector("#nextpage");
    console.log(playanimation);

     
    let playanimationfunc = () => {      
      
      playanimation.setAttribute('animation-mixer',{clip: "*",loop: "repeat", repetitions: 1});    
      animationStart(1);
    };
     
    this.el.addEventListener('click', playanimationfunc);      
     
  }
});


AFRAME.registerComponent('playanimation2', {    

   init: function () {        

     let playanimation = document.querySelector("#prepage");
     console.log(playanimation);

     
      let playanimationfunc = () => {   
        
        playanimation.setAttribute('animation-mixer',{clip: "*",loop: "repeat", repetitions: 1});  
        animationStart(-1);
      };
     
       this.el.addEventListener('click', playanimationfunc);      
     
}});


AFRAME.registerComponent('clear', {    

  init: function () {        

    let playanimation = document.querySelector("#nextpage");
    console.log(playanimation);

    playanimation.addEventListener('animation-finished',function() {
      animationEnd();
      playanimation.removeAttribute('animation-mixer');
    });
    
}});

AFRAME.registerComponent('clear2', {    

 init: function () {        

   let playanimation = document.querySelector("#prepage");
   console.log(playanimation);

  playanimation.addEventListener('animation-finished',function() {
    animationEnd();
    playanimation.removeAttribute('animation-mixer');
  });
    
}});