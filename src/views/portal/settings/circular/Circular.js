import {
    POSITIVE_NUMBER,
    GREATER_THAN,
    LESS_THAN,
    REQUIRED,
} from "constants/Message";
import * as Yup from "yup";
const SUPPORTED_FORMATS = ["application/pdf"];
const FILE_SIZE = 10485760; // 10mb
const banglaLang = /^[\p{sc=Bengali},/()":|.'\-\s]+$/u;
import moment from "moment";
import EnglishNumberToBangla from "helpers/EnglishNumberToBangla";

class Circular {
    constructor() {
        this.circularTitle = "";
        this.circularPublishDate = "";
        this.circularEffectiveDate = "";
        this.circularExpiryDate = "";
        this.ageLimitTo = "";
        this.ageLimitAsOfDate = "";
        this.applicationFee = "";
        this.applicationFeePaymentValidityHour = "";
        this.maxInstituteToChoose = "";
        this.jobApplicationRuleId = "";
        this.govtRegulationId = [];
        this.requisitionCircularId = "";
        this.circularBody = "";
        this.encloserList = [{ id: "" }];
    }

    fromJson(data = {}) {
        let obj = new Circular();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.circularTitle = data.circularTitle ?? "";
        obj.circularPublishDate = data.circularPublishDate ?? "";
        obj.circularEffectiveDate = data.circularEffectiveDate ?? "";
        obj.circularExpiryDate = data.circularExpiryDate ?? "";
        obj.ageLimitTo = data.ageLimitTo ?? "";
        obj.ageLimitAsOfDate = data.ageLimitAsOfDate ?? "";
        obj.applicationFee = data.applicationFee ?? "";
        obj.applicationFeePaymentValidityHour =
            data.applicationFeePaymentValidityHour ?? "";
        obj.maxInstituteToChoose = data.maxInstituteToChoose ?? "";
        obj.jobApplicationRuleId = data.jobApplicationRuleId ?? "";
        obj.govtRegulationId = data.govtRegulationId ?? [];
        obj.requisitionCircularId = data.requisitionCircularId ?? "";
        obj.circularBody = data.circularBody ?? "";
        obj.encloserList = data.encloserList ?? null;

        delete obj.files;
        return obj;
    }

    toString(data = {}) {
        let obj = new Circular().fromJson(data);
        return JSON.stringify(obj);
    }

    toFormData(obj = {}) {
        let data = new FormData();
        data.append(
            "JobApplicationCircularRequest",
            new Circular().toString(obj)
        );
        return data;
    }

    fromJsonEdit(data = {}) {
        let obj = new Circular();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.circularTitle = data.circularTitle ?? "";
        obj.circularPublishDate = data.circularPublishDate ?? "";
        obj.circularEffectiveDate = data.circularEffectiveDate ?? "";
        obj.circularExpiryDate = data.circularExpiryDate ?? "";
        obj.ageLimitTo = data.ageLimitTo ?? "";
        obj.ageLimitAsOfDate = data.ageLimitAsOfDate ?? "";
        obj.applicationFee = data.applicationFee ?? "";
        obj.applicationFeePaymentValidityHour =
            data.applicationFeePaymentValidityHour ?? "";
        obj.maxInstituteToChoose = data.maxInstituteToChoose ?? "";
        obj.jobApplicationRuleId = data.jobApplicationRuleId ?? "";
        obj.govtRegulationId = data.govtRegulationId ?? [];
        obj.requisitionCircularId = data.requisitionCircularId ?? "";
        obj.circularBody = data.circularBody ?? "";
        obj.encloserList = data.encloserList ?? null;

        return obj;
    }

    toStringEdit(data = {}) {
        let obj = new Circular().fromJsonEdit(data);
        return JSON.stringify(obj);
    }

    toFormDataEdit(obj = {}) {
        let data = new FormData();
        data.append(
            "JobApplicationCircularRequest",
            new Circular().toStringEdit(obj)
        );
        return data;
    }

    validator() {
        return Yup.object().shape({
            circularTitle: Yup.string().required("Required"),

            ageLimitAsOfDate: Yup.string().required("Required"),
            // applicationFeePaymentValidityHour:
            //     Yup.number().required("Required"),
            ageLimitTo: Yup.number()
                .required("Required")
                .positive("Age limit must be a positive number"),

            applicationFee: Yup.number()
                .required("Required")
                .positive("Application fee must be a positive number"),
            maxInstituteToChoose: Yup.number()
                .required("Required")
                .positive("must be a positive number"),
            //govtRegulationId: Yup.number().required("Required"),
            requisitionCircularId: Yup.number().required("Required"),
            jobApplicationRuleId: Yup.string().required("Required"),
            circularBody: Yup.string().required("Required"),

            circularPublishDate: Yup.string().required("Required"),
            circularEffectiveDate: Yup.string()
                .required("Required")
                .when("circularPublishDate", (circularPublishDate) => {
                    if (circularPublishDate) {
                        return Yup.date()
                            .required("Required")
                            .min(
                                circularPublishDate,
                                "কার্যকর তারিখ প্রকাশের তারিখের পরে হবে৷"
                            )
                            .typeError("Required");
                    }
                }),

            circularExpiryDate: Yup.string()
                .required("Required")
                .when("circularEffectiveDate", (circularEffectiveDate) => {
                    if (circularEffectiveDate) {
                        return (
                            Yup.date()
                                .required("Required")
                                .min(
                                    circularEffectiveDate,
                                    "মেয়াদ উত্তীর্ণের তারিখ কার্যকরী তারিখের পরে হবে৷"
                                )
                                // .min(
                                //     new Date(),
                                //     "মেয়াদ উত্তীর্ণের তারিখ আজকের তারিখের পরে হতে হবে"
                                // )
                                .typeError("Required")
                        );
                    }
                }),

            files: Yup.mixed()
                .test("fileFormat", "Unsupported Format", (value) => {
                    if (!value?.type) return true;
                    return (
                        value[0] && SUPPORTED_FORMATS.includes(value[0].type)
                    );
                })
                .test(
                    "fileSize",
                    `File too large. Max file size is ${FILE_SIZE} kb`,
                    (value) => {
                        if (!value?.size) return true;
                        return value && value[0].size <= FILE_SIZE;
                    }
                ),
        });
    }
}

export const circularModel = new Circular();
