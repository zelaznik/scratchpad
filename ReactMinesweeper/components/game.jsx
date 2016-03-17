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
      <div>
        <p>My name is {this.state.name}.</p>
        <p>This is my game&apos;s board.</p>
        <Board game={this}/>
      </div>
    );
  }
});

module.exports = Game;
