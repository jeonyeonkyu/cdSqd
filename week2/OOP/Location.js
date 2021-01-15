class Location {
  constructor(xPos, yPos) {
    this.MAX_POSITION = 24;
    this.x = xPos;
    this.y = yPos;
  }
  get x() {
    return this.xPosition;
  }
  get y() {
    return this.yPosition;
  }
  set x(value) {
    this.xPosition = this.checkSize(value) ? value : -1;
  }
  set y(value) {
    this.yPosition = this.checkSize(value) ? value : -1;
  }
  checkSize(value) {
    return value <= this.MAX_POSITION ? true : false;
  }
}
module.exports = Location;