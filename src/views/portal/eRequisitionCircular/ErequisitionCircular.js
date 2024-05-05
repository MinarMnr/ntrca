import * as Yup from "yup";
const SUPPORTED_FORMATS = ["application/pdf"];
const FILE_SIZE = 10485760; // 10mb
class ErequisitionCircular {
    /**
     * Model properties
     */
    constructor() {
        this.title = "";
        this.publishDate = "";
        this.effectiveDate = "";
        this.expiryDate = "";
        this.jobApplicationRuleId = "";
        this.applicationFee = "";
        this.feePaymentValidityHour = "";
        this.instituteTypeList = [];
        this.encloserList = [{ id: "" }];
    }

    /**
     * Get model instance from json
     */
    fromJson(data = {}) {
        let obj = new ErequisitionCircular();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.title = data.title ?? "";
        obj.publishDate = data.publishDate ?? "";
        obj.effectiveDate = data.effectiveDate ?? "";
        obj.expiryDate = data.expiryDate ?? "";
        obj.jobApplicationRuleId = data.jobApplicationRuleId ?? "";
        obj.instituteTypeList = data.instituteTypeList ?? [];
        obj.applicationFee = data.applicationFee ?? "";
        obj.feePaymentValidityHour = data.feePaymentValidityHour ?? "";
        obj.encloserList = data.encloserList ?? null;
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
        let obj = new ErequisitionCircular().fromJson(data);
        return JSON.stringify(obj);
    }

    toFormData(obj = {}) {
        let data = new FormData();
        data.append(
            "InstituteJobRequisitionRequest",
            new ErequisitionCircular().toString(obj)
        );
        return data;
    }

    fromJsonEdit(data = {}) {
        let obj = new ErequisitionCircular();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.title = data.title ?? "";

        obj.publishDate = data.publishDate ?? "";
        obj.effectiveDate = data.effectiveDate ?? "";
        obj.expiryDate = data.expiryDate ?? "";
        obj.jobApplicationRuleId = data.jobApplicationRuleId ?? "";
        obj.instituteTypeList = data.instituteTypeList ?? [];

        obj.applicationFee = data.applicationFee ?? "";
        obj.feePaymentValidityHour = data.feePaymentValidityHour ?? "";
        obj.encloserList = data.encloserList ?? null;

        return obj;
    }

    toStringEdit(data = {}) {
        let obj = new ErequisitionCircular().fromJsonEdit(data);
        return JSON.stringify(obj);
    }

    toFormDataEdit(obj = {}) {
        let data = new FormData();
        data.append(
            "InstituteJobRequisitionRequest",
            new ErequisitionCircular().toStringEdit(obj)
        );
        return data;
    }

    /**
     * Validator schema
     */
    validator() {
        return Yup.object().shape({
            title: Yup.string().required("Required"),
            jobApplicationRuleId: Yup.string().required("Required"),
            applicationFee: Yup.number()
                .required("Required")
                .positive("Application Fee must be a positive number"),
            //feePaymentValidityHour: Yup.number().required("Required"),

            publishDate: Yup.string().required("Required"),
            effectiveDate: Yup.string()
                .required("Required")
                .when("publishDate", (publishDate) => {
                    if (publishDate) {
                        return Yup.date()
                            .required("Required")
                            .min(
                                publishDate,
                                "কার্যকর তারিখ প্রকাশের তারিখের পরে হবে৷"
                            )
                            .typeError("Required");
                    }
                }),

            expiryDate: Yup.string()
                .required("Required")
                .when("effectiveDate", (effectiveDate) => {
                    if (effectiveDate) {
                        return Yup.date()
                            .required("Required")
                            .min(
                                effectiveDate,
                                "মেয়াদ উত্তীর্ণের তারিখ কার্যকরী তারিখের পরে হবে৷"
                            )
                            .min(
                                new Date(),
                                "মেয়াদ উত্তীর্ণের তারিখ আজকের তারিখের পরে হতে হবে"
                            )
                            .typeError("Required");
                    }
                }),

            files: Yup.mixed()
                .test("fileFormat", "Unsupported Format", (value) => {
                    if (!value?.type) return true;

                    return value && SUPPORTED_FORMATS.includes(value[0].type);
                })
                .test(
                    "fileSize",
                    `File too large. Max file size is ${FILE_SIZE} kb`,
                    (value) => {
                        if (!value?.size) return true;
                        return value[0] && value[0].size <= FILE_SIZE;
                    }
                ),
        });
    }
}

export const Erequisition = new ErequisitionCircular();
