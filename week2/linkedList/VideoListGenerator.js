class VideoListGenerator {
  constructor() {
    this.head = null;
    this.next = null;
    this.tail = null;
    this.size = 0;
  }

  add(node) {
    if (this.head === null) {
      this.head = node;
    } else {
      let previousNode = this.tail;
      previousNode.next = node;
    }
    this.tail = node;
    this.size++;
  }

}