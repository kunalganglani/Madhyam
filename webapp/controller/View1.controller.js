sap.ui.define(['jquery.sap.global', 'sap/ui/core/mvc/Controller', 'sap/m/MessageToast'],
	function(jQuery, Controller, MessageToast) {
		"use strict";

		return Controller.extend("madhyam.controller.View1", {
			onInit: function() {
				this.aData = [
				{material_id : "1", material_name : "B1", material_status : 0,material_desc: "10/10 Found", sensor_type:"weight", sensor_model:"xt100", last_check:"2016/12/4"},
				{material_id : "2", material_name : "B2", material_status : 0, material_desc: "10/10 Found", sensor_type:"weight", sensor_model:"xt100", last_check:"2016/12/4"},
				{material_id : "3", material_name : "B3", material_status : 1, material_desc: "9/10 Missing Item", sensor_type:"weight", sensor_model:"xt100", last_check:"2016/12/4"},
				{material_id : "4", material_name : "B2", material_status : 1, material_desc: "8/10 Missing Item", sensor_type:"weight", sensor_model:"xt100", last_check:"2016/12/4"},
				{material_id : "5", material_name : "B4", material_status : 2,  material_desc: "Improper Environment", sensor_type:"temperature", sensor_model:"xt100", last_check:"2016/12/4"},
				{material_id : "6", material_name : "B5", material_status : 2,  material_desc: "Improper Environment", sensor_type:"temperature", sensor_model:"xt100", last_check:"2016/12/4"},
				{material_id : "7", material_name : "B6", material_status : 0, material_desc: "10/10 Found", sensor_type:"weight", sensor_model:"xt100", last_check:"2016/12/4"},
				{material_id : "8", material_name : "B7", material_status : 0, material_desc: "10/10 Found", sensor_type:"weight", sensor_model:"xt100", last_check:"2016/12/4"},
				{material_id : "9", material_name : "B8", material_status : 0, material_desc: "10/10 Found", sensor_type:"weight", sensor_model:"xt100", last_check:"2016/12/4"},
				{material_id : "10", material_name : "B9", material_status : -1,material_desc: "", sensor_type:"weight", sensor_model:"xt100", last_check:"2016/12/4"},
				{material_id : "11", material_name : "B10", material_status : -1,material_desc: "", sensor_type:"weight", sensor_model:"xt100", last_check:"2016/12/4"}
			];
				for (var i = 0; i < this.aData.length; i++) {

					if (this.aData[i].material_status === 0) {
						this.aData[i].iconType = "sap-icon://message-success";
						this.aData[i].m_status_text = "Status Ok";
						this.aData[i].m_status = "Success";
					} else if (this.aData[i].material_status === 1) {
						this.aData[i].iconType = "sap-icon://warning";
						this.aData[i].m_status_text = "Product Missing";
						this.aData[i].m_status = "Warning";

					} else if (this.aData[i].material_status === 2) {
						this.aData[i].iconType = "sap-icon://alert";
						this.aData[i].m_status_text = "Product Damaged";
						this.aData[i].m_status = "Error";
					} else {
						this.aData[i].iconType = "";
						this.aData[i].m_status_text = "Unkonwn";
						this.aData[i].m_status = "None";
						this.aData[i].material_desc = "Connection failed";
					}
				}

				var oTable = this.getView().byId("idPrdList");
				oTable.setModel(new sap.ui.model.json.JSONModel(this.aData));
				oTable.bindItems("/", new sap.m.ColumnListItem({
					cells: [
						new sap.m.Label({
							text: "{material_id}"
						}),
						new sap.m.Label({
							text: "{material_name}"
						}),
						new sap.m.ObjectStatus({
							text: "{m_status_text}",
							state: "{m_status}",
							icon: "{iconType}"
						}),
						new sap.m.Label({
							text: "{sensor_type}"
						}),
						new sap.m.Label({
							text: "{sensor_model}"
						}),
						new sap.m.Label({
							text: "{last_check}"
						}),
						new sap.m.Label({
							text: "{material_desc}"
						})

					]
				}));
			},
			onTableRefresh: function(evt) {
				// var oTable= this.getView().byId("idPrdList");
				var dateNow = new Date();
				var last_check_String = dateNow.toLocaleString();
				for (var j = 0; j < this.aData.length; j++) {
					this.aData[j].last_check = last_check_String;
				}
				var oTable = evt.getSource().getParent().getParent();
				oTable.setModel(new sap.ui.model.json.JSONModel(this.aData));
				var dialog = new sap.m.Dialog({
					title: "Alert",
					contentWidth: "20rem",
					content: [
						new sap.m.Text({
							text: "Some of the Items have Status Missing/ Damaged or Unknown."
						}).addStyleClass("sapUiForceWidthAuto sapUiSmallMargin"),

						new sap.m.TextArea('confirmDialogTextarea', {
							width: '100%',
							placeholder: 'Add note (optional)'
						})
					],
					beginButton: new sap.m.Button({
						text: "Contact Shipment Owner",
						press: function() {
							/*var theUrl = "http://www.mysticads.com/sendsms.php?uid=9993799864&pwd=%22asdfjkl123%22&phone=%209993799864&msg=Hello+World";
							// https://cors-anywhere.herokuapp.com/
							var xmlHttp = new XMLHttpRequest();
							/*xmlHttp.onreadystatechange = function() {
								if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
									//
								}
								xmlHttp.open("GET", theUrl, true); // true for asynchronous 
								xmlHttp.send(null);
							};
							xmlHttp.open("GET", theUrl, true); // true for asynchronous 
							xmlHttp.send(null);
							$.get(theUrl, function(){
							});
							
							*/
							sap.m.MessageToast.show("Shipment Owner Contacted");
							dialog.close();
						}
					}),
					endButton: new sap.m.Button({
						text: "Ignore",
						press: function() {
							dialog.close();
						}
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});

				for (var i = 0; i < this.aData.length; i++) {
					if (this.aData[i].material_status !== 0) {
						dialog.open();
						break;
					}
				}
			},

			handleIconTabBarSelect: function (oEvent) {
				var sKey = oEvent.getParameter("key");
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