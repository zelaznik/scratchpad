mkdir $1
cd $1
atom .

touch webpack.config.js

echo """\
module.exports = {
  context: __dirname,
  entry: './main.jsx',
  output: {
    path: './',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
""" > webpack.config.js

touch .gitignore
echo """\
node_modules/
bundle.js*
""" > .gitignore

touch main.jsx
echo """\
(function() {
  'use strict';

  var React = require('react');
  var ReactDOM = require('react-dom');

  var MyComponent = React.createClass({
    render: function () {
      return(
      <div>INSERT CONTENT HERE</div>
      );
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    alert('Please replace the $(document).ready handler with your own code.');
    ReactDOM.render(
      <MyComponent />,
      document.getElementById('main'));
  });

})();
""" > main.jsx

touch styles.css

touch index.html
echo """\
<html>
  <head>
    <title>React App</title>
    <link href='styles.css' type='text/css' rel='stylesheet'>
    <script src='bundle.js'    type='text/javascript'></script>
  </head>
  <body>
    <div id='main'></div>
  </body>
</html>
""" > index.html

npm init --yes
npm install --save react
npm install --save react-dom
npm install --save webpack

npm install --save babel-core
npm install --save babel-loader
npm install --save babel-preset-react
git init
git add -A;
git commit -m 'Blank React Project'

webpack
webpack --progress --colors --watch
