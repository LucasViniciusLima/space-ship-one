export class Player {
  x = 435;
  y = 500;
  width = 25;
  height = 30;
  velocityX = 5;
  velocityY = 3;
  isMoving = false;
  xMovement = 0;
  yMovement = 0;
  //color
  //methods

  move() {
    this.x += this.velocityX * this.xMovement;
    this.y += this.velocityY * this.yMovement;
  }

}