import { CanvasMethods } from "./canvas.methods.js";
import { Player } from "./player.model.js";

let player = new Player();

let shotModel = {
  width: 10,
  height: 10,
  velocityY: 6,
  active: false,
  x: player.x - 5,
  y: player.y
};

let enemy = {
  x: 435,
  y: 100,
  width: 25,
  height: 25,
  velocityX: 3,
  velocityY: 3,
  xMovement: 1,
  yMovement: 0,
  alive: true
};

let cvMethod;
let shots = [];

const clock = setInterval(function () {
  if (player.isMoving) {
    player.move();
  }

  for (let i = 0; i < shots.length; i++) {
    if (shots[i].active) {
      travelShot(shots[i]);

      if (isShotHitingEnemy(shots[i], enemy)) {
        enemy.alive = false;
      }

    }
  }

  if (enemy.alive) {
    moveEnemy(enemy);
  }

}, 16);

window.addEventListener("load", function () {
  const canvashtmlDom = document.getElementById("canvas");
  cvMethod = new CanvasMethods(canvashtmlDom.getContext('2d'));
  init();
});

document.addEventListener("keyup", function (key) {
  if (!isMotionKey(key)) {
    switch (key.key) {
      case ' ':
        startShoting(shotModel);
        break;
    }
    return;
  }

  if (isMotionKey(key)) {
    player.isMoving = false;//this breaks the animation when two keys are pressed
    clearPlayerMovement(player, key);
  }
});

document.addEventListener("keydown", function (key) {
  if (isMotionKey(key)) {
    player.isMoving = true;
    switch (key.key) {
      case 'ArrowUp':
        player.yMovement = -1;
        break;
      case 'ArrowDown':
        player.yMovement = 1;
        break;
      case 'ArrowLeft':
        player.xMovement = -1;
        break;
      case 'ArrowRight':
        player.xMovement = 1;
        break;
    }
  }
});

function init() {
  cvMethod.setColorInCtx('green');
  window.requestAnimationFrame(updateFrame);
};

function updateFrame() {
  cvMethod.clearRect();

  cvMethod.drawTriangle(player);

  //change to inside the method
  if (enemy.alive) {
    cvMethod.drawTriangle(enemy);
  }

  shots.forEach(shot => cvMethod.drawShots(shot));

  window.requestAnimationFrame(updateFrame);
}

function movePlayer(player) {
  player.x += player.velocityX * player.xMovement;
  player.y += player.velocityY * player.yMovement;
}

function startShoting(shotModel) {
  let newShot = {
    ...shotModel,
    active: true,
    x: player.x - 5,
    y: player.y
  };

  shots.push(newShot);
}

function travelShot(shot) {
  shot.y = shot.y - shot.velocityY;
  if (shot.y <= 0) {
    shot.active = false;
  }
}

function isMotionKey(key) {
  return (key.key == 'ArrowUp' || key.key == 'ArrowDown' || key.key == 'ArrowRight' || key.key == 'ArrowLeft');
}

function clearPlayerMovement(player, key) {
  if (key.key == 'ArrowUp' || key.key == 'ArrowDown') {
    player.yMovement = 0;
  }
  if (key.key == 'ArrowRight' || key.key == 'ArrowLeft') {
    player.xMovement = 0;
  }
}

function isShotHitingEnemy(shot, enemy) {
  const enemyHitboxYStart = enemy.y;
  const enemyHitboxYEnd = enemy.y + enemy.height;

  const enemyHitboxXStart = enemy.x - (enemy.width / 2);
  const enemyHitboxXEnd = enemy.x + (enemy.width / 2);

  return (shot.y > enemyHitboxYStart && shot.y < enemyHitboxYEnd) && (shot.x > enemyHitboxXStart && shot.x < enemyHitboxXEnd);
}

function moveEnemy(enemy) {
  enemy.x += enemy.velocityX * enemy.xMovement;
  if (enemy.x >= canvas.width || (enemy.x - (enemy.width / 2)) <= 0) {
    enemy.xMovement *= -1;
  }
}