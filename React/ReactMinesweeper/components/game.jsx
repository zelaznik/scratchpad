var React = require('react');
var Board = require('./board.jsx');

var Game = React.createClass({
  getInitialState: function() {
    return {
      name: 'Steve',
      board: new Board()
    };
  },

  render: function () {
    return(
      <Board board={this.state.board}
             rowCt={this.props.rowCt}
             colCt={this.props.colCt}
             updateGame={'Can\'t pass a function as a prop.'}
      />
    );
  },
});


module.exports = Game;
