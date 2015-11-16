(function() {
  var JSA = window.JSA || {};

  var LRUCache = JSA.LRUCache = function LRUCache(limit) {
    if (limit < 2) {
      throw "Minimum size of LRU Cache is 2";
    }
    this.limit = limit || 500;

    var front = this.front = {};
    var back = this.back = {};
    front.prev = back;
    back.next = front;

    this.length = 2;
    this.cache = {};
  };

  LRUCache.prototype.get = function(key) {
    return this.cache[key];
  };

  LRUCache.prototype.set = function(key, value) {
    // Either fetch node from cache or make new one.
    // Then rewire the adjacent nodes
    if (key in this.cache) {
      var node = this.cache[key];
      node.value = value;
      node.prev.next = node.next;
      node.next.prev = node.prev;
    } else {
      var node = {
        key: key, value: value,
        prev: this.front, next: {}
      };
      this.cache[key] = node;
      this.length++;
    }

    // Set the current node to the front
    // Remove any nodes from the back
    node.prev = this.front;
    this.front.next = node;
    this.front = node;
    while (this.length > this.limit) {
      var old = this.back;
      this.back = this.back.next;
      delete this.cache[old.key];
      this.length--;
    }
  };

})();