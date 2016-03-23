var React = require('react');
var ReactDOM = require('react-dom');

var MenuExample = React.createClass({
  getInitialState: function() {
    return {focused: 0};
  },
  clicked: function(index) {
    this.setState({focused: index});
  },
  render: function() {
    var self = this;
    return (
      <div>
        <ul>
          {this.props.items.map(function(m, index) {
            var style = '';
            if (self.state.focused == index) {
              style = 'focused';
            }
            return (
              <li className={style} key={index} onClick={self.clicked.bind(self, index)}>
                {m}
              </li> );
          })}
        </ul>

        <p> Selected: {this.props.items[this.state.focused]}</p>
      </div>
    );
  },
});

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <MenuExample items={ ['Home', 'Services', 'About', 'Contact us'] } />,
    document.getElementById('main')
  );
});
