import * as Yup from "yup";
import moment from "moment";

class MpoTeacherRegulationModel {
    constructor() {
        this.postSubjectIdDtoList = [];
        this.postId = "";
        this.instituteTypeId = "";
        this.educationLevelId = "";
        this.govtRegulationId = "";
        this.salaryGradeId = "";
        this.maxAllowedThirdClass = "";
        this.maxAllowedThirdClassWithoutLastDegree = "";
        this.religion = "NONE";
        this.technicalStatus = "NONE";
        //this.educationRecruitmentDegreeSubjectDetails = [];
        this.educationRecruitmentDegreeSubjectDetails = [
            {
                id: "",
                educationDegreeId: "",
                degreeSubjectIds: [],
                degreeDurationYear: "",
                minDivisionClass: "",
                cgpa: "",
                boardId: "",
                departmentIdOrGroupId: "",
                isRecognizedUniInstRequired: "",
                isRecognizedBoardRequired: "",
                isDegreeEqv: "",
                tradeId: "",
                subjectDetailParentId: "",
                additionalDetails: [
                    {
                        id: "",
                        educationDegreeId: "",
                        degreeSubjectId: "",
                        isRecognizedUniInstRequired: "",
                        degreeDurationYear: "",
                        boardId: "",
                        minDivisionClass: "",
                        cgpa: "",
                        departmentIdOrGroupId: "",
                        isRecognizedBoardRequired: "",
                        tradeId: "",
                        isAndOr: "NONE",
                    },
                ],
                professionalQualificationDetails: [
                    {
                        id: "",
                        ntrcaProfessionalQualificationId: "",
                        boardId: "",
                        degreeDurationYear: "",
                        isRecognizedBoardRequired: "",
                        isAndOr: "NONE",
                        eduRecProQuaDetailParentId: "",
                    },
                ],
                preferableList: [
                    {
                        id: "",
                        ntrcaProfessionalQualificationId: "",
                        boardId: "",
                        degreeDurationYear: "",
                        isRecognizedBoardRequired: "",
                    },
                ],
            },
        ];

        this.experienceRequirementDetails = [
            {
                id: "",
                postSubjectEducationLevelMappingId: "",
                isMpoExperience: "",
                experienceYearMin: "",
                experienceYearMinTotal: "",
                experienceYearMinWithIndex: "",
                experienceYearMinWithMpo: "",
                maxAgeLimit: "",
                experienceType: "NONE",
                isAgeRelaxedForSimilarDesignationHolder: "",
                isIndexHolder: "",
                additionalDetailList: [
                    {
                        id: 0,
                        postSubjectEducationLevelMappingId: "",
                        isMpoExperience: "",
                        experienceYearMin: "",
                        experienceYearMinTotal: "",
                        experienceYearMinWithIndex: "",
                        experienceYearMinWithMpo: "",
                        maxAgeLimit: "",
                        experienceType: "NONE",
                        isAgeRelaxedForSimilarDesignationHolder: "",
                        isIndexHolder: "",
                        isAndOr: "NONE",
                    },
                ],
            },
        ];
    }

    fromJson(data = {}, formType) {
        let obj = new MpoTeacherRegulationModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }
        obj.postSubjectIdDtoList = data.postSubjectIdDtoList ?? "";
        obj.postId = data.postId ?? "";

        obj.instituteTypeId = data.instituteTypeId ?? "";
        obj.educationLevelId = data.educationLevelId ?? "";
        obj.govtRegulationId = data.govtRegulationId ?? "";

        obj.salaryGradeId = data.salaryGradeId ?? "";
        obj.maxAllowedThirdClass = data.maxAllowedThirdClass ?? "";
        obj.maxAllowedThirdClassWithoutLastDegree =
            data.maxAllowedThirdClassWithoutLastDegree ?? "";

        obj.religion = data.religion ? data.religion : "NONE";
        obj.technicalStatus = data.technicalStatus
            ? data.technicalStatus
            : "NONE";

        if (
            data.educationRecruitmentDegreeSubjectDetails &&
            Array.isArray(data.educationRecruitmentDegreeSubjectDetails) ===
                true &&
            formType == "add"
        ) {
            obj.educationRecruitmentDegreeSubjectDetails =
                data?.educationRecruitmentDegreeSubjectDetails.map((item) => {
                    return {
                        ...item,
                        degreeSubjectIds:
                            typeof item?.degreeSubjectIds != "object"
                                ? JSON.parse(item?.degreeSubjectIds).map(
                                      (childItem) => {
                                          return {
                                              ...childItem,
                                              id: parseInt(childItem.id),
                                              subjectName:
                                                  childItem.subjectName,
                                          };
                                      }
                                  )
                                : [],

                        additionalDetails: item?.additionalDetails.map(
                            (childItem) => {
                                return {
                                    ...childItem,
                                };
                            }
                        ),

                        professionalQualificationDetails:
                            item?.professionalQualificationDetails.map(
                                (childItem) => {
                                    return {
                                        ...childItem,
                                    };
                                }
                            ),

                        preferableList: item?.preferableList.map(
                            (childItem) => {
                                return {
                                    ...childItem,
                                };
                            }
                        ),
                    };
                });
        } else if (
            data.educationRecruitmentDegreeSubjectDetails &&
            Array.isArray(data.educationRecruitmentDegreeSubjectDetails) ===
                true
        ) {
            obj.educationRecruitmentDegreeSubjectDetails =
                data?.educationRecruitmentDegreeSubjectDetails &&
                data?.educationRecruitmentDegreeSubjectDetails?.length > 0 &&
                data?.educationRecruitmentDegreeSubjectDetails.map((item) => {
                    return {
                        ...item,
                        degreeSubjectIds:
                            typeof item?.degreeSubjectIds != "object"
                                ? JSON.parse(item?.degreeSubjectIds).map(
                                      (childItem) => {
                                          return {
                                              ...childItem,
                                              id: parseInt(childItem.id),
                                              subjectName:
                                                  childItem.subjectName,
                                          };
                                      }
                                  )
                                : item?.degreeSubjectIds.map((childItem) => {
                                      return {
                                          ...childItem,
                                          id: parseInt(childItem.id),
                                          subjectName: childItem.subjectName,
                                      };
                                  }),

                        additionalDetails: item?.additionalDetails.map(
                            (childItem) => {
                                return {
                                    ...childItem,
                                };
                            }
                        ),

                        professionalQualificationDetails:
                            item?.professionalQualificationDetails.map(
                                (childItem) => {
                                    return {
                                        ...childItem,
                                    };
                                }
                            ),

                        preferableList: item?.preferableList.map(
                            (childItem) => {
                                return {
                                    ...childItem,
                                };
                            }
                        ),
                    };
                });
        }

        if (
            data.experienceRequirementDetails &&
            Array.isArray(data.experienceRequirementDetails) === true
        ) {
            obj.experienceRequirementDetails =
                data?.experienceRequirementDetails.map((item) => {
                    return {
                        ...item,

                        additionalDetailList: item?.additionalDetailList.map(
                            (childItem) => {
                                return {
                                    ...childItem,
                                };
                            }
                        ),
                    };
                });
        }

        return obj;
    }

    toString(data = {}) {
        let obj = new MpoTeacherRegulationModel().fromJson(data);
        return JSON.stringify(obj);
    }

    validation() {
        return Yup.object().shape({
            //postSubjectIdDtoList: Yup.number().required("Required"),
            postId: Yup.number().required("Required"),
            instituteTypeId: Yup.number().required("Required"),
            educationLevelId: Yup.number().required("Required"),
            govtRegulationId: Yup.number().required("Required"),
            salaryGradeId: Yup.number().required("Required"),
            // maxAllowedThirdClass: Yup.string().required("Required"),
            // maxAllowedThirdClassWithoutLastDegree: Yup.number().required("Required"),
        });
    }
}

export const MpoTeacherRegulation = new MpoTeacherRegulationModel();
