///var PLAY=1;
//var END=0;
//var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = -1;
var foodEaten;

function preload(){

 monkey_running =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(450,360) 
  
  monkey=createSprite(80,316,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.091;

  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  ground.shapeColor = "green";
  console.log(ground.x)
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  foodEaten=0;
  survivalTime = 0;
}


function draw() {
background("pink");
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  survivalTime = survivalTime+1;
 // score = score+1;
  stroke("black");
  strokeWeight(1);
  textSize(16);
  fill("black");
  text("Banana's Eaten : "+ foodEaten ,15,23);
  
  //stroke("black");
 // textSize(17);
  //fill("white");
 // text("Score : " + score, 15,45);
  
  stroke("black");
  textSize(18);
  fill("black");
  //survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime, 260, 25);

  if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach();  
     foodEaten=foodEaten+1;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    //monkey.velocityY = 0;
     //ground.velocityX = 0;
    // obstacleGroup.setVelocityXEach(0);
     obstacleGroup.destroyEach();
     survivalTime = survivalTime-200;
     
  }
  
  if(foodEaten === 15){
     textSize(27);
     fill("red");
     text("You Win!",165,180); 
     obstacleGroup.destroyEach();
     FoodGroup.destroyEach();
     monkey.destroy();
     //background("blue");
     //score = -1;
     survivalTime = -1;
     ground.destroy();
  }
  
  if(keyDown("space") && monkey.y >= 230){
    monkey.velocityY = -11;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  spawnFood();
  spawnObstacles();
  
  drawSprites();
}

function spawnFood(){
  if(World.frameCount % 150 === 0 ){
    banana = createSprite(580,230,20,20);
    banana.y = random(120,230);
    banana.velocityX = -5;
    
    banana.lifeTime = 270;
    monkey.depth = banana.depth + 1;
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(World.frameCount % 230=== 0){
     obstacle=createSprite(440,320,20,200);    
     //obstacle.y=440;
     obstacle.velocityX = -4;
    
     obstacle.lifetime = 280;
    
     obstacle.addImage(obstacleImage);
     obstacle.scale=0.13;   
     
     //obstacleGroup.collide(ground);
    
     obstacleGroup.add(obstacle);
    
     
  }
  
}