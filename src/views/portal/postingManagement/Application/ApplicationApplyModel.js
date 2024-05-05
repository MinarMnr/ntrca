import * as Yup from "yup";

const mobileRegEx = /^(?:\+?88)?01[13-9]\d{8}$/;
const PHOTO_FILE_SIZE = 300 * 1024;
const ESIGN_FILE_SIZE = 180 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

class ApplicationApplyModel {
    /**
     * Model properties
     */
    constructor() {
        this.examBatchId = "";
        this.rollNo = "";
        this.registrationNo = "";
        this.applicantName = "";
        this.fatherName = "";
        this.motherName = "";
        this.dob = "";
        this.nid = "";
        this.mobile = "";
        this.email = "";
        this.gender = "";
        this.maritalStatus = "";
        this.jobApplicationCircularId = "";
        this.nationality = "BANGLADESHI";

        this.presentDivisionId = "";
        this.presentDistrictId = "";
        this.presentThanaId = "";
        this.presentPostCode = "";

        this.isAgreed = true;

        // this.permanentDistrict = "";
        // this.permanentThana = "";
        // this.permanentPostCode = "";

        // this.photo = "";
        // this.eSign = "";
    }

    /**
     * Get model instance from json
     */
    fromJson(data = {}, circularId) {
        let obj = new ApplicationApplyModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.examBatchId = data.examBatchId ?? "";
        obj.rollNo = data.rollNo ?? "";
        obj.registrationNo = data.registrationNo ?? "";
        obj.applicantName = data.applicantName ?? "";
        obj.fatherName = data.fatherName ?? "";
        obj.motherName = data.fatherName ?? "";
        obj.dob = data.dob ?? "";
        obj.nid = data.nid ?? "";
        obj.mobile = data.mobile ?? "";
        obj.email = data.email ?? "";
        obj.gender = data.gender ?? "";
        obj.maritalStatus = data.maritalStatus ?? "";
        obj.jobApplicationCircularId = circularId ?? "";
        obj.nationality = "BANGLADESHI";

        obj.presentDivisionId = data.presentDivisionId ?? "";
        obj.presentDistrictId = data.presentDistrictId ?? "";
        obj.presentThanaId = data.presentThanaId ?? "";
        obj.presentPostCode = data.presentPostCode ?? "";

        // obj.permanentDistrict = data.permanentDistrict ?? "";
        // obj.permanentThana = data.permanentThana ?? "";
        // obj.permanentPostCode = data.permanentPostCode ?? "";

        // obj.photo = data.photoEncloserUrl ?? "";
        // obj.eSign = data.esignEncloserUrl ?? "";

        return obj;
    }

    toString(data = {}, circularId) {
        let obj = new ApplicationApplyModel().fromJson(data, circularId);
        return JSON.stringify(obj);
    }

    /**
     * Get string from model instance
     */
    // toString(data = {}) {
    //     let obj = new ApplicationApplyModel().fromJson(data);
    //     return JSON.stringify(obj);
    // }

    // toFormData(obj = {}) {

    //     let data = new FormData();

    //     data.append(
    //         "jobApplicationRequest",
    //         new ApplicationApplyModel().toString(obj)
    //     );
    //     return data;
    // }

    /**
     * Validator schema
     */
    validator() {
        return Yup.object().shape({
            examBatchId: Yup.string().required("Required"),
            // rollNo: Yup.string().required("Required"),
            // registrationNo: Yup.string().required("Required"),
            // applicantName: Yup.string().required("Required"),
            // fatherName: Yup.string().required("Required"),
            // motherName: Yup.string().required("Required"),
            //dob: Yup.string().required("Required"),
            // nid: Yup.string().required("Required"),
            mobile: Yup.string()
                .required("mobile is a required field")
                .matches(mobileRegEx, "mobile number is not valid"),
            email: Yup.string().email("Invalid email format"),
            maritalStatus: Yup.string().required("Required"),

            presentDivisionId: Yup.string().required("Required"),
            presentDistrictId: Yup.string().required("Required"),
            presentThanaId: Yup.string().required("Required"),

            // photo: Yup.mixed()
            //     .required("Photo is a required field")
            //     .test(
            //         "fileFormat",
            //         "Unsupported Format! Only allow jpg, jpeg, png format.",
            //         (value) => {
            //             return value && SUPPORTED_FORMATS.includes(value.type);
            //         }
            //     )
            //     .test(
            //         "fileSize",
            //         `File too large. Max file size is ${
            //             PHOTO_FILE_SIZE / 1024
            //         } kb`,
            //         (value) => value && value.size <= PHOTO_FILE_SIZE
            //     ),

            // eSign: Yup.mixed()
            //     .required("Sign is a required field")
            //     .test(
            //         "fileFormat",
            //         "Unsupported Format! Only allow jpg, jpeg, png format.",
            //         (value) => {
            //             return value && SUPPORTED_FORMATS.includes(value.type);
            //         }
            //     )
            //     .test(
            //         "fileSize",
            //         `File too large. Max file size is ${
            //             ESIGN_FILE_SIZE / 1024
            //         } kb`,
            //         (value) => value && value.size <= ESIGN_FILE_SIZE
            //     ),
        });
    }
}

export const ApplyModel = new ApplicationApplyModel();
