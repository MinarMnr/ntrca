import {
    POSITIVE_NUMBER,
    GREATER_THAN,
    LESS_THAN,
    REQUIRED,
} from "constants/Message";
import * as Yup from "yup";
const banglaLang = /^[\p{sc=Bengali},()\-\s]+$/u;
const englishLang = /^[A-Za-z0-9,()\-\s]+$/;
import moment from "moment";
import EnglishNumberToBangla from "helpers/EnglishNumberToBangla";

class batchModel {
    constructor() {
        this.examName = "";
        this.examNameBn = "";
        this.examYear = "";
        this.examBatch = "";
    }

    fromJson(data = {}) {
        let obj = new batchModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.examName = data.examName;
        obj.examNameBn = data.examNameBn;
        obj.examYear = data.examYear;
        obj.examBatch = data.examBatch;
        return obj;
    }

    toString(data = {}) {
        let obj = new batchModel().fromJson(data);
        return JSON.stringify(obj);
    }

    validation() {
        return Yup.object().shape({
            examName: Yup.string()
                .matches(englishLang, "Please type in English")
                .typeError(REQUIRED)
                .required(),
            examNameBn: Yup.string()
                .matches(banglaLang, "Please type in Bangla")
                .typeError(REQUIRED)
                .required(),
            examYear: Yup.number().typeError(POSITIVE_NUMBER).required(),
            examBatch: Yup.number()
                .min(0)
                .typeError(POSITIVE_NUMBER)
                .required(),
        });
    }
}

export const batch = new batchModel();
