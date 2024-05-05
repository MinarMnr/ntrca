import * as Yup from "yup";
const SUPPORTED_FORMATS = ["application/pdf"];
const FILE_SIZE = 10485760; // 10mb

class PhaseWiseCircular {
    constructor() {
        this.circularTitle = "";
        this.circularPublishDate = "";
        this.circularEffectiveDate = "";
        this.circularExpiryDate = "";
        this.jobApplicationCircularId = "";
        //this.encloserUrl = "";
    }

    fromJson(data = {}) {
        let obj = new PhaseWiseCircular();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.circularTitle = data.circularTitle ?? "";
        obj.circularPublishDate = data.circularPublishDate ?? "";
        obj.circularEffectiveDate = data.circularEffectiveDate ?? "";
        obj.circularExpiryDate = data.circularExpiryDate ?? "";
        obj.jobApplicationCircularId = data.jobApplicationCircularId ?? "";
        //obj.encloserUrl = data.encloserUrl ?? "";

        delete obj.file;
        return obj;
    }

    toString(data = {}) {
        let obj = new PhaseWiseCircular().fromJson(data);
        return JSON.stringify(obj);
    }

    toFormData(obj = {}) {
        let data = new FormData();
        data.append(
            "PhaseWiseJobApplicationCircularRequest",
            new PhaseWiseCircular().toString(obj)
        );
        return data;
    }

    fromJsonEdit(data = {}) {
        let obj = new PhaseWiseCircular();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.circularTitle = data.circularTitle ?? "";
        obj.circularPublishDate = data.circularPublishDate ?? "";
        obj.circularEffectiveDate = data.circularEffectiveDate ?? "";
        obj.circularExpiryDate = data.circularExpiryDate ?? "";
        obj.jobApplicationCircularId = data.jobApplicationCircularId ?? "";
        //obj.encloserUrl = data.encloserUrl ?? "";

        return obj;
    }

    toStringEdit(data = {}) {
        let obj = new PhaseWiseCircular().fromJsonEdit(data);
        return JSON.stringify(obj);
    }

    toFormDataEdit(obj = {}) {
        let data = new FormData();
        data.append(
            "PhaseWiseJobApplicationCircularRequest",
            new PhaseWiseCircular().toStringEdit(obj)
        );
        return data;
    }

    validator() {
        return Yup.object().shape({
            circularTitle: Yup.string().required("Required"),
            jobApplicationCircularId: Yup.string().required("Required"),

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
                        return Yup.date()
                            .required("Required")
                            .min(
                                circularEffectiveDate,
                                "মেয়াদ উত্তীর্ণের তারিখ কার্যকরী তারিখের পরে হবে৷"
                            )
                            .min(
                                new Date(),
                                "মেয়াদ উত্তীর্ণের তারিখ আজকের তারিখের পরে হতে হবে"
                            )
                            .typeError("Required");
                    }
                }),

            file: Yup.mixed()
                .required("File is a required field")
                .test("fileFormat", "Unsupported Format", (value) => {
                    if (!value?.size) return true;
                    return value && SUPPORTED_FORMATS.includes(value.type);
                })
                .test(
                    "fileSize",
                    `File too large. Max file size is ${FILE_SIZE} kb`,
                    (value) => value && value.size <= FILE_SIZE
                ),
        });
    }

    editValidation() {
        return Yup.object().shape({
            circularTitle: Yup.string().required("Required"),
            jobApplicationCircularId: Yup.string().required("Required"),

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

            file: Yup.mixed()
                .test("fileFormat", "Unsupported Format", (value) => {
                    if (!value?.size) return true;
                    return value && SUPPORTED_FORMATS.includes(value.type);
                })
                .test(
                    "fileSize",
                    `File too large. Max file size is ${FILE_SIZE} kb`,
                    (value) => {
                        if (!value?.size) return true;
                        return value && value.size <= FILE_SIZE;
                    }
                ),
        });
    }
}

export const phaseWiseCircularModel = new PhaseWiseCircular();
