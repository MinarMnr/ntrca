import {
    POSITIVE_NUMBER,
    GREATER_THAN,
    LESS_THAN,
    REQUIRED,
} from "constants/Message";
import * as Yup from "yup";
const banglaLang = /^[\p{sc=Bengali},()\-\s]+$/u;
const englishLang = /^[A-Za-z0-9,()\-\s]+$/;
const writeNow = /^[\p{sc=Bengali}A-Za-z0-9,()\-:._;'\s]+$/;

import moment from "moment";
import EnglishNumberToBangla from "helpers/EnglishNumberToBangla";
import { AuthUser } from "helpers/AuthUser";
const PHOTO_FILE_SIZE = 300 * 1024;
const SUPPORTED_FILE_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
class profileModel {
    constructor() {
        this.instituteId = "";
        this.instituteHeadName = "";
        this.instituteHeadDob = "";
        this.instituteHeadNid = "";
        this.instituteHeadIndex = "";
        this.instituteHeadEmail = "";
        this.instituteHeadMobile1 = "";
        this.instituteHeadMobile2 = "";
        this.instituteHeadSignatureUrl = "";
        this.instituteHeadPhotoUrl = "";
        this.instituteHeadNidUrlFront = "";
        this.instituteHeadNidUrlRear = "";
        this.instituteHeadDivisionId = "";
        this.instituteHeadDivisionNameBn = "";
        this.instituteHeadDistrictId = "";
        this.instituteHeadDistrictNameBn = "";
        this.instituteHeadUpazilaId = "";
        this.instituteHeadUpazilaNameBn = "";
        this.instituteHeadAddress = "";
        this.governingBodyChairmanName = "";
        this.governingBodyChairmanDob = "";
        this.governingBodyChairmanNid = "";
        this.governingBodyChairmanIndex = "";
        this.governingBodyChairmanEmail = "";
        this.governingBodyChairmanMobile1 = "";
        this.governingBodyChairmanMobile2 = "";
        this.governingBodyChairmanSignatureUrl = "";
        this.governingBodyChairmanPhotoUrl = "";
        this.governingBodyChairmanNidUrlFront = "";
        this.governingBodyChairmanNidUrlRear = "";
        this.governingBodyChairmanDivisionId = "";
        this.governingBodyChairmanDivisionNameBn = "";
        this.governingBodyChairmanDistrictId = "";
        this.governingBodyChairmanDistrictNameBn = "";
        this.governingBodyChairmanUpazilaId = "";
        this.governingBodyChairmanUpazilaNameBn = "";
        this.governingBodyChairmanAddress = "";
    }

    fromJson(data = {}) {
        let obj = new profileModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.instituteId = data.instituteId ?? "";
        obj.instituteHeadName = data.instituteHeadName ?? "";
        obj.instituteHeadDob = data.instituteHeadDob ?? "";
        obj.instituteHeadNid = data.instituteHeadNid ?? "";
        obj.instituteHeadIndex = data.instituteHeadIndex ?? "";
        obj.instituteHeadEmail = data.instituteHeadEmail ?? "";
        obj.instituteHeadMobile1 = data.instituteHeadMobile1 ?? "";
        obj.instituteHeadMobile2 = data.instituteHeadMobile2 ?? "";
        obj.instituteHeadSignatureUrl = data.instituteHeadSignatureUrl ?? "";
        obj.instituteHeadPhotoUrl = data.instituteHeadPhotoUrl ?? "";
        obj.instituteHeadNidUrlFront = data.instituteHeadNidUrlFront ?? "";
        obj.instituteHeadNidUrlRear = data.instituteHeadNidUrlRear ?? "";
        obj.instituteHeadDivisionId = data.instituteHeadDivisionId ?? "";
        obj.instituteHeadDivisionNameBn =
            data.instituteHeadDivisionNameBn ?? "";
        obj.instituteHeadDistrictId = data.instituteHeadDistrictId ?? "";
        obj.instituteHeadDistrictNameBn =
            data.instituteHeadDistrictNameBn ?? "";
        obj.instituteHeadUpazilaId = data.instituteHeadUpazilaId ?? "";
        obj.instituteHeadUpazilaNameBn = data.instituteHeadUpazilaNameBn ?? "";
        obj.instituteHeadAddress = data.instituteHeadAddress ?? "";
        obj.governingBodyChairmanName = data.governingBodyChairmanName ?? "";
        obj.governingBodyChairmanDob = data.governingBodyChairmanDob ?? "";
        obj.governingBodyChairmanNid = data.governingBodyChairmanNid ?? "";
        obj.governingBodyChairmanIndex = data.governingBodyChairmanIndex ?? "";
        obj.governingBodyChairmanEmail = data.governingBodyChairmanEmail ?? "";
        obj.governingBodyChairmanMobile1 =
            data.governingBodyChairmanMobile1 ?? "";
        obj.governingBodyChairmanMobile2 =
            data.governingBodyChairmanMobile2 ?? "";
        obj.governingBodyChairmanSignatureUrl =
            data.governingBodyChairmanSignatureUrl ?? "";
        obj.governingBodyChairmanPhotoUrl =
            data.governingBodyChairmanPhotoUrl ?? "";
        obj.governingBodyChairmanNidUrlFront =
            data.governingBodyChairmanNidUrlFront ?? "";
        obj.governingBodyChairmanNidUrlRear =
            data.governingBodyChairmanNidUrlRear ?? "";
        obj.governingBodyChairmanDivisionId =
            data.governingBodyChairmanDivisionId ?? "";
        obj.governingBodyChairmanDivisionNameBn =
            data.governingBodyChairmanDivisionNameBn ?? "";
        obj.governingBodyChairmanDistrictId =
            data.governingBodyChairmanDistrictId ?? "";
        obj.governingBodyChairmanDistrictNameBn =
            data.governingBodyChairmanDistrictNameBn ?? "";
        obj.governingBodyChairmanUpazilaId =
            data.governingBodyChairmanUpazilaId ?? "";
        obj.governingBodyChairmanUpazilaNameBn =
            data.governingBodyChairmanUpazilaNameBn ?? "";
        obj.governingBodyChairmanAddress =
            data.governingBodyChairmanAddress ?? "";
        return obj;
    }
    fromDataJson(data = {}) {
        let obj = new profileModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        } else {
            obj.id = 0;
        }

        obj.instituteId = AuthUser.getInstituteId();
        obj.instituteHeadName = data.instituteHeadName ?? "";
        obj.instituteHeadDob = data.instituteHeadDob ?? "";
        obj.instituteHeadNid = data.instituteHeadNid ?? "";
        obj.instituteHeadIndex = data.instituteHeadIndex ?? "";
        obj.instituteHeadEmail = data.instituteHeadEmail ?? "";
        obj.instituteHeadMobile1 = data.instituteHeadMobile1 ?? "";
        obj.instituteHeadMobile2 = data.instituteHeadMobile2 ?? "";

        // obj.instituteHeadPhotoUrl = data.instituteHeadPhotoUrl;
        // obj.instituteHeadSignatureUrl = data.instituteHeadSignatureUrl;
        // obj.instituteHeadNidUrlFront = data.instituteHeadNidUrlFront;
        // obj.instituteHeadNidUrlRear = data.instituteHeadNidUrlRear;
        obj.instituteHeadDivisionId = data.instituteHeadDivisionId ?? "";
        obj.instituteHeadDivisionNameBn =
            data.instituteHeadDivisionNameBn ?? "";
        obj.instituteHeadDistrictId = data.instituteHeadDistrictId ?? "";
        obj.instituteHeadDistrictNameBn =
            data.instituteHeadDistrictNameBn ?? "";
        obj.instituteHeadUpazilaId = data.instituteHeadUpazilaId ?? "";
        obj.instituteHeadUpazilaNameBn = data.instituteHeadUpazilaNameBn ?? "";
        obj.instituteHeadAddress = data.instituteHeadAddress ?? "";
        obj.governingBodyChairmanName = data.governingBodyChairmanName ?? "";
        obj.governingBodyChairmanDob = data.governingBodyChairmanDob ?? "";
        obj.governingBodyChairmanNid = data.governingBodyChairmanNid ?? "";
        obj.governingBodyChairmanIndex = data.governingBodyChairmanIndex ?? "";
        obj.governingBodyChairmanEmail = data.governingBodyChairmanEmail ?? "";
        obj.governingBodyChairmanMobile1 =
            data.governingBodyChairmanMobile1 ?? "";
        obj.governingBodyChairmanMobile2 =
            data.governingBodyChairmanMobile2 ?? "";
        // obj.governingBodyChairmanSignatureUrl =
        //     data.governingBodyChairmanSignatureUrl;
        // obj.governingBodyChairmanPhotoUrl = data.governingBodyChairmanPhotoUrl;
        // obj.governingBodyChairmanNidUrlFront =
        //     data.governingBodyChairmanNidUrlFront;
        // obj.governingBodyChairmanNidUrlRear =
        //     data.governingBodyChairmanNidUrlRear;
        obj.governingBodyChairmanDivisionId =
            data.governingBodyChairmanDivisionId ?? "";
        obj.governingBodyChairmanDivisionNameBn =
            data.governingBodyChairmanDivisionNameBn ?? "";
        obj.governingBodyChairmanDistrictId =
            data.governingBodyChairmanDistrictId ?? "";
        obj.governingBodyChairmanDistrictNameBn =
            data.governingBodyChairmanDistrictNameBn ?? "";
        obj.governingBodyChairmanUpazilaId =
            data.governingBodyChairmanUpazilaId ?? "";
        obj.governingBodyChairmanUpazilaNameBn =
            data.governingBodyChairmanUpazilaNameBn ?? "";
        obj.governingBodyChairmanAddress =
            data.governingBodyChairmanAddress ?? "";

        return obj;
    }
    toString(data = {}) {
        let obj = new profileModel().fromDataJson(data);
        return JSON.stringify(obj);
    }

    toFormData(obj = {}) {
        let data = new FormData();
        data.append(
            "InstituteHeadAndGoverningBodyProfileRequest",
            new profileModel().toString(obj)
        );
        return data;
    }

    validator(data) {
        return Yup.object().shape({
            instituteHeadName: Yup.string()
                .matches(writeNow, "Enter name in English Or Bangla")
                .typeError(REQUIRED)
                .required("Required"),

            instituteHeadDob: Yup.string().required("Required"),
            instituteHeadNid: Yup.string()
                .matches(
                    /^(\d{10}|\d{13}|\d{17})$/,
                    "Invalid NID number. NID must be 10, 13, or 17 digits."
                )
                .required("NID number is required."),
            // instituteHeadIndex: Yup.number()
            //     .typeError(POSITIVE_NUMBER)
            //     .required("Required"),
            instituteHeadEmail: Yup.string()
                .email("Invalid email address")
                .required("Required"),

            instituteHeadMobile1: Yup.string()
                .matches(/^((\+88\d{11})|(01\d{9}))$/, {
                    message:
                        "Mobile number must be 11 digits starting with 01 or 13 digits starting with +88",
                    excludeEmptyString: true,
                })
                .required("Mobile number is required"),
            instituteHeadMobile2: Yup.string().matches(
                /^((\+88\d{11})|(01\d{9}))$/,
                {
                    message:
                        "Mobile number must be 11 digits starting with 01 or 13 digits starting with +88",
                    excludeEmptyString: true,
                }
            ),
            //.required("Mobile number is required"),

            instituteHeadDivisionId: Yup.number().required("Required"),
            // instituteHeadDivisionNameBn: Yup.string()
            //     .matches(banglaLang, "Please type in Bangla")
            //     .typeError(REQUIRED)
            //     .required("Required"),
            instituteHeadDistrictId: Yup.number().required("Required"),
            // instituteHeadDistrictNameBn: Yup.string()
            //     .matches(banglaLang, "Please type in Bangla")
            //     .typeError(REQUIRED)
            //     .required("Required"),
            instituteHeadUpazilaId: Yup.number().required("Required"),
            // instituteHeadUpazilaNameBn: Yup.string()
            //     .matches(banglaLang, "Please type in Bangla")
            //     .typeError(REQUIRED)
            //     .required("Required"),

            instituteHeadAddress: Yup.string().required("Required"),
            governingBodyChairmanName: Yup.string()
                .matches(writeNow, "Enter name in English Or Bangla")
                .typeError(REQUIRED)
                .required("Required"),

            governingBodyChairmanDob: Yup.string().required("Required"),

            governingBodyChairmanNid: Yup.string()
                .matches(
                    /^(\d{10}|\d{13}|\d{17})$/,
                    "Invalid NID number. NID must be 10, 13, or 17 digits."
                )
                .required("NID number is required."),
            // governingBodyChairmanIndex: Yup.number()
            //     .typeError(POSITIVE_NUMBER)
            //     .required("Required"),
            governingBodyChairmanEmail: Yup.string()
                .email("Invalid email address")
                .required("Required"),

            governingBodyChairmanMobile1: Yup.string()
                .matches(/^((\+88\d{11})|(01\d{9}))$/, {
                    message:
                        "Mobile number must be 11 digits starting with 01 or 13 digits starting with +88",
                    excludeEmptyString: true,
                })
                .required("Mobile number is required"),
            governingBodyChairmanMobile2: Yup.string().matches(
                /^((\+88\d{11})|(01\d{9}))$/,
                {
                    message:
                        "Mobile number must be 11 digits starting with 01 or 13 digits starting with +88",
                    excludeEmptyString: true,
                }
            ),
            //.required("Mobile number is required"),
            governingBodyChairmanDivisionId: Yup.number().required("Required"),
            // governingBodyChairmanDivisionNameBn: Yup.string()
            //     .matches(banglaLang, "Please type in Bangla")
            //     .typeError(REQUIRED)
            //     .required("Required"),
            governingBodyChairmanDistrictId: Yup.number().required("Required"),
            // governingBodyChairmanDistrictNameBn: Yup.string()
            //     .matches(banglaLang, "Please type in Bangla")
            //     .typeError(REQUIRED)
            //     .required("Required"),
            governingBodyChairmanUpazilaId: Yup.number().required("Required"),
            // governingBodyChairmanUpazilaNameBn: Yup.string()
            //     .matches(banglaLang, "Please type in Bangla")
            //     .typeError(REQUIRED)
            //     .required("Required"),

            governingBodyChairmanAddress: Yup.string().required("Required"),

            instituteHeadSignatureUrl: Yup.mixed()
                .test(
                    "fileFormat",
                    "Invalid file format. Only JPG, JPEG, and PNG formats are allowed.",
                    (value) => {
                        if (!value || !value.type) return true; // Allow empty field or missing type

                        const validFormats = [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                        ];
                        return validFormats.includes(value.type);
                    }
                )
                .test(
                    "fileSize",
                    "File size must be less than 300 KB.",
                    (value) => {
                        if (!value || !value.size) return true; // Allow empty field or missing size

                        const maxSize = 300 * 1024; // 300 KB in bytes
                        return value.size <= maxSize;
                    }
                )
                .nullable()
                .required("Image is required."),
            instituteHeadPhotoUrl: Yup.mixed()
                .test(
                    "fileFormat",
                    "Invalid file format. Only JPG, JPEG, and PNG formats are allowed.",
                    (value) => {
                        if (!value || !value.type) return true; // Allow empty field or missing type

                        const validFormats = [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                        ];
                        return validFormats.includes(value.type);
                    }
                )
                .test(
                    "fileSize",
                    "File size must be less than 300 KB.",
                    (value) => {
                        if (!value || !value.size) return true; // Allow empty field or missing size

                        const maxSize = 300 * 1024; // 300 KB in bytes
                        return value.size <= maxSize;
                    }
                )
                .nullable()
                .required("Image is required."),
            instituteHeadNidUrlFront: Yup.mixed()
                .test(
                    "fileFormat",
                    "Invalid file format. Only JPG, JPEG, and PNG formats are allowed.",
                    (value) => {
                        if (!value || !value.type) return true; // Allow empty field or missing type

                        const validFormats = [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                        ];
                        return validFormats.includes(value.type);
                    }
                )
                .test(
                    "fileSize",
                    "File size must be less than 300 KB.",
                    (value) => {
                        if (!value || !value.size) return true; // Allow empty field or missing size

                        const maxSize = 300 * 1024; // 300 KB in bytes
                        return value.size <= maxSize;
                    }
                )
                .nullable()
                .required("Image is required."),
            instituteHeadNidUrlRear: Yup.mixed()
                .test(
                    "fileFormat",
                    "Invalid file format. Only JPG, JPEG, and PNG formats are allowed.",
                    (value) => {
                        if (!value || !value.type) return true; // Allow empty field or missing type

                        const validFormats = [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                        ];
                        return validFormats.includes(value.type);
                    }
                )
                .test(
                    "fileSize",
                    "File size must be less than 300 KB.",
                    (value) => {
                        if (!value || !value.size) return true; // Allow empty field or missing size

                        const maxSize = 300 * 1024; // 300 KB in bytes
                        return value.size <= maxSize;
                    }
                )
                .nullable()
                .required("Image is required."),
            instituteHeadNidUrlRear: Yup.mixed()
                .test(
                    "fileFormat",
                    "Invalid file format. Only JPG, JPEG, and PNG formats are allowed.",
                    (value) => {
                        if (!value || !value.type) return true; // Allow empty field or missing type

                        const validFormats = [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                        ];
                        return validFormats.includes(value.type);
                    }
                )
                .test(
                    "fileSize",
                    "File size must be less than 300 KB.",
                    (value) => {
                        if (!value || !value.size) return true; // Allow empty field or missing size

                        const maxSize = 300 * 1024; // 300 KB in bytes
                        return value.size <= maxSize;
                    }
                )
                .nullable()
                .required("Image is required."),
            governingBodyChairmanSignatureUrl: Yup.mixed()
                .test(
                    "fileFormat",
                    "Invalid file format. Only JPG, JPEG, and PNG formats are allowed.",
                    (value) => {
                        if (!value || !value.type) return true; // Allow empty field or missing type

                        const validFormats = [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                        ];
                        return validFormats.includes(value.type);
                    }
                )
                .test(
                    "fileSize",
                    "File size must be less than 300 KB.",
                    (value) => {
                        if (!value || !value.size) return true; // Allow empty field or missing size

                        const maxSize = 300 * 1024; // 300 KB in bytes
                        return value.size <= maxSize;
                    }
                )
                .nullable()
                .required("Image is required."),
            governingBodyChairmanPhotoUrl: Yup.mixed()
                .test(
                    "fileFormat",
                    "Invalid file format. Only JPG, JPEG, and PNG formats are allowed.",
                    (value) => {
                        if (!value || !value.type) return true; // Allow empty field or missing type

                        const validFormats = [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                        ];
                        return validFormats.includes(value.type);
                    }
                )
                .test(
                    "fileSize",
                    "File size must be less than 300 KB.",
                    (value) => {
                        if (!value || !value.size) return true; // Allow empty field or missing size

                        const maxSize = 300 * 1024; // 300 KB in bytes
                        return value.size <= maxSize;
                    }
                )
                .nullable()
                .required("Image is required."),
            governingBodyChairmanNidUrlFront: Yup.mixed()
                .test(
                    "fileFormat",
                    "Invalid file format. Only JPG, JPEG, and PNG formats are allowed.",
                    (value) => {
                        if (!value || !value.type) return true; // Allow empty field or missing type

                        const validFormats = [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                        ];
                        return validFormats.includes(value.type);
                    }
                )
                .test(
                    "fileSize",
                    "File size must be less than 300 KB.",
                    (value) => {
                        if (!value || !value.size) return true; // Allow empty field or missing size

                        const maxSize = 300 * 1024; // 300 KB in bytes
                        return value.size <= maxSize;
                    }
                )
                .nullable()
                .required("Image is required."),
            governingBodyChairmanNidUrlRear: Yup.mixed()
                .test(
                    "fileFormat",
                    "Invalid file format. Only JPG, JPEG, and PNG formats are allowed.",
                    (value) => {
                        if (!value || !value.type) return true; // Allow empty field or missing type

                        const validFormats = [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                        ];
                        return validFormats.includes(value.type);
                    }
                )
                .test(
                    "fileSize",
                    "File size must be less than 300 KB.",
                    (value) => {
                        if (!value || !value.size) return true; // Allow empty field or missing size

                        const maxSize = 300 * 1024; // 300 KB in bytes
                        return value.size <= maxSize;
                    }
                )
                .nullable()
                .required("Image is required."),
        });
    }
}

export const Profile = new profileModel();
