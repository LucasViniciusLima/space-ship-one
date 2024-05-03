export class Shot {

  width = 10;
  height = 10;
  velocityY = 6;
  active = false;
  x = 0;
  y = 0;
  color = '#FF11FF';

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.active = true;
  }

  move() {
    this.y = this.y - this.velocityY;
    if (this.y <= 0) {
      this.active = false;
    }
  }
}