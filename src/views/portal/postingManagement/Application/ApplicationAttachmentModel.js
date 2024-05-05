import * as Yup from "yup";

const mobileRegEx = /^(?:\+88|0088)?(01[3-9]\d{8})$/;
const PHOTO_FILE_SIZE = 300 * 1024;
const ESIGN_FILE_SIZE = 180 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const SUPPORTED_FILE_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

class ApplicationAttachmentModel {
    /**
     * Model properties
     */
    constructor() {
        this.photo = "";
        this.previousPhoto = "";
        this.eSign = "";
        this.previousESign = "";
    }

    /**
     * Get model instance from json
     */
    fromJson(data = {}) {
        let obj = new ApplicationAttachmentModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.photo = data.photoEncloserUrl ?? "";
        obj.previousPhoto = data.photoEncloserUrl ?? "";

        obj.eSign = data.esignEncloserUrl ?? "";
        obj.previousESign = data.esignEncloserUrl ?? "";

        return obj;
    }

    /**
     * Get string from model instance
     */
    toString(data = {}) {
        let obj = new ApplicationAttachmentModel().fromJson(data);
        return JSON.stringify(obj);
    }

    toFormData(obj = {}) {
        let data = new FormData();
        return data;
    }

    /**
     * Validator schema
     */
    validator(data) {
        return Yup.object().shape({
            photo: Yup.mixed().test(
                "Is file",
                (value, { createError, path, parent }) => {
                    let exceed = true;
                    let exceedFormat = true;
                    let exceedSize = true;

                    if (
                        data?.photoEncloserUrl &&
                        data?.photoEncloserUrl == value
                    ) {
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
            eSign: Yup.mixed().test(
                "Is file",
                (value, { createError, path, parent }) => {
                    let exceed = true;
                    let exceedFormat = true;
                    let exceedSize = true;
                    if (
                        data?.photoEncloserUrl &&
                        data?.esignEncloserUrl == value
                    ) {
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
                            if (value && value?.size > ESIGN_FILE_SIZE) {
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

            // photo1: Yup.mixed()
            //     //.required("Photo is a required field")

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

            // eSign1: Yup.mixed()
            //     //.required("Sign is a required field")
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

export const AttachmentModel = new ApplicationAttachmentModel();
