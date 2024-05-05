import { ENGLISH_NUMBER, REQUIRED } from "constants/Message";
import * as Yup from "yup";
const banglaLang = /^[\p{sc=Bengali}/,&()\-.\s]+$/u;
const englishLang = /^[A-Za-z0-9,/&()\-.\s]+$/;
class SubjectModel {
    constructor() {
        this.subjectName = "";
        this.subjectNameBn = "";
        this.subjectCode = "";
        this.levelId = "";
    }

    fromJson(data = {}) {
        let obj = new SubjectModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }
        obj.id = data.id;
        obj.subjectName = data.subjectName ?? "";
        obj.subjectNameBn = data.subjectNameBn ?? "";
        obj.subjectCode = data.subjectCode ?? "";
        obj.levelId = data.levelId ?? "";
        return obj;
    }

    toString(data = {}) {
        let obj = new SubjectModel().fromJson(data);
        return JSON.stringify(obj);
    }

    validation() {
        return Yup.object().shape({
            subjectName: Yup.string()
                .matches(englishLang, "Please type in English")
                .typeError(REQUIRED)
                .required("Required"),
            subjectNameBn: Yup.string()
                .matches(banglaLang, "Please type in Bangla")
                .typeError(REQUIRED)
                .required("Required"),
            subjectCode: Yup.number().required("Required"),
            levelId: Yup.string().required("Required"),
        });
    }
}

export const Subject = new SubjectModel();
