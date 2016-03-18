var React = require('react');

var Tile = React.createClass({
  render: function () {
    return (
      <td>{this.letters[this.props.col] + this.props.row}</td>
    );
  },
});

Tile.prototype.letters = [
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P'
];

module.exports = Tile;
