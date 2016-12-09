// Wacht totdat het document geladen is.
$(document).ready(function() {
  var $nieuw_venster   = $('#nieuw-venster'),
      $kopen           = $('#kopen-menu'),
      $virtual_reality = $('#virtual-reality-menu');

  // Voeg een click event toe.
  $nieuw_venster.click(function () {

    // Open de A Frame pagina in een apart tabblad.
    window.open('aframe.html');
  });

  $kopen.click(function () {
    buttonCheck(true);
  });

  $virtual_reality.click(function () {
    buttonCheck(false);
  });

  function buttonCheck(check) {
    if($nieuw_venster.is(':visible') == check) {
      $nieuw_venster.toggle();
    }
  }
});
