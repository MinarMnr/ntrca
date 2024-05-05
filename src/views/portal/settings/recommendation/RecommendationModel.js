import {
    POSITIVE_NUMBER,
    GREATER_THAN,
    LESS_THAN,
    REQUIRED,
} from "constants/Message";
import * as Yup from "yup";

const PHOTO_FILE_SIZE = 300 * 1024;
const SUPPORTED_FILE_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

class Recommendation {
    constructor() {
        this.memorandumNo = "";
        this.jobCircularId = "";
        this.publishDate = "";
        this.joiningStartDate = "";
        this.joiningEndDate = "";
        this.circularOrder = 0;
        this.subject = "";
        this.source = "";
        this.declaration = "";
        this.conditions = "";
        this.leftSideLogoUrl = "";
        this.rightSideLogoUrl = "";
        this.signatureUrl = "";
        this.signerName = "";
        this.signerDesignation = "";
    }

    fromJson(data = {}) {
        let obj = new Recommendation();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.memorandumNo = data.memorandumNo ?? "";
        obj.jobCircularId = data.jobCircularId ?? "";
        obj.publishDate = data.publishDate ?? "";
        obj.joiningStartDate = data.joiningStartDate ?? "";
        obj.joiningEndDate = data.joiningEndDate ?? "";
        obj.circularOrder = data.circularOrder ?? 0;
        obj.subject = data.subject ?? "";
        obj.source = data.source ?? "";
        obj.declaration = data.declaration ?? "";
        obj.conditions = data.conditions ?? "";

        obj.leftSideLogoUrl = data.leftSideLogoUrl ?? "";
        obj.rightSideLogoUrl = data.rightSideLogoUrl ?? "";
        obj.signatureUrl = data.signatureUrl ?? "";
        obj.signerName = data.signerName ?? "";
        obj.signerDesignation = data.signerDesignation ?? "";

        return obj;
    }

    fromDataJson(data = {}) {
        let obj = new Recommendation();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        } else {
            obj.id = 0;
        }

        obj.memorandumNo = data.memorandumNo ?? "";
        obj.jobCircularId = data.jobCircularId ?? "";
        obj.publishDate = data.publishDate ?? "";
        obj.joiningStartDate = data.joiningStartDate ?? "";
        obj.joiningEndDate = data.joiningEndDate ?? "";
        obj.circularOrder = data.circularOrder ?? 0;
        obj.subject = data.subject ?? "";
        obj.source = data.source ?? "";
        obj.conditions = data.conditions ?? "";
        obj.declaration = data.declaration ?? "";
        obj.signatureUrl = data.signatureUrl ?? "";
        obj.signerName = data.signerName ?? "";
        obj.signerDesignation = data.signerDesignation ?? "";

        delete obj.leftSideLogoUrl;
        delete obj.rightSideLogoUrl;
        delete obj.signatureUrl;

        return obj;
    }

    toString(data = {}) {
        let obj = new Recommendation().fromDataJson(data);
        return JSON.stringify(obj);
    }

    toFormData(obj = {}) {
        let data = new FormData();
        data.append(
            "RecommendationLetterSettingRequest",
            new Recommendation().toString(obj)
        );
        return data;
    }

    validator(data) {
        return Yup.object().shape({
            memorandumNo: Yup.string().required("Required"),
            jobCircularId: Yup.string().required("Required"),
            publishDate: Yup.string().required("Required"),
            joiningStartDate: Yup.string().required("Required"),
            joiningEndDate: Yup.string().required("Required"),
            circularOrder: Yup.string().required("Required"),
            subject: Yup.string().required("Required"),
            source: Yup.string().required("Required"),
            conditions: Yup.string().required("Required"),
            declaration: Yup.string().required("Required"),
            signerName: Yup.string().required("Required"),
            signerDesignation: Yup.string().required("Required"),

            leftSideLogoUrl: Yup.mixed().test(
                "Is file",
                (value, { createError, path, parent }) => {
                    let exceed = true;
                    let exceedFormat = true;
                    let exceedSize = true;
                    if (data?.leftSideLogoUrl == value) {
                        exceed = false;
                        exceedFormat = false;
                        exceedSize = false;
                    } else {
                        if (!value) {
                            exceed = true;
                        } else {
                            exceed = false;
                            exceedFormat = false;
                            exceedSize = false;
                            if (
                                value &&
                                !SUPPORTED_FILE_FORMATS.includes(value?.type)
                            ) {
                                exceedFormat = true;
                            }
                            if (value && value?.size > PHOTO_FILE_SIZE) {
                                exceedSize = true;
                            }
                        }
                    }
                    return exceed
                        ? createError({
                              message: `required`,
                              path,
                          })
                        : exceedSize
                        ? createError({
                              message: `File too large!`,
                              path,
                          })
                        : exceedFormat
                        ? createError({
                              message: `Unsupported format!`,
                              path,
                          })
                        : true;
                }
            ),

            rightSideLogoUrl: Yup.mixed().test(
                "Is file",
                (value, { createError, path, parent }) => {
                    let exceed = true;
                    let exceedFormat = true;
                    let exceedSize = true;
                    if (data?.rightSideLogoUrl == value) {
                        exceed = false;
                        exceedFormat = false;
                        exceedSize = false;
                    } else {
                        if (!value) {
                            exceed = true;
                        } else {
                            exceed = false;
                            exceedFormat = false;
                            exceedSize = false;
                            if (
                                value &&
                                !SUPPORTED_FILE_FORMATS.includes(value?.type)
                            ) {
                                exceedFormat = true;
                            }
                            if (value && value?.size > PHOTO_FILE_SIZE) {
                                exceedSize = true;
                            }
                        }
                    }
                    return exceed
                        ? createError({
                              message: `required`,
                              path,
                          })
                        : exceedSize
                        ? createError({
                              message: `File too large!`,
                              path,
                          })
                        : exceedFormat
                        ? createError({
                              message: `Unsupported format!`,
                              path,
                          })
                        : true;
                }
            ),

            signatureUrl: Yup.mixed().test(
                "Is file",
                (value, { createError, path, parent }) => {
                    let exceed = true;
                    let exceedFormat = true;
                    let exceedSize = true;
                    if (data?.signatureUrl == value) {
                        exceed = false;
                        exceedFormat = false;
                        exceedSize = false;
                    } else {
                        if (!value) {
                            exceed = true;
                        } else {
                            exceed = false;
                            exceedFormat = false;
                            exceedSize = false;
                            if (
                                value &&
                                !SUPPORTED_FILE_FORMATS.includes(value?.type)
                            ) {
                                exceedFormat = true;
                            }
                            if (value && value?.size > PHOTO_FILE_SIZE) {
                                exceedSize = true;
                            }
                        }
                    }
                    return exceed
                        ? createError({
                              message: `required`,
                              path,
                          })
                        : exceedSize
                        ? createError({
                              message: `File too large!`,
                              path,
                          })
                        : exceedFormat
                        ? createError({
                              message: `Unsupported format!`,
                              path,
                          })
                        : true;
                }
            ),
        });
    }
}

export const RecommendationModel = new Recommendation();
