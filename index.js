import { CanvasMethods } from "./canvas.methods.js";
import { Effect } from "./models/effect.model.js";
import { Enemy } from "./models/enemy.model.js";
import { Player } from "./models/player.model.js";
import { Shot } from "./models/shot.model.js";

let player = new Player();
let shots = [];
let enemysShoots = [];
let enemys = [new Enemy(200, 100)];
let particles = [];

let cvMethod;

const clock = setInterval(function () {
  player.move();
  handlePlayerShoots();
  handleEnemysShoots();
  handleEnemysMovement();
}, 30);

function updateFrame() {
  cvMethod.clearRect();
  cvMethod.showPlayerLife(player);

  shots.forEach(shot => cvMethod.drawShots(shot));
  enemysShoots.forEach(shot => cvMethod.drawShots(shot));

  if (player.alive) {
    cvMethod.drawPlayer(player);
  }

  enemys.forEach(lenemy => {
    if (lenemy.alive) {
      cvMethod.drawEnemy(lenemy);
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
    }
    return;
  }

  if (player.isMotionKey(key)) {
    player.clearPlayerMovement(key);
  }
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
        if (isShotHitingEnemy(shots[i], lenemy) && lenemy.alive) {
          lenemy.alive = false;
          createExplosionEffect(shots[i].x, shots[i].y);
        }
      });
    }
  }
}

function handleEnemysShoots() {
  for (let i = 0; i < enemysShoots.length; i++) {
    if (enemysShoots[i].active) {
      enemysShoots[i].move();
      if (isEnemyShootHitingPlayer(enemysShoots[i])) {

        if (enemysShoots[i].active) {
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
    if (enemys[i].alive) {
      const hittedOne = enemys.find(enemy => enemy.alive && enemy.isInRangeOf(enemys[i].x, enemys[i].y));

      if (hittedOne) {
        enemys[i].moveInverseDirectionOf(hittedOne);
        createExplosionEffect(hittedOne.x, hittedOne.y);
      } else {
        enemys[i].move(enemys[i].x, enemys[i].y);
        enemyShooting(enemys[i]);
      }

      if (enemys[i].isInRangeOf(player.x, player.y) && player.alive) {
        enemys[i].moveInverseDirectionOf(null);
        player.hittedByEnemy();
        createExplosionEffect(enemys[i].x, enemys[i].y);
      }
    }
  }
}

function startShoting() {
  if (player.alive) {
    let newShot = new Shot(player.x - 5, player.y, -1);
    shots.push(newShot);
  }
}

function enemyShooting(enemy) {
  if (enemy.isAbleToShoot(player.x, player.y)) {
    if (enemy.hasMinimunDistanceFromLastShot(enemy.x, enemy.y)) {
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
  const particle = new Effect(x - 15, y - 15, 50, 50);
  particle.id = "explosion-";
  particle.frames = 3;
  particles.push(particle);
}

//teste buttons
document.getElementById("btn-add-enemy").addEventListener("click", function includeEnemy() {
  enemys.push(new Enemy(100, 100));
});

//renascer / reeestart
