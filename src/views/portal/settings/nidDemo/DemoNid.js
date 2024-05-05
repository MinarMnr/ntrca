import * as Yup from "yup";
const mobileRegEx = /^(?:\+88|0088)?(01[3-9]\d{8})$/;
const nidRegEx = /^(\d{10}|\d{13}|\d{17})$/;
const birthRegRegEx = /^[0-9]\d{16}$/;
const banglaLang = /^[\p{sc=Bengali},()\-\s]+$/u;
const PHOTO_SIZE = 160 * 1024;
const FILE_SIZE = 5242880; // 5 MB = 5242880 Bytes
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
class DemoNidModel {
    /**
     * Model properties
     */
    constructor() {
        this.nidNumber = "";
        this.dateOfBirth = "";
        this.fatherName = "";
        this.fatherNameBn = "";
        this.gender = "";
        this.id = 0;
        this.motherName = "";
        this.motherNameBn = "";
        this.name = "";
        this.nameBn = "";
        this.permanentAddress = "";
        this.photoUrl = "";
        this.presentAddress = "";
    }

    /**
     * Get model instance from json
     */
    fromJson(data = {}) {
        let obj = new DemoNidModel();
        if (data.id !== undefined && data.id !== null) {
            obj.id = data.id;
        }
        obj.nidNumber = data.nidNumber ?? "";
        obj.dateOfBirth = data.dateOfBirth ?? "";
        obj.fatherName = data.fatherName ?? "";
        obj.fatherNameBn = data.fatherNameBn ?? "";
        obj.gender = data.gender ?? "";
        obj.motherName = data.motherName ?? "";
        obj.motherNameBn = data.motherNameBn ?? "";
        obj.name = data.name ?? "";
        obj.nameBn = data.nameBn ?? "";
        obj.permanentAddress = data.permanentAddress ?? "";
        obj.photoUrl = data.photoUrl ?? "";
        obj.presentAddress = data.presentAddress ?? "";

        return obj;
    }

    /**
     * Get string from model instance
     */
    toString(data = {}) {
        let obj = new DemoNidModel().fromJson(data);
        return JSON.stringify(obj);
    }

    /**
     * Validator schema
     */
    validator() {
        return Yup.object().shape({
            name: Yup.string().required("Required"),
            fatherName: Yup.string().required("Required"),
            motherName: Yup.string().required("Required"),
            gender: Yup.string().required("Required"),
            nidNumber: Yup.string()
                .matches(
                    nidRegEx,
                    "Invalid NID number. NID must be 10, 13, or 17 digits."
                )
                .required("Required"),
            dateOfBirth: Yup.string()
                .required("Required")
                .test(
                    "dateOfBirth",
                    "Date of birth must be less than or equal to today's date",
                    function (value) {
                        if (!value) {
                            // Handle empty value (optional date of birth)
                            return true;
                        }
                        const dob = new Date(value);
                        const today = new Date();
                        return dob <= today;
                    }
                ),
            permanentAddress: Yup.string().required("Required"),
        });
    }
}

export const DemoNid = new DemoNidModel();
