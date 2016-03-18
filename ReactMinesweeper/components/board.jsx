var React = require('react');
var Tile = require('./tile.jsx');

var Board = React.createClass({
  getInitialState: function() {
    return null;
  },

  render: function () {
    return(
      <table>
        <tbody>
          {this.tiles()}
        </tbody>
      </table>
    );
  },

  tiles: function() {
    var rows, tiles, r, c;

    rows = [];
    for (r=0; r < this.props.rowCt; r++) {
      tiles = [];
      for (c=0; c < this.props.colCt; c++) {
        tiles.push( <Tile board={this} row={r} col={c} /> );
      }
      rows.push( <Row cells={tiles} row={r} /> );
    }
    return rows;
  },

  updateGame: function() {
    throw new Error("Function Not Implemented");
  },

});

var Row = React.createClass({
  render: function() {
    return(
      <tr>
        {this.props.cells}
      </tr>
    );
  }
});

module.exports = Board;
