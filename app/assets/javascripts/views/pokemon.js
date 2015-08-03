Pokedex.Views.Pokemon = Backbone.View.extend({
  initialize: function () {
    this.$pokeList = this.$el.find('.pokemon-list');
    this.$pokeDetail = this.$el.find('.pokemon-detail');
    this.$newPoke = this.$el.find('.new-pokemon');
    this.$toyDetail = this.$el.find('.toy-detail');

    this.pokemon = new Pokedex.Collections.Pokemon();
    this.$pokeList.on('click', 'li.poke-list-item',
    this.selectPokemonFromList.bind(this));
  },

  selectPokemonFromList: function(event) {
      var pokemonId = parseInt($(event.currentTarget).data("id"));
      var pokemon = this.pokemon.find({id: pokemonId});
      this.addPokemonToList(pokemon);
      this.renderPokemonDetail(pokemon);
  },

  addPokemonToList: function(pokemon) {
    var $li = $('<li>').addClass('poke-list-item');
    $li.attr('name', pokemon.escape('name'));
    $li.attr('poke_type', pokemon.escape('poke_type'));
    $li.data('id', pokemon.escape('id'));
    $li.html(pokemon.escape('name'));
    this.$pokeList.append($li);
  },

  refreshPokemon: function() {
    var view = this;
    view.pokemon.fetch({
      success: (function() {
        view.pokemon.each (
          function(pokemon) {
          view.addPokemonToList(pokemon);
        }); //add single Pokemon
      }) // end success function
    }); // end fetch function.
  },

  renderPokemonDetail: function(pokemon) {
    this.$pokeDetail.children().remove();
    var $div = $('<div>').addClass('detail');
    var $img = $('<img>').attr('src', pokemon.escape("image_url"));
    var $ul = $('<ul>');
    this.$pokeDetail.append($div);
    $div.append($img);
    $div.append($ul);

    Object.keys(pokemon.attributes).forEach( function(key) {
      var $li = $('<li>').html(key + '=' + pokemon.escape(key));
      $ul.append($li);
    });

  }

});
