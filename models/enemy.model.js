export class Enemy {

  x = 435;
  y = 100;
  width = 25;
  height = 25;
  velocityX = 4;
  velocityY = 2;
  xDirection = 1;
  yDirection = 1;
  alive = true;
  color = '#FF8800';

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(playerXLocation, playerYLocation) {
    this.x += this.velocityX * this.xDirection;
    this.y += this.velocityY * this.yDirection;

    if (this.isOnScreenLimitX()) {
      this.xDirection *= -1;
    }

    if (this.isOnScreenLimitY()) {
      this.yDirection *= -1;
    }

    if (!this.isOnScreenLimitX() && !this.isOnScreenLimitY()) {
      this.manipulateYDirection(playerYLocation);
      this.manipulateXDirection(playerXLocation);
    }
  }

  moveInverseDirectionOf(hittedOne) {
    this.xDirection *= -1;
    this.yDirection *= -1;

    this.x += (this.velocityX + 2) * this.xDirection;
    this.y += (this.velocityY + 2) * this.yDirection;

    this.realocateIfIsOnScreenLimitX();
    this.realocateIfIsOnScreenLimitY();
  }

  realocateIfIsOnScreenLimitX() {
    if (this.isOnScreenLimitX()) {
      if (this.x <= 0) {
        this.x = 1;
      } else {
        this.x = canvas.width - (x.width * 2) - 1;
      }
    }
  }

  realocateIfIsOnScreenLimitY() {
    if (this.isOnScreenLimitY()) {
      if (this.y <= 0) {
        this.y = 1;
      } else {
        this.y = canvas.height - this.height - 1;
      }
    }
  }

  manipulateYDirection(playerYLocation) {
    const isUpPlayer = this.y < playerYLocation;
    const isDownPlayer = !isUpPlayer;

    if (isUpPlayer) {
      if (this.x <= this.width) {
        this.yDirection = 1;
      }
    }

    if (isDownPlayer) {
      if (this.x + this.width >= canvas.width - this.width) {
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
    const startHeight = (this.y - (this.height / 2));
    return endsHeight >= canvas.height || startHeight <= 0;
  }

  isInRangeOf(x, y) {
    const enemyHitboxYStart = this.y;
    const enemyHitboxYEnd = this.y + this.height;

    const enemyHitboxXStart = this.x - (this.width / 2);
    const enemyHitboxXEnd = this.x + (this.width / 2);

    return (y > enemyHitboxYStart && y < enemyHitboxYEnd) && (x > enemyHitboxXStart && x < enemyHitboxXEnd);
  }

}