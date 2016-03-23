function singleton(constructor) {
  var _instance;
  function getInstance() { return _instance; }
  function setInstance(val) { _instance = val; }

  var name = constructor.name;
  var code = [
    'return function '+ name + '() {',
    '  if (getInstance() !== undefined)',
    '    throw new Error("Cannot create multiple instances of '+ name + '.");',
    '',
    '  setInstance(this);',
    '  constructor.apply(this, arguments);',
    '};',
  ].join("\n");

  console.log(code);
  var wrapper = new Function('constructor', 'getInstance', 'setInstance', code);
  var Wrapped = wrapper( constructor,   getInstance,   setInstance);
  Wrapped.prototype.getInstance = getInstance;

  if (name && !(this instanceof singleton))
    this[name] = Wrapped;

  return Wrapped;
}

singleton(
function NoneType() {

});
