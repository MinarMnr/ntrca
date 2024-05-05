import * as Yup from "yup";
import * as moment from "moment";
//const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
class ApproveReviewModel {
    /**
     * Model properties
     */
    constructor() {
        this.approverReviewerName = "";
        this.appEntityId = "";
        this.remark = "";
        this.effectiveDateFrom = "";
        this.effectiveDateTo = "";
        this.roleList = [];
        this.approverReviewerUsers = [
            {
                actionToBePerformed: "",
                id: 0,
                kcUserDesignation: "",
                //kcUserId: "",
                kcUserName: "",
                orderIndex: "",
                reviewDays: "",
                userRoleId: "",
                userRoleName: "",
                recordVersion: "",
            },
        ];
    }

    /**
     * Get model instance from json
     */
    fromJson(data = {}, editList) {
        let obj = new ApproveReviewModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }
        obj.approverReviewerName = data.approverReviewerName;
        obj.appEntityId = data.forAppEntity;
        obj.appEntityName = data.forAppEntity;
        obj.remark = data.remark;
        obj.effectiveDateFrom = data.effectiveDateFrom ?? "";
        obj.effectiveDateTo = data.effectiveDateTo ?? "";
        //obj.roleList = editList;
        obj.approverReviewerUsers = data?.approverReviewerUsers ?? [];

        return obj;
    }

    /**
     * Get string from model instance
     */
    toString(data = {}) {
        let obj = new ApproveReviewModel().fromJson(data);
        return JSON.stringify(obj);
    }

    /**
     * Validator schema
     */

    validator() {
        return Yup.object().shape({
            approverReviewerName: Yup.string().required(
                "Approver reviewer name is a required field"
            ),
            appEntityId: Yup.number().required(
                "Review Process Name is a required field"
            ),
            approverReviewerUsers: Yup.array().of(
                Yup.object().shape({
                    actionToBePerformed: Yup.string().required("Required"),
                    userRoleId: Yup.string()
                        .required("Required")
                        .test(
                            "non-select",
                            "Required",
                            (value, textContext) => {
                                if (
                                    value == null ||
                                    value == "" ||
                                    value == 0 ||
                                    isNaN(value)
                                ) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        ),
                    // kcUserId: Yup.string()
                    //     .required("Required")
                    //     .test(
                    //         "non-select",
                    //         "Required",
                    //         (value, textContext) => {
                    //             if (
                    //                 value == null ||
                    //                 value == "" ||
                    //                 value == 0 ||
                    //                 isNaN(value)
                    //             ) {
                    //                 return true;
                    //             } else {
                    //                 return false;
                    //             }
                    //         }
                    //     ),
                    orderIndex: Yup.number()
                        .positive("Must be a positive number")
                        .min(0, "Min value 0.")
                        .max(99, "Max value 99")
                        .required("Required"),
                    reviewDays: Yup.number()
                        .positive("Must be a positive number")
                        .min(0, "Min value 0.")
                        .max(99, "Max value 99")
                        .required("Required"),
                })
            ),
            effectiveDateFrom: Yup.date().required("Required"),
            //.max(new Date(),'Date can not be future date.'),
            effectiveDateTo: Yup.date()
                .nullable()
                //.required("Required")
                .min(
                    Yup.ref("effectiveDateFrom"),
                    "Effective date to can't be before effective date from"
                ),
        });
    }
}

export const ApproveReview = new ApproveReviewModel();
