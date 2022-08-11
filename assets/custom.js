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
    ["second_weight_info", "weight_info", "cover_type_info"].forEach(info => {
      if (event.detail.variant) {
      	hideOption(info, event.detail.variant.id);
      }
    });
	console.log("variant changed");
    console.log(event.detail.variant?.option);
  });

  const collapsibleSelectors = document.querySelectorAll(".ProductForm_CollapsibleSelector");
  const collapsibleContent = document.querySelectorAll(".ProductForm__Option");

  function hideShowCollapsibles() {
    collapsibleSelectors.forEach(collapsible => {
      collapsible.classList.remove("hidden");
    });
    collapsibleContent.forEach(collapsible => {
      collapsible.classList.add("hidden");
    });
  }

  function getCollapsbleOptionNumber(element) {
    /*const getOptionNumber = document.querySelector(".ProductForm_CollapsibleSelector .ProductForm__SelectedValue[data-option-position]");
    getOptionNumber.forEach(option => {
      option.getAttribute("data-option-position");
    });*/
    return element.firstElementChild.firstElementChild.getAttribute("data-option-position");
  }

  function changeNewValueName(number) {
    document.addEventListener("variant:changed", function changeNewValueName(event) { // (1)  
      const selectedOption = `{"option": "${number}"}`;
      
      if (event.detail.variant){
        const label = document.querySelector(`.ProductForm__SelectedValue[data-option-position="${number}"]`);
        const selectedVariant = event.detail.variant["option" + number];
        label.textContent = selectedVariant;
      }
    });
  }

  collapsibleSelectors.forEach(button => {
    button.addEventListener("click", event => {
      const buttonSelected = event.target.closest(".ProductForm_CollapsibleSelector");
      const infoToHide = event.target.closest(".ProductForm_CollapsibleSelector");
      const infoToShow = buttonSelected.nextElementSibling;
      hideShowCollapsibles();
      const number = getCollapsbleOptionNumber(buttonSelected);
      const value = changeNewValueName(number);
      infoToHide.classList.add("hidden");
      infoToShow.classList.remove("hidden");
    });
  });





//});
