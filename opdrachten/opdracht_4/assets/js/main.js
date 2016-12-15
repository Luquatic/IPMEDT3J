// Wacht totdat het document geladen is.
$(document).ready(function () {

  // De nodige variables.
  var scene = document.getElementById('scene');

  // Loop door de rijen heen.
  for (var x = 0; x < 10; x++) {

    // Loop door de rijen heen.
    for(var y = 0; y < 10; y++) {

      // Voeg de box toe aan de scene.
      $(scene).append(generateBox((x * 1.25), (y * 1.25), -7.5));
    }

  }

  // Hove methode.
  hover();

  // Genereer een box.
  function generateBox(x, y, z) {

    // Geef een HTML string terug.
    return '<a-entity class="hover" position="' + x + " " + y + " " + z + '" mixin="r box" ></a-entity>';
  }

  // Hover methode.
  function hover() {

    // Haal alle boxes op.
    var boxes = document.getElementsByClassName('hover');

    // Ga door elke box heen.
    for(var i = 0; i < boxes.length; i++) {

      // Voeg een event listener toe aan elke box.
      document.getElementsByClassName('hover')[i].addEventListener('mouseenter', function() {

        // Verander de mixin van de box.
        $(this).attr('mixin', 'g box')
      });
    }
  }
});
