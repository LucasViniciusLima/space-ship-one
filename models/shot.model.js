export class Shot {

  width = 20;
  height = 40;
  velocityY = 6;
  active = false;
  x = 0;
  y = 0;
  color = '#FF11FF';
  direction = -1;
  xDirection = 0;
  specialShot = false;

  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.active = true;
    this.direction = direction;
  }

  move() {
    this.y += this.velocityY * this.direction;
    this.x += this.velocityY * this.xDirection;
    if (this.y <= 0) {
      this.active = false;
    }
  }

}