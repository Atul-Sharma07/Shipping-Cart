sap.ui.define([
    "./BaseController",
    "../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/Device"
], (BaseController,formatter,Filter,FilterOperator,Device) => {
    "use strict";

    return BaseController.extend("sap.ui.demo.shoppingcart.controller.Home", {
        formatter : formatter,
        onInit() {
            
        },
        onSearch:function(oEvent){
            
        }
    });
});