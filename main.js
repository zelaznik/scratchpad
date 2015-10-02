
var AutoCompleter = React.createClass({
  getInitialState: function() {
    return {names: ['Abraham','Allan','Alsop','Anderson','Arnold','Avery','Bailey','Baker','Ball','Bell','Berry','Black','Blake','Bond','Bower','Brown','Buckland','Burgess','Butler','Cameron','Campbell','Carr','Chapman','Churchill','Clark','Clarkson','Coleman','Cornish','Davidson','Davies','Dickens','Dowd','Duncan','Dyer','Edmunds','Ellison','Ferguson','Fisher','Forsyth','Fraser','Gibson','Gill','Glover','Graham','Grant','Gray','Greene','Hamilton','Hardacre','Harris','Hart','Hemmings','Henderson','Hill','Hodges','Howard','Hudson','Hughes','Hunter','Ince','Jackson','James','Johnston','Jones','Kelly','Kerr','King','Knox','Lambert','Langdon','Lawrence','Lee','Lewis','Lyman','MacDonald','Mackay','Mackenzie','MacLeod','Manning','Marshall','Martin','Mathis','May','McDonald','McLean','McGrath','Metcalfe','Miller','Mills','Mitchell','Morgan','Morrison','Murray','Nash','Newman','Nolan','North','Ogden','Oliver','Paige','Parr','Parsons','Paterson','Payne','Peake','Peters','Piper','Poole','Powell','Pullman','Quinn','Rampling','Randall','Rees','Reid','Roberts','Robertson','Ross','Russell','Rutherford','Sanderson','Scott','Sharp','Short','Simpson','Skinner','Slater','Smith','Springer','Stewart','Sutherland','Taylor','Terry','Thomson','Tucker','Turner','Underwood','Vance','Vaughan','Walker','Wallace','Walsh','Watson','Welch','White','Wilkins','Wilson','Wright','Young'],
            remainingNames: []};
  },

  remainingNames: function(prefix) {
    var results = [];
    var n = prefix.length;
    if (n===0) {
      return results;
    }

    prefix = prefix.toLowerCase();
    this.state.names.forEach(function(name) {
      if (name.slice(0, n).toLowerCase() === prefix) {
        results.push(name);
      }
    });

    return results;
  },

  keyUp: function(event) {
    var prefix = event.currentTarget.value;
    this.setState({remainingNames: this.remainingNames(prefix)});
  },

  render: function() {
      return (
        <div>
          <textarea id='search-name' onKeyUp={this.keyUp}>MyTextBox</textarea>
          <ul>
            {
              this.state.remainingNames.map(function(result){
                return <li>{result}</li>;
              })
            }
          </ul>
      </div>
    );
  }

});

React.render(
  React.createElement(AutoCompleter, {}, ""),
  document.getElementById('widget')
);
