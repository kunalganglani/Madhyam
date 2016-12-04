sap.ui.define(['jquery.sap.global', 'sap/ui/core/mvc/Controller', 'sap/m/MessageToast'],
	function(jQuery, Controller, MessageToast) {
		"use strict";

		return Controller.extend("madhyam.controller.View1", {
			onInit: function() {
				/*var oModel = new sap.ui.model.json.JSONModel(jQuery.sap.getResourcePath("sap/m/sample/GenericTileLineMode/tiles.json"));
				this.getView().setModel(oModel);
				*/
				var sUrl = "http://services.odata.org/Northwind/Northwind.svc/Products";
				var oModel = new sap.ui.model.json.JSONModel(sUrl);
				sap.ui.getCore().setModel(oModel);
				this.getView().setModel(oModel);
			},

			statusPress: function(evt) {
				var oTile = evt.getSource();
				MessageToast.show(oTile.getHeader() + " was pressed.");
			},

			infoPress: function(evt) {
				var oTile = evt.getSource();
				MessageToast.show(oTile.getHeader() + " was pressed.");
			}

		});

	});