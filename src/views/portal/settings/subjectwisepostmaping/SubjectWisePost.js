import * as Yup from "yup";
const banglaLang = /^[\p{sc=Bengali},()\-\s]+$/u;
class SubjectWisePost {
    constructor() {
        this.levelId = "";
        this.designationId = "";
        this.subjectIds = [{ subjectId: "" }];
    }

    fromJson(data = {}) {
        let obj = new SubjectWisePost();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }
        obj.levelId = data.levelId ?? "";
        obj.designationId = data.designationId ?? "";
        obj.subjectIds = data.subjectIds ?? "";
        return obj;
    }

    toString(data = {}) {
        let obj = new SubjectWisePost().fromJson(data);
        return JSON.stringify(obj);
    }

    validation() {
        return Yup.object().shape({
            levelId: Yup.string().required("Required"),
            designationId: Yup.string().required("Required"),
            subjectIds: Yup.array().of(
                Yup.object().shape({
                    subjectId: Yup.number().required("Required"),
                })
            ),
        });
    }
}

export const SubjectWisePostConstructor = new SubjectWisePost();
