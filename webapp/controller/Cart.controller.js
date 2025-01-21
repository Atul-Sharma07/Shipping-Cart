sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "../model/formatter",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (BaseController,
    JSONModel,
    Device,
    formatter,
    MessageBox,
    MessageToast) {
    "use strict"

    var sCartModelName = "cartProducts";
	var sSavedForLaterEntries = "savedForLaterEntries";
	var sCartEntries = "cartEntries";

    return BaseController.extend("sap.ui.demo.shoppingcart.controller.Welcome", {
        formatter: formatter,

        onInit() {
            this._oRouter = this.getRouter();
            this._oRouter.getRoute("RouteCart").attachPatternMatched(this._routePatternMatched, this);
			
        },
        _routePatternMatched:function(){
            this._setLayout("Three");
            var oCartModel = this.getModel("cartProducts");
			var oCartEntries = oCartModel.getProperty("/cartEntries");
			

        }
    })
})