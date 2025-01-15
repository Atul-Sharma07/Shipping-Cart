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
            
        },
        onCategoryListItemPress:function(oEvent){
            const sPath=oEvent.getSource().getBindingContext("ProductCategorie").getPath();
            const pCData=this.getOwnerComponent().getModel("ProductCategorie").getProperty(sPath);
            const oRouter=this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteCategory",{
                Category:pCData.Category
            })
        }
    });
});