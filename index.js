import { CanvasMethods } from "./canvas.methods.js";
import { Effect } from "./models/effect.model.js";
import { Enemy } from "./models/enemy.model.js";
import { Player } from "./models/player.model.js";
import { Shot } from "./models/shot.model.js";

let player = new Player();
player.active = false;
let shots = [];
let enemysShoots = [];
let enemys = [new Enemy(200, 100)];
let particles = [];

let cvMethod;
let clockCounter = 0;
let nextEnemyGeneration = 100;

const clock = setInterval(function () {
  clockCounter++;
  player.move();
  handleEnemysGeneration();
  handlePlayerShoots();
  handlePlayerSpecialShoots();
  handleEnemysShoots();
  handleEnemysMovement();

  clearInactiveItems();
}, 30);

function updateFrame() {
  cvMethod.clearRect();
  cvMethod.createBackground(clockCounter);
  cvMethod.showPlayerLife(player);
  cvMethod.showPlayerScreenStatus(player);
  cvMethod.showPlayerSpecialCharge(player);

  shots.forEach(shot => cvMethod.drawShots(shot));
  enemysShoots.forEach(shot => cvMethod.drawShots(shot));

  if (player.active) {
    if (player.isIntangibleToEnemies()) {
      cvMethod.drawPlayerIntangible(player);
    } else {
      cvMethod.drawPlayer(player);
    }
  }

  enemys.forEach(lenemy => {
    if (lenemy.active) {
      if (lenemy.isIntangibleToEnemies()) {
        cvMethod.drawEnemyIntangible(lenemy);
      } else {
        cvMethod.drawEnemy(lenemy);
      }
    }
  });

  particles.forEach(particle => {
    particle.timeOnScreen += 16;
    cvMethod.drawParticle(particle);
  });

  window.requestAnimationFrame(updateFrame);
}

window.addEventListener("load", function () {
  const canvashtmlDom = document.getElementById("canvas");
  cvMethod = new CanvasMethods(canvashtmlDom.getContext('2d'));
  window.requestAnimationFrame(updateFrame);
});

document.addEventListener("keyup", function (key) {
  if (!player.isMotionKey(key)) {
    switch (key.key) {
      case ' ':
        startShoting();
        break;
      case 's':
        startSpecialShooting();
        break;
    }
    return;
  }
  player.clearPlayerMovement(key);
});

document.addEventListener("keydown", function (key) {
  if (player.isMotionKey(key)) {
    player.handleKeydownEvent(key);
  }
});

function handlePlayerShoots() {
  for (let i = 0; i < shots.length; i++) {
    if (shots[i].active) {
      shots[i].move();

      enemys.forEach(lenemy => {
        if (isShotHitingEnemy(shots[i], lenemy) && lenemy.active) {
          lenemy.active = false;
          createExplosionEffect(shots[i].x, shots[i].y);
          player.decreaseSpecialShotCountingRemaining();
        }
      });
    }
  }
}

function handlePlayerSpecialShoots() {
  if (player.specialShotsEndsIn > clockCounter) {
    if (clockCounter % 2 == 0) {
      startShoting();
      startShotingInDirectionX(-1);
      startShotingInDirectionX(1);
    }
  }
}

function handleEnemysGeneration() {
  if (!player.active) return;

  nextEnemyGeneration--;
  if (nextEnemyGeneration <= 0) {
    let x = generateAleatoreNumber(1, 2) === 1 ? 20 : 880;
    let y = generateAleatoreNumber(20, 300);
    let newEnemy = new Enemy(x, y);
    newEnemy.yDirection = -1;
    enemys.push(newEnemy);
    nextEnemyGeneration = 200;
  }
}

function handleEnemysShoots() {
  for (let i = 0; i < enemysShoots.length; i++) {
    if (enemysShoots[i].active) {
      enemysShoots[i].move();
      if (isEnemyShootHitingPlayer(enemysShoots[i])) {

        if (enemysShoots[i].active && !player.isIntangibleToEnemies()) {
          player.hittedByEnemy();
          enemysShoots[i].active = false;
          createExplosionEffect(enemysShoots[i].x, enemysShoots[i].y);
        }
      }
    }
  }
}

function handleEnemysMovement() {
  for (let i = 0; i < enemys.length; i++) {
    if (enemys[i].active) {
      enemys[i].decreaseIntangibilityToEnemys();
      const hittedOne = enemys.find(enemy => enemy.active && enemy.isInRangeOf(enemys[i].x, enemys[i].y));

      if (hittedOne && !enemys[i].isIntangibleToEnemies()) {
        enemys[i].moveInverseDirectionOf(hittedOne);
        enemys[i].setIntangibleToEnemies(16);
        createExplosionEffect(hittedOne.x, hittedOne.y);
      } else {
        enemys[i].move(enemys[i].x, enemys[i].y);
        enemyShooting(enemys[i]);
      }

      if (enemys[i].isInRangeOf(player.x, player.y) && player.active && !player.isIntangibleToEnemies()) {
        player.hittedByEnemy();
        createExplosionEffect(enemys[i].x, enemys[i].y);
      }
    }
  }
}

function startShoting() {
  if (player.active) {
    let newShot = new Shot(player.x - 5, player.y, -1);
    shots.push(newShot);
  }
}

function startShotingInDirectionX(xDirection) {
  if (player.active) {
    let newShot = new Shot(player.x - 5, player.y, -1);
    newShot.xDirection = xDirection;
    shots.push(newShot);
  }
}

function startSpecialShooting() {
  if (player.hasSpecialShot) {
    player.specialShotsEndsIn = clockCounter + 400;

    //deal with directions

    player.clearSpecialShotCountingRemaining();
  }
}

function enemyShooting(enemy) {
  if (enemy.isAbleToShoot(player.x, player.y)) {
    if (enemy.hasMinimunDistanceFromLastShot(enemy.x, enemy.y) && player.active) {
      let shoot = new Shot(enemy.x, enemy.y, 1);
      shoot.color = enemy.color;
      enemysShoots.push(shoot);
      enemy.endShooting();
    }
  }
  else {
    enemy.clearLastShoot();
  }
}

function isShotHitingEnemy(shot, enemy) {
  const enemyHitboxYStart = enemy.y;
  const enemyHitboxYEnd = enemy.y + enemy.height;

  const enemyHitboxXStart = enemy.x - (enemy.width / 2);
  const enemyHitboxXEnd = enemy.x + (enemy.width / 2);

  return (shot.y > enemyHitboxYStart && shot.y < enemyHitboxYEnd) && (shot.x > enemyHitboxXStart && shot.x < enemyHitboxXEnd);
}

function isEnemyShootHitingPlayer(shot) {
  const enemyHitboxYStart = player.y;
  const enemyHitboxYEnd = player.y + player.height;

  const enemyHitboxXStart = player.x - (player.width / 2);
  const enemyHitboxXEnd = player.x + (player.width / 2);

  return (shot.y > enemyHitboxYStart && shot.y < enemyHitboxYEnd) && (shot.x > enemyHitboxXStart && shot.x < enemyHitboxXEnd);
}

function createExplosionEffect(x, y) {
  let particle = new Effect(x - 15, y - 15, 50, 50);
  particle.id = "explosion-";
  particle.frames = 3;
  particles.push(particle);
}

function removeUnusedItems(arr) {
  arr.forEach(function (item, index, object) {
    if (!item.active) {
      object.splice(index, 1);
    }
  });
}

function clearInactiveItems() {
  removeUnusedItems(shots);
  removeUnusedItems(particles);
  removeUnusedItems(enemys);
  removeUnusedItems(enemysShoots);
}

//teste buttons
document.getElementById("btn-add-enemy").addEventListener("click", function includeEnemy() {
  enemys.push(new Enemy(100, 100));
});

//renascer / reeestart
document.getElementById("canvas").addEventListener("click", function mouseEvent(event) {
  const { pageX, pageY } = event;
  if (!player.active) {
    resetGameStatus();
  }
});

function resetGameStatus() {
  player = new Player();
  shots = [];
  enemysShoots = [];
  enemys = [new Enemy(200, 100)];
  particles = [];
  clockCounter = 0;
  nextEnemyGeneration = 100;
}

function generateAleatoreNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
