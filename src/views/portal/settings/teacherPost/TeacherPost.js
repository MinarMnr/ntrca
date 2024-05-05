import { REQUIRED } from "constants/Message";
import * as Yup from "yup";

const banglaLang = /^[\p{sc=Bengali},:()\\\//\-\s]+$/u;
class PostModel {
    constructor() {
        this.designationName = "";
        this.designationNameBn = "";
        this.designationCode = "";
        this.designationDesc = "";
        this.designationDescBn = "";
    }

    fromJson(data = {}) {
        let obj = new PostModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.designationName = data.designationName;
        obj.designationNameBn = data.designationNameBn;
        obj.designationCode = data.designationCode;
        obj.designationDescBn = data.designationDescBn;
        obj.designationDesc = data.designationDescBn;
        return obj;
    }

    toString(data = {}) {
        let obj = new PostModel().fromJson(data);
        return JSON.stringify(obj);
    }

    validation() {
        return Yup.object().shape({
            designationName: Yup.string().required("Required"),
            designationNameBn: Yup.string()
                .matches(banglaLang, "Please type in Bangla")
                .typeError(REQUIRED)
                .required("Required"),
            designationCode: Yup.number()
                .typeError(REQUIRED)
                .required("Required"),
            designationDescBn: Yup.string()
                .matches(banglaLang, "Please type in Bangla")
                .typeError(REQUIRED)
                .required("Required"),
        });
    }
}

export const Post = new PostModel();
