var React = require('react');

var Tile = React.createClass({
  WIDTH: 20,

  render: function () {
    return (
      <div className={'board-tile'} key={this.position()}>
      </div>
    );
  },

  position: (function() {
    var letters = [
     'A','B','C','D','E','F','G','H','I','J','K','L','M',
     'N','O','P','Q','R','S','T','U','W','W','X','Y','Z',
     'a','b','c','d'];
    return function() {
      return letters[this.props.col] + this.props.row;
    };
  })(),
});

module.exports = Tile;
