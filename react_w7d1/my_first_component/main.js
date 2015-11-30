React.render(
  React.createElement('div', {}, 'Hello from React!'),
  document.getElementById('my-component')
);

var ClickCounter = React.createClass({
  getInitialState: function() {
      return {count: 0};
  },

  click: function(event) {
    event.preventDefault();
    this.setState({count: this.state.count + 1});
  },

  render: function () {
    return (
      React.createElement('div',{},
        React.createElement(
          'button',
          { onClick: this.click },
          'CLICK ME'
        ),
        React.createElement('span', {}, this.state.count)
      )
    );
  }
});

React.render(
  React.createElement(ClickCounter,{}, ""),
  document.getElementById('my-component')
);
