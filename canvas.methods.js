export class CanvasMethods {
  ctx;
  lastChargePanelParticleUpdate;
  lastChargePanelImage = 0;

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

  getHorizontalPowerImageAleatore() {
    if (!this.lastChargePanelParticleUpdate) {
      this.lastChargePanelParticleUpdate = new Date();
    }

    const actualFrame = new Date();
    let diference = actualFrame.getMilliseconds() - this.lastChargePanelParticleUpdate.getMilliseconds();

    if ((diference > 500 && diference < 535) || (diference > 200 && diference < 235) || (diference > 140 && diference < 160) || (diference < -640 && diference > -660) || (diference < -340 && diference > -360) || (diference < -840 && diference > -860)) {
      this.lastChargePanelImage++;

      if (this.lastChargePanelImage > 4) {
        this.lastChargePanelImage = 0;
      }

    }

    return document.getElementById("charge-panel-particles-" + this.lastChargePanelImage);
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

  showPlayerScreenStatus(player, enemyDeathCount, actualPhase) {
    if (!player.active && player.deaths > 0) {
      this.showDeadScreen(player, enemyDeathCount, actualPhase);
      return;
    }
    if (!player.active && player.deaths == 0) {
      this.showInitialScreen();
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

  showDeadScreen(player, enemyDeathCount, actualPhase) {
    this.setColorInCtx("#ff33ff");
    this.ctx.font = "bold 40px Orbitron";
    this.ctx.fillText("YOU ARE DEAD!", 285, 300);

    this.ctx.font = "bold 20px Orbitron";
    this.ctx.fillText("Clique na tela para continuar", 305, 330);

    this.ctx.fillText(`Mortes = ${player.deaths}`, 50, 420);
    this.ctx.fillText(`Fase = ${actualPhase}`, 50, 460);
    this.ctx.fillText(`Inimigos mortos = ${enemyDeathCount}`, 50, 500);

  }

  showInitialScreen() {
    this.setColorInCtx("#ff33ff");
    this.ctx.font = "bold 50px Orbitron";
    this.ctx.fillText("SKYLAZER SPACESHIP", 120, 200);

    this.ctx.font = "bold 20px Orbitron";
    this.ctx.fillText("Clique na tela para iniciar", 330, 260);
  }
  showButtonIndicatorToSpecialShot() {
    this.setColorInCtx("#ff33ff");
    this.ctx.font = "bold 13px Orbitron";
    this.ctx.fillText("PRESSIONE \"S\"", 54, 590);
  }

  showPlayerSpecialCharge(player) {
    if (player.active) {
      const chargeImage = this.selectChargeImageByPlayerChargesRemaining(player);
      this.ctx.drawImage(chargeImage, 30, 545, 154, 24);

      if (player.hasSpecialShot) {
        const shootImage = this.getHorizontalPowerImageAleatore();
        this.ctx.drawImage(shootImage, 20, 535, 177, 40);
        this.showButtonIndicatorToSpecialShot();
      }
    }
  }

  selectChargeImageByPlayerChargesRemaining(player) {
    let imgIdToSelect = 4 - player.specialShotCountingRemaining;

    imgIdToSelect = imgIdToSelect < 0 ? 0 : imgIdToSelect;
    imgIdToSelect = imgIdToSelect > 4 ? 4 : imgIdToSelect;

    return document.getElementById("charge-panel-" + imgIdToSelect);
  }

  showPhase(player, numberOfPhase) {
    if (!player.alive) return;
    this.setColorInCtx("#ff33ff");
    this.ctx.font = "bold 13px Orbitron";
    this.ctx.fillText(`Fase ${numberOfPhase}`, 20, 40);
  }

}