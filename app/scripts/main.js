var HOMEPAGE = {

  // jQuery
  $: {

    // nieuw venster knop.
    knop_nieuw_venster: $('#nieuw-venster'),
  },

  // Init
  init: function () {

    // Voeg de event listener toe.
    HOMEPAGE.functions.voeg_event_listeners_toe();

    // Verander de kleuren.
    HOMEPAGE.functions.verander_kleuren();
  },

  // Functions
  functions: {


    // Voeg de event listeners toe.
    voeg_event_listeners_toe: function () {

      // Open de VR beleving in een nieuw venster.
      HOMEPAGE.$.knop_nieuw_venster.click(function () {

        // Open in nieuw venster.
        HOMEPAGE.functions.open_in_nieuw_venster(this);
      });
    },

    // Open in nieuw venster.
    open_in_nieuw_venster: function (knop) {

      // URL
      var url = $(knop).attr('data-link');

      // Open de A Frame pagina in een apart tabblad.
      window.open(url);
    },

    verkrijg_parameter: function (naam) {

      // De url
      var url = window.location.href;

      // Haal het op bij de naam.
      var resultaten = new RegExp('[\\?&]' + naam + '=([^&#]*)').exec(url);

      // Controleer of er wat opgehaald kan worden.
      if (!resultaten) { return null; }

      // Geef het resultaat terug.
      return decodeURIComponent(resultaten[1]) || null;
    },

    // Verander de kleuren.
    verander_kleuren: function () {

      // Ga door alle kleuren heen.
      for(var x = 1; x <= 6; x++) {

        // Verkrijg de kleur.
        var kleur = HOMEPAGE.functions.verkrijg_parameter('kleur-' + x);

        // Controleer of de kleur bestaat.
        if(kleur)
        {
          // Verander de kleur van de cirkel.
          $('.kleur-' + x).css('background-color', kleur);
        }
      }
    }
  }
};

// Wacht totdat het document geladen is.
$(document).ready(function() {

  // Initialiseer de homepage.
  HOMEPAGE.init();
});
