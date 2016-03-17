var React = require('react');

var Board = React.createClass({
  render: function () {
    return(
      <div>Board for {this.props.game.state.name + ''}</div>
    );
  }
});

module.exports = Board;
