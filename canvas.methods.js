export class CanvasMethods {
  ctx;

  constructor(context) {
    this.ctx = context;
  }


  drawRectangle(player) {
    this.ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  drawTriangle(player) {
    this.setColorInCtx(player.color);
    this.ctx.beginPath();

    this.ctx.moveTo(player.x, player.y);
    this.ctx.lineTo(player.x - (player.width / 2), player.y + player.height);
    this.ctx.lineTo(player.x + (player.width / 2), player.y + player.height);


    this.ctx.closePath();
    this.ctx.fill();
  }

  drawPlayer(player) {
    const playerImage = document.getElementById("spaceship");
    const playerXStarts = player.x - (player.width / 2);
    this.ctx.drawImage(playerImage, playerXStarts, player.y, player.width, player.height);
  }

  drawEnemy(enemy) {
    const enemyImage = document.getElementById("spaceship-enemy");
    const enemyXStarts = enemy.x - (enemy.width / 2);
    this.ctx.drawImage(enemyImage, enemyXStarts, enemy.y, enemy.width, enemy.height);
  }

  setColorInCtx(str) {
    this.ctx.fillStyle = str;
  }

  clearRect() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawShots(shot) {
    if (shot.active) {
      //this.setColorInCtx(shot.color);
      //this.drawRectangle(shot);
      this.drawShotImage(shot);
    }
  }

  drawShotImage(shot) {
    const shootImage = this.getShotImageAleatore();
    this.ctx.drawImage(shootImage, shot.x, shot.y, shot.width, shot.height);
  }

  getShotImageAleatore() {
    let min = 1;
    let max = 3;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return document.getElementById("shoot-" + num);
  }

  showPlayerLife(player) {
    if (player.alive) {
      for (let i = 0; i < player.life; i++) {
        this.drawCircleLifeAtX(850 - i * 23, player);
      }
    }
  }

  drawCircleLifeAtX(x, player) {
    /*
    this.ctx.beginPath();
    this.ctx.arc(x, 30, 7, 0, 2 * Math.PI);
    this.ctx.fillStyle = player.color;
    this.ctx.fill();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "white";
    this.ctx.stroke();*/

    const heartImage = document.getElementById("heart");
    this.ctx.drawImage(heartImage, x, 20, 23, 23);
  }

  drawParticle(particle) {
    if (particle.timeOnScreen >= particle.totalTimeOnScreen) {
      return;
    }

    const part = particle.totalTimeOnScreen / particle.frames;
    console.log(particle.timeOnScreen / part);
    const imageNum = Math.ceil(particle.timeOnScreen / part);
    const particleImage = document.getElementById(particle.id + imageNum);
    console.log(imageNum)
    this.ctx.drawImage(particleImage, particle.x, particle.y, particle.width, particle.height);
  }

}