// http://stackoverflow.com/a/1484514/2940668
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// Wacht todat de dom klaar is.
$(document).ready(function () {

  // Variables van alle muren.
  var muur01 = document.getElementById('muur01'),
      muur02 = document.getElementById('muur02'),
      muur03 = document.getElementById('muur03'),
      muur04 = document.getElementById('muur04'),
      random = document.getElementById('randomBehang');

  // Voeg een event listener toe aan de random kleur kiezer.
  random.addEventListener('mouseenter', function() {

    // Verkrijg een random kleur.
    var color = getRandomColor();

    // Verander de muren van kleur.
    $(muur01).attr('material', 'color:' + color);
    $(muur02).attr('material', 'color:' + color);
    $(muur03).attr('material', 'color:' + color);
    $(muur04).attr('material', 'color:' + color);
  });
});
