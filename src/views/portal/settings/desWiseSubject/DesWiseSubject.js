import * as Yup from "yup";
const banglaLang = /^[\p{sc=Bengali},()\-\s]+$/u;
class DesWiseSubjectModel {
    constructor() {
        this.designationId = "";
        this.subjectId = "";
    }

    fromJson(data = {}) {
        let obj = new DesWiseSubjectModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.designationId = data.designationId;
        obj.subjectId = data.subjectId;
        return obj;
    }

    toString(data = {}) {
        let obj = new DesWiseSubjectModel().fromJson(data);
        return JSON.stringify(obj);
    }

    validation() {
        return Yup.object().shape({
            designationId: Yup.number().required("Required"),
            subjectId: Yup.number().required("Required"),
        });
    }
}

export const DesWiseSubject = new DesWiseSubjectModel();
