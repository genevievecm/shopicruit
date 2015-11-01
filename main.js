var request = new XMLHttpRequest();
request.open('GET', 'http://shopicruit.myshopify.com/products.json', true);

request.onload = function() {

	var lampPrices = [];
	var walletPrices = [];
	var total = 0;

	if (request.status >= 200 && request.status < 400) {

    	var data = JSON.parse(request.responseText);
  	} 

  	for (var p in data.products) {

  		var productType = data.products[p].product_type;
  		var variants = data.products[p].variants;

		for (var v in variants) {
			
			// Get all lamps
			getProductPrices('Lamp', lampPrices);

			// Get all wallets
	  		getProductPrices('Wallet', walletPrices);
		}
	}

	var lamps = calculateTotalPrice(lampPrices);
	var wallets = calculateTotalPrice(walletPrices);
	var grandTotal = lamps + wallets;
	var plusTax = (grandTotal * 0.13) + grandTotal;
	
	document.getElementById('wallet-prices').innerHTML = '$' + wallets.toFixed(2);
	document.getElementById('lamp-prices').innerHTML = '$' + lamps.toFixed(2);
	document.getElementById('grand-total').innerHTML = '$' + grandTotal.toFixed(2);
	document.getElementById('taxed-total').innerHTML = '$' + plusTax.toFixed(2);

	function getProductPrices(product, array) {
    
	    if(product == productType){

			var price = parseFloat(variants[v].price);
			array.push(price);
		}            
	}

	function calculateTotalPrice(array){

		for (var i = 0; i < array.length; i++) {

			total += array[i];
		}
		return total;
	}
};

request.send();
