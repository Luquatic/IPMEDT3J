console.log('\'Allo \'Allo!');


$(document).ready(function () {

  // Variables
  var cube = document.getElementById('rubix-cube');
  var leftBox = document.getElementById('leftBox');
  var upperBox = document.getElementById('upperBox');
  var rightBox = document.getElementById('rightBox');
  var bottomBox = document.getElementById('bottomBox');

  var x = 0;
  var y = 0;
  var z = 0;

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
