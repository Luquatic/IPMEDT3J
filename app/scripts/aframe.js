// Kleuren klasse.
var KLEUREN = {

  // JQuery selectors:
  $: {

    // Assets
    assets: $('#assets')
  },

  // API url.
  api_url: 'http://www.colr.org/json/colors/random/',

  // Het huidige kleuren palet.
  huidig_palet: 1,

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

    // Update het kleurenpalet.
    update_kleurenpalet: function (id) {

      // Update het huidig palet.
      KLEUREN.huidig_palet = id;
    },

    // Verkrijg het kleurenpalet.
    verkrijg_kleurenpalet: function () {
      return KLEUREN.huidig_palet;
    }
  }
};

// Rubik's Cube klasse.
var RUBIKSCUBE = {

  // De assets HTML tag.
  $assets: $('#assets'),

  // De Rubik's Cube HTML tag.
  $rubiks_cube: $('#rubiks-cube'),

  // Rubik's Cube state.
  // rubiks_cube_state: new Cube({
  //   'back':  new Matrix([['1','1','1'], ['1','1','1'], ['1','1','1']]),
  //   'front': new Matrix([['2','2','2'], ['2','2','2'], ['2','2','2']]),
  //   'up':    new Matrix([['3','3','3'], ['3','3','3'], ['3','3','3']]),
  //   'down':  new Matrix([['4','4','4'], ['4','4','4'], ['4','4','4']]),
  //   'right': new Matrix([['5','5','5'], ['5','5','5'], ['5','5','5']]),
  //   'left':  new Matrix([['6','6','6'], ['6','6','6'], ['6','6','6']]),
  // }),

  // Rubik's Cube state.
  rubiks_cube_state: new Cube({
    'back':  new Matrix([['5','5','5'], ['1','1','1'], ['1','1','1']]),
    'front': new Matrix([['6','6','6'], ['2','2','2'], ['2','2','2']]),
    'up':    new Matrix([['3','3','3'], ['3','3','3'], ['3','3','3']]),
    'down':  new Matrix([['4','4','4'], ['4','4','4'], ['4','4','4']]),
    'right': new Matrix([['2','2','2'], ['5','5','5'], ['5','5','5']]),
    'left':  new Matrix([['1','1','1'], ['6','6','6'], ['6','6','6']]),
  }),

// Init function.
  init: function (grid) {

    // Voeg de geometry toe.
    RUBIKSCUBE.functions.set_geometry();

    // Voeg de Rubik's Cube toe.
    RUBIKSCUBE.functions.voeg_rubiks_cube_toe(grid);

    // Bepaal de positie van de Rubik's Cube.
    RUBIKSCUBE.functions.bepaal_positie(grid);
  },

  // Functions
  functions: {

    // Verkijg de 6 zijdes.
    verkrijg_zijdes: function (id) {

      // Alle zijdes placeholder.
      var zijdes = '';

      // Verkrijg de benodigde zijdes als array.
      var benodigde_zijdes = RUBIKSCUBE.functions.benodigde_zijdes(id);

      // Verkrijg de positie informatie.
      var positie_info = RUBIKSCUBE.functions.verkrijg_kubus_info(id);

      // Placeholder voor de kleur code.
      var kleurcode    = 0,
          kleurenpalet = KLEUREN.functions.verkrijg_kleurenpalet();

      function verkrijg_kleurcode(positie) {
        var [x, y] = positie_info[positie];
        return RUBIKSCUBE.rubiks_cube_state.faces[positie].elements[x - 1][y - 1];
      }

      if(benodigde_zijdes.indexOf('back') != -1) {
        kleurcode = verkrijg_kleurcode('back');
        zijdes += '<a-entity id="kubus-' + id + '-zijde-' + kleurcode + '" class="zijde zijde-' + kleurcode + '" mixin="mixin-kleur-FFFFFF kleuren-palet-' + kleurenpalet + '-kleur-' + kleurcode + '-mixin geometry-1-mixin" position=" 0 1.6 -1"></a-entity>';
      }

      if(benodigde_zijdes.indexOf('front') != -1) {
        kleurcode = verkrijg_kleurcode('front');
        zijdes += '<a-entity id="kubus-' + id + '-zijde-' + kleurcode + '" class="zijde zijde-' + kleurcode + '" mixin="mixin-kleur-FFFFFF kleuren-palet-' + kleurenpalet + '-kleur-' + kleurcode + '-mixin geometry-1-mixin" position=" 0 1.6  1"></a-entity>';
      }

      if(benodigde_zijdes.indexOf('up') != -1) {
        kleurcode = verkrijg_kleurcode('up');
        zijdes += '<a-entity id="kubus-' + id + '-zijde-' + kleurcode + '" class="zijde zijde-' + kleurcode + '" mixin="mixin-kleur-FFFFFF kleuren-palet-' + kleurenpalet + '-kleur-' + kleurcode + '-mixin geometry-2-mixin" position=" 0 2.6  0"></a-entity>';
      }

      if(benodigde_zijdes.indexOf('down') != -1) {
        kleurcode = verkrijg_kleurcode('down');
        zijdes += '<a-entity id="kubus-' + id + '-zijde-' + kleurcode + '" class="zijde zijde-' + kleurcode + '" mixin="mixin-kleur-FFFFFF kleuren-palet-' + kleurenpalet + '-kleur-' + kleurcode + '-mixin geometry-2-mixin" position=" 0 0.6  0"></a-entity>';
      }

      if(benodigde_zijdes.indexOf('right') != -1) {
        kleurcode = verkrijg_kleurcode('right');
        zijdes += '<a-entity id="kubus-' + id + '-zijde-' + kleurcode + '" class="zijde zijde-' + kleurcode + '" mixin="mixin-kleur-FFFFFF kleuren-palet-' + kleurenpalet + '-kleur-' + kleurcode + '-mixin geometry-3-mixin" position=" 1 1.6  0"></a-entity>';
      }

      if(benodigde_zijdes.indexOf('left') != -1) {
        kleurcode = verkrijg_kleurcode('left');
        zijdes += '<a-entity id="kubus-' + id + '-zijde-' + kleurcode + '" class="zijde zijde-' + kleurcode + '" mixin="mixin-kleur-FFFFFF kleuren-palet-' + kleurenpalet + '-kleur-' + kleurcode + '-mixin geometry-3-mixin" position="-1 1.6  0"></a-entity>';
      }

      return zijdes;
    },

    // Verkrijg de benodigde zijdes.
    benodigde_zijdes: function(id) {

      // Geef de benodigde zijdes terug als array.
      return Object.keys(RUBIKSCUBE.functions.verkrijg_kubus_info(id));
    },

    // Verkrijg de kubus info.
    verkrijg_kubus_info: function(id) {

      // Hoop info.
      var ids = {
        1: {
          'back':  [3, 1],
          'down':  [1, 1],
          'left':  [3, 1]
        },
        2: {
          'down':  [2, 1],
          'left':  [3, 2]
        },
        3: {
          'down':  [3, 1],
          'front': [3, 1],
          'left':  [3, 3]
        },
        4: {
          'back':  [2, 1],
          'left':  [2, 1]
        },
        5: {
          'left':  [2, 2]
        },
        6: {
          'front': [2, 1],
          'left':  [2, 3]
        },
        7: {
          'back':  [1, 1],
          'left':  [1, 1],
          'up':    [1, 1]
        },
        8: {
          'left':  [1, 2],
          'up':    [2, 1]
        },
        9: {
          'front': [1, 1],
          'left':  [1, 3],
          'up':    [3, 1]
        },
        10: {
          'back':  [3, 2],
          'down':  [1, 2]
        },
        11: {
          'down':  [2, 2]
        },
        12: {
          'down':  [3, 2],
          'front': [3, 2]
        },
        13: {
          'back':  [2, 2]
        },
        14: {

        },
        15: {
          'front': [2, 2]
        },
        16: {
          'back':  [1, 2],
          'up':    [1, 2]
        },
        17: {
          'up':    [2, 2]
        },
        18: {
          'front': [1, 2],
          'up':    [3, 2]
        },
        19: {
          'back':  [3, 3],
          'down':  [1, 3],
          'right': [3, 1]
        },
        20: {
          'down':  [2, 3],
          'right': [3, 2]
        },
        21: {
          'front': [3, 3],
          'right': [3, 3],
          'down':  [3, 3]
        },
        22: {
          'back':  [2, 3],
          'right': [2, 1]
        },
        23: {
          'right': [2, 2]
        },
        24: {
          'front': [2, 3],
          'right': [2, 3]
        },
        25: {
          'right': [1, 1],
          'up':    [1, 3],
          'back':  [1, 3]
        },
        26: {
          'right': [1, 2],
          'up':    [2, 3]
        },
        27: {
          'front': [1, 3],
          'right': [1, 3],
          'up':    [3, 3]
        }
      };

      // Geef de info voor de benodigde kubus.
      return ids[id];
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
    set_kleuren: function (id) {

      // Loop door alle zijdes heen
      for(var i = 1; i <= 6; i++) {

        // Verkrijg de zijdes.
        var $zijdes = $('.zijde-' + i);

        // Loop door elke zijde heen.
        $zijdes.each(function () {

          // Deze zijde als jQuery object.
          var $zijde = $(this);

          // Haal alle zijdes op.
          var mixins = $zijde.attr('mixin').split(' ');

          // Wijzig de kleur mixin.
          mixins[1] = 'kleuren-palet-' + id + '-kleur-' + i + '-mixin';

          // Wijzig de mixin attributen
          $zijde.attr('mixin', mixins.join(' '));
        });
      }
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

      // ID.
      var id = 0;

      // Loop door X heen.
      for (var x = 0; x < grid; x ++) {

        // Loop door Y heen.
        for(var y = 0; y < grid; y++) {

          // Loop door Z heen.
          for(var z = 0; z < grid; z++) {

            // TODO: FIX THIS FUCKED UP SHIT.
            var x_pos = (x * 2) - (2),
                y_pos = (y * 2) - (3.5),
                z_pos = (z * 2) - (2);

              // Tel het ID op.
              id += 1;

            // Voeg de box toe.
            RUBIKSCUBE.$rubiks_cube.append(RUBIKSCUBE.functions.verkrijg_enkele_kubus(id, x_pos, y_pos, z_pos));
          }
        }
      }
    },

    // Bepaal de positie van de Rubik's Cube.
    bepaal_positie: function (grid) {

      // TODO: FIX THIS FUCKED UP SHIT.
      // X Y en Z coordinaten.
      var x = 0,
          y = 1.5,
          z = grid * -5;

      // Voeg de positie toe.
      RUBIKSCUBE.$rubiks_cube.attr('position', x + ' ' + y + ' ' + z);
    },

    // Roteer de Rubik's Cube.
    roteer_rubiks_cube: function (x, y) {

      // De animatie.
      var $animation = $('#rotate_animation');

      // Controleer of de animatie bestaat.
      if(!$animation.length) {

        // Verwijder de oude animatie.
        $animation.remove();
      }

      // Verander de rotatie van de rubik's cube.
      RUBIKSCUBE.$rubiks_cube.append('<a-animation id="rotate_animation" attribute="rotation" dur="3000" to="' + x + ' ' + y + ' 0"></a-animation>');
    },

    // Verkijg de rotatie van de Rubik's Cube.
    verkrijg_rotatie_rubiks_cube: function () {

      // Geef de rotatie terug als een array.
      return RUBIKSCUBE.$rubiks_cube.attr('rotation');
    },

    // Update de rubik's cube.
    update_rubiks_cube: function () {

      // Verwijder de rubik's cube.
      RUBIKSCUBE.$rubiks_cube.html("");

      // Voeg hem weer toe. #SORRYFOUTJE
      RUBIKSCUBE.functions.voeg_rubiks_cube_toe(3);
    },

    // Draai de Rubik's Cube.
    draai_rubiks_cube: function (zijde, aantal_draaien) {

      // Maak de movement string.
      var move = '' + zijde + aantal_draaien;

      // Draai de Rubik's Cube.
      RUBIKSCUBE.rubiks_cube_state.move(move);

      // Update de Rubik's Cube.
      RUBIKSCUBE.functions.update_rubiks_cube();
    },

    // Is de Rubik's Cube opgelost
    is_opgelost: function () {

      // Alle zijdes als variabele.
      var back  = RUBIKSCUBE.functions.is_zijde_opgelost('back'),
          front = RUBIKSCUBE.functions.is_zijde_opgelost('front'),
          up    = RUBIKSCUBE.functions.is_zijde_opgelost('up'),
          down  = RUBIKSCUBE.functions.is_zijde_opgelost('down'),
          right = RUBIKSCUBE.functions.is_zijde_opgelost('right'),
          left  = RUBIKSCUBE.functions.is_zijde_opgelost('left');

      // Geef terug of alle zijdes opgelost zijn.
      return _.every([back, front, up, down, right, left], function(zijde) { return zijde; });
    },

    // Controleer of de opgegeven zijde is opgelost.
    is_zijde_opgelost: function (zijde) {
      if(_.uniq(_.flatten(_.map(RUBIKSCUBE.rubiks_cube_state.faces[zijde].elements, _.values))).length == 1) {
        return true;
      } else {
        return false;
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

    // Voeg hovers toe aan de kleuren
    OPTIES.functions.set_kleuren_hover();

    // // Voeg de optie grid toe.
    // OPTIES.functions.voeg_optie_grid_toe();
    //
    // // Voeg een aantal grid opties toe.
    // OPTIES.functions.voeg_grid_keuzes_toe(2, 3);
    //
    // // Voeg de grid hover toe.
    // OPTIES.functions.set_grid_hover();
  },

  // Alle functies.
  functions : {

    //  Voeg paneel toe.
    voeg_paneel_toe: function () {

      // Voeg het paneel toe.
      OPTIES.$opties.append('<a-entity id="optie-paneel"  mixin="mixin-kleur-CCCCCC" geometry="depth:0.1; height:11; width:7.5"></a-entity>');
    },

    // Voeg de optie voor de kleuren paletten toe.
    voeg_optie_kleuren_toe: function () {

      // Voeg de suboptie kleuren toe.
      OPTIES.$opties.append(
        '<a-entity id="optie-kleuren">' +
          '<a-entity id="optie-titel-kleuren" class="optie-titel" position="-3.25 4.25 0.1" text="text:Kies een kleurenschema; size:0.3; style:normal" mixin="mixin-kleur-000000"></a-entity>' +
        '</a-entity>'
      );
    },

    // Voeg een kleuren palet toe.
    voeg_kleuren_palet_toe: function (id) {

      // Bereken de hoogte.
      var hoogte = 4.5 - (id * 1.5);

      // Standaard achtergrond is wit.
      var mixin = 'mixin-kleur-FFFFFF';

      // Als het de eerst is.
      if(id == 1) {

        // Geef het een actieve kleur.
        mixin = 'mixin-kleur-000000';
      }

      // Voeg een kleuren palet toe.
      $('#optie-kleuren').append(

        // Voeg een kleuren palet wrapper toe.
        '<a-entity id="optie-kleuren-palet-' + id + '" class="optie-kleuren-palet" data-kleuren-palet-id="' + id + '" position="0 ' + hoogte + ' 0.1" class="optie-kleuren-palet">' +

          // Voeg een achtergrond toe.
          '<a-entity id="optie-kleuren-palet-' + id + '-achtergrond" class="optie-kleuren-palet-achtergrond" geometry="depth:0.1; height:1.2; width:6.5;" mixin="' + mixin + '">' +

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
        kleuren += '<a-entity id="optie-kleuren-palet-' + id + '-kleur-' + i + '" position="' + positie + ' 0 0.1" mixin="mixin-kleur-FFFFFF kleuren-palet-' + id + '-kleur-' + i + '-mixin mixin-rotation-90-0-0 mixin-geometry-kleur"></a-entity>';
      }

      // Geef de kleuren terug.
      return kleuren;
    },

    // Set een hover op alle kleuren paletten.
    set_kleuren_hover: function () {

      // Alle kleuren paletten.
      var kleuren_paletten = document.getElementsByClassName('optie-kleuren-palet');

      // Voeg aan elke optie kleuren palet een hover toe.
      for(var i = 0; i < kleuren_paletten.length; i++) {

        // Voeg een event listener toe.
        document.getElementsByClassName('optie-kleuren-palet')[i].addEventListener('mouseenter', function () {

          // ID.
          var id = $(this).attr('data-kleuren-palet-id');

          // Zorg dat de kleuren veranderen van de achtergrond.
          OPTIES.functions.set_kleuren_achtergrond(id);

          // Verander de kleur van de Rubik's Cube.
          RUBIKSCUBE.functions.set_kleuren(id);

          // Update het kleuren palet.
          KLEUREN.functions.update_kleurenpalet(id)
        });
      }
    },

    // Verander de kleuren achtergrond.
    set_kleuren_achtergrond: function (id) {

      // Alle kleuren paletten.
      var kleuren_paletten_achtergrond = document.getElementsByClassName('optie-kleuren-palet-achtergrond');

      // Loop door elke kleuren palet achtergrond.
      for(var i = 0; i < kleuren_paletten_achtergrond.length; i++) {

        // Wat variabelen die nodig zijn.
        var achtergronden = document.getElementsByClassName('optie-kleuren-palet-achtergrond'),
            achtergrond   = achtergronden[i],
            index         = i + 1;

        // Controleer het ID met de index.
        if(id == index) {

          // Geef het de achtergrond zwart.
          $(achtergrond).attr('mixin', 'mixin-kleur-000000');
        } else {

          // Geef het de achtergrond wit.
          $(achtergrond).attr('mixin', 'mixin-kleur-FFFFFF');
        }
      }
    },

    // Speel het optie geluid af.
    speel_optie_geluid_af: function () {
      // TODO: nog te implementeren.
    },

    // Voeg de optie voor de kleuren paletten toe.
    voeg_optie_grid_toe: function () {

      // Voeg de suboptie kleuren toe.
      OPTIES.$opties.append(
        '<a-entity id="optie-grid">' +
          '<a-entity id="optie-titel-grid" class="optie-titel" position="-3.25 -3 0.1" text="text:Kies een grid; size:0.3; style:normal" mixin="mixin-kleur-000000"></a-entity>' +
        '</a-entity>'
      );
    },

    // Voeg een aantal grid keuzes toe.
    voeg_grid_keuzes_toe: function (aantal_keuzes, vanaf) {

      // Hoe het grid opgebouwd moet worden.
      var stappen = 2;

      // De X positie.
      var teller = 0;

      // Loop door het aantal grid stappen heen.
      for(var i = vanaf; i < (vanaf + aantal_keuzes * stappen); i += 2) {

        var actief = false;

        if(teller == 0) {
          actief = true;
        }

        // Voeg grid keuze toe.
        OPTIES.functions.voeg_grid_keuze_toe(i, teller, actief);

        // X positie die nodig is.
        teller += 4;
      }
    },

    // Voeg een grid keuze toe.
    voeg_grid_keuze_toe: function (grid_nummer, x_verschuiving, actief) {
      $('#optie-grid').append(OPTIES.functions.verkijg_grid_knop(grid_nummer, x_verschuiving, actief));
    },

    // Verkijg een grid knop.
    verkijg_grid_knop: function (grid_nummer, x_verschuiving, actief) {

      // De X verschuiving die nodig is.
      var x = -2 + x_verschuiving;

      var achtergrond_mixin = 'mixin-kleur-FFFFFF',
          tekst_mixin       = 'mixin-kleur-000000';

      if(actief) {
        achtergrond_mixin = 'mixin-kleur-000000';
        tekst_mixin       = 'mixin-kleur-FFFFFF';
      }

      // Geef een opgemaakte knop terug.
      return '<a-entity id="optie-grid-' + grid_nummer + '" data-optie-grid="' + grid_nummer + '" class="optie-grid" position="' + x + ' -4.25 0.1">' +
               '<a-entity id="optie-grid-' + grid_nummer + '-achtergrond" class="optie-grid-achtergrond" data-optie-grid="' + grid_nummer + '" geometry="depth:0.1; height:1.5; width:2.5;" mixin="' + achtergrond_mixin + '">' +
                 '<a-entity id="optie-grid-' + grid_nummer + '-tekst" class="optie-grid-tekst" data-optie-grid="' + grid_nummer + '" position="-0.3 -0.2 0.1" text="text: ' + grid_nummer + '" mixin="' + tekst_mixin + '"></a-entity>' +
               '</a-entity>' +
             '</a-entity>';
    },

    // Voeg een hover toe.
    set_grid_hover: function () {

      // Haal alle grid opties op.
      var grid_opties = document.getElementsByClassName('optie-grid');

      // Loop door elke grid optie heen.
      for(var i = 0; i < grid_opties.length; i++) {

        // De grid optie.
        var grid_optie = document.getElementsByClassName('optie-grid')[i];

        // Voeg een event listener toe.
        grid_optie.addEventListener('mouseenter', function () {

          // Verander de achtergrond.
          OPTIES.functions.set_grid_achtergrond(grid_opties, this);

          // Het ID.
          var id = $(this).attr('data-optie-grid');

          // Verander het grid van de Rubik's Cube.
          OPTIES.functions.verander_grid(id);
        });
      }
    },

    // Verander de grid achtergrond.
    set_grid_achtergrond: function (grid_opties, knop) {

      // Loop door alle grid opties heen.
      for(var i = 0; i < grid_opties.length; i++) {

        // Verkrijg het grid optie element.
        var grid_optie = grid_opties[i],
            knop_id    = $(knop).attr('data-optie-grid'),
            grid_id    = $(grid_optie).attr('data-optie-grid');

        // Controleer het id.
        if(knop_id == grid_id) {

          // Pas de kleuren aan.
          $(grid_optie).children().attr('mixin', 'mixin-kleur-000000');
          $(grid_optie).children().children().attr('mixin', 'mixin-kleur-FFFFFF');
        } else {

          // Pas de kleuren aan.
          $(grid_optie).children().attr('mixin', 'mixin-kleur-FFFFFF');
          $(grid_optie).children().children().attr('mixin', 'mixin-kleur-000000');
        }
      }
    },

    // Verander het grid.
    verander_grid: function (id) {
      // TODO: nog te implementeren.
    },

    // Voeg een bestelknop toe.
    voeg_bestelknop_toe: function () {

      // Voeg bestelknop toe.
      OPTIES.$opties.append(
        '<a-entity id="optie-bestelknop-achtergrond" class="optie-bestelknop-achtergrond" mixin="mixin-kleur-000000" position="0 -4 0.1" geometry="depth:0.1; height:1.2; width:6.5;" >' +
          '<a-entity id="optie-bestelknop-tekst" text="text: BESTELLEN" mixin="mixin-kleur-FFFFFF" position="-1.7 -0.2 0.05"></a-entity>' +
        '</a-entity>'
      );

      // Voeg de event listener toe.
      OPTIES.functions.bestelknop_hover();
    },

    // Voeg een hover toe aan de bestelknop.
    bestelknop_hover: function () {

      // De knop.
      var knop = document.getElementById('optie-bestelknop-achtergrond');

      // Voeg een event listener toe.
      knop.addEventListener('mouseenter', function () {

        // Verander de kleuren.
        $('#optie-bestelknop-achtergrond').attr('mixin', 'mixin-kleur-FFFFFF');
        $('#optie-bestelknop-tekst').attr('mixin', 'mixin-kleur-000000');

        // Handel de bestelling af.
        OPTIES.functions.handel_bestelling_af();
      });

      // Voeg een event listener toe.
      knop.addEventListener('mouseleave', function () {

        // Verander de kleuren.
        $('#optie-bestelknop-achtergrond').attr('mixin', 'mixin-kleur-000000');
        $('#optie-bestelknop-tekst').attr('mixin', 'mixin-kleur-FFFFFF');
      });
    },

    // Handel de bestelling af.
    handel_bestelling_af: function () {
      // TODO handel de bestelling af.
    }
  }
};

// Pijlen klasse.
var PIJLEN = {

  // JQuery selectors.
  $: {

    // Pijlen
    pijlen: $('#pijlen'),

    // Rubiks Cube pijlen.
    rubiks_cube_pijlen: $('#rubiks-cube-pijlen')
  },

  // Initialiseer de klasse.
  init: function () {

    // Voeg de pijlen toe.
    PIJLEN.functions.voeg_roteer_pijlen_toe();

    // Voeg de Rubik's Cube pijlen toe.
    PIJLEN.functions.voeg_rubiks_cube_pijlen_toe();

    // Voeg een event listener toe aan de pijlen.
    PIJLEN.functions.roteer_pijl_hover();

    // Voeg een event listener toe aan de Rubik's Cube pijlen.
    PIJLEN.functions.rubiks_cube_pijlen_hover();
  },

  // De functions.
  functions: {

    // Voeg de pijlen toe aan de scene.
    voeg_roteer_pijlen_toe: function () {

      // Pijlen array
      var pijlen = [];

      // Verkrijg de pijlen.
      pijlen.push(PIJLEN.functions.verkrijg_roteer_pijlen());

      // Voeg de pijlen toe aan de scene.
      PIJLEN.$.pijlen.append(pijlen);
    },

    // Verkrijg de pijlen om de scene te draaien.
    verkrijg_roteer_pijlen: function () {

      // Geef de pijlen terug.
      return '<a-image id="pijl-y-as-links"   class="pijl" data-as-rotatie="y" data-met-de-klok-mee="0" src="#image-pijl" position="-5  0 0" mixin="mixin-opacity-50" rotation="0 0   0"></a-image>' +
             '<a-image id="pijl-x-as-beneden" class="pijl" data-as-rotatie="x" data-met-de-klok-mee="1" src="#image-pijl" position=" 0 -5 0" mixin="mixin-opacity-50" rotation="0 0  90"></a-image>' +
             '<a-image id="pijl-y-as-rechts"  class="pijl" data-as-rotatie="y" data-met-de-klok-mee="1" src="#image-pijl" position=" 5  0 0" mixin="mixin-opacity-50" rotation="0 0 180"></a-image>' +
             '<a-image id="pijl-x-as-boven"   class="pijl" data-as-rotatie="x" data-met-de-klok-mee="0" src="#image-pijl" position=" 0  5 0" mixin="mixin-opacity-50" rotation="0 0 270"></a-image>';
    },

    // Event listener voor de pijlen.
    roteer_pijl_hover: function () {

      // Verkrijg alle pijlen.
      var pijlen = document.getElementsByClassName('pijl');

      // Ga door alle pijlen heen.
      for (var i = 0; i < pijlen.length; i++) {

        // De pijl.
        var pijl = document.getElementsByClassName('pijl')[i];

        // Voeg aan de pijl een eventlistener toe.
        pijl.addEventListener('mouseenter', function () {

          // Verkijg de as en de rotatie.
          var as              = $(this).attr('data-as-rotatie'),
              met_de_klok_mee = $(this).attr('data-met-de-klok-mee');

          // Laat de Rubik's Cube roteren met een interval.
          setTimeout(function () {

            // Laat de Rubik's Cube draaien.
            PIJLEN.functions.doe_rubiks_cube_draaien(as, met_de_klok_mee);

            // Speel het draai geluid af.
            GELUID.functions.speel_roteer_geluid();

          // Per seconden.
          }, 1000);
        });
      }
    },

    // Laat de Rubik's Cube draaien.
    doe_rubiks_cube_draaien: function (as, met_de_klok_mee) {

      // De assen die we gaan draaien.
      var huidige_rotatie = RUBIKSCUBE.functions.verkrijg_rotatie_rubiks_cube(),
          x               = huidige_rotatie.x,
          y               = huidige_rotatie.y,
          teller          = 360;

      // Controleer of het met de klok mee moet.
      if(met_de_klok_mee == 0) {

        // Maak de teller negatief.
        teller = -teller;
      }

      // Controleer welke as we gaan draaien.
      if(as == 'x') {

        // Verander de X waarde.
        x = huidige_rotatie.x + teller;
      }

      // Controleer welke as we gaan draaien.
      else if(as == 'y') {

        // Verander de Y waarde.
        y = huidige_rotatie.y + teller;
      }

      // Verander de Rubik's Cube van rotatie.
      RUBIKSCUBE.functions.roteer_rubiks_cube(x, y);
    },

    // Voeg de Rubik's Cube pijlen toe.
    voeg_rubiks_cube_pijlen_toe: function () {

      // De Rubik's Cube pijlen.
      var pijlen = [];

      // Verkrijg de Rubik's Cube pijlen.
      pijlen.push(PIJLEN.functions.verkrijg_rubiks_cube_pijlen());

      // Voeg de pijlen toe aan de scene.
      PIJLEN.$.rubiks_cube_pijlen.append(pijlen);
    },

    // Verkrijg de Rubik's Cube pijlen.
    verkrijg_rubiks_cube_pijlen: function () {

      // Geef de Rubik's Cube pijlen terug.
      return '<a-image id="rubiks-cube-pijl-l-b" class="rubiks-cube-pijl" data-zijde="u" data-rotaties="3" src="#image-pijl" mixin="mixin-opacity-50" position="-4.00  2.00 0" rotation="0 0   0"></a-image>' +
             '<a-image id="rubiks-cube-pijl-r-b" class="rubiks-cube-pijl" data-zijde="u" data-rotaties="1" src="#image-pijl" mixin="mixin-opacity-50" position=" 4.00  2.00 0" rotation="0 0 180"></a-image>' +
             '<a-image id="rubiks-cube-pijl-l-o" class="rubiks-cube-pijl" data-zijde="d" data-rotaties="3" src="#image-pijl" mixin="mixin-opacity-50" position="-4.00 -2.00 0" rotation="0 0   0"></a-image>' +
             '<a-image id="rubiks-cube-pijl-r-o" class="rubiks-cube-pijl" data-zijde="d" data-rotaties="1" src="#image-pijl" mixin="mixin-opacity-50" position=" 4.00 -2.00 0" rotation="0 0 180"></a-image>' +
             '<a-image id="rubiks-cube-pijl-b-l" class="rubiks-cube-pijl" data-zijde="l" data-rotaties="3" src="#image-pijl" mixin="mixin-opacity-50" position="-2.00  4.00 0" rotation="0 0 270"></a-image>' +
             '<a-image id="rubiks-cube-pijl-o-l" class="rubiks-cube-pijl" data-zijde="l" data-rotaties="1" src="#image-pijl" mixin="mixin-opacity-50" position="-2.00 -4.00 0" rotation="0 0  90"></a-image>' +
             '<a-image id="rubiks-cube-pijl-b-r" class="rubiks-cube-pijl" data-zijde="r" data-rotaties="1" src="#image-pijl" mixin="mixin-opacity-50" position=" 2.00  4.00 0" rotation="0 0 270"></a-image>' +
             '<a-image id="rubiks-cube-pijl-o-r" class="rubiks-cube-pijl" data-zijde="r" data-rotaties="3" src="#image-pijl" mixin="mixin-opacity-50" position=" 2.00 -4.00 0" rotation="0 0  90"></a-image>';
    },

    // Event listener voor de Rubik's Cube pijlen.
    rubiks_cube_pijlen_hover: function () {

      // Verkrijg alle rubik's Cube pijlen.
      var pijlen = document.getElementsByClassName('rubiks-cube-pijl');

      // Ga door alle pijlen heen.
      for (var i = 0; i < pijlen.length; i++) {

        // De pijl.
        var pijl = document.getElementsByClassName('rubiks-cube-pijl')[i];

        // Voeg de event listener toe.
        pijl.addEventListener('mouseenter', function () {

          // Start de timer.
          TIMER.functions.start();

          // Verkrijg de zijde en het aantal rotaties.
          var zijde    = $(this).attr('data-zijde'),
              rotaties = $(this).attr('data-rotaties');

          // Draai de Rubik's Cube.
          setTimeout(function () {

            // Roteer de Rubik's Cube.
            RUBIKSCUBE.functions.draai_rubiks_cube(zijde, rotaties);

            // Controleer voor de oplossing.
            PIJLEN.functions.controleer_voor_oplossing();

          // Voor 1 seconden.
          }, 1000);
        });
      }
    },

    // Controleer of de Rubik's Cube opgelost is.
    controleer_voor_oplossing: function () {

      // Als de Rubik's Cube opgelost is.
      if(RUBIKSCUBE.functions.is_opgelost()) {

        // Stop de timer.
        TIMER.functions.stop();

        // Controleer of de bestelknop al toegevoegd is.
        if(!$('#optie-bestelknop-achtergrond').length)
        {
          // Voeg de bestelknop toe.
          OPTIES.functions.voeg_bestelknop_toe();
        }
      }
    }
  }
};

// Audio klasse.
var GELUID = {

  // Roteer geluid.
  roteer_geluid: new Audio('../sounds/drag.mp3'),

  // TODO: optie geluid.
  optie_geluid: new Audio('../sounds/drag.mp3'),

  // Init functie.
  init: function () {},

  // Alle functies.
  functions: {

    // Speel het roteer geluid af.
    speel_roteer_geluid: function () {

      // Speel het geluid af.
      GELUID.roteer_geluid.play();
    },

    // Speel het optie geluid af.
    speel_optie_geluid: function () {

      // Speel het optie geluid af.
      GELUID.optie_geluid.play();
    }
  }
};

// Timer klasse.
var TIMER = {

  // jQuery
  $: {

    // De timer.
    timer: $('#timer')
  },

  // De stopwatch
  timer: new Stopwatch(),

  // Placeholder interval.
  interval: null,

  // Init function.
  init: function() {

  },

  // Alle functions.
  functions: {

    // Start de timer.
    start: function () {

      // Controleer of de interval nog niet bestaat.
      if (TIMER.interval == null)
      {
        // Start de timer.
        TIMER.timer.start();

        // Start de interval.
        TIMER.functions.start_interval();
      }
    },

    // Stop de timer.
    stop: function () {

      // Controleer of de interval bestaat.
      if (TIMER.interval != null)
      {
        // Stop de timer.
        TIMER.timer.stop();

        // Stop de interval.
        TIMER.functions.stop_interval();
      }
    },

    // Verkijg de miniseconden.
    verkrijg_milliseconden: function () {

      // Verkrijg de verstreken tijd.
      return TIMER.timer.getElapsed();
    },

    // Start de interval.
    start_interval: function () {

      // Start de interval.
      TIMER.interval = setInterval(function () {

        // Update de timer.
        TIMER.functions.update_timer();
      }, 1);
    },

    // Stop de interval.
    stop_interval: function () {

      // Stop de interval.
      TIMER.interval = clearInterval(TIMER.interval);

      // Zet het attribuut weer naar null.
      TIMER.interval = null;
    },

    // Update de timer.
    update_timer: function () {

      // Verkrijg de milliseconden.
      var milliseconden = TIMER.functions.verkrijg_milliseconden();

      // Update de timer.
      TIMER.$.timer.attr('text', 'text:' + moment(milliseconden).format('mm:ss:SSS'));
    }
  }
};

// Wacht totdat het document geladen is.
$(document).ready(function() {

  // Het grid van de Rubik's Cube.
  var grid            = 3,
      aantal_paletten = 4;

  // Initialiseer de kleuren.
  KLEUREN.init(aantal_paletten);

  // Initialiseer de Rubik's Cube.
  RUBIKSCUBE.init(grid);

  // Initialiseer de opties.
  OPTIES.init(aantal_paletten);

  // Initialiseer de pijlen.
  PIJLEN.init();

  // Initialiseer de timer.
  TIMER.init();
});
