function NodeData(node) {
  this.data = node;
  this.next = null;
}

class VideoListGenerator {
  constructor() {
    this.head = null;
    this.next = null;
    this.tail = null;
    this.size = 0;
  }

  addFirst(node) {
    const nodeData = new NodeData(node);
    nodeData.next = this.head;
    if (this.head === null) {
      this.tail = nodeData;
    }
    this.head = nodeData;
    this.size++;
  }

  addLast(node) {
    const nodeData = new NodeData(node);
    if (this.head === null) {
      return this.addFirst(node);
    } else {
      this.tail.next = nodeData;
      this.tail = nodeData;
      this.size++;
    }
  }

  insert(node, order = 0) {
    if (order === 0) {
      return this.addFirst(node);
    } else if (order >= this.size) {
      return this.addLast(node);
    } else {
      const nodeData = new NodeData(node);
      let nextNode = this.head.next;
      let previousNode = this.head;
      for (let i = 0; i < order - 1; i++) {
        nextNode = nextNode.next;
        previousNode = previousNode.next;
      }
      nodeData.next = nextNode;
      previousNode.next = nodeData;
      this.size++;
    }
  }

  deleteFromId(id) {
    if (this.size === 0) return;
    if (this.head.data.id === id) {
      this.head = this.head.next;
      this.size--;
      return;
    }
    let nextNode = this.head.next;
    let currentNode = this.head;
    while (nextNode.data.id !== id) {
      nextNode = nextNode.next;
      currentNode = currentNode.next;
      if (nextNode === null) {
        return;
      }
    }
    currentNode.next = nextNode.next;
    nextNode = null;
  }
}
const videoListGenerator = new VideoListGenerator();
videoListGenerator.addLast('aa');

videoListGenerator.addFirst('gg');
videoListGenerator.addLast('cc');
videoListGenerator.addLast('dd');
videoListGenerator.insert('qq', 0)

// console.dir(videoListGenerator.head, { depth: null });
videoListGenerator.deleteFromId('qq')
console.dir(videoListGenerator.head, { depth: null });