/*-----------------------------------------------------------------------------/
/ Metafields JS for variants changing - Yurith
/-----------------------------------------------------------------------------*/

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
  ["second_weight_info", "weight_info", "cover_type_info"].forEach(info => {
    if (event.detail.variant) {
      hideOption(info, event.detail.variant.id);
    }
  });
  //console.log("variant changed");
});
