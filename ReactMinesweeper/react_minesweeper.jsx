var React = require('react');
var ReactDOM = require('react-dom');

var Game = require('./components/game');

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Game rowCt={4} colCt={5} />,
    document.getElementById('main'));
});
