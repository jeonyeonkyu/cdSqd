const Straight = require('./Straight.js');

class Triangle extends Straight {
  getTriangleArea([first, second, third]) {
    const side1 = super.getDistanceBetweenTwoPoints([first, second]);
    const side2 = super.getDistanceBetweenTwoPoints([first, third]);
    const side3 = super.getDistanceBetweenTwoPoints([second, third]);
    const half = (side1 + side2 + side3) / 2;
    return Math.sqrt(half * (half - side1) * (half - side2) * (half - side3));
  }
}

module.exports = Triangle;