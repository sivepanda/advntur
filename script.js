var fps = 60;

window.onload = function () {
  canv = document.getElementById('game');
  ctx = canv.getContext('2d');

  window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
  window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

  document.addEventListener("keydown",keyPush);

  canv.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(evt);
  }, false);
  canv.addEventListener('mouseup', (evt) => {
    switch (evt.button) {
      case 0:
        click();
        break;
    }
  });

  p = new Player(coors.x, coors.y);

  updateInterval = setInterval(update, 1000/fps);

  setWalls();
  setNPCs();

  console.log("Setup Complete");

}

function freeze() {
  clearInterval(updateInterval);
}

function unFreeze() {
  updateInterval = setInterval(update, 1000/fps);
}

function setWalls() {
  for(var r = 0; r < world.length; r++){
    for(var c = 0; c < world[r].length; c++){
      if(world[r][c]==1){
        walls.push({x:c*100, y:r*100});
      }
    }
  }
}

npcs = [];

//TO BE EDITED ONLY BY THE LEVEL EDITOR
/*
world=[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1],[1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1],[1,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1],[1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1],[1,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],[1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

coors={x:220, y:220};

function setNPCs() { npcs = [new NPC(2020,220,"Lost Girl","Please Help Me! I'm Lost..."),new NPC(220,620,"Diego","Welcome to the Dungeon! There is a lost girl in there! Go Find Her!")]; }
*/world=[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

coors={x:220, y:220};

function setNPCs() { npcs = [new NPC(420,320,"Austin","Hello"),new NPC(520,220,"Jimmy","Pizza")]; }
//TO BE EDITED ONLY BY THE LEVEL EDITOR

walls = [];
cx = 0;
cy = 0;

ww = world[0].length*100;
for(var i = 1; i < world.length; i++){
  if(world[i].length*100>ww){
    ww=world[i].length*100;
  }
}
wh=world.length*100;

function update() {
  p.move();

  draw();
}

function draw() {
  //BACKGROUND
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.height, canv.width);

  //WALLS
  ctx.fillStyle = "gray";
  for(var i = 0; i < walls.length; i++){
    ctx.fillRect(walls[i].x-cx, walls[i].y-cy, 100, 100);
  }

  //PLAYER
  ctx.fillStyle = "red";
  ctx.fillRect(p.x-cx, p.y-cy, p.width, p.height);
  ctx.fillStyle = "black";
  ctx.fillRect(p.x-cx+10, p.y-cy+10, 10, 10);
  ctx.fillRect(p.x-cx+p.width-20, p.y-cy+10, 10, 10);
  ctx.fillRect(p.x-cx+10, p.y-cy+p.height-18, 40, 8);
  ctx.fillRect(p.x-cx+10, p.y-cy+p.height-25, 10, 10);
  ctx.fillRect(p.x-cx+p.width-20, p.y-cy+p.height-25, 10, 10);

  //NPCS
  for(var i = 0; i < npcs.length; i++){
    ctx.fillStyle=npcs[i].color;
    ctx.fillRect(npcs[i].x-cx, npcs[i].y-cy, 60, 60);

    ctx.font = 'bold 60px calibri';
    ctx.textAlign = "center";
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    if(!npcs[i].spoken){
      ctx.fillText("!", npcs[i].x-cx+npcs[i].width/2, npcs[i].y-cy+npcs[i].height/2+20);
      ctx.strokeText("!", npcs[i].x-cx+npcs[i].width/2, npcs[i].y-cy+npcs[i].height/2+20);
    }
  }

  //HUD
}

class Player {
  x=0;
  y=0;
  width=60;
  height=60;
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  speed = 4;

  move(){
    if (Key.isDown(Key.SHIFT)) this.speed=6;
    if (Key.isDown(Key.UP)||Key.isDown(Key.W)) this.forward();
    if (Key.isDown(Key.LEFT)||Key.isDown(Key.A)) this.left();
    if (Key.isDown(Key.DOWN)||Key.isDown(Key.S)) this.back();
    if (Key.isDown(Key.RIGHT)||Key.isDown(Key.D)) this.right();

    cx=this.x+this.width/2-canv.width/2;
    cy=this.y+this.width/2-canv.width/2;

    if(cx<0){
      cx=0;
    }
    if(cy<0){
      cy=0;
    }
    if(cx>ww-canv.width){
      cx=ww-canv.width;
    }
    if(cy>wh-canv.height){
      cy=wh-canv.height;
    }

    this.speed=4;

    document.getElementById('playerloc').innerHTML = this.x + " " + this.y;
  }

  forward(){
    this.y-=this.speed;
    while(this.colliding()){
      this.y+=1;
    }
    if(this.touchingNPC()){
      this.y+=this.speed;
    }
  }
  left(){
    this.x-=this.speed;
    while(this.colliding()){
      this.x+=1;
    }
    if(this.touchingNPC()){
      this.x+=this.speed;
    }
  }
  back(){
    this.y+=this.speed;
    while(this.colliding()){
      this.y-=1;
    }
    if(this.touchingNPC()){
      this.y-=this.speed;
    }
  }
  right(){
    this.x+=this.speed;
    while(this.colliding()){
      this.x-=1;
    }
    if(this.touchingNPC()){
      this.x-=this.speed;
    }
  }

  colliding() {
    for(var i = 0; i < walls.length; i++){
      if(
        this.x+this.width>walls[i].x&&
        this.x<walls[i].x+100&&
        this.y+this.height>walls[i].y&&
        this.y<walls[i].y+100
      ){
        return true;
      }
    }
    return false;
  }

  touchingNPC() {
    for(var i = 0; i < npcs.length; i++){
      if(
        this.x+this.width>npcs[i].x&&
        this.x<npcs[i].x+npcs[i].width&&
        this.y+this.height>npcs[i].y&&
        this.y<npcs[i].y+npcs[i].height&&
        !npcs[i].spoken
      ){
        npcs[i].spoken=true;
        alert(npcs[i].name + ": " + npcs[i].message);
        clearEvents();
        return true;
      }
    }
    return false;
  }
}

class NPC {
  x=0;
  y=0;
  height=60;
  width=60;

  color = "brown";

  name = "";
  message = "";
  spoken = false;

  constructor(x,y,name, mess){
    this.x=x;
    this.y=y;
    this.name=name;
    this.message=mess;
  }
}

//CONTROLS ------------------------------------

//held keys (movement)
var Key = {
  _pressed: {},

  LEFT: 37,
  A: 65,
  UP: 38,
  W: 87,
  RIGHT: 39,
  D: 68,
  DOWN: 40,
  S: 83,
  SHIFT: 16,

  isDown: function (keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function (event) {
    this._pressed[event.keyCode] = true;
    keycodes.push(event.keyCode);
  },

  onKeyup: function (event) {
    delete this._pressed[event.keyCode];
    keycodes.splice(keycodes.indexOf(event.keyCode), 1);
  }
};

keycodes = [];

function clearEvents() {
  if(keycodes.length>0){
    Key.onKeyup({keyCode: keycodes[0]});
  }
  if(keycodes.length>0){
    clearEvents();
  }

  keycodes = [];
}

//pressed keys
function keyPush(evt){
  switch(evt.keyCode) {
    case 32: //SPACEBAR
      break;
  }
}

//mouse click
function getMousePos(evt) {
  var rect = canv.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function click() {
  var mouseX = mousePos.x;
  var mouseY = mousePos.y;
}