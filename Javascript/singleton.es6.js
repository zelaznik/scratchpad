function singleton() {
  if (this instanceof singleton) {
    throw new TypeError(`Cannot create instance of singleton.`);
  }

  var instance;
  return class Singleton {
    constructor() {
      if (instance) {
        throw new TypeError(`Cannot create multiple instances of ${this.constructor.name}.`);
      } else {
        instance = this;
      }
    }
    static instance() {
      return instance;
    }
  };
}

class Database extends singleton() {
  constructor() {
    console.log("Database");
    super();
  }
}

