// Wacht totdat het document geladen is.
$(document).ready(function() {
  var $nieuw_venster = $('#nieuw-venster');

  // Voeg een click event toe.
  $nieuw_venster.click(function () {

    // Open de A Frame pagina in een apart tabblad.
    window.open('aframe.html');
  });
});
