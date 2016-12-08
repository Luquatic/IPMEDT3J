// Wacht totdat het document geladen is.
$(document).ready(function () {

  // Pokedex
  var pokedex  = document.getElementById('pokedex-vr'),
      nummer   = document.getElementsByClassName('nummer'),
      totaal_nummer_vr = document.getElementById('nummer-totaal-vr'),
      totaal_nummer = "";

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

    // Toon het nummer.
    toonNummer();

    // Voeg het getal toe aan de string.
    totaal_nummer += getal;
  }

  function toonNummer() {

    // Toon het totale nummer.
    $(totaal_nummer_vr).attr('text', 'text:' + totaal_nummer)
  }


});
