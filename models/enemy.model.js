export class Enemy {

  x = 435;
  y = 100;
  width = 54;
  height = 45;
  velocityX = 4;
  velocityY = 2;
  xDirection = 1;
  yDirection = 1;
  active = true;
  color = '#FF8800';
  lastShot;
  intangibilityToEnemys = 0;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(playerXLocation, playerYLocation) {
    this.x += this.velocityX * this.xDirection;
    this.y += this.velocityY * this.yDirection;

    if (this.isOnScreenLimitX()) {
      this.xDirection *= -1;
      this.realocateIfIsOnScreenLimitX();
    }

    if (this.isOnScreenLimitY()) {
      this.yDirection *= -1;
      this.realocateIfIsOnScreenLimitY();
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

  moveInverseDirectionOf(hittedOne) {
    if (hittedOne.xDirection == this.xDirection) {
      this.yDirection = -1 * hittedOne.yDirection;
    } else {
      this.yDirection *= -1;
      hittedOne.yDirection *= -1;
    }


    if (hittedOne.yDirection == this.yDirection) {
      this.xDirection = -1 * hittedOne.xDirection;
    } else {
      this.xDirection *= -1;
      hittedOne.xDirection *= -1;
    }

    this.realocateIfIsOnScreenLimitX();
    this.realocateIfIsOnScreenLimitY();
  }

  realocateIfIsOnScreenLimitX() {
    if (this.isOnScreenLimitX()) {
      const startWidth = this.x - (this.width / 2);
      if (startWidth <= 0) {
        this.x = (this.width / 2);
        this.xDirection = 1;
      } else {
        this.x = canvas.width - (this.width / 2);
        this.xDirection = -1;
      }
    }
  }

  realocateIfIsOnScreenLimitY() {
    if (this.isOnScreenLimitY()) {
      if (this.y <= 1) {
        this.y = 1.1;
        this.yDirection = 1;
      } else {
        this.y = canvas.height - this.height;
        this.yDirection = -1;
      }
    }
  }

  isOnScreenLimitX() {
    const endsWidth = this.x + (this.width / 2);
    const startWidth = (this.x - (this.width / 2));
    return endsWidth >= canvas.width || startWidth <= 0;
  }

  isOnScreenLimitY() {
    const endsHeight = this.y + this.height;
    const startHeight = this.y;
    return endsHeight >= canvas.height || startHeight <= 0;
  }

  isInRangeOf(x, y) {
    const enemyHitboxYStart = this.y;
    const enemyHitboxYEnd = this.y + this.height;

    const enemyHitboxXStart = this.x - (this.width / 2);
    const enemyHitboxXEnd = this.x + (this.width / 2);

    return (y > enemyHitboxYStart && y < enemyHitboxYEnd) && (x > enemyHitboxXStart && x < enemyHitboxXEnd);
  }

  isAbleToShoot(x, y) {
    const dif = Math.abs(this.x - x);
    return dif < 45 && this.isUpOfPlayer(y);
  }

  hasMinimunDistanceFromLastShot(x, y) {
    if (this.lastShot?.x) {
      const difX = Math.abs(this.lastShot.x - x);
      return difX > 45;
    } else return true;
  }

  isUpOfPlayer(playerYLocation) {
    return this.y < playerYLocation;
  }

  isDownPlayer(playerYLocation) {
    return this.y > playerYLocation;
  }

  isLeftPlayer(playerXLocation) {
    return this.x < playerXLocation;
  }

  isRightPlayer(playerXLocation) {
    return this.x > playerXLocation;
  }

  endShooting() {
    this.lastShot = { x: this.x, y: this.y };
  }
  clearLastShoot() {
    this.lastShot = null;
  }
}