var ghost;
var window;
var tower;
var railing;
var invisibleRail
var score;
var PLAY = 1;
var END = 2;
var gameState = 1;
function preload (){
  ghostImg = loadImage ("ghost-standing.png");
  towerImg = loadImage ("tower.png");
  windowImg = loadImage ("door.png");
  rail = loadImage("climber.png");
  
}


function setup(){
  createCanvas(600,600)
  tower = createSprite (300,1100,600,600);
  tower.addImage (towerImg);
  //tower.velocityY = 2;
  tower.scale = 1.7;
  
  ghost = createSprite (200,200,20,20);
  ghost.addImage (ghostImg);
  ghost.scale=0.4
  
  windowsGroup = new Group ();
  railingGroup = new Group ();
  invisibleRailGroup = new Group ();
  
  score = 0
}


function draw (){
  background ("white");
  textSize (35);
  fill("red")
  text ("score:"+score,300,50);
  textSize(15)
  text ("tip:dont touch the windows",100,50);
  if (gameState===PLAY){
    
    score = score + Math.round(getFrameRate()/60);
    
    
    tower.velocityX = -2;
    
    if (tower.x < 100){
      tower.x = 300;
    }
    if (keyWentDown("space")){
      ghost.velocityY=-10;
    }
    ghost.velocityY = ghost.velocityY + 0.8;
    
    if (keyDown("RIGHT_ARROW")){
      
    }
     if (keyDown("LEFT_ARROW")){
      
    }
    if (ghost.isTouching(invisibleRailGroup)|| ghost.y > 600|| ghost.isTouching(windowsGroup)|| ghost.y<0){
     
      gameState = END;
      ghost.destroy();
    }
    
    
     spawnWindow();
  drawSprites();
  }
  if (gameState === END){
    textSize (75);
    fill ("yellow");
    text ("gameover",200,200);
    
  
    
  }

 
}

function spawnWindow (){
  if (frameCount % 170 === 0) {
    
    var window = createSprite(600,120,40,10);
    
    window.y = Math.round(random(80,500));
    window.addImage (windowImg);
    window.scale =1.2;
    window.velocityX = -3;
    
   
    
     //assign lifetime to the variable
    window.lifetime = 200;
    
    //adjust the depth
    window.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    //window.lifetime = 200;
    //add each cloud to the group
    windowsGroup.add(window);
    
   var railing = createSprite (window.x,window.y + 80,20,20);
     railing.velocityX = window.velocityX;
    railing.addImage (rail);
    
    invisibleRail = createSprite (window.x,window.y+100,100,10);
   
    invisibleRail.velocityX = -3;
    invisibleRail.lifetime = 200;
    railing.lifetime = 200;
    invisibleRailGroup.add(invisibleRail);
    railingGroup.add(railing);
  }
  

}
