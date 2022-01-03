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
    return $("li.HorizontalList__Item.AdditionalVariant_container > input[type=radio]:checked ~ .additional-variant-id").attr("data-variant-id");
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
  
  function updateProductBadges(variantId, opt) {
    $("div.info-wr").addClass("info-wr-hidden");                           	                  
   	$("div.is-limited-badge").addClass("is-limited-badge-hidden");
   	$("div.on-sale-badge").addClass("on-sale-badge-hidden");
    $("div.twtd-shipping-time").addClass("twtd-shipping-time-hidden");

    $("[data-variant-id=" + variantId + "]").removeClass("info-wr-hidden");
    $("[data-variant-id=" + variantId + "]").removeClass("twtd-shipping-time-hidden");
    
    $("div.is-limited-badge[data-variant-option1='" + opt.option1 + "'][data-variant-option2='" + opt.option2 + "']").removeClass("is-limited-badge-hidden");
    $("div.on-sale-badge[data-variant-option1='" + opt.option1 + "'][data-variant-option2='" + opt.option2 + "']").removeClass("on-sale-badge-hidden");
    
  }
  
  function updateAdditionalProductBadges() {
    const variantId = getSelectedAdditionalVariantId();
    $("div.additional-info-wr").addClass("additional-info-wr-hidden");
    $("[data-variant-id=" + variantId + "]").removeClass("additional-info-wr-hidden");
  }
   
  function updateBadges(variantId, isAdditional) {
    if (isAdditional) {
      updateAdditionalProductBadges();
    } else {
      // Get the currently selected options: size and weight
      const opt = getSelectedOptions();
      updateProductBadges(variantId, opt);
    }
  }
  
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
              	updateBadges(variantId, false);
              	updatePrice(variantId);              	
        	}		        	              
      	}, 0);
    });
  
	$("li.HorizontalList__Item.MainVariant_container > input[type=radio]").change(function (e) {               
      	setTimeout(function () {            
        	const path = location.search;
      		if (path.indexOf("variant") >= 0) {
      			const variantId = path.split("=")[1];
              	updateBadges(variantId, false);
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
                updateBadges(variantId, true);
              	updatePrice(variantId);              	
        	}
      	}, 0);
    });
  
    $("li.HorizontalList__Item > input").click(function (clickedButton) {
      if(clickedButton.target.value === "150 x 220 cm") {
        $("li.HorizontalList__Item > input[value = '4 kg']").parent().css("display", "none");
        $(".gewicht_option > input[value = '6 kg']").click();
      } else if (clickedButton.target.value === "135 x 200 cm") {
      $("li.HorizontalList__Item > input[value = '4 kg']").parent().removeAttr('style');
        $(".gewicht_option > input").first().click();
      }
    });
    
    const selectedSize = $("li.HorizontalList__Item > input[checked='checked']").first();
    if (selectedSize && selectedSize.attr("value") === "150 x 220 cm") {
      $("li.HorizontalList__Item > input[value = '4 kg']").parent().css("display", "none");    
  }
  
  	// Update the price when the page is loaded (take into account that a different variant is selected)
  	updatePrice();
});
