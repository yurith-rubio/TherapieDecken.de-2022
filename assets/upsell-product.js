$(document).ready(function () {
  
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
  
  // Testing Updating Badges - Yurith
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
  
  function getMainProductComparePrice(id) {
    if (!id) {
      // No id in URL - user has not yet selected a variant.
      // return the first variant price
      return window.firstProductComparePrice;
    }
    
    const mainProductCompare = getMainProductVariant(id);
    if (!mainProductCompare) {
      // No variant found under the selected id
      // return first variant price. What else could we do?
      return window.firstProductComparePrice;
    }
    return mainProductCompare.compare_at_price;
  }
  
// START --> Bedding Template with added yes/no buttons for two different extra optional products
  function getSelectedBalanceInlettProduct(variantId) {
    for (variant of window.balanceInlettProductJson.variants) {
      if (variant.id == variantId) return variant;
    }
    return null;
  }

  function getSelectedGravityInlettProduct(variantId) {
    for (variant of window.gravityInlettProductJson.variants) {
      if (variant.id == variantId) return variant;
    }
    return null;
  }
  
  function updateBalanceInlettPrice(additionalVariantId, mainVariantId) {       
    let totalPrice = getMainProductPrice(mainVariantId);
    let totalComparePrice = getMainProductComparePrice(mainVariantId);
    const additionalBeddingSelected = $("#yesBalanceInlett__Selector").attr("checked");
    if (additionalBeddingSelected) {
      const variant = getSelectedBalanceInlettProduct(additionalVariantId);
      if (variant) {
        totalPrice += variant.price;
        totalComparePrice += variant.price;        
      }
    } 
    
    const adjustedPrice = Shopify.formatMoney(totalPrice, window.moneyFormat);
    $("span.Price--highlight").html(adjustedPrice);
    
    const adjustedComparePrice = Shopify.formatMoney(totalComparePrice, window.moneyFormat);
    $("span.Price--compareAt").html(adjustedComparePrice);
  }
  
  function updateGravityInlettPrice(additionalVariantId, mainVariantId) {       
    let totalPrice = getMainProductPrice(mainVariantId);
    let totalComparePrice = getMainProductComparePrice(mainVariantId);
    const additionalBeddingSelected = $("#yesGravityInlett__Selector").attr("checked");
    if (additionalBeddingSelected) {
      const variant = getSelectedGravityInlettProduct(additionalVariantId);
      if (variant) {
        totalPrice += variant.price;
        totalComparePrice += variant.price;
      }
    } 
    const adjustedPrice = Shopify.formatMoney(totalPrice, window.moneyFormat);
    $("span.Price--highlight").html(adjustedPrice);
    
    const adjustedComparePrice = Shopify.formatMoney(totalComparePrice, window.moneyFormat);
    $("span.Price--compareAt").html(adjustedComparePrice);
  }
  
  function selectBalanceInlettVariant() {
	const selectedAdditionalBeddingSize = $("input[name='option-0'][checked='checked']").attr("value");
	const selectedAdditionalBeddingWeight = $("input[name='BalanceInlett-option-1'][checked='checked']").attr("value");
    
    // Selected Balance Inlett Variant Id
    const variantId = $("input[name='BalanceInlett-option-1'] ~ div.BalanceInlett__Variant[data-option-1='"+ selectedAdditionalBeddingSize +"'][data-option-2='" + selectedAdditionalBeddingWeight + "']").attr("data-variant-id");

    $("select.BalanceSelector > option").removeAttr("selected");
    $("select.BalanceSelector > option[value='" + variantId +"']").attr("selected", "selected");
        
    setTimeout(function () {
      const path = location.search;
      if (path.indexOf("variant") >= 0) {
        const mainVariantId = path.split("=")[1];
        updateBalanceInlettPrice(variantId, mainVariantId);
      }
      
      $("div.balance-info-wr").addClass("info-wr-hidden");
   	  $("div.balance-info-wr[data-variant-id='" + variantId +"']").removeClass("info-wr-hidden");    
    }, 0);        
  }
  
  function selectGravityInlettVariant() {
	const selectedAdditionalBeddingSize = $("input[name='option-0'][checked='checked']").attr("value");
	const selectedAdditionalBeddingWeight = $("input[name='GravityInlett-option-1'][checked='checked']").attr("value");
    
    // Selected Gravity Inlett Variant Id
    const variantId = $("input[name='GravityInlett-option-1'] ~ div.GravityInlett__Variant[data-option-1='"+ selectedAdditionalBeddingSize +"'][data-option-2='" + selectedAdditionalBeddingWeight + "']").attr("data-variant-id");

    $("select.GravitySelector > option").removeAttr("selected");
    $("select.GravitySelector > option[value='" + variantId +"']").attr("selected", "selected");
            
    
    setTimeout(function () {      
      const path = location.search;
      if (path.indexOf("variant") >= 0) {
        const mainVariantId = path.split("=")[1];
        updateGravityInlettPrice(variantId, mainVariantId);
      }
      
      $("div.gravity-info-wr").addClass("info-wr-hidden");
      $("div.gravity-info-wr[data-variant-id='" + variantId +"']").removeClass("info-wr-hidden");
    }, 0);
  }

  // Select same size for the Gravity Inlett as Main Product Size
  $("input[name='option-0']").click(function (e) {
	$("input[name='option-0']").removeAttr("checked");
    $(e.target).attr("checked", "checked");
    
    const GravityInlettSelected = $("#yesGravityInlett__Selector").attr("checked");
    const BalanceInlettSelected = $("#yesBalanceInlett__Selector").attr("checked");

    setTimeout(function () {
    // Need help in here with this part
      if (GravityInlettSelected == "checked"){
        selectGravityInlettVariant();
      } else if (BalanceInlettSelected == "checked") {
        selectBalanceInlettVariant();
      }
    }, 0);

  });
  
  // Get Bedding Additional Product Variant Selected : For Balance
  $("input[class='SizeSwatch__Radio Inlett__Input BalanceInlett__Input']").click(function (e) {
    $("input[class='SizeSwatch__Radio Inlett__Input BalanceInlett__Input']").removeAttr("checked");
    $(e.target).attr("checked", "checked");
 	selectBalanceInlettVariant();
  });
  
  // Get Bedding Additional Product Variant Selected : For Gravity
  $("input[class='SizeSwatch__Radio Inlett__Input GravityInlett__Input']").click(function (e) {
    $("input[class='SizeSwatch__Radio Inlett__Input GravityInlett__Input']").removeAttr("checked");
    $(e.target).attr("checked", "checked");
 	selectGravityInlettVariant();
  });
  
  const selectedBeddingVariant = $("li.HorizontalList__Item.MainVariant_container > input[checked='checked']").first();
  // When loading and Ohne Standard is selected
  if (selectedBeddingVariant && selectedBeddingVariant.attr("value") === "Ohne (Standard)" ) {
    $(".AdditionalProductContainer").css("display", "none");
    $(".AdditinalYesNoButtonsContainer").css("display", "none");
    $("#GravityInlettSelector").removeAttr("name");
	$("#BalanceInlettSelector").removeAttr("name");
    
  // When loading and Balance Schlaugen is selected
  } else if (selectedBeddingVariant && selectedBeddingVariant.attr("value") === "Balance (Reißverschluss)" ) {
    $(".BalanceInlett__MainContainer").removeAttr("style");
	$("#GravityInlettSelector").removeAttr("name");
	$("#BalanceInlettSelector").removeAttr("name");

  // When loading and Gravity Schlaugen is selected
  } else if (selectedBeddingVariant && selectedBeddingVariant.attr("value") === "Gravity (Schlaufen)" ) {
    $(".GravityInlett__MainContainer").removeAttr("style");
    $("#GravityInlettSelector").removeAttr("name");
	$("#BalanceInlettSelector").removeAttr("name");
  }

  // Cover Template - Gewicht options hidden 
  $("li.HorizontalList__Item.MainVariant_container > input").click(function (clickedButton) {
    // When click on Ohne Standard
    if (clickedButton.target.value === "Ohne (Standard)") {
      $(".AdditionalProductContainer").css("display", "none");
      $(".AdditionalInlett__MainContainer").css("display", "none");
      $("#AdditionalInlett__MainContainer").click();
      $("#noGravityInlett__Selector").click();
      $("#noBalanceInlett__Selector").click();

      // When click on Balance Schlaufen
    } else if (clickedButton.target.value === "Balance (Reißverschluss)") {
      $(".Inlett__Input").removeAttr("checked");
      $(".GravityInlett__MainContainer").css("display", "none");
      $(".BalanceInlett__MainContainer").removeAttr("style");
      $("#noBalanceInlett__Selector").click();
      
      // When click on Gravity Schlaufen      
    } else if (clickedButton.target.value === "Gravity (Schlaufen)") {
      $(".Inlett__Input").removeAttr("checked");
      $(".BalanceInlett__MainContainer").css("display", "none");
      $(".GravityInlett__MainContainer").removeAttr("style");
      $("#noGravityInlett__Selector").click();
    }      
  });

  // When click on Yes/No Buttons for Balance Reißwerschluss
  $(".yesnoBalanceInlett_Selector").click(function (e) {
    $(".yesnoBalanceInlett_Selector").removeAttr("checked");
    $(e.target).attr("checked", "checked");

    if (e.target.value == "Yes" && e.target.value == "Yes" ){
      $(".BalanceInlettContainer").removeAttr("style");
      $(".BalanceInlett__Input").first().click();
      $(".GravityInlett__Input").removeAttr("checked");
      $("#BalanceInlettSelector").attr("name", "id[]");
      selectBalanceInlettVariant();
    } else {
      $("#yesBalanceInlett__Selector").removeAttr("checked");
      $("#yesGravityInlett__Selector").removeAttr("checked");
      $(".BalanceInlett__Input").removeAttr("checked");
      $(".BalanceInlettContainer").css("display", "none");
      $(".AdditionalProductSelector").removeAttr("name");
      selectBalanceInlettVariant();
    }
  });
  
  // When click on Yes/No Buttons for Gravity Schlaufen
  $(".yesnoGravityInlett_Selector").click(function (e) {
    $(".yesnoGravityInlett_Selector").removeAttr("checked");
    $(e.target).attr("checked", "checked");

    if (e.target.value == "Yes" && e.target.value == "Yes" ){
      $(".GravityInlettContainer").removeAttr("style");
      $(".GravityInlett__Input").first().click();
      $(".BalanceInlett__Input").removeAttr("checked");
      $("#GravityInlettSelector").attr("name", "id[]");
      selectGravityInlettVariant();
    } else {
      $("#yesBalanceInlett__Selector").removeAttr("checked");
      $("#yesGravityInlett__Selector").removeAttr("checked");
      $(".GravityInlett__Input").removeAttr("checked");
      $(".GravityInlettContainer").css("display", "none");
      $(".AdditionalProductSelector").removeAttr("name");
      selectGravityInlettVariant();
    }
  });
// END --> Bedding Template with added yes/no buttons for two different extra optional products

  
});