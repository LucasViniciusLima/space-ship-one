import { CanvasMethods } from "./canvas.methods.js";
import { Enemy } from "./models/enemy.model.js";
import { Player } from "./models/player.model.js";
import { Shot } from "./models/shot.model.js";

let player = new Player();
let shots = [];
let enemys = [
  new Enemy(100, 100),
  new Enemy(200, 200),
  new Enemy(300, 300),

  new Enemy(400, 400),
  new Enemy(500, 500)
];

let cvMethod;

const clock = setInterval(function () {
  player.move();

  for (let i = 0; i < shots.length; i++) {
    if (shots[i].active) {
      shots[i].move();

      //verifying multiples enemy here
      enemys.forEach(lenemy => {
        if (isShotHitingEnemy(shots[i], lenemy)) {
          lenemy.alive = false;
        }
      });
    }
  }

  for (let i = 0; i < enemys.length; i++) {
    if (enemys[i].alive) {
      const hittedOne = enemys.find(enemy => enemy.alive && enemy.isInRangeOf(enemys[i].x, enemys[i].y));

      if (hittedOne) {
        enemys[i].moveInverseDirectionOf(hittedOne);
      } else {
        enemys[i].move(player.x, player.y);
      }


    }
  }

}, 16);

function updateFrame() {
  cvMethod.clearRect();

  cvMethod.drawTriangle(player);

  //multiples enemys here
  enemys.forEach(lenemy => {
    if (lenemy.alive) {
      cvMethod.drawTriangle(lenemy);
    }
  });

  shots.forEach(shot => cvMethod.drawShots(shot));

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

function startShoting() {
  let newShot = new Shot(player.x - 5, player.y);
  shots.push(newShot);
}

function isShotHitingEnemy(shot, enemy) {
  const enemyHitboxYStart = enemy.y;
  const enemyHitboxYEnd = enemy.y + enemy.height;

  const enemyHitboxXStart = enemy.x - (enemy.width / 2);
  const enemyHitboxXEnd = enemy.x + (enemy.width / 2);

  return (shot.y > enemyHitboxYStart && shot.y < enemyHitboxYEnd) && (shot.x > enemyHitboxXStart && shot.x < enemyHitboxXEnd);
}