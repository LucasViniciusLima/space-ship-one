export class Effect {
  x;
  y;
  height;
  width;
  timeOnScreen = 0;
  totalTimeOnScreen = 180;
  frames;
  id;
  active = true;

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
  }


}