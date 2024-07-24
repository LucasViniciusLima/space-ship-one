
export class Player {
  x = 435;
  y = 500;
  width = 84.7;
  height = 60;
  velocityX = 7;
  velocityY = 3;
  isMoving = false;
  xDirection = 0;
  yDirection = 0;
  color = '#FF11FF';
  life = 3;
  active = true;
  intangibilityToEnemys = 0;
  specialShotCountingRemaining = 4;
  hasSpecialShot = false;
  specialShotsEndsIn = 0;
  deaths = 0;

  move() {
    if (!this.active) return;

    this.decreaseIntangibilityToEnemys();

    let newXValue = this.x + (this.velocityX * this.xDirection);
    let newYValue = this.y + (this.velocityY * this.yDirection);

    if (newXValue <= 900 && newXValue > 0) {
      this.x = newXValue;
    }

    if (newYValue <= 600 && newYValue > 0) {
      this.y = newYValue;
    }

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

  increaseHealthPoint() {
    this.life += 1;
  }

  hittedByEnemy() {

    this.life -= 1;
    this.setIntangibleToEnemies(36);
    this.clearSpecialShotCountingRemaining();

    if (this.life <= 0) {
      this.active = false;
      this.deaths++;
    }
  }

  setIntangibleToEnemies(seconds) {
    this.intangibilityToEnemys = seconds;
  }

  isIntangibleToEnemies() {
    return this.intangibilityToEnemys > 0;
  }

  decreaseIntangibilityToEnemys() {
    if (this.intangibilityToEnemys > 0) {
      this.intangibilityToEnemys -= 1;
    }
  }

  clearSpecialShotCountingRemaining() {
    this.specialShotCountingRemaining = 4;
    this.hasSpecialShot = false;
  }

  decreaseSpecialShotCountingRemaining() {
    this.specialShotCountingRemaining--;

    if (this.specialShotCountingRemaining <= 0) {
      this.hasSpecialShot = true;
      return;
    }
  }

}