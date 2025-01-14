sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History"
],function(Controller,MessageToast,UIComponent,History){
    "use strict"
    return Controller.extend("sap.ui.demo.shoppingcart.controller.BaseController",{
        getRouter: function () {
			return UIComponent.getRouterFor(this);
		},
        getModel: function (sName) {
			return this.getView().getModel(sName);
		},
        setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},
        getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},
        onAvatarPress: function () {
			var sMessage = this.getResourceBundle().getText("avatarButtonMessageToastText");
			MessageToast.show(sMessage);
		},
        onStateChange: function (oEvent) {
			var sLayout = oEvent.getParameter("layout"),
				iColumns = oEvent.getParameter("maxColumnsCount");

			if (iColumns === 1) {
				this.getModel("appView").setProperty("/smallScreenMode", true);
			} else {
				this.getModel("appView").setProperty("/smallScreenMode", false);
				// swich back to two column mode when device orientation is changed
				if (sLayout === "OneColumn") {
					this._setLayout("Two");
				}
			}
		},
        _setLayout: function (sColumns) {
			if (sColumns) {
				this.getModel("appView").setProperty("/layout", sColumns + "Column" + (sColumns === "One" ? "" : "sMidExpanded"));
			}
		},
        onBack: function () {
			var oHistory = History.getInstance();
			var oPrevHash = oHistory.getPreviousHash();
			if (oPrevHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("home");
			}
		},
        // pending
        onAddToCart : function () {
			var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			var oEntry =  arguments[0].getSource().getBindingContext().getObject();
			var oCartModel = this.getView().getModel("cartProducts");
			cart.addToCart(oResourceBundle, oEntry, oCartModel);
		},
        _clearComparison: function (){
			var oModel = this.getOwnerComponent().getModel("comparison");
			oModel.setData({
				category: "",
				item1: "",
				item2: ""
			});
		}
    })
})