Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {

  var content = JST["pokemonDetail"]({ pokemon: pokemon}); //renders template
  this.$pokeDetail.html(content); //place our content string on the page
  console.log(pokemon.toys());
  this.renderToysList(pokemon.toys());
};

Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  // Phase II
  this.$toyDetail.empty();

  // Phase IB
  var $target = $(event.currentTarget);

  var pokeId = $target.data('id');
  var pokemon = this.pokes.get(pokeId);

  this.renderPokemonDetail(pokemon);
};
