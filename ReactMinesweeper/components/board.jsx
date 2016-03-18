var React = require('react');
var Tile = require('./tile.jsx');

var Board = React.createClass({
  getInitialState: function() {
    return null;
  },

  render: function () {
    return (
      <div className='board-container'>
         {this.rows()}
      </div>
    );
  },

  updateGame: function() {
    throw new Error("Function Not Implemented");
  },

  rows: function() {
    var rows, tiles, r, c;

    rows = [];
    for (r=0; r < this.props.rowCt; r++) {
      tiles = [];
      for (c=0; c < this.props.colCt; c++) {
        tiles.push( <Tile board={this} row={r} col={c} key={'('+r+','+c+')'} /> );
      }
      rows.push( <Row cells={tiles} row={r} key={r} /> );
    }
    return rows;
  },

});


var Row = React.createClass({
  render: function() {
    return(
      <div className='board-row'>
        {this.props.cells}
      </div>
    );
  }
});

module.exports = Board;
