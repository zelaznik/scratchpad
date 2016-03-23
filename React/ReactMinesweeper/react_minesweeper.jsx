var React = require('react');
var ReactDOM = require('react-dom');

var Game = require('./components/game');

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Game rowCt={ 16 } colCt={ 30 } />,
    document.getElementById('main'));
});
