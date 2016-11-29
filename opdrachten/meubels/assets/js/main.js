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

      kruk = document.getElementsByClassName('kruk'),
      stoel = document.getElementsByClassName('stoel'),
      bank = document.getElementsByClassName('bank'),

      random = document.getElementById('randomBehang'),
      randomKruk = document.getElementById('randomKruk'),
      randomStoel = document.getElementById('randomStoel'),
      randomBank = document.getElementById('randomBank');

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

  // Voeg een event listener toe aan de random kleur kiezer.
  randomKruk.addEventListener('mouseenter', function() {

    // Verkrijg een random kleur.
    var color = getRandomColor();

    // Verander de kruk van kleur.
    $(kruk).attr('material', 'color:' + color);
  });

  // Voeg een event listener toe aan de random kleur kiezer.
  randomStoel.addEventListener('mouseenter', function() {

    // Verkrijg een random kleur.
    var color = getRandomColor();

    // Verander de stoel van kleur.
    $(stoel).attr('material', 'color:' + color);
  });

  // Voeg een event listener toe aan de random kleur kiezer.
  randomBank.addEventListener('mouseenter', function() {

    // Verkrijg een random kleur.
    var color = getRandomColor();

    // Verander de bank van kleur.
    $(bank).attr('material', 'color:' + color);
  });


});
