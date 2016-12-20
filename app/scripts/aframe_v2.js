// Kleuren klasse.
var KLEUREN = {

  // JQuery selectors:
  $: {

    // Assets
    assets: $('#assets')
  },

  // API url.
  api_url: "http://www.colr.org/json/colors/random/",

  // Initialize functie.
  init: function (aantal_paletten) {

    // Maak alle kleuren mixins aan.
    KLEUREN.functions.maak_kleuren_mixins_aan(aantal_paletten)
  },

  // Functies.
  functions: {

    // Maak kleuren mixins aan.
    maak_kleuren_mixins_aan: function (aantal_paletten) {

      // Loop door elke kleur heen.
      return new Promise(function (resolve) {

        // Voeg de kleuren toe.
        KLEUREN.functions.verkrijg_gegenereerde_kleuren(aantal_paletten).then(function (kleuren_paletten) {

          // Kleuren mixins.
          var kleuren_mixins = [];

          // Loop door elk kleurenpalet heen.
          for (var x = 0; x < kleuren_paletten.length; x++) {

            // Voeg een comment toe aan de HTML.
            kleuren_mixins.push('<!-- PALET ' + (x + 1) + ' -->');

            // Loop door elke kleur heen.s
            for(var y = 0; y < kleuren_paletten[x].length; y++) {

              // Sla het index nummer van het palet en de kleur op.
              var palet_code = kleuren_paletten.indexOf(kleuren_paletten[x]) + 1,
                kleur_code = kleuren_paletten[x].indexOf(kleuren_paletten[x][y]) + 1;

              // Voeg de kleur toe.
              kleuren_mixins.push('<a-mixin id="kleuren-palet-' + palet_code + '-kleur-' + kleur_code + '-mixin" material="color: ' + kleuren_paletten[x][y] + '"></a-mixin>');
            }
          }

          // Voeg de mixins toe aan de assets.
          KLEUREN.$.assets.append(kleuren_mixins);

          // Kleuren zijn toegevoegd.
          resolve();
        });
      });
    },

    // Vul de gegenereerde kleuren.
    verkrijg_gegenereerde_kleuren: function (aantal_paletten) {

      // Geef een nieuwe promise terug.
      return new Promise(function (resolve) {

        // Placeholder voor de kleuren.
        var gegenereerde_kleuren = [];

        // Voeg de standaard kleuren toe.
        gegenereerde_kleuren.push([
          '#B71234',
          '#FF5800',
          '#0246AD',
          '#009B48',
          '#FFD500',
          '#FFFFFF'
        ]);

        // Promises
        var promises = [];

        // Voeg nog 3 random kleur paletten toe.
        for (var i = 0; i < aantal_paletten - 1; i++) {

          // Verkrijg random kleuren.
          promises.push(KLEUREN.functions.verkrijg_kleuren());
        }

        // Ga door alle promises heen.
        Promise.all(promises).then(function (data) {

          // Loop door alle kleur paletten heen.
          for(var i = 0; i < data.length; i++) {

            // Voeg het kleurpalet toe.
            gegenereerde_kleuren.push(data[i]);
          }

          // Resolve de gegenereerde kleuren.
          resolve(gegenereerde_kleuren);
        });
      });
    },

    // Verkrijg de kleuren.
    verkrijg_kleuren: function () {

      // Doe een promise.
      return new Promise(function (resolve) {

        // Haal 10 random kleuren op.
        KLEUREN.functions.verkrijg_kleuren_van_api(10).then(function (response) {

          // Lijst met kleuren.
          var kleuren = response.matching_colors;

          // Verkijg alleen gevulde kleuren.
          kleuren = kleuren.filter(Boolean);

          // Voeg overal een # aan toe.
          kleuren = kleuren.map(function (code) {
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
          url: KLEUREN.api_url + aantal_kleuren,

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
  }
};

// Rubik's Cube klasse.
var RUBIKSCUBE = {

  // De assets HTML tag.
  $assets: $('#assets'),

  // De Rubik's Cube HTML tag.
  $rubiks_cube: $('#rubiks-cube'),

  // Init function.
  init: function (grid) {

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
      return '<a-entity id="kubus-' + id + '-zijde-1" class="zijde zijde-1" mixin="mixin-kleur-wit kleuren-palet-1-kleur-1-mixin geometry-1-mixin" position=" 0 1.6 -1"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-2" class="zijde zijde-2" mixin="mixin-kleur-wit kleuren-palet-1-kleur-2-mixin geometry-1-mixin" position=" 0 1.6  1"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-3" class="zijde zijde-3" mixin="mixin-kleur-wit kleuren-palet-1-kleur-3-mixin geometry-2-mixin" position=" 0 2.6  0"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-4" class="zijde zijde-4" mixin="mixin-kleur-wit kleuren-palet-1-kleur-4-mixin geometry-2-mixin" position=" 0 0.6  0"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-5" class="zijde zijde-5" mixin="mixin-kleur-wit kleuren-palet-1-kleur-5-mixin geometry-3-mixin" position=" 1 1.6  0"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-6" class="zijde zijde-6" mixin="mixin-kleur-wit kleuren-palet-1-kleur-6-mixin geometry-3-mixin" position="-1 1.6  0"></a-entity>';
    },

    // Verkijg de blender kubus.
    verkrijg_blender_kubus: function (id) {

      // Verkijg het object als HTML tag.
      return '<a-obj-model id="kubus-' + id + '-blender" class="kubus-blender" mixin="mixin-kubus" position="0 1.6 0"></a-obj-model>';
    },

    // Verkijg een enkele kubus.
    verkrijg_enkele_kubus: function (id, x, y, z) {

      // Verkrijg een enkele Rubik's Cube kubus met het opgegeven ID en positie.
      return '<a-entity id="kubus-' + id + '" class="kubus" position="' + x + ' ' + y + ' ' +  z + '">' +
                RUBIKSCUBE.functions.verkrijg_blender_kubus(id) +
                RUBIKSCUBE.functions.verkrijg_zijdes(id) +
             '</a-entity>'
    },

    // Zet de kleuren van de Rubiks Cube.
    set_kleuren: function (kleuren) {

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

// Opties klasse.
var OPTIES = {

  // De scene als Jquery object.
  $opties: $('#opties'),

  // Init functie.
  init: function (aantal_paletten) {

    // Voeg het optie paneel toe aan de body.
    OPTIES.functions.voeg_paneel_toe();

    // Voeg de optie kleuren paneel toe.
    OPTIES.functions.voeg_optie_kleuren_toe();

    // Voeg de kleuren paletten toe.
    OPTIES.functions.voeg_kleuren_paletten_toe(aantal_paletten);
  },

  // Alle functies.
  functions : {

    //  Voeg paneel toe.
    voeg_paneel_toe: function () {

      // Voeg het paneel toe.
      OPTIES.$opties.append('<a-entity id="optie-paneel"  mixin="mixin-kleur-grijs" geometry="depth:0.1; height:11; width:7.5"></a-entity>');
    },

    // Voeg de optie voor de kleuren paletten toe.
    voeg_optie_kleuren_toe: function () {

      // Voeg de suboptie kleuren toe.
      OPTIES.$opties.append(
        '<a-entity id="optie-kleuren">' +
          '<a-entity id="optie-titel-kleuren" class="optie-titel" position="-3.25 4.25 0.1" text="text:Kies een kleurenschema.; size:0.3; style:normal" mixin="mixin-kleur-zwart"></a-entity>' +
      '</a-entity>'
      );
    },

    // Voeg een kleuren palet toe.
    voeg_kleuren_palet_toe: function (id) {

      // Bereken de hoogte.
      var hoogte = 4.5 - (id * 1.5);

      // Standaard achtergrond is wit.
      var mixin = "mixin-kleur-wit";

      // Als het de eerst is.
      if(id == 1) {

        // Geef het een actieve kleur.
        mixin = "mixin-kleur-zwart";
      }

      // Voeg een kleuren palet toe.
      $('#optie-kleuren').append(

        // Voeg een kleuren palet wrapper toe.
        '<a-entity id="optie-kleuren-palet-' + id + '" position="0 ' + hoogte + ' 0.1" class="optie-kleuren-palet">' +

          // Voeg een achtergrond toe.
          '<a-entity id="optie-kleuren-palet-' + id + '-achtergrond" geometry="depth:0.1; height:1.2; width:6.5;" mixin="' + mixin + '">' +

            // Genereer een palet van 6 kleuren en voeg het toe.
            OPTIES.functions.maak_palet(id) +
          '</a-entity>' +
        '</a-entity>'
      );
    },

    // Voeg kleuren paletten toe.
    voeg_kleuren_paletten_toe: function (aantal_paletten) {

      // Loop door alle kleuren heen.
      for(var i = 1; i <= aantal_paletten; i++) {

        // Maak een kleuren palet aan.
        OPTIES.functions.voeg_kleuren_palet_toe(i);
      }
    },

    // Maak een kleuren palet van 6.
    maak_palet: function (id) {

      // Placeholder
      var kleuren = '';

      // Loop door 6 heen.
      for(var i = 1; i <= 6; i++) {

        // Genereer 1 positie.
        var positie = -3.5 + i;

        // Voeg 1 kleurenbol toe.
        kleuren += '<a-entity id="optie-kleuren-palet-' + id + '-kleur-' + i + 1 + '" position="' + positie + ' 0 0.1" mixin="mixin-kleur-wit kleuren-palet-' + id + '-kleur-' + i + '-mixin mixin-rotation-90-0-0 mixin-geometry-kleur"></a-entity>';
      }

      // Geef de kleuren terug.
      return kleuren;
    }
  }
};

// Pijlen klasse.
var PIJLEN = {

};

// Timer klasse.
var TIMER = {

};

// Wacht totdat het document geladen is.
$(document).ready(function() {

  // Het grid van de Rubik's Cube.
  var grid            = 3,
      aantal_paletten = 4;

  KLEUREN.init(aantal_paletten);

  // Initialiseer de Rubik's Cube.
  RUBIKSCUBE.init(grid);

  // Initialiseer de opties.
  OPTIES.init(aantal_paletten);
});
