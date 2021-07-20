var trex, trex_running, trex_collided, trex2;
var ground, invisibleGround, groundImage;
var cloud, CLOUD, NUBES;
var O1,o1;
var O2, o2;
var O3, o3;
var cactus,CACTUS;
var etapa = "start"
var music;
var GATITOS, gatito;
var Over, OVER;
var Restart, reStart;
var C = 0;
var Puntaje_Final = 0;
var x = 0, y = 0, cnvas;

function preload() {
  trex_running = loadAnimation("trex1.png","trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png")
  cloud = loadImage ("cloud.png");
  O1 = loadImage ("obstacle2.png");
  O2 = loadImage ("obstacle3.png");
 music = loadSound ("Lalalatte.mp3");
  GATITOS = loadImage ("gatito.png");
  Over = loadImage ("game.png");
  Restart = loadImage ("restart.png");
  
}

function setup() {
  cnvas=createCanvas(windowWidth, windowHeight);
  cnvas.mousePressed(Kittys);
 

  //Crear Sprite con piso invisible
  invisibleGround = createSprite (50,height/2,50,10)
  invisibleGround.visible = false;
  
//crea el sprite del Trex
trex = createSprite(50,height/2,20,50);
trex.addAnimation("running", trex_running);
trex.scale = 0.5;
  trex.setCollider("rectangle",0,0,80,80);
  trex.debug = true;
  
  
  trex2 = createSprite (50,height/2,20,50);
  trex2.addImage ("collided", trex_collided);
  trex2.scale = 0.5;
  trex2.visible = false;
  
//crea el sprite del suelo
ground = createSprite(width/2,height/2,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
ground.velocityX = -4;

  OVER = createSprite (width/2,height/4)
  OVER.addImage("gameover", Over);
  OVER.scale = 0.3;
  OVER.visible = false;
  
  reStart = createSprite (width/2, height/4+50);
  reStart.addImage ("start", Restart)
  reStart.scale = 0.05;
  reStart.visible = false;
  
  CACTUS = new Group();
  NUBES = new Group ();
  
 // music.loop();
}

function draw() {
background("white");
  
  
  if (etapa == "start"){
Clouds();
  Ob();
    Puntaje();

  
//salta cuando se presiona la barra espaciadora
    if (trex.collide(invisibleGround)){
if (touches.length>0 ||keyDown("space")) {
  trex.velocityY = -14;
 touches = [];
}
    }   
// Gravedad de TREX
trex.velocityY = trex.velocityY + 0.8

if (ground.x < 0) {
  ground.x = ground.width / 2;
}
    if (CACTUS.isTouching(trex)){
     etapa = "final";
     
    }
  } // cierre de la etapa "start"
    
  if (etapa == "final"){
    trex.velocityY = 0;
    ground.velocityX = 0;
    CACTUS.setVelocityXEach(0);
    NUBES.setVelocityXEach(0);
    CACTUS.setLifetimeEach(-1);
    
    
    OVER.visible = true;
    reStart.visible = true;
    
    trex2.x = trex.x;
    trex2.y = trex.y;
    
    trex.visible = false;
    trex2.visible = true;
    
  textFont("Arial");
  textSize(14);
  text("Score : " + Puntaje_Final, width-150, 30);
    


    
    
    if (touches.length>0 || mouseIsOver(reStart)){      // editado
      etapa = "start";
      C = 0;
      OVER.visible = false;
      reStart.visible = false;
      trex2.visible= false;
      trex.visible = true;
      ground.velocityX = -4;
      NUBES.destroyEach();
      CACTUS.destroyEach();     
      touches = [];
    }


  }
trex.collide(invisibleGround);
  console.log(ground.velocityX);
  //Kittys();
drawSprites();
}

function Clouds (){
  if (frameCount %50==0){
   CLOUD = createSprite (width,random(10,110 ))
    CLOUD.addImage ("NubesVolando", cloud);
    CLOUD.scale = 0.09;
    CLOUD.velocityX = -4;
    CLOUD.lifetime = 200;
    CLOUD.depth = trex.depth;    
    trex.depth = trex.depth+1;
    
    NUBES.add(CLOUD);
  }
}
function Ob (){
  var Tipo;
  Tipo = Math.round(random(1,2));

  if (frameCount %90==0){
   cactus = createSprite (width,random(height/2-30,height/2-10 ))
    cactus.scale = 0.09;
    cactus.velocityX = -(4 + C/100);
    ground.velocityX = cactus.velocityX;
    //cactus.depth = trex.depth;    
   // trex.depth = trex.depth+1;
    switch(Tipo){
      case 1:   
      cactus.addImage ("Obstaculos",O1);
      break;
      case 2:
      cactus.addImage ("Obstaculos2", O2);
      break;
    }   
    cactus.lifetime = 200;
    CACTUS.add(cactus);
  }
}
function Puntaje (){
 C = C + Math.round(getFrameRate() / 60);
  textFont("Arial");
  textSize(14);
  text("Score : " + C, width-150, 30);
  Puntaje_Final = C;
  }
function Kittys() {          
for( var j=1; j<=7; j=j+1){
x = random(20,width-20);
y = random(20,height/2);                    
  
gatito = createSprite(x,y);
gatito.addImage("Kitty", GATITOS);
gatito.scale = 0.06;
gatito.lifetime = 50;
}
}
