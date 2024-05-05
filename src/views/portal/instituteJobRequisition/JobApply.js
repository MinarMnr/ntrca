import { AuthUser } from "helpers/AuthUser";
import * as Yup from "yup";

const SUPPORTED_FORMATS = ["application/pdf"];

const FILE_SIZE = 10485760; // 10mb

class JobApplyModel {
    constructor() {
        this.instituteId = AuthUser.getInstituteId();
        this.dateOfRequisition = "";
        this.memorandumNo = "";
        this.file = "";
        this.jobRequisitionCircularId = "";
        this.instituteJobRequisitionDetailList = [
            {
                levelId: "",
                educationLevelId: "",
                subjectId: "",
                designationId: "",
                quotaId: "",
                jobType: "",
                designationStatus: "",
                numberOfRequestedSeat: "",
                numberOfVacantSeat: "",
            },
        ];
    }

    fromJson(data = {}) {
        console.log(data, "..........data");
        let obj = new JobApplyModel();

        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.instituteId = AuthUser.getInstituteId();
        obj.dateOfRequisition = data.dateOfRequisition;
        obj.memorandumNo = data.memorandumNo;
        obj.jobRequisitionCircularId = data.jobRequisitionCircularId;

        // Remove unnecessary fields from the instituteJobRequisitionDetailList
        if (data.instituteJobRequisitionDetailList) {
            obj.instituteJobRequisitionDetailList =
                data.instituteJobRequisitionDetailList.map((detail) => {
                    // Create a copy of the detail object with only the necessary fields
                    return {
                        subjectId: detail.subjectId,
                        levelId: detail.levelId,
                        designationId: detail.designationId,
                        designationStatus: detail.designationStatus,
                        jobType: detail.jobType,
                        quotaId: detail.quotaId,
                        educationLevelId: detail.educationLevelId,
                        numberOfRequestedSeat: detail.numberOfRequestedSeat,
                        numberOfVacantSeat: detail.numberOfVacantSeat,
                    };
                });
        }

        delete obj.file;
        return obj;
    }

    toString(data = {}) {
        let obj = new JobApplyModel().fromJson(data);
        return JSON.stringify(obj);
    }

    toFormData(obj = {}) {
        let data = new FormData();
        data.append(
            "InstituteJobRequisitionRequest",
            new JobApplyModel().toString(obj)
        );
        return data;
    }

    validation() {
        return Yup.object().shape({
            memorandumNo: Yup.string().required("Required"),
            dateOfRequisition: Yup.date()
                .required("Required")
                .max(new Date(), "Date must be before current date"),
            instituteJobRequisitionDetailList: Yup.array().of(
                Yup.object().shape({
                    numberOfRequestedSeat: Yup.number()
                        .typeError("Must be a number")
                        .when(["levelId", "numberOfVacantSeat"], {
                            is: (levelId, numberOfVacantSeat) => !!levelId, // Condition to check if levelId is present
                            then: Yup.number()
                                .required(
                                    "Number of requested seats is required"
                                )
                                .min(0, "Must be greater than or equal to 0")
                                .test({
                                    name: "maxVacantSeats",
                                    message:
                                        "Must be less than or equal to the number of vacant seats",
                                    test: function (value, context) {
                                        const numberOfVacantSeat =
                                            context.parent.numberOfVacantSeat;
                                        return value <= numberOfVacantSeat;
                                    },
                                }),
                            otherwise: Yup.number().required(
                                "Select Institute Type First"
                            ), // Validation when levelId is not selected
                        }),

                    levelId: Yup.string().required("Required"),
                    subjectId: Yup.string().required("Required"),
                    designationId: Yup.string().required("Required"),
                    quotaId: Yup.string().required("Required"),
                    jobType: Yup.string().required("Required"),
                    // numberOfVacantSeat: Yup.number()
                    //     .typeError("Must be a number")
                    //     .required("Required")
                    //     .min(0, "Must be greater than or equal to 0"),
                })
            ),
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
            memorandumNo: Yup.string().required("Required"),
            dateOfRequisition: Yup.date()
                .required("Required")
                .max(new Date(), "Date must be before current date"),
            file: Yup.mixed()
                .test("fileFormat", "Unsupported Format", (value) => {
                    if (!value?.type) return true;
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

export const JobApply = new JobApplyModel();
