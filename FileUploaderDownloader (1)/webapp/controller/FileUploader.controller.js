sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"FUD/FileUploaderDownloader/validation/validationFile"
], function (Controller, MessageBox, validationFile) {
	"use strict";

	return Controller.extend("FUD.FileUploaderDownloader.controller.FileUploader", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf FUD.FileUploaderDownloader.view.FileUploader
		 */
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRoutePatternMatched(this.onObjectMatched, this);
			var oMd2 = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oMd2, "ObjV");
			this.oResourceModel = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			
		},
		onObjectMatched: function (oEv) {
			this.oEM = oEv.getParameter("arguments").Cemail;
			var oMd = this.getOwnerComponent().getModel("loginModel").getProperty("/Login");
			this.path = "loginModel>/Login/" + this.oEM;
			this.getView().byId("pgId").bindElement(this.path);
		},

		onTextArea: function (oEvt) {
			var sEvt = oEvt.getSource();
			var sVal = sEvt.getValue().length;
			var sMax = sEvt.getMaxLength();
			var sState = sVal > sMax ? "Warning" : "None";

			sEvt.setValueState(sState);
			// this.getView().byId("textArea").setValue(sEvt.getValue());
		},
		UpldCollectnItem: [],
		handleUploadPress: function (oEvent) {

			this.sFile = this.getView().byId("idFileuploader").oFileUpload.files[0];

			var sfilename = this.sFile.name;
			var nSize = this.sFile.size;
			var sFileType = this.sFile.type;
			var sType = sFileType.split('/')[1];
			if (sType === "pdf" || sType === "png" || sType === "jpeg") {
				if (nSize <= 300000) {
					this.getView().byId("idMssgStrip").setVisible(false);
					this.filePath = URL.createObjectURL(this.sFile);
					if (this.UpldCollectnItem.length < 5) {
						// this.getView().getModel("loginModel").setProperty("/Login/" + this.oEM + "/file", this.UpldCollectnItem);
						// this.getView().getModel("loginModel").setProperty("/Login/" + this.oEM + "/filename", sfilename);
						// this.getOwnerComponent().getModel("loginModel").setProperty("/FileUrl", this.filePath);
						// this.getView().byId("upldCollId").bindObject("loginModel>/Login/" + this.oEM);
						var obj = {
							"file": this.filePath,
							"filename": sfilename
						};
						this.UpldCollectnItem.push(obj);
						this.getView().getModel("ObjV").setProperty("/FileData", this.UpldCollectnItem);
						this.getView().byId("upldCollId").bindObject("ObjV>/FileData");
					} else {
						MessageBox.alert("Cannot upload more than 5 Attachment");
					}

				} else {
					this.getView().byId("idMssgStrip").setVisible(true);
				}
			} else {
				MessageBox.error("Only PDF and PNG files are allowed");
			}
		},

		onDownload: function (oEvt) {
			var oSource = oEvt.getSource();
			var sUrl = oSource.getUrl();
			oSource.download(sUrl);

		},

		onChange: function (oEvt) {
			validationFile.validatingLiveChange(oEvt,this);
		},

		onSubmit: function () {
			debugger;
			var nPhoneNumber = this.getView().byId("phId").getValue();
			var sEmail = this.getView().byId("emId").getValue();
			var sTextArea = this.getView().byId("textArea").getValue();

		},
		onNav: function () {
			this.oRouter.navTo("RouteApp");
		},

		onDelete: function (oEv) {
			var oEvnt = oEv.getSource().getBindingContext("loginModel").getObject();
			var oItems = this.getView().getModel("loginModel").getProperty("/Login");
			for (var i = 0; i < oItems.length; i++) {

				if (oItems[i].file.length !== 0) {

					for (var j = 0; j <= oItems[i].file.length; j++) {

						if (oEvnt.filename === oItems[i].file[j].filename) {
							oItems[i].file.splice(j, 1);
							this.getView().getModel("loginModel").setProperty("/Login", oItems);
							break;
						}
					}
				}
			}

		},

		onReset: function () {
			debugger;
			// 	this.getView().byId("phId").setValue();
			// 	var sEmail = this.getView().byId("emId").setValue();
			this.getView().byId("textArea").setValue();
			var oJModel = this.getView().getModel("loginModel").getProperty("/Login/" + this.oEM + "/file");
			oJModel.length = 0;
			this.getView().getModel("loginModel").refresh(true);
		},
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf FUD.FileUploaderDownloader.view.FileUploader
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf FUD.FileUploaderDownloader.view.FileUploader
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf FUD.FileUploaderDownloader.view.FileUploader
		 */
		//	onExit: function() {
		//
		//	}
		onhandleUpload: function (oEvent) {
			this.sFile = this.getView().byId("idFileuploader").oFileUpload.files[0];

			var sfilename = this.sFile.name;

			var nSize = this.sFile.size;

			var sFileType = this.sFile.type;

			var sType = sFileType.split('/')[1];

			if (sType === "pdf" || sType === "png" || sType === "jpeg") {
				if (nSize <= 300000) {
					this.getView().byId("idMssgStrip").setVisible(false);
					this.filePath = URL.createObjectURL(this.sFile);
					var obj = {
						"filename": sfilename,
						"size": nSize,
						"filetype": sType,
						"file": this.filePath
					};

					this.UpldCollectnItem.push(obj);

					if (this.UpldCollectnItem.length <= 5) {

						this.getView().getModel("loginModel").setProperty("/Login/" + this.oEM + "/file", this.UpldCollectnItem);

						var oGModel = this.getView().getModel("loginModel").getProperty("/Login/" + this.oEM + "/file");

						this.getView().getModel("loginModel").updateBindings(true);
						this.getView().getModel("loginModel").refresh(true);

						// for(var f = 0; f< dfg.length; f++){
						this.getView().byId("upldCollId").bindItems({
							path: "loginModel>/Login/" + this.oEM + "/file/",
							template: this.getView().byId("upldItemId")
						});
						// }

						this.getView().getModel("loginModel").updateBindings(true);
						this.getView().getModel("loginModel").refresh(true);
						this.getView().byId("idFileuploader").setValue();
					} else {
						MessageBox.alert("Cannot upload more than 5 Attachment");
					}

				} else {
					this.getView().byId("idMssgStrip").setVisible(true);
				}
			} else {
				MessageBox.error("Only PDF and PNG files are allowed");
			}
		}

	});

});