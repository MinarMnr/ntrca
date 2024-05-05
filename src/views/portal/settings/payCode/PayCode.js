import * as Yup from "yup";
import moment from "moment";
const banglaLang = /^[\p{sc=Bengali},()\-\s]+$/u;
class PayCodeModel {
    constructor() {
        this.payCodeName = "";
        this.payCodeNameBn = "";
        this.payCodeDescription = "";
        this.payCodeDescriptionBn = "";
    }

    fromJson(data = {}) {
        let obj = new PayCodeModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.payCodeName = data.payCodeName;
        obj.payCodeNameBn = data.payCodeNameBn;
        obj.payCodeDescription = data.payCodeDescription;
        obj.payCodeDescriptionBn = data.payCodeDescriptionBn;
        return obj;
    }

    toString(data = {}) {
        let obj = new PayCodeModel().fromJson(data);
        return JSON.stringify(obj);
    }

    validation() {
        return Yup.object().shape({
            payCodeName: Yup.string().required("Required"),
            payCodeNameBn: Yup.string().matches(
                banglaLang,
                "Please type in Bangla"
            ),
            payCodeDescription: Yup.string().required("Required"),
            payCodeDescriptionBn: Yup.string().matches(
                banglaLang,
                "Please type in Bangla"
            ),
        });
    }
}

export const PayCode = new PayCodeModel();
