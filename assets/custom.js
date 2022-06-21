/*-----------------------------------------------------------------------------/
/ Metafields JS for variants changing - Yurith
/-----------------------------------------------------------------------------*/


$(document).ready(function () {
  
  function getSelectedOptions() {
    return {
     	option1: $("input[name=option-0]:checked").val(),
      	option2: $("input[name=option-1]:checked").val()
    }
  }
  
  
  function getSelectedAdditionalVariantId() {
    return $("li.HorizontalList__Item.AdditionalVariant_container > input[type=radio]:checked ~ .additional_cover_type_info");
  }
  
  function selectAdditionalVariant() {
    // First unselect all variants
    $("select#AdditionalProductSelect > option").removeAttr("selected");
    
    const id = getSelectedAdditionalVariantId();
    $("select#AdditionalProductSelect > option[value=" + id + "]").attr("selected", "selected");
  }
  
  function getSelectedAdditionalProduct(variantId) {
    for (variant of window.additionalProductJson.variants) {
    	if (variant.id == variantId) return variant;
    }
  	return null;
  }
  
  function getMainProductVariant(variantId) {
    for (variant of window.mainProductJson.variants) {
    	if (variant.id == variantId) return variant;
    }
  	return null;
  }

  
  function getMainProductPrice(id) {
    if (!id) {
      // No id in URL - user has not yet selected a variant.
      // return the first variant price
      return window.firstProductPrice;
    }
    
    const mainProduct = getMainProductVariant(id);
    if (!mainProduct) {
      // No variant found under the selected id
      // return first variant price. What else could we do?
      return window.firstProductPrice;
    }
    
    return mainProduct.price;
  }
  
  function hideOption(selector, selectedVariant) {
    const infoMetafield = document.querySelectorAll("." + selector);
    const selectedInfoMetafield = document.getElementById(selector + "_" + selectedVariant);
    console.log("selectedInfoMetafield");
    console.log(selectedInfoMetafield);
    if (!infoMetafield || !selectedInfoMetafield) return;

    infoMetafield.forEach(function(info){
      info.classList.add("hide");
    });
    selectedInfoMetafield.classList.remove("hide");
  }

  document.addEventListener("variant:changed", function(event) { // (1)  
    ["weight_info", "cover_type_info"].forEach(info => hideOption(info, event.detail.variant.id));
    console.log("variant changed");

  });
  
  
  
  /* function updateProductBadges(variantId, opt) {
    $("div.info-wr").addClass("info-wr-hidden");                           	                  
   	$("div.is-limited-badge").addClass("is-limited-badge-hidden");
   	$("div.on-sale-badge").addClass("on-sale-badge-hidden");
    $("div.twtd-shipping-time").addClass("twtd-shipping-time-hidden");

    $("[data-variant-id=" + variantId + "]").removeClass("info-wr-hidden");
    $("[data-variant-id=" + variantId + "]").removeClass("twtd-shipping-time-hidden");

    $("div.is-limited-badge[data-variant-option1='" + opt.option1 + "'][data-variant-option2='" + opt.option2 + "']").removeClass("is-limited-badge-hidden");
	//Extra hidding rule for the upsell products limitiert badges
    $("div.is-limited-badge[data-variant-id=" + variantId + "]").removeClass("is-limited-badge-hidden")
    $("div.on-sale-badge[data-variant-option1='" + opt.option1 + "'][data-variant-option2='" + opt.option2 + "']").removeClass("on-sale-badge-hidden");
  } */
  
  /* function updateAdditionalProductBadges() {
    const variantId = getSelectedAdditionalVariantId();
    $("div.additional-info-wr").addClass("additional-info-wr-hidden");
    $("[data-variant-id=" + variantId + "]").removeClass("additional-info-wr-hidden");
  } */
   
  /* function updateBadges(variantId, isAdditional) {
    if (isAdditional) {
      updateAdditionalProductBadges();
    } else {
      // Get the currently selected options: size and weight
      const opt = getSelectedOptions();
      updateProductBadges(variantId, opt);
    }
  } */
  
  function updatePrice(id) {
    const additionalVariantId = getSelectedAdditionalVariantId();    
    if (additionalVariantId) {
    	const additionalVariant = getSelectedAdditionalProduct(additionalVariantId);
    	const additionalDiscountPrice = additionalVariant.price * 0.5;
      	const mainProductPrice = getMainProductPrice(id);      
        const totalPrice = mainProductPrice + additionalDiscountPrice;          
    	const adjustedPrice = Shopify.formatMoney(totalPrice, window.moneyFormat);
        $("span.Price--highlight").html(adjustedPrice);
    }
  }
  
	$("li.HorizontalList__Item > input.SizeSwatch__Radio[type=radio]").change(function (e) {      	
      	setTimeout(function () {
        	const path = location.search;
      		if (path.indexOf("variant") >= 0) {
      			const variantId = path.split("=")[1];              
              	// updateBadges(variantId, false);
              	updatePrice(variantId);              	
        	}		        	              
      	}, 0);
    });
  
	$("li.HorizontalList__Item.MainVariant_container > input[type=radio]").change(function (e) {               
      	setTimeout(function () {            
        	const path = location.search;
      		if (path.indexOf("variant") >= 0) {
      			const variantId = path.split("=")[1];
              	// updateBadges(variantId, false);
              	updatePrice(variantId);
        	}		        	              
      	}, 0);
    });

  
	$("li.HorizontalList__Item.AdditionalVariant_container > input[type=radio]").change(function (e) {      	
      	setTimeout(function () {          	          	
          	selectAdditionalVariant();
        	const path = location.search;
      		if (path.indexOf("variant") >= 0) {
      			const variantId = path.split("=")[1];              
                // updateBadges(variantId, true);
              	updatePrice(variantId);              	
        	}
      	}, 0);
    });

  
  	// Update the price when the page is loaded (take into account that a different variant is selected)
  	updatePrice();
  
  	// New style for light-yellow background on Color Swatches when selected
    $("input.ColorSwatch__Radio").click(function(){
      $("li.HorizontalList__Item").removeClass("yellow_style");
      $("li.HorizontalList__Item > input.ColorSwatch__Radio:checked+.ColorSwatch").parents("li").addClass("yellow_style");
  	});
  
});
