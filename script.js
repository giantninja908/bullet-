let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let levels;
let level;

let bulletDelay = 20;
let canShoot = true;

let layout;

let sizingVar = 1;


let mouse = {
  x: 0,
  y: 0
}
let keys = {
  W: false,
  A: false,
  S: false,
  D: false
};

let plr = {
  x: 245,
  y: 245,
  health: 0
}; 
function bullet(x,y){
  this.x = x;
  this.y = y;
  
}
let bullets = [];
let prev = plr;
readLevel("levels/1/layout.txt")

//level.layout.


setInterval(function () {

  if (window.innerWidth > window.innerHeight) {
    sizingVar = window.innerHeight / 500;
  } else {
    sizingVar = window.innerWidth / 500;
  }
  canvas.width = sizingVar * 500;
  canvas.height = sizingVar * 500;
  if (keys.W) {
    plr.y -= 2.5;
  }
  if (keys.S) {
    plr.y += 2.5;
  }
  if (keys.A) {
    plr.x -= 2.5;
  }
  if (keys.D) {
    plr.x += 2.5;
  }

  //console.log(prev.x,prev.y,plr.x,plr.y)

  if (plr.y > 500) {
    plr.y = 0;
    level = search(level.bottom, levels.layout);
    layout = levels.elements[level.element];
  }
  if (plr.y < -10) {
    plr.y = 490;
    level = search(level.top, levels.layout);
    layout = levels.elements[level.element];
  }


  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, 500 * sizingVar, 500 * sizingVar);
  ctx.fillStyle = "black"


  if (layout == null) {
    ctx.font = "30px Arial";
    //ctx.textAllign = "center"
    ctx.fillText("Loading", 220 * sizingVar, 230 * sizingVar);


  } else {



    ctx.fillStyle = "black"
    for (var i = 0; i < layout.length; i++) {
      for (var v = 0; v < layout[i].length; v++) {
        if (layout[v][i] == "#") {
          ctx.fillRect(i * 10 * sizingVar, v * 10 * sizingVar, 10 * sizingVar, 10 * sizingVar);


          //player collision
          if (plr.x < i * 10 + 10 &&
            plr.x + 10 > i * 10 &&
            plr.y < v * 10 + 10 &&
            plr.y + 10 > v * 10) {
            //console.log("COLLISION")
            //console.log(prev.x, prev.y, keys.W, keys.A, keys.D, keys.S)
            //console.log(plr.x, plr.y, i, v, plr.x-i*10, plr.y-v*10)
            if (keys.W) {
              plr.y += 2.5;

            }
            if (keys.S) {
              plr.y -= 2.5;

            }
            if (keys.A) {
              plr.x += 2.5;

            }
            if (keys.D) {
              plr.x -= 2.5;

            }
          }
        }
      }
    }
    ctx.fillStyle = "blue"
    ctx.save();
    ctx.translate((plr.x + 5) * sizingVar, (plr.y + 5) * sizingVar);

    ctx.rotate(-Math.atan2(plr.x*sizingVar - mouse.x, plr.y*sizingVar - mouse.y));
    ctx.fillRect(-5 * sizingVar, -5 * sizingVar, 10 * sizingVar, 10 * sizingVar)
    ctx.fillRect(3 * sizingVar, 0, -5 * sizingVar, -10 * sizingVar);
    ctx.restore();
  }

  prev.x = plr.x;
  prev.y = plr.y;

}, 1000 / 60);

document.onkeydown = function (e) {
  let res = String.fromCharCode(e.keyCode);
  if (res == "W") {
    keys.W = true;
  }
  if (res == "A") {
    keys.A = true;
  }
  if (res == "S") {
    keys.S = true;
  }
  if (res == "D") {
    keys.D = true;
  }
  if (res == " ") {
    console.log(level);
  }
}

document.onkeyup = function (e) {
  let res = String.fromCharCode(e.keyCode);
  if (res == "W") {
    keys.W = false;
  }
  if (res == "A") {
    keys.A = false;
  }
  if (res == "S") {
    keys.S = false;
  }
  if (res == "D") {
    keys.D = false;
  }
}

document.onmousedown = function(){

}




canvas.onmousemove = function (e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}
//readTextFile("levels/1/layout.txt")

function readTextFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}

function readLevel(filePath) {
  //level
  readTextFile(filePath, function (t) {
    levels = JSON.parse(t);

    console.log(levels);
    let l = search("start", levels.layout);
    let f = l.element;
    let x = levels.elements[f];
    layout = x;
    level = l;
    //document.getElementById("__TEST__").innerHTML = x;
  });
}

function search(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].Id === nameKey) {
      return myArray[i];
    }
  }
}