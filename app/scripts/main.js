var HOMEPAGE = {

  // jQuery
  $: {

    // nieuw venster knop.
    knop_nieuw_venster: $('#nieuw-venster')
  },

  // Init
  init: function () {

    // Voeg de event listener toe.
    HOMEPAGE.functions.open_in_nieuw_venster();
  },

  // Functions
  functions: {

    // Open in nieuw venster.
    open_in_nieuw_venster: function () {

      // Open de VR beleving in een nieuw venster.
      HOMEPAGE.$.knop_nieuw_venster.click(function () {

        // URL
        var url = $(this).attr('data-link');

        // Open de A Frame pagina in een apart tabblad.
        window.open(url);
      });
    }
  }
};

// Wacht totdat het document geladen is.
$(document).ready(function() {

  // Initialiseer de homepage.
  HOMEPAGE.init();
});
