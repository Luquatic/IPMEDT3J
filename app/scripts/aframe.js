// Wacht totdat het document geladen is.
$(document).ready(function () {

  // Variables
  var cube      = document.getElementById('rubiks-cube'),
    leftBox   = document.getElementById('leftBox'),
    upperBox  = document.getElementById('upperBox'),
    rightBox  = document.getElementById('rightBox'),
    bottomBox = document.getElementById('bottomBox'),
    audio = new Audio('../sounds/drag.mp3'),
    text1 = document.getElementById('--:--:-x'),
    myWatch = new Stopwatch(),

    // X, Y en Z van de Rubik's Cube.
    x = 0,
    y = 0,
    z = 0;

  leftBox.addEventListener('mouseenter', function () {
    this.iid = setInterval(function() {
      y = y - 10;
      $(cube).attr('rotation', x + ' ' +  y + ' ' + z);
      audio.play();
    }, 250);
  });


  // leftBox.addEventListener('mouseenter', function timer() {
  //   setTimeout(function () {
  //     $(text1).attr('text', 'text:' + i);
  //     i++
  //     if (i < 10) {
  //       timer();
  //     }
  //   }, 1000)
  // });

  leftBox.addEventListener('mouseenter', function () {
    myWatch.start();
    $(text1).attr('text', 'text:' + myWatch.toString());
  });

  leftBox.addEventListener('mouseleave', function () {
    this.iid && clearInterval(this.iid);
  });

  upperBox.addEventListener('mouseenter', function () {
    this.iid = setInterval(function() {
      x = x - 10;
      $(cube).attr('rotation', x + ' ' +  y + ' ' + z);
      audio.play();
    }, 250);
  });

  upperBox.addEventListener('mouseleave', function () {
    this.iid && clearInterval(this.iid);
  });

  rightBox.addEventListener('mouseenter', function () {
    this.iid = setInterval(function() {
      y = y + 10;
      $(cube).attr('rotation', x + ' ' +  y + ' ' + z);
      audio.play();
    }, 250);
  });

  rightBox.addEventListener('mouseleave', function () {
    this.iid && clearInterval(this.iid);
  });

  bottomBox.addEventListener('mouseenter', function () {
    this.iid = setInterval(function() {
      x = x + 10;
      $(cube).attr('rotation', x + ' ' +  y + ' ' + z);
      audio.play();
    }, 250);
  });

  bottomBox.addEventListener('mouseleave', function () {
    this.iid && clearInterval(this.iid);
  });
});
