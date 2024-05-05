import * as Yup from "yup";

class CertifiedApplicant {
    /**
     * Model properties
     */
    constructor() {
        this.applicantName = "";
        this.rollNo = "";
        this.registrationNo = "";

        this.fatherName = "";
        this.motherName = "";
        this.nid = "";
        this.examBatchId = "";
        this.designationCode = "";
        this.subjectCode = "";
        this.gender = "";
        this.religion = "";
        this.mobileNo = "";
        this.dob = "";

        this.divisionId = "";
        this.districtId = "";
        this.thanaId = "";
        this.postOfficeId = "";

        this.educationalQualificationList = [];
    }
    /**
     * Get model instance from json
     */
    fromJson(data = {}) {
        let obj = new CertifiedApplicant();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.applicantName = data.applicantName ?? "";
        obj.rollNo = data.rollNo ?? "";
        obj.registrationNo = data.registrationNo ?? "";

        obj.fatherName = data.fatherName ?? "";
        obj.motherName = data.motherName ?? "";
        obj.nid = data.nid ?? "";
        obj.examBatchId = data.examBatchId ?? "";
        obj.designationCode = data.designationCode ?? "";
        obj.subjectCode = data.subjectCode ?? "";

        obj.gender = data.gender ?? "";
        obj.religion = data.religion ?? "";

        obj.mobileNo = data.mobileNo ?? "";
        obj.dob = data.dob ?? "";

        obj.divisionId = data.divisionId ?? "";
        obj.districtId = data.districtId ?? "";
        obj.thanaId = data.thanaId ?? "";
        obj.postOfficeId = data.postOfficeId ?? "";

        obj.educationalQualificationList =
            data.educationalQualificationList ?? [];

        return obj;
    }

    /**
     * Get string from model instance
     */
    toString(data = {}) {
        let obj = new CertifiedApplicant().fromJson(data);
        return JSON.stringify(obj);
    }

    /**
     * Validator schema
     */
    validator() {
        return Yup.object().shape({
            applicantName: Yup.string().required("Required"),
            rollNo: Yup.string().required("Required"),
            registrationNo: Yup.string().required("Required"),
            nid: Yup.string().required("Required"),

            examBatchId: Yup.string().required("Required"),
            designationCode: Yup.string().required("Required"),

            fatherName: Yup.string().required("Required"),
            motherName: Yup.string().required("Required"),
            dob: Yup.string().required("Required"),
        });
    }
}

export const CertifiedApplicantEdit = new CertifiedApplicant();
