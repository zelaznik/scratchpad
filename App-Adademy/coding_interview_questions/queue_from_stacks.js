(function(context) {
  'use strict';

  context.Stack = function Stack() {
    this._array = [];
  };

  Stack.prototype = {
    get length() {
      return this._array.length;
    },

    push: function(value) {
      this._array.push(value);
    },

    pop: function() {
      if (this.length < 1) {
        throw new Error("Cannot pop from empty collection.");
      }
      return this._array.pop();
    }
  };

  context.Queue = function Queue() {
    this._in = new Stack();
    this._out = new Stack();
  };

  Queue.prototype = {
    get length() {
      return this._in.length + this._out.length;
    },

    _syphen: function() {
      var inStack = this._in;
      var outStack = this._out;
      for (var i=0, n=inStack.length; i<n; i++) {
        outStack.push(inStack.pop());
      }
    },

    push: function(value) {
      this._in.push(value);
    },

    pop: function() {
      if (this._out.length === 0) {
        this._syphen();
      }
      return this._out.pop();
    }
  };

})(this);
