sap.ui.define([

], function () {
	"use strict";
	return {
		validatingFields: function () {
			var sPh = this.getView().byId("phId").getValue();
			var sEm = this.getView().byId("emId").getValue();

			var rmail = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
			var rphn = /^[789]\d{9}$/;

			var valid = true;

			if (sPh === "") {
				this.getView().byId("phId").setValueState("Error");
				valid = false;
			}

			if (sEm === "") {
				this.getView().byId("emId").setValueState("Error");
				valid = false;
			}

			if (!rphn.test(sPh)) {
				this.getView().byId("phId").setValueState("Error");
				valid = false;
			}
			if (!rmail.test(sEm)) {
				this.getView().byId("emId").setValueState("Error");
				valid = false;
			}
			return valid;
		},
		validatingLiveChange: function (oEvent, oScope) {
			debugger;
			var sPh = oScope.getView().byId("phId").getValue();
			var sEm = oScope.getView().byId("emId").getValue();

			var rmail = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
			var rphn = /^[789]\d{9}$/;
			if (sPh === "") {
			
				oScope.getView().byId("phId").setValueState("Error");
				oScope.getView().byId("phId").focus();

				oScope.getView().byId("phId").setValueStateText(oScope.oResourceModel.getText("EmptyphonenoValidation"));

			} else {
				oScope.getView().byId("phId").setValueState("None");
			}

			if (sEm === "") {
				oScope.getView().byId("emId").setValueState("Error");
				oScope.getView().byId("emId").focus();
				oScope.getView().byId("emId").setValueStateText("Email Can't be Empty");

			} else {
				oScope.getView().byId("emId").setValueState("None");
			}

			if (!rphn.test(sPh)) {
				// this.getView().byId("phId").setValueState("Error");
				oScope.getView().getModel("loginModel").setProperty("/phonenoValueState", "Error");

				oScope.getView().byId("phId").focus();
				oScope.getView().byId("phId").setValueStateText("Phone number starts with 7,8,9");
			} else {
				oScope.getView().byId("phId").setValueState("None");
			}
			if (!rmail.test(sEm)) {
				oScope.getView().byId("emId").setValueState("Error");
				oScope.getView().byId("emId").focus();
				oScope.getView().byId("emId").setValueStateText("Invalid Email Address");
			} else {
				oScope.getView().byId("emId").setValueState("None");
			}

		}
	};
});