sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
function (Controller, Fragment, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("mentoria.fiori.ka.praticamodel1ads.controller.View1", {
        onInit: function () {

            var oRegisterJson = new JSONModel();
            oRegisterJson.loadData("/model/Entries.json");
            this.getView().setModel(oRegisterJson, "oRegisterJson");

        },

        onClosePopup: function () {
            this.getView().byId("dialogRegister").close();
        },

        onInsertRegister: function () {

            var oView = this.getView(),
                oDialogRegister = this.getView().byId("dialogRegister");
                
            if (!oDialogRegister) {
                Fragment.load({
                    id: oView.getId(),
                    name: "mentoria.fiori.ka.praticamodel1ads.view.fragments.DialogRegister",
                    type: "XML",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                })
            } else {
                oDialogRegister.open();
            }

        },

        onSaveRegister: function(){

            var oRegisterJsonNovo = new JSONModel({
                data:{
                    nome:   this.byId("newName").getValue(),
                    dtNasc: this.byId("newDataNasc").getValue(),
                    sexo:   this.byId("newSexo").getSelectedValue(),
                    altura: this.byId("newAltura").getValue()
                }
            })

            this.getView().setModel(oRegisterJsonNovo,"oRegisterJsonNovo"); 

            var oTableData = this.getView().getModel("oRegisterJson");
            var oRegisterJsonNovo = this.getView().getModel("oRegisterJsonNovo");
            var aCadastro = oRegisterJsonNovo.getProperty("/data");
            var aTabela = oTableData.getProperty("/data");
            aTabela.push(aCadastro);
            oTableData.setProperty("/data", aTabela);

            this.getView().byId("dialogRegister").close();
        }
    });
});
