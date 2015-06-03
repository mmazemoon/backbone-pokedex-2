Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  tagName: "div",
  events: {
    "click li" : "selectPokemonFromList"
  },

  initialize: function (options) {
    this.pokes = new Pokedex.Collections.Pokemon();
    this.pokes.fetch();
    this.listenTo(this.pokes, "add", this.addPokemonToList);
    this.listenTo(this.pokes, "sync", this.render);
    // eventListener from model to collection
  },

  addPokemonToList: function (pokemon) {
    var content = JST["pokemonListItem"]({ pokemon: pokemon });
    this.$el.append(content);
  },

  refreshPokemon: function (options) {

  },

  render: function () {
    this.$el.empty();
    this.pokes.each((function(pokemon) {
      this.addPokemonToList(pokemon);
    }).bind(this));
  },

  selectPokemonFromList: function (event) {
    var pokemon = this.pokes.get($(event.currentTarget).data("id"));
    this.pokemonDetail = new Pokedex.Views.PokemonDetail({ model: pokemon });
    this.pokemonDetail.refreshPokemon();
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
  },

  refreshPokemon: function (options) {
    var that = this;
    this.model.fetch({
      success: function(){
        that.render();
      }
    })
  },

  render: function () {
    this.$el.html(JST["pokemonDetail"]({ pokemon: this.model }));
    this.model.toys().each((function(toy){
      var content = JST["toyListItem"]({toy: toy});
      this.$el.append(content);
    }).bind(this));
    $("#pokedex .pokemon-detail").html(this.$el);
  },

  selectToyFromList: function (event) {
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
  }
});

// backbone $el === empty div #default
// this.$(cssSelector) #runs Jquery find method inside $el of views

$(function () {
  var pokemonIndex = new Pokedex.Views.PokemonIndex();
  pokemonIndex.refreshPokemon();
  $("#pokedex .pokemon-list").html(pokemonIndex.$el);
});
