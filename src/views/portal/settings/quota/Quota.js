import { REQUIRED } from "constants/Message";
import * as Yup from "yup";
const banglaLang = /^[\p{sc=Bengali},()\-\s]+$/u;
const englishLang = /^[\p{L}0-9,()\-\s']+$/u;

import { quotaData } from "./quotaData";
class QuotaModel {
    constructor() {
        // this.quotaId = "";
        // this.areaStatusId = "";
        // this.quotaDescriptionBn = "";
        // this.percentage = "";
        this.quotaName = "";
        this.quotaNameBn = "";
    }

    fromJson(data = {}) {
        let obj = new QuotaModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        // obj.quotaId = data.quotaId;
        obj.quotaName = data.quotaName;
        obj.quotaNameBn = data.quotaNameBn;
        // obj.quotaDescriptionBn = data.quotaDescriptionBn;
        // obj.areaStatusId = data.areaStatusId;
        // obj.percentage = data.percentage;

        return obj;
    }

    toString(data = {}) {
        let obj = new QuotaModel().fromJson(data);
        return JSON.stringify(obj);
    }

    validation() {
        return Yup.object().shape({
            quotaName: Yup.string()
                .matches(
                    englishLang,
                    "Please type in English. Bangla is not Allowed"
                )
                .typeError(REQUIRED)
                .required("Required"),
            quotaNameBn: Yup.string()
                .matches(
                    banglaLang,
                    "Please type in Bengali. English is not Allowed"
                )
                .typeError(REQUIRED)
                .required("Required"),
            // areaStatusId: Yup.number().typeError(REQUIRED).required("Required"),
            // percentage: Yup.number().typeError(REQUIRED).required("Required"),
        });
    }
}

export const Quota = new QuotaModel();
