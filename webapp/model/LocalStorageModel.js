sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/util/Storage"
], function(JSONModel, Storage) {
	"use strict"; 
    // sap.ui.demo.shoppingcart.
    return JSONModel.extend("sap.ui.demo.shoppingcart.model.CartModel", {

		_STORAGE_KEY : "LOCALSTORAGE_MODEL",
		_storage : new Storage(Storage.Type.local),

        constructor : function(sStorageKey, oSettings) {
			// call super constructor with everything from the second argument
			JSONModel.apply(this, [].slice.call(arguments, 1));
			this.setSizeLimit(1000000);

			// override default storage key
			if (sStorageKey) {
				this._STORAGE_KEY = sStorageKey;
			}

			// load data from local storage
			this._loadData();

			return this;
		},

        _loadData : function() {
			var sJSON = this._storage.get(this._STORAGE_KEY);

			if (sJSON) {
				this.setData(JSON.parse(sJSON));
			}
			this._bDataLoaded = true;
		},

        _storeData : function() {
			var oData = this.getData();

			// update local storage with current data
			var sJSON = JSON.stringify(oData);
			this._storage.put(this._STORAGE_KEY, sJSON);
		},

        setProperty : function () {
			JSONModel.prototype.setProperty.apply(this, arguments);
			this._storeData();
		},

        setData : function () {
			JSONModel.prototype.setData.apply(this, arguments);
			// called from constructor: only store data after first load
			if (this._bDataLoaded) {
				this._storeData();
			}
		},
        refresh : function () {
			JSONModel.prototype.refresh.apply(this, arguments);
			this._storeData();
		}

    })
})