
export class Player {
  x = 435;
  y = 500;
  width = 25;
  height = 30;
  velocityX = 4;
  velocityY = 3;
  isMoving = false;
  xDirection = 0;
  yDirection = 0;
  color = '#FF11FF';

  move() {
    this.x += this.velocityX * this.xDirection;
    this.y += this.velocityY * this.yDirection;
  }

  directionUp() {
    this.yDirection = -1;
  }

  directionDown() {
    this.yDirection = 1;
  }

  directionLeft() {
    this.xDirection = -1;
  }

  directionRight() {
    this.xDirection = 1;
  }

  directionXStop() {
    this.xDirection = 0;
  }

  directionYStop() {
    this.yDirection = 0;
  }

  isMotionKey(key) {
    return (key.key == 'ArrowUp' || key.key == 'ArrowDown' || key.key == 'ArrowRight' || key.key == 'ArrowLeft');
  }

  clearPlayerMovement(key) {
    if (key.key == 'ArrowUp' || key.key == 'ArrowDown') {
      this.directionYStop();
    }
    if (key.key == 'ArrowRight' || key.key == 'ArrowLeft') {
      this.directionXStop();
    }
  }

  handleKeydownEvent(key) {
    switch (key.key) {
      case 'ArrowUp':
        this.directionUp();
        break;
      case 'ArrowDown':
        this.directionDown();
        break;
      case 'ArrowLeft':
        this.directionLeft();
        break;
      case 'ArrowRight':
        this.directionRight();
        break;
    }
  }



}