var MenuExample = React.CreateClass({

  getInitialState: function () {
    return {focused: 0};
  },

  componentWillMount: function() {
    // Gets executed before the component gets mounted into the DOM

  },

  componentDidMount: function() {
    // right after it was mounted
  },

  componentWillUnmount: function() {
    // right before it unmounts

  },

  pressedButton: function(idx) {
    // The click handler will update the state with the index of the foc
    this.setState({focused: idx});


  },

  render: function() {
    return(
      <div>
        <ul>{this.props.items.map(function(m, idx) {
            var style = '';
            if (self.state.focused === idx) {
              style = focused;
              
            }
          })}</ul>
      </div>
    )
  }


});
