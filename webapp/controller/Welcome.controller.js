sap.ui.define([
    "./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"../model/formatter"
],function(BaseController, JSONModel, Filter, FilterOperator, formatter){
    "use strict";
    return BaseController.extend("sap.ui.demo.shoppingcart.controller.Welcome", {
        
        _iCarouselTimeout: 0, // a pointer to the current timeout
		_iCarouselLoopTime: 8000, // loop to next picture after 8 seconds

        
        formatter : formatter,
        onInit() {
            var oViewModel = new JSONModel({
				welcomeCarouselShipping: 'sap/ui/demo/shoppingcart/img/Shipping_273087.jpg',
				welcomeCarouselInviteFriend: 'sap/ui/demo/shoppingcart/img/InviteFriend_276352.jpg',
				welcomeCarouselTablet: 'sap/ui/demo/shoppingcart/img/Tablet_275777.jpg',
				welcomeCarouselCreditCard: 'sap/ui/demo/shoppingcart/img/CreditCard_277268.jpg',
				Promoted: [],
				Viewed: [],
				Favorite: [],
				Currency: "EUR"
			});
            this.getView().setModel(oViewModel, "view");
            this.getRouter().attachRouteMatched(this._onRouteMatched, this);
        },
        _onRouteMatched:function(oEvent){
            var sRouteName = oEvent.getParameter("name");
            if(sRouteName == "RouteHome"){
                this._setLayout("Two");
            }
            if(sRouteName !== "RouteProduct" && sRouteName !== "RouteCartProduct"){
                const fpProperty=this.getModel("FeaturedProduct").getProperty("/FeaturedProducts");
                const products=this.getModel("Product").getProperty("/Products");
                const aPromoted=[];
                const aViewed=[];
                const aFavorite=[];

                const firstVal=Math.floor(Math.random() * (6 - 1)) + 1;
                let secondVal=Math.floor(Math.random() * (6 - 1)) + 1;
                while(secondVal== firstVal){
                    secondVal=Math.floor(Math.random() * (6 - 1)) + 1;
                }
                let count=0;
                for(let i=0;i<fpProperty.length;i++){
                    if(fpProperty[i].Type == "Promoted"){
                        count++;
                        if(count==firstVal || count == secondVal){
                            const fValue=products.filter(items=>items.ProductId == fpProperty[i].ProductId)[0];
                            aPromoted.push(fValue);
                        }
                    }
                    if(fpProperty[i].Type == "Viewed"){
                        const fValue=products.filter(items=>items.ProductId == fpProperty[i].ProductId)[0];
                        aViewed.push(fValue);
                    }
                    if(fpProperty[i].Type == "Favorite"){
                        const fValue=products.filter(items=>items.ProductId == fpProperty[i].ProductId)[0];
                        aFavorite.push(fValue);
                    }
                }
                this.getModel("view").setProperty("/Promoted",aPromoted);
                this.getModel("view").setProperty("/Viewed",aViewed);
                this.getModel("view").setProperty("/Favorite",aFavorite);
            }
        },
        onCarouselPageChanged: function () {
			clearTimeout(this._iCarouselTimeout);
			this._iCarouselTimeout = setTimeout(function () {
				var oWelcomeCarousel = this.byId("welcomeCarousel");
				if (oWelcomeCarousel) {
					oWelcomeCarousel.next();
					this.onCarouselPageChanged();
				}
			}.bind(this), this._iCarouselLoopTime);
		}
    });
});