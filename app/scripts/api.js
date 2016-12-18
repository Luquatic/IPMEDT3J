// Kleur.
var KLEUR = {

  // API url.
  api_url: "http://www.colr.org/json/colors/random/",

  // Init functie.
  init: function () {},

  // Alle functies.
  functions: {

    // Verkrijg een X aantal kleuren.
    verkrijgKleuren: function(aantalKleuren) {

      return new Promise(function (resolve, reject) {

        // Doe een API call.
        $.ajax({

          // De URL.
          url: KLEUR.api_url + aantalKleuren,

          // Het is een GET call.
          method: 'GET',

          // We willen JSON terug krijgen.
          dataType: 'json',

          // Als de call met succes afgerond is.
          success: function (response) {

            // Doe resolve.
            resolve(response);
          },

          // API API API toch....
          error: function (jqXHR, textStatus, errorThrown) {
            reject(false);
          }
        });
      });
    }
  }
};

// Wacht G
$(document).ready(function () {

  // Verkrijg 6 kleuren.
  KLEUR.functions.verkrijgKleuren(6).then(function (kleuren) {});
});
