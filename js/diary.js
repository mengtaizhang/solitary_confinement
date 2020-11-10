/* global AFRAME, THREE, THREEx, bootbox, diaryRef */
/* global animationStart, animationEnd*/
var image  = document.createElement('img')
image.src  = './pics/page.jpg';

const font = "Ink Free";//"Arial";
let first = false;
let pageNum = 0;
let diarySize = [900, 1350];
let lineH = diarySize[1]/27.;
let diaryL = 100;
let emptyL = 2;
let textSize =lineH*0.8;
let lineW =  Math.floor((diarySize[0]-diaryL*2) / (textSize*0.5));
var dynamicTextures = [];
var diaries = [];

image.addEventListener('load', function(){
  for (var i=0; i<4; i++) {
    dynamicTextures[i].drawImage(image, 0, 0);
    dynamicTextures[i].texture.needsUpdate  = true;
  }
})

for (var i=0; i<4; i++) {
    let dynamicTexture	= new THREEx.DynamicTexture(diarySize[0],diarySize[1]);
  	dynamicTexture.context.font	= textSize+"px "+font;
    dynamicTextures.push(dynamicTexture);
}


let changeText = (json, num=0) => {
  if (json == null || json == undefined) return;
  console.log(json);
  let text = json.text;
  if (text == null || text == undefined) return;
  console.log('change!', text);
  dynamicTextures[num].clear();
  dynamicTextures[num].drawImage(image, 0, 0);
  let chunks = splitText(text, lineW);
  for (let i=0; i<chunks.length; i++) {
    dynamicTextures[num].drawText(chunks[i], diaryL, lineH*(i*2+1+emptyL), 'black');
  }
  dynamicTextures[num].drawText('A1231', diarySize[0] / 2. + 100, diarySize[1]-2*lineH,'black');

  if (json.time != "") {
    //console.log(json.time.Format("yyyy-MM-dd"));
    dynamicTextures[num].drawText(new Date(json.time).toDateString(), diarySize[0] / 2. + 100, diarySize[1]-lineH,'black');
    
  }
  dynamicTextures[num].texture.needsUpdate  = true;
}

function splitText(str, size) {
  var chunks = [];
  var newstr=""; 
  var l=0; 
  var schar; 
  for(var i=0; schar=str.charAt(i); i++){ 
    newstr += schar; 
    l+=(schar.match(/[^\x00-\xff]/)!=null?2:1); 
    
    if(l>= size || schar == '\n'){ 
      chunks.push(newstr);
      newstr = "";
      l=0; 
    } 
  } 
  chunks.push(newstr);
  return chunks;
}

// 5->first page   [0]
// 2->second page  [1]
// 4->flip page == 2(start)  [2]
// 3->flip page back == new 5  [3]

function nextPage(dir) {
  
  pageNum += dir*2;
  if (pageNum+1 > diaries.length || pageNum < 0) {
    pageNum -= dir*2;
    return; 
  }
  console.log('dir', dir);
  if (dir > 0) {
    
    setTimeout(changeText('', 0), 1400);
    setTimeout(()=>{
      if (diaries.length > pageNum) changeText(diaries[pageNum], 0);
      else changeText('', 0);
    }, 1500);
    setTimeout(()=>{
      if (diaries.length > pageNum+1) changeText(diaries[pageNum+1], 2);
      else changeText('', 2);
    }, 200);
    //changeText('', 1);
    
  } else {
    setTimeout(changeText('', 2), 1400);
    setTimeout(()=>{
      if (diaries.length > pageNum+1) changeText(diaries[pageNum+1], 2);
      else changeText('', 2);
    }, 1500)
    //changeText('', 1);
    setTimeout(()=>{
      if (diaries.length > pageNum) changeText(diaries[pageNum], 0);
      else changeText('', 0);
    }, 200);
  }
  return true;
}


animationStart = function(dir) {
  console.log('animation start');
  nextPage(dir);

}

animationEnd = function() {
  console.log('animation end');
}



AFRAME.registerComponent('diary', {
  init: function () {
    console.log('init');
    this.el.addEventListener('model-loaded', () => this.update());
  },

  /**
   * Apply the material to the current entity.
   */
  update: function () {
    const mesh = this.el.getObject3D('mesh');
    console.log(mesh);
    if (mesh) {
      var i = 0;
      console.log('mesh get!');
      mesh.traverse(node => {
        if (node.isMesh) {
            if (i > 7) {
              return;
            }
            if (i == 5) {
              node.material = new THREE.MeshBasicMaterial({
                map : dynamicTextures[0].texture
              });
              console.log(node.material) 
              node.material.map.flipY = false;
            } else if (i == 2) {
              node.material = new THREE.MeshBasicMaterial({
                map : dynamicTextures[1].texture
              });
              console.log(node.material) 
              node.material.map.flipY = false;
            } else if (i == 4) {
              node.material = new THREE.MeshBasicMaterial({
                map : dynamicTextures[2].texture
              });
              console.log(node.material) 
              node.material.map.flipY = false;
            } else if (i == 3) {
              node.material = new THREE.MeshBasicMaterial({
                map : dynamicTextures[3].texture
              });
              console.log(node.material) 
              //node.material.side = THREE.DoubleSide;
              node.material.map.flipY = true;
              node.material.map.wrapS = THREE.RepeatWrapping;
              node.material.map.repeat.x = - 1;
              //node.material.map.rotation = Math.PI;
            }
            // if (i < 1) {
            //   i++;
            //   return;
            // }
            
            i++;
        }
      }); 
    }
    console.log("update", this.el);
  },
  
})


AFRAME.registerComponent('userinput', {

  init: function () {
      let promptInput = () => {
        var dialog = bootbox.dialog({
          title: '',
          message: "<textarea id='diarytextarea' class='form-control'></textarea>",
          size: 'large',
          buttons: {
              cancel: {
                  label: "Cancel",
                  className: 'btn-light'
              },
              ok: {
                  label: "Save",
                  className: 'btn-primary',
                  callback: function(){   
                    let text = $("#diarytextarea").val();
                      console.log('Custom OK clicked', text);
                      if (text != "")
                        diaryRef.push(toJson('', text));
                  }
              }
          }
        });  
      
      }
     
      this.el.addEventListener('click', promptInput);
  }
  
})

diaryRef.on('value', (snapshot)=>{
  console.log('on value!!!!', );
  let diariesVal = snapshot.val();
  diaries = [];
  Object.entries(diariesVal).forEach((e)=>{
    // if (e[1].constructor === " ".constructor) {
    //   let up = {};
    //   up[e[0]] = toJson('', e[1], '');
    //    diaryRef.update(up); 
    // }
    diaries.push(e[1]);
  })
  if (diaries.length % 2) {
    pageNum = diaries.length-2;
    changeText(diaries[pageNum], 0);
    changeText(diaries[pageNum+1], 2);
  } else {
    pageNum = diaries.length-1;
    changeText(diaries[pageNum], 0);  
    changeText("", 2);
  }

})

function toJson(name, text, time=Date.now()) {
  return {
    name: name,
    time: time,
    text: text
  }
  
}