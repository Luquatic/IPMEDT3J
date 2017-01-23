var HOMEPAGE = {

  // jQuery
  $: {

    // nieuw venster knop.
    knop_nieuw_venster: $('#nieuw-venster'),
  },

  // Scene
  scene: document.querySelector('a-scene'),

  // Init
  init: function () {

    // Voeg de event listener toe.
    HOMEPAGE.functions.voeg_event_listeners_toe();
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

    // Open de VR omgeving in fullscreen.
    open_in_full_screen: function () {

      // Controleer of de VR scene geladen is.
      if (HOMEPAGE.scene.isLoaded)
      {
        // Open de VR omgeving in fullscreen.
        HOMEPAGE.scene.enterVR();
      }
    }
  }
};

// Wacht totdat het document geladen is.
$(document).ready(function() {

  // Initialiseer de homepage.
  HOMEPAGE.init();
});
