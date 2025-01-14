sap.ui.define([
    "sap/ui/core/format/NumberFormat"
],function(NumberFormat){
    "use strict"
    
    var mStatusState = {
		"A": "Success",
		"O": "Warning",
		"D": "Error"
	};

    var formatter={
        price: function (sValue) {
			var numberFormat = NumberFormat.getFloatInstance({
				maxFractionDigits: 2,
				minFractionDigits: 2,
				groupingEnabled: true,
				groupingSeparator: ".",
				decimalSeparator: ","
			});
			return numberFormat.format(sValue);
		},
        totalPrice: function (oCartEntries) {
			var oBundle = this.getResourceBundle(),
				fTotalPrice = 0;

			Object.keys(oCartEntries).forEach(function (sProductId) {
				var oProduct = oCartEntries[sProductId];
				fTotalPrice += parseFloat(oProduct.Price) * oProduct.Quantity;
			});

			return oBundle.getText("cartTotalPrice", [formatter.price(fTotalPrice)]);
		},
        statusText: function (sStatus) {
			var oBundle = this.getResourceBundle();

			var mStatusText = {
				"A": oBundle.getText("statusA"),
				"O": oBundle.getText("statusO"),
				"D": oBundle.getText("statusD")
			};

			return mStatusText[sStatus] || sStatus;
		},
        statusState: function (sStatus) {
			return mStatusState[sStatus] || "None";
		},
        pictureUrl: function (sUrl) {
			if (sUrl){
				return  sap.ui.require.toUrl(sUrl);
			} else {
				return undefined;
			}
		},
    }
    return formatter;

});