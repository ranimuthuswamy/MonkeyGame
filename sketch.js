//Global Variables
var bananaImage, obstacleImage, monkey, monkeyRunningImage, bckg, backgroundImage, ground, groundImg;
var score, FoodGroup, ObstaclesGroup;

//load all the images and animations required 
function preload(){
  backgroundImage = loadImage("jungle.jpg");
  monkeyRunningImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("Banana.png");  
  obstacleImage = loadImage("stone.png");
}


function setup() {
  //set the canvas for the game
  createCanvas(600,300);
  //set the background
  bckg = createSprite(0,0,600,300);
  bckg.addImage("bckg",backgroundImage);
  bckg.scale = 1.5;
  bckg.x = bckg.width/2;
  bckg.velocityX = -4;
  //create monkey player
  monkey = createSprite(200,250,20,50);
  monkey.addAnimation("running",monkeyRunningImage);
  monkey.scale = 0.1;
  //create an invisible ground
  ground = createSprite(300,280,600,10);
  ground.x = ground.width/2;
  ground.velocityX = -4;
  ground.visible=false;
  //create groups
  FoodGroup = new Group();
  ObstaclesGroup = new Group();
  //initialise score variable
  score = 0;
}


function draw(){
  //clear the background
 background("white"); 
  //reset the ground
  if(ground.x < 0){
   ground.x = ground.width/2; 
  }
  //reset the background
  if(bckg.x < 0){
   bckg.x = bckg.width/2; 
  }
  //if monkey touches banana, then increment score and remove it
  if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
  
  //based on the score increase the size of monkey
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
    //make the monkey jump when space key is pressed
    if(keyDown("space")) {
      monkey.velocityY = -15;
    }
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  
    //spawn the bananas
    spawnFood();
    //spawn the stones
    spawnObstacles();
   
    //if the monkey touches obstacle reduce the size of monkey
    if(ObstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;     
    }
  //monkey to be collided with ground
  monkey.collide(ground);
  //draw the sprites
  drawSprites();
  //show the score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 450,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(600,250,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 100;
    
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}