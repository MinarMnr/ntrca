import * as Yup from "yup";

class CircularModel {
    /**
     * Model properties
     */
    constructor() {
        this.scholarshipSessionId = "";
        this.circularTitle = "";
        this.circularBody = "";
        this.expiryDate = "";
        this.publishedDate = "";
        this.effectiveDate = "";
        this.scholarshipProgramId = "";
        this.year = "";
        this.file = "";
        this.circularNotes = "";
        this.reviewCommitteeId = "";
        this.scholarshipCircularEncloser = {};
        this.eligibleCriteria = [
            {
                scholarshipDegreeId: "",
                degreeCriteria: [
                    {
                        educationalQualificationId: "",
                        pointMinimumRequirement: "",
                        pointMinimumRequirementOutOfScoreScale: "",
                        qualificationRulesDetailNotes: "",
                    },
                ],
            },
        ];
    }

    /**
     * Get model instance from json
     */
    fromJson(data = {}) {
        let obj = new CircularModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }
        obj.scholarshipSessionId = parseInt(data.scholarshipSessionId) ?? "";
        // obj.educationLevelId =
        //   parseInt(data.educationLevelId) ?? "";
        //   obj.educationalQualificationRulesId =
        //   parseInt(data.educationalQualificationRulesId) ?? "";
        obj.circularTitle = data.circularTitle;
        // + "-" + data.year ?? ""
        obj.circularBody = data.circularBody ?? "";
        // obj.scholarshipCircularId = data.scholarshipCircularId ?? "";
        obj.publishedDate = data.publishedDate ?? "";
        obj.expiryDate = data.expiryDate ?? "";
        obj.effectiveDate = data.effectiveDate ?? "";
        obj.circularNotes = data.circularNotes ?? "";
        obj.scholarshipProgramId = parseInt(data.scholarshipProgramId) ?? 1;
        obj.year = data.year ?? "";
        obj.reviewCommitteeId = parseInt(data.reviewCommitteeId) ?? 1;
        if (data.scholarshipCircularEncloser) {
            obj.scholarshipCircularEncloser = data.scholarshipCircularEncloser;
        } else {
            delete obj.scholarshipCircularEncloser;
        }

        if (
            data.eligibleCriteria &&
            Array.isArray(data.eligibleCriteria) === true
        ) {
            obj.eligibleCriteria = data.eligibleCriteria.map((item) => {
                return {
                    ...item,
                    scholarshipDegreeId: parseInt(item.scholarshipDegreeId),
                    degreeCriteria: item.degreeCriteria.map((childItem) => {
                        return {
                            ...childItem,
                            educationalQualificationId: parseInt(
                                childItem.educationalQualificationId
                            ),
                            pointMinimumRequirement:
                                childItem.pointMinimumRequirement,
                            pointMinimumRequirementOutOfScoreScale: parseInt(
                                childItem.pointMinimumRequirementOutOfScoreScale
                            ),
                            qualificationRulesDetailNotes:
                                childItem.qualificationRulesDetailNotes,
                        };
                    }),
                };
            });
        } else {
            obj.eligibleCriteria = [
                {
                    scholarshipDegreeId: "",
                    degreeCriteria: [
                        {
                            educationalQualificationId: "",
                            pointMinimumRequirement: "",
                            pointMinimumRequirementOutOfScoreScale: "",
                            qualificationRulesDetailNotes: "",
                        },
                    ],
                },
            ];
        }

        delete obj.file;
        return obj;
    }

    /**
     * Get string from model instance
     */
    toString(data = {}) {
        let obj = new CircularModel().fromJson(data);
        return JSON.stringify(obj);
    }

    toFormData(obj = {}) {
        let data = new FormData();
        data.append("request", new CircularModel().toString(obj));
        return data;
    }

    /**
     * Validator schema
     */
    validator() {
        return Yup.object().shape({
            circularTitle: Yup.string()
                .min(3, "Too Short!")
                .max(5000, "Too Long!")
                .required("Required"),
            //    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
            circularBody: Yup.string()
                .max(5000, "Too Long!")
                .required("Required"),
            // expiryDate: Yup.string().required("Required"),
            // effectiveDate: Yup.string().required("Required"),
            reviewCommitteeId: Yup.number().required("Required"),
            scholarshipSessionId: Yup.number().required("Required"),
            year: Yup.number().required("Required"),
            scholarshipProgramId: Yup.number().required("Required"),
            eligibleCriteria: Yup.array()
                .of(
                    Yup.object().shape({
                        scholarshipDegreeId: Yup.string().required("Required"),
                        degreeCriteria: Yup.array().of(
                            Yup.object().shape({
                                educationalQualificationId:
                                    Yup.string().required("Required"),
                                pointMinimumRequirement:
                                    Yup.number().required("Required"),
                                pointMinimumRequirementOutOfScoreScale:
                                    Yup.number().required("Required"),
                                //qualificationRulesDetailNotes: Yup.string().required("Required"),
                            })
                        ),
                    })
                )
                .required("Required"),
            publishedDate: Yup.string().required("Required"),

            effectiveDate: Yup.string()
                .required("Required")
                .when("publishedDate", (publishedDate) => {
                    if (publishedDate) {
                        return Yup.date()
                            .min(
                                publishedDate,
                                "Effective Date must be after Published Date"
                            )
                            .typeError("End Date is required");
                    }
                }),
            expiryDate: Yup.string()
                .required("Required")
                .when("effectiveDate", (effectiveDate) => {
                    if (effectiveDate) {
                        return Yup.date()
                            .min(
                                effectiveDate,
                                "Expiry Date must be after Effective Date"
                            )
                            .typeError("End Date is required");
                    }
                }),
        });
    }
}

export const Circular = new CircularModel();
