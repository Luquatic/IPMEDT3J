// Old school manier om een JavaScript klasse te maken.
var RUBIKSCUBE = {

  // De assets HTML tag.
  $assets: $('#assets'),

  // De Rubik's Cube HTML tag.
  $rubiks_cube: $('#rubiks-cube'),

  // API url.
  api_url: "http://www.colr.org/json/colors/random/",

  // Init function.
  init: function (grid) {

    // Voeg de kleuren toe.
    RUBIKSCUBE.functions.set_kleuren();

    // Voeg de geometry toe.
    RUBIKSCUBE.functions.set_geometry();

    // Voeg de Rubik's Cube toe.
    RUBIKSCUBE.functions.voeg_rubiks_cube_toe(grid);
  },

  // Functions
  functions: {

    // Verkijg de 6 zijdes.
    verkrijg_zijdes: function (id) {

      // Maak de 6 zijdes als entities.
      return '<a-entity id="kubus-' + id + '-zijde-1" class="zijde" mixin="kleur-init-mixin kleur-1-mixin geometry-1-mixin" position=" 0 1.6 -1"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-2" class="zijde" mixin="kleur-init-mixin kleur-2-mixin geometry-1-mixin" position=" 0 1.6  1"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-3" class="zijde" mixin="kleur-init-mixin kleur-3-mixin geometry-2-mixin" position=" 0 2.6  0"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-4" class="zijde" mixin="kleur-init-mixin kleur-4-mixin geometry-2-mixin" position=" 0 0.6  0"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-5" class="zijde" mixin="kleur-init-mixin kleur-5-mixin geometry-3-mixin" position=" 1 1.6  0"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-6" class="zijde" mixin="kleur-init-mixin kleur-6-mixin geometry-3-mixin" position="-1 1.6  0"></a-entity>';
    },

    // Verkijg de blender kubus.
    verkrijg_blender_kubus: function (id) {

      // Verkijg het object als HTML tag.
      return '<a-obj-model id="kubus-' + id + '-blender" class="kubus-blender" mixin="kubus-mixin" position="0 1.6 0"></a-obj-model>';
    },

    // Verkijg een enkele kubus.
    verkrijg_enkele_kubus: function (id, x, y, z) {

      // Verkrijg een enkele Rubik's Cube kubus met het opgegeven ID en positie.
      return '<a-entity id="kubus-' + id + '" class="kubus" position="' + x + ' ' + y + ' ' +  z + '">' +
                RUBIKSCUBE.functions.verkrijg_blender_kubus(id) +
                RUBIKSCUBE.functions.verkrijg_zijdes(id) +
             '</a-entity>'
    },

    // Verkrijg de kleuren.
    verkrijg_kleuren: function () {

      // Doe een promise.
      return new Promise(function(resolve) {

        // Haal 10 random kleuren op.
        RUBIKSCUBE.functions.verkrijg_kleuren_van_api(10).then(function (response) {

          // Lijst met kleuren.
          var kleuren = response.matching_colors;

          // Verkijg alleen gevulde kleuren.
          kleuren = kleuren.filter(Boolean);

          // Voeg overal een # aan toe.
          kleuren = kleuren.map(function (code){
            return '#' + code;
          });

          // Pak alleen 6 kleuren.
          kleuren = kleuren.slice(0, 6);

          // Geef de kleuren.
          resolve(kleuren);
        });
      });
    },

    // Verkrijg een X aantal kleuren.
    verkrijg_kleuren_van_api: function(aantal_kleuren) {

      // Creeer promise.
      return new Promise(function (resolve, reject) {

        // Doe een API call.
        $.ajax({

          // De URL.
          url: RUBIKSCUBE.api_url + aantal_kleuren,

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
          error: function () {

            // Geef een fout terug.
            reject(false);
          }
        });
      });
    },

    // Zet de kleuren van de Rubiks Cube.
    set_kleuren: function () {

      // De standaard kleuren.
      RUBIKSCUBE.functions.verkrijg_kleuren().then(function(kleuren) {

        // Kleuren mixins.
        var kleuren_mixins = [];

        for(var kleur in kleuren) {
          if (kleuren.hasOwnProperty(kleur)) {

            // ID.
            var id = Object.keys(kleuren).indexOf(kleur);

            // Voeg de kleuren mixin toe.
            kleuren_mixins.push('<a-mixin id="kleur-' + id + '-mixin" material="color: ' + kleuren[kleur] + '"></a-mixin>');
          }
        }

        // Voeg de mixins toe aan de assets.
        RUBIKSCUBE.$assets.append(kleuren_mixins);
      });
    },

    // Voeg de geometries van de Rubik's Cube toe aan de assets.
    set_geometry: function () {

      // Voeg aan het assets HTML element de volgende HTML toe.
      RUBIKSCUBE.$assets.append(
        '<a-mixin id="geometry-1-mixin" class="geometry-mixin" geometry="depth:0.10; height:1.75; width:1.75;"></a-mixin>',
        '<a-mixin id="geometry-2-mixin" class="geometry-mixin" geometry="depth:1.75; height:0.10; width:1.75;"></a-mixin>',
        '<a-mixin id="geometry-3-mixin" class="geometry-mixin" geometry="depth:1.75; height:1.75; width:0.10;"></a-mixin>'
      );
    },

    // Voeg de Rubik's Cube toe.
    voeg_rubiks_cube_toe: function (grid) {

      // Loop door X heen.
      for (var x = 0; x < grid; x ++) {

        // Loop door Y heen.
        for(var y = 0; y < grid; y++) {

          // Loop door Z heen.
          for(var z = 0; z < grid; z++) {

            // Formule voor de X, Y en Z variabelen.
            var x_pos = -(grid - 1) + (x * 2),
                y_pos = -(grid - 1) + (y * 2),
                z_pos = -(grid * 5) + (z * 2),
                id    = x + y + z + 1;

            // Voeg de box toe.
            RUBIKSCUBE.$rubiks_cube.append(RUBIKSCUBE.functions.verkrijg_enkele_kubus(id, x_pos, y_pos, z_pos));
          }
        }
      }
    }
  }
};

// Old school manier om een JavaScript klasse te maken.
var OPTIES = {

  // De scene als Jquery object.
  $scene: $('#scene'),

  // Init functie.
  init: function () {

    // Voeg het optie paneel toe aan de body.
    OPTIES.functions.voeg_paneel_toe(12.5, 1.5, -12.5);
  },

  // Alle functies.
  functions : {

    //  Voeg paneel toe.
    voeg_paneel_toe: function (x, y, z) {

      // Voeg het optie paneel toe aan de scene.
      OPTIES.$scene.append('<a-entity position="' + x + " " + y + " " + z + '" mixin="kleur-2-mixin" geometry="depth:0.1; height:10; width:7.5"></a-entity>');
    }
  }
};

// Old school manier om een JavaScript klasse te maken.
var PIJLEN = {

};

// Wacht totdat het document geladen is.
$(document).ready(function() {

  // Initialiseer de Rubik's Cube.
  RUBIKSCUBE.init(3);

  // Initialiseer de opties.
  OPTIES.init();
});
