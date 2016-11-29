/**
 * Created by Jessey Fransen on 29/11/2016.
 */
$(document).ready(function() {
    var box = document.getElementById('box');
    var sphere = document.getElementById('sphere');
    var box_parent = document.getElementById('box_parent');

    box.addEventListener('mouseenter', function() {
        $(box).attr('width', '100');
        $(box_parent).append('<a-animation attribute="rotation" dur="10000" fill="forwards" to="0 360 0" repeat="indefinite"></a-animation>');
    });

    box.addEventListener('mouseleave', function () {
        $(box).attr('width', '5');
    });
})