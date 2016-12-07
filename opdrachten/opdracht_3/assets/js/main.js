/**
 * Created by maartenpaauw on 07-12-16.
 */
$(function(){
  var data;
  var dataString;

  function getData(data)
  {

    $.ajax({
      url: 'https://swapi.co/api' + dataString,
      method: 'GET', // or GET
      dataType : "json",
      success: function(msg) {
        var x = msg['name'] !== undefined ? msg['name'] : msg['title'];

        $('#text').attr('text','text: ' + x);


      }
    });
  }
});


