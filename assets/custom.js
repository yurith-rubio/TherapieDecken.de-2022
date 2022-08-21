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

  const collapsibleSelectors = document.querySelectorAll(".ProductForm_CollapsibleSelector");
  const collapsibleContent = document.querySelectorAll(".ProductForm__Option");

  function hideShowCollapsibles(event) {
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

  function changeNewValueName(event) {
    console.log("change New Value Name function");
    console.log(event);
    const currentLabel = event.explicitOriginalTarget.closest(".ProductForm_CollapsibleOption").firstElementChild.firstElementChild.firstElementChild;
      /*if (event.detail.variant){
        const selectedVariant = event.detail.variant["option" + number];
        label.textContent = selectedVariant;
      } */
  }

  collapsibleSelectors.forEach(button => {
    button.addEventListener("click", event => {
      const buttonSelected = event.target.closest(".ProductForm_CollapsibleSelector");
      const infoToHide = event.target.closest(".ProductForm_CollapsibleSelector");
      const infoToShow = buttonSelected.nextElementSibling;
      hideShowCollapsibles();
      //const number = getCollapsbleOptionNumber(buttonSelected);
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
    const value = changeNewValueName(event);
  });
