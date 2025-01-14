sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/demo/shoppingcart/model/models",
    "sap/ui/model/json/JSONModel"
], (UIComponent, models,JSONModel) => {
    "use strict";

    return UIComponent.extend("sap.ui.demo.shoppingcart.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            const productModel=new JSONModel();
            productModel.loadData("../localService/mockdata/Products.json");
            this.setModel(productModel,"Product");

            const pCModel=new JSONModel();
            pCModel.loadData("../localService/mockdata/ProductCategories.json");
            this.setModel(pCModel,"ProductCategorie");

            const fPModel=new JSONModel();
            fPModel.loadData("../localService/mockdata/FeaturedProducts.json");
            this.setModel(fPModel,"FeaturedProduct");

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        }
    });
});