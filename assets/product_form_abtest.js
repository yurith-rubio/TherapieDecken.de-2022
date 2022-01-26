$(document).ready(function () {

  console.log("hola");
  $("input.ColorSwatch__Radio").click(function(){
      $("li.HorizontalList__Item").removeClass("yellow_style");
      $("li.HorizontalList__Item > input.ColorSwatch__Radio:checked+.ColorSwatch").parents("li").addClass("yellow_style");
  });

});