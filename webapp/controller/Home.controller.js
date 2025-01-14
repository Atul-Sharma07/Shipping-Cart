sap.ui.define([
    "./BaseController",
    "../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/Device"
], (BaseController,formatter,Filter,FilterOperator) => {
    "use strict";

    return BaseController.extend("sap.ui.demo.shoppingcart.controller.Home", {
        formatter : formatter,
        onInit() {
            
        }
    });
});