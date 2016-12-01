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

      // Meubels klasse
      kruk = document.getElementsByClassName('kruk'),
      stoel = document.getElementsByClassName('stoel'),
      bank = document.getElementsByClassName('bank'),

      // Meubels aan de muur ID
      krukID = document.getElementById('kruk'),
      stoelID = document.getElementById('stoel'),
      bankID = document.getElementById('bank'),

      // Meubels in de camera ID
      krukCursorID = document.getElementById('krukCursorID'),
      stoelCursorID = document.getElementById('stoelCursorID'),
      bankCursorID = document.getElementById('bankCursorID'),

      // Meubels in bankHolder1
      krukID01 = document.getElementById('kruk01'),
      stoelID01 = document.getElementById('stoel01'),
      bankID01 = document.getElementById('bank01'),
      // Meubels in bankHolder2
      krukID02 = document.getElementById('kruk02'),
      stoelID02 = document.getElementById('stoel02'),
      bankID02 = document.getElementById('bank02'),
      // Meubels in bankHolder3
      krukID03 = document.getElementById('kruk03'),
      stoelID03 = document.getElementById('stoel03'),
      bankID03 = document.getElementById('bank03'),

      // Bank holders
      bank1Holder = document.getElementById('bank1Holder'),
      bank2Holder = document.getElementById('bank2Holder'),
      bank3Holder = document.getElementById('bank3Holder'),

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


  // KRUK
  // Voeg een event listener toe aan de random kleur kiezer.
  randomKruk.addEventListener('mouseenter', function() {

    // Verkrijg een random kleur.
    var color = getRandomColor();

    // Verander de kruk van kleur.
    $(kruk).attr('material', 'color:' + color);
  });

  krukID.addEventListener('mouseenter', function() {

    //Maak krukCursor visible
    $(krukCursorID).attr('visible', 'true');
    $(stoelCursorID).attr('visible', 'false');
    $(bankCursorID).attr('visible', 'false');
  });

  bank1Holder.addEventListener('mouseenter', function() {

    //Maak kruk01 visible
    $(krukID01).attr('visible', 'true');
  });
  bank1Holder.addEventListener('mouseleave', function() {

    //Maak kruk01 invisible
    $(krukID01).attr('visible', 'false');
  });
  bank2Holder.addEventListener('mouseenter', function() {

    //Maak kruk02 visible
    $(krukID02).attr('visible', 'true');
  });
  bank3Holder.addEventListener('mouseenter', function() {

    //Maak kruk03 visible
    $(krukID03).attr('visible', 'true');
  });


  // STOEL
  // Voeg een event listener toe aan de random kleur kiezer.
  randomStoel.addEventListener('mouseenter', function() {

    // Verkrijg een random kleur.
    var color = getRandomColor();

    // Verander de stoel van kleur.
    $(stoel).attr('material', 'color:' + color);
  });

  stoelID.addEventListener('mouseenter', function() {

    //Maak stoelCursor visible
    $(krukCursorID).attr('visible', 'false');
    $(stoelCursorID).attr('visible', 'true');
    $(bankCursorID).attr('visible', 'false');
  });


  // BANK
  // Voeg een event listener toe aan de random kleur kiezer.
  randomBank.addEventListener('mouseenter', function() {

    // Verkrijg een random kleur.
    var color = getRandomColor();

    // Verander de bank van kleur.
    $(bank).attr('material', 'color:' + color);
  });

  bankID.addEventListener('mouseenter', function() {

    //Maak bankCursor visible
    $(krukCursorID).attr('visible', 'false');
    $(stoelCursorID).attr('visible', 'false');
    $(bankCursorID).attr('visible', 'true');
  });


});
