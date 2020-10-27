var towerImg, tower;
var doorImg, door, doorsGroup;
var ghost, ghostImg;
var climberImg, climber, climberGroup;
var invisibleBlockGroup, invisibleBlock;
var spookySound;
var PLAY=1
var END=0;
var gameState=PLAY;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  ghostImg=loadImage("ghost-standing.png");
  climberImg= loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  //spookySound.play();
  tower = createSprite (windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  tower.addImage(towerImg);
  tower.scale=1.7;
  tower.velocityY=5
  
  ghost = createSprite(windowWidth/2, windowHeight/2,10,10);
  ghost.addImage(ghostImg);
  ghost.scale=0.7;
  
  doorsGroup = new Group;
  climberGroup = new Group;
  invisibleBlockGroup = new Group;
}

function draw(){
  background(20);
  
  
  
  if(gameState === PLAY){
    if(tower.y> windowHeight){
    tower.y = windowHeight/2
  }
  
      
    if (keyWentDown("space")){
        ghost.velocityY= -10;
        }
     ghost.velocityY=ghost.velocityY+0.3  
  
     if (keyDown("RIGHT_ARROW")){
        ghost.x = ghost.x + 5;
        }
    
     if (keyDown("left_arrow")){
          ghost.x = ghost.x - 5 ;
        }
    
    if (climberGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    
    if(ghost.y>windowHeight||ghost.y<0){
      ghost.destroy
      gameState=END;
    }
 
 spawnDoor();
 ghost.collide(invisibleBlockGroup);
  drawSprites();
}
  else if(gameState === END){
    textSize(60);
    stroke("Yellow");
    fill("Yellow");
    text(" Game Over ", windowWidth/2, windowHeight/2);
  }
    
  }
 

function spawnDoor(){
  if (frameCount % 250 === 0){
    door = createSprite(300,300,10,10);
    door.addImage(doorImg);
    door.scale=2
    climber = createSprite (door.x, door.y+100, 10, 10);
    climber.addImage(climberImg); 
    invisibleBlock = createSprite (door.x, door.y+100, 100, 10);
    invisibleBlock.visible = false;
    
    door.x=Math.round(random (300,800));
    climber.x = door.x;
    invisibleBlock.x = door.x
    
    door.velocityY=-10
    climber.velocityY=-10
    invisibleBlock.velocityY=-10
    
    invisibleBlock.lifetime=1000
    climber.lifetime=1000
    door.lifetime=1000
    
    doorsGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  
  }
  
}