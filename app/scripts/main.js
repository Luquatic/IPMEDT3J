// Wacht totdat het document geladen is.
$(document).ready(function () {

  // Variables
  var cube      = document.getElementById('rubix-cube'),
      leftBox   = document.getElementById('leftBox'),
      upperBox  = document.getElementById('upperBox'),
      rightBox  = document.getElementById('rightBox'),
      bottomBox = document.getElementById('bottomBox'),

    // X, Y en Z van de Rubik's Cube.
      x = 0,
      y = 0,
      z = 0;

  leftBox.addEventListener('mouseenter', function () {
    this.iid = setInterval(function() {
      y = y - 10;
      $(cube).attr('rotation', x + ' ' +  y + ' ' + z);
    }, 250);
  });

  leftBox.addEventListener('mouseleave', function () {
    this.iid && clearInterval(this.iid);
  });

  upperBox.addEventListener('mouseenter', function () {
    this.iid = setInterval(function() {
      x = x - 10;
      $(cube).attr('rotation', x + ' ' +  y + ' ' + z);
    }, 250);
  });

  upperBox.addEventListener('mouseleave', function () {
    this.iid && clearInterval(this.iid);
  });

  rightBox.addEventListener('mouseenter', function () {
    this.iid = setInterval(function() {
      y = y + 10;
      $(cube).attr('rotation', x + ' ' +  y + ' ' + z);
    }, 250);
  });

  rightBox.addEventListener('mouseleave', function () {
    this.iid && clearInterval(this.iid);
  });

  bottomBox.addEventListener('mouseenter', function () {
    this.iid = setInterval(function() {
      x = x + 10;
      $(cube).attr('rotation', x + ' ' +  y + ' ' + z);
    }, 250);
  });

  bottomBox.addEventListener('mouseleave', function () {
    this.iid && clearInterval(this.iid);
  });
});
