export class Enemy {

  x = 435;
  y = 100;
  width = 40;
  height = 40;
  velocityX = 4;
  velocityY = 2;
  xDirection = 1;
  yDirection = 1;
  alive = true;
  color = '#FF8800';
  lastShot;

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

    if (!this.isOnScreenLimitX() && !this.isOnScreenLimitY()) {
      this.manipulateYDirection(playerYLocation);
      this.manipulateXDirection(playerXLocation);
    }
  }

  moveInverseDirectionOf(hittedOne) {
    this.xDirection *= -1;
    this.yDirection *= -1;

    this.x += (this.velocityX + 3) * this.xDirection;
    this.y += (this.velocityY + 3) * this.yDirection;

    this.realocateIfIsOnScreenLimitX();
    this.realocateIfIsOnScreenLimitY();

    if (hittedOne) {
      hittedOne.moveInverseDirectionOf(null);
    }
  }

  realocateIfIsOnScreenLimitX() {
    if (this.isOnScreenLimitX()) {
      const startWidth = this.x - (this.width / 2);
      if (startWidth <= 0) {
        this.x = (this.width / 2);
      } else {
        this.x = canvas.width - (this.width / 2);
      }
    }
  }

  realocateIfIsOnScreenLimitY() {
    if (this.isOnScreenLimitY()) {
      if (this.y <= 1) {
        this.y = 1.1;
      } else {
        this.y = canvas.height - this.height;
      }
    }
  }

  manipulateYDirection(playerYLocation) {
    if (this.isUpOfPlayer(playerYLocation)) {
      if (this.x <= this.width) {
        this.yDirection = 1;
      }
    }

    if (this.isDownPlayer(playerYLocation)) {
      if ((this.x + this.width) >= (canvas.width - this.width)) {
        this.yDirection = -1;
      }
    }
  }

  manipulateXDirection(playerXLocation) {
    const isLeftPlayer = this.x < playerXLocation;
    const isRightPlayer = !isLeftPlayer;

    if (isLeftPlayer) {
      if (this.y <= this.height) {
        this.xDirection = 1;
      }
    }

    if (isRightPlayer) {
      if (this.y + this.height >= canvas.height - this.height) {
        this.xDirection = -1;
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

  endShooting() {
    this.lastShot = { x: this.x, y: this.y };
  }
  clearLastShoot() {
    this.lastShot = null;
  }
}