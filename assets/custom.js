/*-----------------------------------------------------------------------------/
/ Metafields JS for variants changing - Yurith
/-----------------------------------------------------------------------------*/


//$(document).ready(function () {

  function hideOption(selector, selectedVariant) {
    const infoMetafield = document.querySelectorAll("." + selector);
    const selectedInfoMetafield = document.getElementById(selector + "_" + selectedVariant);
    
    if (!infoMetafield || !selectedInfoMetafield) return;

    infoMetafield.forEach(function(info){
      info.classList.add("hide");
    });
    selectedInfoMetafield.classList.remove("hide");
  }

  document.addEventListener("variant:changed", function(event) { // (1)  
    ["second_weight_info", "weight_info", "cover_type_info"].forEach(info => hideOption(info, event.detail.variant.id));
    console.log("variant changed");

  });

  // New style for light-yellow background on Color Swatches when selected

const colorSwatchButtons = document.querySelectorAll("input.ColorSwatch__Radio");
const checkedSwatchButtons = document.querySelectorAll("input.ColorSwatch__Radio:checked");

const clickedColorSwatchButton = event => {
  colorSwatchButtons.forEach(button => {
    console.log("button");
    console.log(button);
    if (button.hasAttribute("checked", "checked")){
      console.log("checked button");
      console.log(button);
    } else if (button.classList.contains("yellow_style")){
      console.log("yellow styled button");
      console.log(button);
      button.classList.remove("yellow_style");
    }
  });
  event.originalTarget.parentElement.classList.add("yellow_style");
}

colorSwatchButtons.forEach(button => {
  button.addEventListener("click", clickedColorSwatchButton);
});
/*
  $("input.ColorSwatch__Radio").click(function(){
    $("li.HorizontalList__Item").removeClass("yellow_style");
    $("li.HorizontalList__Item > input.ColorSwatch__Radio:checked+.ColorSwatch").parents("li").addClass("yellow_style");
  });
  */
//});
