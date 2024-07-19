export class CanvasMethods {
  ctx;

  constructor(context) {
    this.ctx = context;
    this.ctx.imageSmoothingEnabled = false;
  }

  createBackground(clockCounter) {
    if (clockCounter % 2 == 1) {
      return;
    }
    for (let i = 0; i < 7; i++) {
      const x = this.generateAleatoreNumber(0, 900);
      const y = this.generateAleatoreNumber(0, 600);
      this.drawCircleStarAt(x, y);
    }
  }

  drawCircleStarAt(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 3, 0, 2 * Math.PI);
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fill();
    this.ctx.stroke();
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
    const playerImage = this.getPlayerImageAleator();
    const playerXStarts = player.x - (player.width / 2);
    this.ctx.drawImage(playerImage, playerXStarts, player.y, player.width, player.height);
  }

  drawEnemy(enemy) {
    const enemyImage = document.getElementById("spaceship-enemy");
    const enemyXStarts = enemy.x - (enemy.width / 2);
    this.ctx.drawImage(enemyImage, enemyXStarts, enemy.y, enemy.width, enemy.height);
  }

  drawPlayerIntangible(player) {
    this.ctx.globalAlpha = 0.5;
    this.drawPlayer(player);
    this.ctx.globalAlpha = 1;
  }

  drawEnemyIntangible(enemy) {
    this.ctx.globalAlpha = 0.5;
    this.drawEnemy(enemy);
    this.ctx.globalAlpha = 1;
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

  getPlayerImageAleator() {
    let num = this.generateAleatoreNumber(1, 3);
    return document.getElementById("spaceship-" + num);
  }

  getShotImageAleatore() {
    let num = this.generateAleatoreNumber(1, 3);
    return document.getElementById("shoot-" + num);
  }

  generateAleatoreNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  showPlayerLife(player) {
    if (player.active) {
      for (let i = 0; i < player.life; i++) {
        this.drawCircleLifeAtX(850 - i * 23, player);
      }
    }
  }

  showPlayerScreenStatus(player) {
    if (!player.active) {
      this.showDeadScreen();
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
      particle.active = false;
      return;
    }

    const part = particle.totalTimeOnScreen / particle.frames;
    const imageNum = Math.ceil(particle.timeOnScreen / part);
    const particleImage = document.getElementById(particle.id + imageNum);
    this.ctx.drawImage(particleImage, particle.x, particle.y, particle.width, particle.height);
  }

  showDeadScreen() {
    this.setColorInCtx("#ff33ff");
    this.ctx.font = "bold 50px Cambria";
    this.ctx.fillText("YOU ARE DEAD!", 285, 300);

    this.ctx.font = "bold 20px Cambria";
    this.ctx.fillText("Clique na tela para continuar", 335, 330);
  }

}