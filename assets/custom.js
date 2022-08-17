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



  function hideValues(event){
    
    if(event.explicitOriginalTarget.innerText == '150 X 220 CM'){
      const fistOption = document.querySelector("li.gewicht_option:not(.hidden)");
      fistOption.click();
      document.querySelector("li.HorizontalList__Item > input[value = '4 kg']").parentElement.classList.add("hidden");
      
    }
    if(event.explicitOriginalTarget.innerText == '135 X 200 CM'){
      document.querySelector(".gewicht_option > input[value = '6 kg']").click();
      document.querySelector("li.HorizontalList__Item > input[value = '4 kg']").parentElement.classList.remove("hidden");
    }
  }

  document.addEventListener("variant:changed", function(event) { // (1)  
    ["second_weight_info", "weight_info", "cover_type_info"].forEach(info => {
      if (event.detail.variant) {
      	hideOption(info, event.detail.variant.id);
      }
    });
	console.log("variant changed");
    console.log(event.detail);
    hideValues(event);
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
      
      const label = document.querySelector(`.ProductForm__SelectedValue[data-option-position="${number}"]`);
      
      if (event.detail.variant){
        const selectedVariant = event.detail.variant["option" + number];
        label.textContent = selectedVariant;
      } 
      if (event.detail.variant == null) {
        label.textContent = "Nicht verfügbar";
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
