
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var bk,bkI;

var PLAY=1
var ENd=0;
var gameState=1;
var size;
var Survival;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  bkI=loadImage("Forest.png");
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  bk=createSprite(width/2-100,height-100,width,50)
  bk.addImage(bkI);
  bk.scale=2.5;
  
  monkey = createSprite(100,height-100,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.15;

  ground = createSprite(width/2,height-90,width,10);
  ground.visible=false;
  
  
  score=0;
  
  size = 2;
  
  obstacleGroup=createGroup();
  FoodGroup= new Group();
}


function draw() {
background("white");
  
 if(gameState===1){
    monkey.collide(ground);

    objects();
    food();
   
   
   bk.velocityX=-10;
   if(bk.x<0){
     bk.x=bk.width/2;
     
   }
   
   if(touches.length>0||keyDown("space")&& monkey.y>=325.95){
     monkey.velocityY=-15;
     touches=[];
   }   
   monkey.velocityY=monkey.velocityY+0.8;
  console.log(monkey.y);
   
   if(monkey.isTouching(FoodGroup)){
     score=score+2;
     FoodGroup.destroyEach();
   }
  
  else if(monkey.isTouching(obstacleGroup)){
        size=size-1;
  obstacleGroup.destroyEach();
    if(size===1){
    monkey.scale=0.1;
  }
    else if(size===0){
      gameState=0; 
      //text("GAME OVER",width-200,height-200);
    }
  }
   
 }
  if(gameState===0){
    monkey.velocity=0;
     FoodGroup.destroyEach();
     obstacleGroup.destroyEach();
    ground.velocityX = 0;
  }

  drawSprites();
  stroke("grey");
  textSize(20);
  strokeWeight(2);
  text(""+score,width/7,height/6);
//  text(mouseX+" , "+mouseY,200,200);
    
 
}

function food(){
  if(frameCount%80===0){
    var banana = createSprite(width+20,Math.round(random(height-300,height-200)),20,20);
    banana.addImage(bananaImage);
    banana.velocityX=-10-score/2;
    banana.scale=0.1;
    FoodGroup.add(banana);
  }
}
function objects(){
  if(frameCount%180===0){
    var obstacle=createSprite(width+20,height-120,20,20)
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.18;
    obstacle.velocityX=-10-score/2;
    obstacleGroup.add(obstacle);
  }
}



