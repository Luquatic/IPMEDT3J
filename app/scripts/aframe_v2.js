// Old school manier om een JavaScript klasse te maken.
var RUBIKSCUBE = {

  // De assets HTML tag.
  $assets: $('#assets'),

  // De Rubik's Cube HTML tag.
  $rubiks_cube: $('#rubiks-cube'),

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
      return '<a-entity id="kubus-' + id + '-zijde-1" class="zijde" mixin="kleur-1-mixin geometry-1-mixin" position=" 0 1.6 -1"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-2" class="zijde" mixin="kleur-2-mixin geometry-1-mixin" position=" 0 1.6  1"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-3" class="zijde" mixin="kleur-3-mixin geometry-2-mixin" position=" 0 2.6  0"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-4" class="zijde" mixin="kleur-4-mixin geometry-2-mixin" position=" 0 0.6  0"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-5" class="zijde" mixin="kleur-5-mixin geometry-3-mixin" position=" 1 1.6  0"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-6" class="zijde" mixin="kleur-6-mixin geometry-3-mixin" position="-1 1.6  0"></a-entity>';
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

      // 6 random kleuren.
      return [
        '#B71234',
        '#FF5800',
        '#0246AD',
        '#009B48',
        '#FFD500',
        '#FFFFFF'
      ];
    },

    // Zet de kleuren van de Rubiks Cube.
    set_kleuren: function () {

      // De standaard kleuren.
      var kleuren = RUBIKSCUBE.functions.verkrijg_kleuren();

      // Kleuren mixins.
      var kleuren_mixins = [];

      // Loop door alle kleuren heen.
      for(var i = 0; i < kleuren.length; i++)
      {
        // Sla de kleur op.
        var kleur = kleuren[i];

        // Voeg de kleuren mixin toe.
        kleuren_mixins.push('<a-mixin id="kleur-' + (i + 1) + '-mixin" material="color: ' + kleur + '"></a-mixin>');
      }

      // Voeg de mixins toe aan de assets.
      RUBIKSCUBE.$assets.append(kleuren_mixins);
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

// Wacht totdat het document geladen is.
$(document).ready(function() {

  // Initialiseer de Rubik's Cube.
  RUBIKSCUBE.init(3);
});
