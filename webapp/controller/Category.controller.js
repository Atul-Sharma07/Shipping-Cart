sap.ui.define([
    "./BaseController",
    "../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/Device"
], (BaseController,formatter,Filter,FilterOperator,Device) => {
    "use strict";

    return BaseController.extend("sap.ui.demo.shoppingcart.controller.Category", {
        formatter : formatter,
        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("RouteCategory").attachPatternMatched(this.onObjectMatched, this);
            
        },
        onObjectMatched:function(oEvent){
            const Category=oEvent.getParameter("arguments").Category;
            const oModel=this.getOwnerComponent().getModel("Product");
            const products=oModel.getProperty("/Products");
            const sProduct=products.filter(items=> items.Category == Category);
            oModel.setProperty("/selectedProducts",sProduct);
        }
    });
});