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
					aData[i].material_desc="Connection failed";
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
														  text : "{sensor_type}"
													  }),
													  new sap.m.Label({
														  text : "{sensor_model}"
													  }),
													  new sap.m.Label({
														  text : "{last_check}"
													  }),
													  new sap.m.Label({
														  text : "{material_desc}"
													  })
													  
												  ]
			}));
				this.getView().setModel(oModel);
			},

			onTableRefresh: function(evt){
				// var oTable= this.getView().byId("idPrdList");
				var dateNow= new Date();
				var last_check_String=dateNow.toLocaleString();
				var oTable=evt.getSource().getParent().getParent();
				for(var i=0;i<oTable.getItems().length;i++){
				oTable.getItems()[i].getCells()[5].setText(last_check_String);	
				}
				
				
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