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

  function hideValues(event){
    const values = document.querySelectorAll(".ProductForm__SelectedValue");
    
    if(event.explicitOriginalTarget.innerText == '150 X 220 CM'){
      document.querySelector("li.HorizontalList__Item > input[value = '4 kg']").parentElement.classList.add("hidden");
      document.querySelector(".gewicht_option > input[value = '6 kg']").click();
      values[1].innerText = "6 kg";
    }
    if(event.explicitOriginalTarget.innerText == '135 X 200 CM'){
      document.querySelector("li.HorizontalList__Item > input[value = '4 kg']").parentElement.classList.remove("hidden");
      const fourkg = document.querySelectorAll(".gewicht_option.option2");
      fourkg[1].click();
      values[1].innerText = "4 kg";
    }
  }

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
    return element.firstElementChild.firstElementChild.getAttribute("data-option-position");
  }

  function changeNewValueName(number) {
      const label = document.querySelector(`.ProductForm__SelectedValue[data-option-position="${number}"]`);
      
      if (event.detail.variant){
        const selectedVariant = event.detail.variant["option" + number];
        label.textContent = selectedVariant;
      } 
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

  document.addEventListener("variant:changed", function(event) { // (1)  
    ["second_weight_info", "weight_info", "cover_type_info"].forEach(info => {
      if (event.detail.variant) {
      	hideOption(info, event.detail.variant.id);
      }
    });
	//console.log("variant changed");
    //console.log(event.detail);
    hideValues(event);
  });


