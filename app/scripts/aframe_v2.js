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

    // Bepaal de positie van de Rubik's Cube.
    RUBIKSCUBE.functions.bepaal_positie(grid);
  },

  // Functions
  functions: {

    // Verkijg de 6 zijdes.
    verkrijg_zijdes: function (id) {

      // Maak de 6 zijdes als entities.
      return '<a-entity id="kubus-' + id + '-zijde-1" class="zijde zijde-1" mixin="mixin-kleur-FFFFFF kleuren-palet-1-kleur-1-mixin geometry-1-mixin" position=" 0 1.6 -1"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-2" class="zijde zijde-2" mixin="mixin-kleur-FFFFFF kleuren-palet-1-kleur-2-mixin geometry-1-mixin" position=" 0 1.6  1"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-3" class="zijde zijde-3" mixin="mixin-kleur-FFFFFF kleuren-palet-1-kleur-3-mixin geometry-2-mixin" position=" 0 2.6  0"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-4" class="zijde zijde-4" mixin="mixin-kleur-FFFFFF kleuren-palet-1-kleur-4-mixin geometry-2-mixin" position=" 0 0.6  0"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-5" class="zijde zijde-5" mixin="mixin-kleur-FFFFFF kleuren-palet-1-kleur-5-mixin geometry-3-mixin" position=" 1 1.6  0"></a-entity>' +
             '<a-entity id="kubus-' + id + '-zijde-6" class="zijde zijde-6" mixin="mixin-kleur-FFFFFF kleuren-palet-1-kleur-6-mixin geometry-3-mixin" position="-1 1.6  0"></a-entity>';
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

        var $zijdes = $('.zijde-' + i);

        // Haal alle zijdes op.
        var mixins = $zijdes.attr('mixin').split(' ');

        // Wijzig de kleur mixin.
        mixins[1] = 'kleuren-palet-' + id + '-kleur-' + i + '-mixin';

        // Wijzig de mixin attributen
        $zijdes.attr('mixin', mixins.join(' '));
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

      var id = 0;

      // Loop door X heen.
      for (var x = 0; x < grid; x ++) {

        // Loop door Y heen.
        for(var y = 0; y < grid; y++) {

          // Loop door Z heen.
          for(var z = 0; z < grid; z++) {

            // Nodig voor de X, Y en Z coordinaten.
            var verdubbelaar = grid - 3;

            // Kleine check.
            if(verdubbelaar == 0) { verdubbelaar = 1; }

            // TODO: FIX THIS FUCKED UP SHIT.
            var x_pos = (x * 2) - (2),
                y_pos = (y * 2) - (3.5),
                z_pos = (z * 2) - (2);

              // TODO: ID klopt niet helemaal.
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
      RUBIKSCUBE.$rubiks_cube.attr("position", x + ' ' + y + ' ' + z);
    },

    // Roteer de Rubik's Cube.
    roteer_rubiks_cube: function (x, y) {

      // Verander de rotatie van de rubik's cube.
      RUBIKSCUBE.$rubiks_cube.attr('rotation', x + ' ' + y + ' 0');
    },

    // Verkijg de rotatie van de Rubik's Cube.
    verkrijg_rotatie_rubiks_cube: function () {

      // Geef de rotatie terug als een array.
      return RUBIKSCUBE.$rubiks_cube.attr('rotation');
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

    // Voeg de optie grid toe.
    OPTIES.functions.voeg_optie_grid_toe();

    // Voeg een aantal grid opties toe.
    OPTIES.functions.voeg_grid_keuzes_toe(2, 3);

    // Voeg de grid hover toe.
    OPTIES.functions.set_grid_hover();
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
      var mixin = "mixin-kleur-FFFFFF";

      // Als het de eerst is.
      if(id == 1) {

        // Geef het een actieve kleur.
        mixin = "mixin-kleur-000000";
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
      // TODO: nog te implementeren.
    },
  }
};

// Pijlen klasse.
var PIJLEN = {

  // JQuery selectors.
  $: {

    // Scene
    pijlen: $('#pijlen')
  },

  // Initialiseer de klasse.
  init: function () {

    // Voeg de pijlen toe.
    PIJLEN.functions.voeg_pijlen_toe();

    // Voeg een event listener toe aan de pijlen.
    PIJLEN.functions.pijl_hover();
  },

  // De functions.
  functions: {

    // Voeg de pijlen toe aan de scene.
    voeg_pijlen_toe: function () {

      // Pijlen array
      var pijlen = [];

      // Verkrijg de pijlen.
      pijlen.push(PIJLEN.functions.verkrijg_pijlen());

      // Voeg de pijlen toe aan de array.
      PIJLEN.$.pijlen.append(pijlen);
    },

    // Verkrijg de pijlen om de scene te draaien.
    verkrijg_pijlen: function () {

      // Geef de pijlen terug.
      return '<a-image id="pijl-y-as-links"   class="pijl" data-as-rotatie="y" data-met-de-klok-mee="0" src="#image-pijl" position="-5  0 0" material="opacity: 0.7" rotation="0 0   0"></a-image>' +
             '<a-image id="pijl-x-as-beneden" class="pijl" data-as-rotatie="x" data-met-de-klok-mee="1" src="#image-pijl" position=" 0 -5 0" material="opacity: 0.7" rotation="0 0  90"></a-image>' +
             '<a-image id="pijl-y-as-rechts"  class="pijl" data-as-rotatie="y" data-met-de-klok-mee="1" src="#image-pijl" position=" 5  0 0" material="opacity: 0.7" rotation="0 0 180"></a-image>' +
             '<a-image id="pijl-x-as-boven"   class="pijl" data-as-rotatie="x" data-met-de-klok-mee="0" src="#image-pijl" position=" 0  5 0" material="opacity: 0.7" rotation="0 0 270"></a-image>';
    },

    // Event listener voor de pijlen.
    pijl_hover: function () {

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
          this.iid = setInterval(function () {

            // Laat de Rubik's Cube draaien.
            PIJLEN.functions.doe_rubiks_cube_draaien(as, met_de_klok_mee);

            // Speel het draai geluid af.
            GELUID.functions.speel_roteer_geluid();
          }, 250);
        });

        // Voeg aan de pijl een eventlistener toe.
        pijl.addEventListener('mouseleave', function () {

          // Stop de interval.
          this.iid = clearInterval(this.iid);
        });
      }
    },

    // Laat de Rubik's Cube draaien.
    doe_rubiks_cube_draaien: function (as, met_de_klok_mee) {

      // De assen die we gaan draaien.
      var huidige_rotatie = RUBIKSCUBE.functions.verkrijg_rotatie_rubiks_cube(),
          x               = huidige_rotatie.x,
          y               = huidige_rotatie.y,
          teller          = 10;

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
    }
  }
};

// Audio klasse.
var GELUID = {

  // Roteer geluid.
  roteer_geluid: new Audio('../sounds/drag.mp3'),

  // Init functie.
  init: function () {

  },

  // Alle functies.
  functions: {

    // Speel het roteer geluid af.
    speel_roteer_geluid: function () {

      // Speel het geluid af.
      GELUID.roteer_geluid.play();
    }
  }
};

// Timer klasse.
var TIMER = {

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
});
