export class CanvasMethods {
  ctx;

  constructor(context) {
    this.ctx = context;
  }


  drawRectangle(player) {
    this.ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  drawTriangle(player) {
    this.ctx.beginPath();

    this.ctx.moveTo(player.x, player.y);
    this.ctx.lineTo(player.x - (player.width / 2), player.y + player.height);
    this.ctx.lineTo(player.x + (player.width / 2), player.y + player.height);


    this.ctx.closePath();
    this.ctx.fill();
  }

  setColorInCtx(str) {
    this.ctx.fillStyle = str;
  }

  clearRect() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawShots(shot) {
    if (shot.active) {
      this.drawRectangle(shot);
    }
  }

}