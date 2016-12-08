// Wacht totdat het document geladen is.
$(document).ready(function () {

  // Pokedex
  var pokedex          = document.getElementById('pokedex-vr'),
      go               = document.getElementById('go-vr'),
      naam_vr          = document.getElementById('naam-vr'),
      totaal_nummer_vr = document.getElementById('nummer-totaal-vr'),
      nummer           = document.getElementsByClassName('nummer'),
      pokemon_vr       = document.getElementById('pokemon-vr'),
      totaal_nummer    = "";

  // Ga door elk nummer heen.
  for(var i = 0; i < nummer.length; i++) {

    // Voeg een event listener toe aan elk nummer.
    document.getElementsByClassName('nummer')[i].addEventListener('mouseenter', function() {

      // Verkrijg het getal.
      toetsGetal(this)
    });
  }

  function toetsGetal(nummer) {

    // Verkrijg het getal.
    var getal = $(nummer).attr('data-nummer');

    // Voeg het getal toe aan de string.
    totaal_nummer += getal;

    // Toon het nummer.
    toonNummer(totaal_nummer);
  }

  function toonNummer(nummer) {

    // Toon het totale nummer.
    $(totaal_nummer_vr).attr('text', 'text:' + nummer)
  }

  goClicked();

  function goClicked() {
    go.addEventListener('mouseenter', function () {
      if (totaal_nummer == 0) {
        totaal_nummer = 1
      } else  if (totaal_nummer >= 150) {
        totaal_nummer = 150
      }

      apiCall(totaal_nummer);
      totaal_nummer = "";

      toonNummer(totaal_nummer);
    });
  }

  function apiCall(id) {
    $.ajax({
      url: 'http://pokeapi.co/api/v2/pokemon/' + id + '/',
      method: 'GET',
      dataType: 'json',
      success: function (msg) {
        var afbeelding = msg.sprites.front_default;
        var naam = msg.species.name;

        toonPokemon(afbeelding, naam);
      }
    })
  }

  function toonNaam(naam) {
    $(naam_vr).attr('text', 'text:' + naam)
  }

  function toonAfbeelding(afbeelding) {
    $(pokemon_vr).attr('src', afbeelding)
  }

  function toonPokemon(afbeelding, naam) {
    toonNaam(naam);
    toonAfbeelding(afbeelding);
  }


});
