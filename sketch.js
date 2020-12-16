var gameState = "play";
var enemyImg, fruit1, fruit2, fruit3, fruit4, swordImg, gameOverImg
var sword;
var score = 0;
var fruitGroup, enemyGroup;

function preload() {
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  enemyImg = loadAnimation("alien1.png", "alien2.png");
  swordImg = loadImage("sword.png");
  gameOverImage = loadImage("gameover.png")

}

function setup() {
  createCanvas(600, 600);
  sword = createSprite(40, 20, 20, 20)
  sword.addImage("sword", swordImg);
  sword.scale = 0.7;
  fruitGroup = createGroup();
  enemyGroup = createGroup();
}

function draw() {
  background("lightblue");
  drawSprites();
  textSize(20);
  text("score:" + score, 10, 70)
  if (gameState === "play") {
    sword.x = mouseX;
    sword.y = mouseY;
    fruits()
    enemys()
    if (sword.isTouching(enemyGroup)) {
      gameState = "end";
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
    }
    if (sword.isTouching(fruitGroup)) {
      fruitGroup.destroyEach();
      score = score + 1;

    }



  } else if (gameState === "end") {
    sword.addImage("sword", gameOverImage)
    sword.x = 300;
    sword.y = 300;
  }

}

function fruits() {
  if (frameCount % 80 === 0) {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    fruit.y = Math.round(random(50, 340))
    var r = Math.round(random(1, 4));
    switch (r) {
      case 1:
        fruit.addImage("1", fruit1);
        break;
      case 2:
        fruit.addImage("2", fruit2);
        break;
      case 3:
        fruit.addImage("3", fruit3);
        break;
      case 4:
        fruit.addImage("4", fruit4);
        break;

    }
    fruit.velocityX = -7;
    fruit.setlifetime = 100;
    fruitGroup.add(fruit);
  }
}

function enemys() {
  if (frameCount % 200 === 0) {
    enemy = createSprite(400, 200, 20, 20);
    enemy.addAnimation("enemy", enemyImg)

    enemy.y = Math.round(random(100, 300))

    enemy.velocityX = -8;
    enemy.setlifetime = 50;
    enemyGroup.add(enemy);
  }
}