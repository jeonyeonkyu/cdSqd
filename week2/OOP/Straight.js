class Straight {
  getDistanceBetweenTwoPoints([first, second]) {
    return Math.sqrt((first.x - second.x) ** 2 + (first.y - second.y) ** 2);
  }
}
module.exports = Straight;