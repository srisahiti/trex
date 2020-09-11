var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running,ground,groundImage,invisibleGround,cloudImage,CloudsGroup,ObstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,restart,restartImage,gameOver,gameOverImage,count;

function preload() {
 trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
 groundImage=loadImage("ground2.png");
 //cloudImage=loadImage("cloud.png");
  cloudImage = loadImage("cloud.png");
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
      obstacle3 = loadImage("obstacle3.png");
      obstacle4 = loadImage("obstacle4.png");
      obstacle5 = loadImage("obstacle5.png");
      obstacle6 = loadImage("obstacle6.png");
 restartImage=loadImage("restart.png");
  gameOverImage=loadImage("gameOver.png");

}


function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("trex",trex_running);
  trex.scale=0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addAnimation("ground",groundImage);
  
  ground.x = ground.width/2;
  ground.velocityX=-2;
  
 invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible=false;
  
  gameOver=createSprite(300,100,30,30);
  gameOver.visible = false;
  gameOver.addAnimation("gameOver",gameOverImage);
  gameOver.scale=0.5;
  
  
  restart=createSprite(300,140);
    restart.visible = false;
   restart.addAnimation("restart",restartImage);
   restart.scale=0.5;

  count = 0;
  
  CloudsGroup=new Group();
  ObstaclesGroup=new Group();
}

function draw() {
  background(180);
  
  text("Score: "+ count, 250, 100);
  
   if(gameState === PLAY){
     
     count = count+Math.round(World.frameRate/30);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")){
      trex.velocityY = -12 ;
    }
  
  trex.velocityY = trex.velocityY + 0.8;
  
  
  
  spawnClouds();
  spawnObstacles();
     
     if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
    }
     
   }
  
   else if(gameState === END) {
     gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    //trex.setAnimation("trex_collided");
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
     
   }
  
  trex.collide(invisibleGround);
  
   if(mousePressedOver(restart)) {
    reset();
  }
  
  
  drawSprites();
}

function reset(){
  gameState=PLAY;
  
  gameOver.visible=false;
  restart.visible=false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  count=0;
  
  trex.addAnimation("trex.png");

}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloudImage);
    //cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    //cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX =-4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
     switch(rand){
       case 1:obstacle.addImage(obstacle1);
       break;
       case 2:obstacle.addImage(obstacle2);
       break;
       case 3:obstacle.addImage(obstacle3);
       break;
       case 4:obstacle.addImage(obstacle4);
       break;
       case 5:obstacle.addImage(obstacle5);
       break;
       case 6:obstacle.addImage(obstacle6);
       break;
       default:break;
     }
         
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}


