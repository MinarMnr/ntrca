import * as Yup from "yup";

class MeritList {
    /**
     * Model properties
     */
    constructor() {
        this.applicantName = "";
        this.rollNo = "";
        this.subjectName = "";
        this.examBatch = "";
        this.merit = "";
    }

    /**
     * Get model instance from json
     */
    fromJson(data = {}) {
        let obj = new MeritList();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.applicantName = data.applicantName ?? "";

        obj.rollNo = data.rollNo ?? "";
        obj.subjectName = data.subjectName ?? "";
        obj.examBatch = data.examBatch ?? "";

        obj.merit = data.merit ?? "";

        delete obj.files;

        // if (data.file) {
        //     obj.file = data.file;
        // } else {
        //     delete obj.file;
        // }

        return obj;
    }

    /**
     * Get string from model instance
     */
    toString(data = {}) {
        let obj = new MeritList().fromJson(data);
        return JSON.stringify(obj);
    }

    toFormData(obj = {}) {
        let data = new FormData();
        data.append(
            "InstituteJobRequisitionRequest",
            new MeritList().toString(obj)
        );
        return data;
    }

    fromJsonEdit(data = {}) {
        let obj = new MeritList();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.applicantName = data.applicantName ?? "";

        obj.rollNo = data.rollNo ?? "";
        obj.subjectName = data.subjectName ?? "";
        obj.examBatch = data.examBatch ?? "";
        obj.instituteTypeList = data.instituteTypeList ?? [];

        obj.merit = data.merit ?? "";
        obj.examBatch = data.examBatch ?? "";
        obj.encloserList = data.encloserList ?? null;

        return obj;
    }

    toStringEdit(data = {}) {
        let obj = new MeritList().fromJsonEdit(data);
        return JSON.stringify(obj);
    }

    toFormDataEdit(obj = {}) {
        let data = new FormData();
        data.append("InstituteMeritList", new MeritList().toStringEdit(obj));
        return data;
    }

    /**
     * Validator schema
     */
    validator() {
        return Yup.object().shape({
            applicantName: Yup.string().required("Required"),
            merit: Yup.string().required("Required"),
            examBatch: Yup.string().required("Required"),

            rollNo: Yup.string().required("Required"),
            subjectName: Yup.string().required("Required"),

            examBatch: Yup.string().required("Required"),
        });
    }
}

export const merit = new MeritList();
