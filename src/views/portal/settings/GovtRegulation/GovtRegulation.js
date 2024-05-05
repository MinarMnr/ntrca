import {
    POSITIVE_NUMBER,
    GREATER_THAN,
    LESS_THAN,
    REQUIRED,
} from "constants/Message";
import * as Yup from "yup";
const banglaLang = /^[\p{sc=Bengali},:()\-\s]+$/u;
const englishLang = /^[A-Za-z0-9,:()\-\s]+$/;
import moment from "moment";
import EnglishNumberToBangla from "helpers/EnglishNumberToBangla";

class govtRegulationModel {
    constructor() {
        this.govtRegulationName = "";
        this.govtRegulationNameBn = "";
        this.directorateId = "";
        this.regulationYear = "";
        this.regulationValidFrom = "";
        this.regulationValidTo = "";
    }

    fromJson(data = {}) {
        let obj = new govtRegulationModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.govtRegulationName = data.govtRegulationName;
        obj.govtRegulationNameBn = data.govtRegulationNameBn;
        obj.regulationValidFrom = data.regulationValidFrom;
        obj.regulationValidTo = data.regulationValidTo;
        obj.regulationYear = data.regulationYear;
        obj.directorateId = data.directorateId;
        return obj;
    }

    toString(data = {}) {
        let obj = new govtRegulationModel().fromJson(data);
        return JSON.stringify(obj);
    }

    validation() {
        return Yup.object().shape({
            govtRegulationName: Yup.string()
                .matches(englishLang, "Please type in English")
                .typeError(REQUIRED)
                .required("Required"),
            govtRegulationNameBn: Yup.string()
                .matches(banglaLang, "Please type in Bangla")
                .typeError(REQUIRED)
                .required("Required"),

            regulationYear: Yup.number()
                .typeError(POSITIVE_NUMBER)
                .required("Required"),

            directorateId: Yup.string().required("Required"),

            regulationValidFrom: Yup.date().required("Required"),
            //.max(new Date(),'Date can not be future date.'),
            regulationValidTo: Yup.date()
                .nullable()
                .required("Required")
                .min(
                    Yup.ref("regulationValidFrom"),
                    "কার্যকারিতার তারিখ অবশ্যই কার্যকর তারিখের পরে হবে"
                ),
        });
    }
}

export const govtRegulation = new govtRegulationModel();
