function not(v) { return !v; }

(function() {
  'use strict';
  var React = require('react');
  var ReactDOM = require('react-dom');

  var Picture = React.createClass({
    clickHandler: function() {
      this.props.onClick(this.props.id);
    },
    render: function() {
      var cls = 'picture ' + (this.props.favorite ? 'favorite' : '');
      return (
        <div className={cls} onClick={this.clickHandler}>
          <img src={this.props.src} width='209' title={this.props.title}></img>
       </div>
      );
    },
  });

  var PictureList = React.createClass({
    getInitialState: function() {
      return { pictures: [], favorites: []};
    },
    componentDidMount: function() {
      var self = this;
      var baseUrl = 'https://api.instagram.com/v1/media/popular';
      var url = baseUrl + '?client_id=' + this.props.apiKey + '&callback=?';
      $.getJSON(url, function(result) {
        if ( not(result) || not(result.data) || not(result.data.length) ) {
          return;
        }
        var pictures = result.data.map(function(p) {
          return {
            id: p.id,
            url: p.link,
            src: p.images.low_resolution.url,
            title: p.caption ? p.caption.text : '',
            favorite: false,
          };
        });
        self.setState( { pictures: pictures });
      });
    },

    pictureClick: (function(id) {
      'adds the clicked picture to list of favorites';

      var favorites = this.state.favorites;
      var pictures =  this.state.pictures;
      var self = this;
      for (var i=0; i<pictures.length; i++) {
        if (pictures[i].id == id) {
          if (pictures[i].favorite)
            return self.favoriteClick(id);

          favorites.push(pictures[i]);
          pictures[i].favorite = true;
          break;
        }
      }
      this.setState({pictures: pictures, favorites: favorites});
    }),

    favoriteClick: function(id) {
      var favorites = this.state.favorites;
      var pictures =  this.state.pictures;
      for (var i=0; i< favorites.length; i++) {
        if (+favorites[i].id === +id) {
          favorites.splice(i, 1);
          break;
        }
      }
      for (i=0; i < pictures.length; i++) {
        if (+pictures[i].id === +id) {
          pictures[i].favorite = false;

          break;
        }
      }
      this.setState({pictures: pictures, favorites: favorites});
    },

    render: function() {
      var self = this;
      var pictures = this.state.pictures.map(function(p, index) {
        return <Picture id={p.id}   key={[p.id,index].join('.')}
                        src={p.src} title={p.title} favorite={true}
                        onClick={self.pictureClick} />
      });
      if (not(pictures.length)) {
        pictures = <p>Loading images...</p>;
      }
      var favorites = this.state.favorites.map(function(p, index) {
        return <Picture id={p.id}   key={[p.id,index].join('.')}
                        src={p.src} title={p.title} favorite={true}
                        onClick={self.favoriteClick} />
      });
      if (not(favorites.length)) {
        favorites = <p>Click and image to mark it as a favorite.</p>;
      }
      return (
        <div>
          <h1>Popular Instagram Pics</h1>
          <div className="pictures"> {pictures} </div>
          <h1>Your Favorites</h1>
          <div className="favorites"> {favorites} </div>
        </div>
      );
    },
  }));

  document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <PictureList apiKey="642176ece1e7445e99244cec26f4de1f" />,
        document.getElementById('main')
    );
  });

})();
