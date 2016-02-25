function Queue() {
  this.head = this.tail = {};
  this.length = 0;
}

Queue.prototype = (function() {
  function push(item) {
    var node = {item: item};
    this.tail.next = node;
    this.tail = node;
    this.length++;
  }

  function pop() {
    var node = this.head.next;
    var item = node.item;
    delete node.item;

    this.head = node;
    this.length--;
    return item;
  }

  return {
    get push() { return push.bind(this); },
    get pop() { return pop.bind(this); }
  };

})();
