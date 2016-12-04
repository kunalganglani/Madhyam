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
				var aData = [
				{material_id : "A1", material_name : "B1", material_status : 0,material_desc: "xyz"},
				{material_id : "A2", material_name : "B2", material_status : 0, material_desc: "xyz"},
				{material_id : "A3", material_name : "B3", material_status : 1, material_desc: "xyz"},
				{material_id : "A4", material_name : "B2", material_status : 1, material_desc: "xyz"},
				{material_id : "A2", material_name : "B3", material_status : 2,  material_desc: "xyz"},
				{material_id : "A3", material_name : "B1", material_status : 2,  material_desc: "xyz"},
				{material_id : "A4", material_name : "B1", material_status : 0, material_desc: "xyz"},
				{material_id : "A1", material_name : "B3", material_status : 0, material_desc: "xyz"},
				{material_id : "A1", material_name : "B3", material_status : 0, material_desc: "xyz"},
				{material_id : "A2", material_name : "B2", material_status : -1,material_desc: "xyz"},
				{material_id : "A4", material_name : "B1", material_status : -1,material_desc: "xyz"}
			];
				for (var i = 0; i < aData.length; i++) {
					
					if(aData[i].material_status===0){
					aData[i].iconType="sap-icon://message-success";	
					aData[i].m_status_text="Status Ok";
					aData[i].m_status="Success";
					}
					else	if(aData[i].material_status===1){
					aData[i].iconType="sap-icon://warning";	
					aData[i].m_status_text="Product Missing";
					aData[i].m_status="Warning";
							
						}
					
					else if(aData[i].material_status===2){
					aData[i].iconType="sap-icon://alert";
					aData[i].m_status_text="Product Damaged";
					aData[i].m_status="Error";
					}
					else{
						aData[i].iconType="";
					aData[i].m_status_text="Unkonwn";
					aData[i].m_status="None";
					}
				}
			
				var oTable= this.getView().byId("idPrdList");
				oTable.setModel(new sap.ui.model.json.JSONModel(aData));
			oTable.bindItems("/", new sap.m.ColumnListItem({
												  cells : [
													  new sap.m.Label({
														  text : "{material_id}"
													  }),
													  new sap.m.Label({
														  text : "{material_name}"
													  }),
													  new sap.m.ObjectStatus({
													  	text:"{m_status_text}",
													  	state : "{m_status}",
													  	icon:"{iconType}"
													  }),
													  new sap.m.Label({
														  text : "{material_desc}"
													  })
												  ]
			}));
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