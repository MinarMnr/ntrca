import * as Yup from "yup";
const banglaLang = /^[\p{sc=Bengali},()\-\s]+$/u;
class DesignationModel {
    constructor() {
        this.designationName = "";
        this.designationNameBn = "";
        this.designationCode = "";
        // this.designationType = "";
    }

    fromJson(data = {}) {
        let obj = new DesignationModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.designationName = data.designationName;
        obj.designationNameBn = data.designationName;
        obj.designationCode = data.designationCode;
        // obj.designationType = data.designationType;
        return obj;
    }

    toString(data = {}) {
        let obj = new DesignationModel().fromJson(data);
        return JSON.stringify(obj);
    }

    validation() {
        return Yup.object().shape({
            designationName: Yup.string().required("Required"),
            designationCode: Yup.string().required("Required"),
            // designationType: Yup.string().required("Required"),
        });
    }
}

export const Designation = new DesignationModel();
