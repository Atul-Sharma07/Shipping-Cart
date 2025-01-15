sap.ui.define([
    "./BaseController",
    "../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/Device"
], (BaseController,formatter,Filter,FilterOperator,Device) => {
    "use strict";

    return BaseController.extend("sap.ui.demo.shoppingcart.controller.Product", {
        formatter : formatter,
        onInit(){
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteProduct").attachPatternMatched(this.onObjectMatched, this);
        },
        onObjectMatched:function(oEvent){
            const ProductId = oEvent.getParameter("arguments").ProductId;
            const oModel=this.getOwnerComponent().getModel("Product");
            const sPModel=oModel.getProperty("/Products");
            const product=sPModel.filter(items=> items.ProductId == ProductId)[0];


            console.log(product);
            // this.getView().bindElement(product);
            // oModel.setProperty("/selectedProduct",product);
            const oView= this.getView();
            const sPath=sPModel.indexOf(product);;


            oView.bindElement({
                path : `/Products/${sPath}`,
                model: "Product"
            });
        }
    })
})