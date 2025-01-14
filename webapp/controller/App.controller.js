sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel"
], (BaseController, JSONModel) => {
  "use strict";

  return BaseController.extend("sap.ui.demo.shoppingcart.controller.App", {
    onInit() {
      var oViewModel,
        fnSetAppNotBusy,
        iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

      oViewModel = new JSONModel({
        busy: true,
        delay: 0,
        layout: "TwoColumnsMidExpanded",
        smallScreenMode: true
      });
      this.setModel(oViewModel, "appView");

      fnSetAppNotBusy = function () {
        oViewModel.setProperty("/busy", false);
        oViewModel.setProperty("/delay", iOriginalBusyDelay);
      };

      // this.getOwnerComponent().getModel().metadataLoaded().then(fnSetAppNotBusy);
      // this.getOwnerComponent().getModel().attachMetadataFailed(fnSetAppNotBusy);

      // // apply content density mode to root view
      // this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

    }
  });
});