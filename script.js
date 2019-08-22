let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let sizingVar = 1

let keys = {
    W: false,
    A: false,
    S: false,
    D: false
}

let plr = {
    x: 245,
    y: 245,
    health: 0
}

setInterval(function(){
    if(keys.W){
       plr.y-=2.5;
    }
    if(keys.S){
       plr.y+=2.5;
    }
    if(keys.A){
       plr.x-=2.5;
    }
    if(keys.D){
       plr.x+=2.5;
    }
    
    
    
    
    
    ctx.clearRect(0,0,500,500);
    
    ctx.fillStyle = "blue"
    ctx.fillRect(plr.x,plr.y,10,10)
},1000/60)

document.onkeydown = function(e){
    let res = String.fromCharCode(e.keyCode);
    if(res == "W"){
        keys.W = true;
    }
    if(res == "A"){
        keys.A = true;
    }
    if(res == "S"){
        keys.S = true;
    }
    if(res == "D"){
        keys.D = true;
    }
}

document.onkeyup = function(e){
    let res = String.fromCharCode(e.keyCode);
    if(res == "W"){
        keys.W = false;
    }
    if(res == "A"){
        keys.A = false;
    }
    if(res == "S"){
        keys.S = false;
    }
    if(res == "D"){
        keys.D = false;
    }
}

readLevel("file:///C:/Users/Luke%20Maxwell/Desktop/Bullet/levels/1/0.txt")


function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                return (allText);
            }
        }
    }
    rawFile.send(null);
}

function readLevel(filePath){
    let text = readTextFile(filePath);
    let lines = text.split('\n');
    alert(lines);
}