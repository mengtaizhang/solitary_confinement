AFRAME.registerComponent('cameraback', {    

   init: function () {        
      let rooms = document.querySelectorAll(".roomscene");
      let diarys = document.querySelectorAll(".diaryscene");
     
     let roomsfunc = () => {     
      rooms.forEach((room) => {      
      room.setAttribute("visible", true)});
      diarys.forEach((diary) => {      
      diary.setAttribute("visible", false)});     
      }
      
      this.el.addEventListener('click', roomsfunc);  
     
  }});



AFRAME.registerComponent('cameraswitch', {    

   init: function () {        
      let rooms = document.querySelectorAll(".roomscene");
      let diarys = document.querySelectorAll(".diaryscene");

      let roomsfunc = () => {     
      rooms.forEach((room) => {      
      room.setAttribute("visible", false)});
      diarys.forEach((diary) => {      
      diary.setAttribute("visible", true)});     
      }
      
      this.el.addEventListener('click', roomsfunc);  
     
      }});