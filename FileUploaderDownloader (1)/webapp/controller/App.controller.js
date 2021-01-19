sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("FUD.FileUploaderDownloader.controller.App", {
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},
		onLogin: function () {
			debugger;
			var oJsonM = this.getView().getModel("loginModel").getProperty("/Login");
			var em = this.getView().byId("emailId").getValue();
			var pwd = this.getView().byId("pwdId").getValue();
			var abc;
			for (abc of oJsonM) {
				if (abc.email === em && abc.password === pwd) {
				var nIdx = oJsonM.indexOf(abc);
					// var xyz = abc.email;
					MessageToast.show("Successfully Logged In");
					this.oRouter.navTo("File", {
						Cemail: nIdx
					});
				}
				// else{
				// 	MessageBox.error("Oops..!! Invalid Credentials");
				// }
			}

		}
	});
});