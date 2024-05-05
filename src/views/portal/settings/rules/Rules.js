import { REQUIRED } from "constants/Message";
import * as Yup from "yup";
const SUPPORTED_FORMATS = ["application/pdf"];
const FILE_SIZE = 10485760; // 10mb
const banglaLang = /^[\p{sc=Bengali},()\-\s]+$/u;
const englishLang = /^[A-Za-z0-9,/&()\-.\s]+$/;
class RulesModel {
    constructor() {
        this.ruleName = "";
        this.ruleNameBn = "";
        this.ruleValidFrom = "";
        this.isReligionSpecificTeacherForReligionSubject = false;
        this.isPhysicalEducationTeacherGenderSpecificOnly = false;
        this.isAgeFlexibleForIndexHolder = false;
        this.geographicalPositionNoQuotaList = [];
        this.areaStatusList = [
            {
                areaStatusId: "",
                percentageFemale: "",
            },
        ];
        this.educationLevelWisePriorityList = [
            {
                educationLevelId: "",
                orderIndex: "",
            },
        ];
    }

    fromJson(data = {}) {
        let obj = new RulesModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.ruleName = data.ruleName ?? "";
        obj.ruleNameBn = data.ruleNameBn ?? "";
        obj.ruleValidFrom = data.ruleValidFrom ?? "";
        obj.isReligionSpecificTeacherForReligionSubject =
            data.isReligionSpecificTeacherForReligionSubject;
        obj.isPhysicalEducationTeacherGenderSpecificOnly =
            data.isPhysicalEducationTeacherGenderSpecificOnly;
        obj.isAgeFlexibleForIndexHolder = data.isAgeFlexibleForIndexHolder;
        obj.geographicalPositionNoQuotaList =
            data.geographicalPositionNoQuotaList ?? [];
        delete obj.file;

        if (obj.areaStatusList && Array.isArray(data.areaStatusList) === true) {
            obj.areaStatusList = data.areaStatusList.map((item, index) => {
                return { ...item };
            });
        }

        if (
            obj.educationLevelWisePriorityList &&
            Array.isArray(data.educationLevelWisePriorityList) === true
        ) {
            obj.educationLevelWisePriorityList =
                data.educationLevelWisePriorityList.map((item, index) => {
                    return { ...item };
                });
        }

        return obj;
    }
    fromJsonEdit(data = {}) {
        let obj = new RulesModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.ruleName = data.ruleName ?? "";
        obj.ruleNameBn = data.ruleNameBn ?? "";
        obj.ruleValidFrom = data.ruleValidFrom ?? "";
        obj.isReligionSpecificTeacherForReligionSubject =
            data.isReligionSpecificTeacherForReligionSubject;
        obj.isPhysicalEducationTeacherGenderSpecificOnly =
            data.isPhysicalEducationTeacherGenderSpecificOnly;
        obj.isAgeFlexibleForIndexHolder = data.isAgeFlexibleForIndexHolder;
        obj.geographicalPositionNoQuotaList =
            data?.geographicalPositionNoQuotaList ?? [];

        obj.areaStatusList = data?.areaStatusList ?? [];
        obj.educationLevelWisePriorityList =
            data?.educationLevelWisePriorityList ?? [];

        obj.encloserUrl = data.encloserUrl ?? "";

        return obj;
    }

    toString(data = {}) {
        let obj = new RulesModel().fromJson(data);
        return JSON.stringify(obj);
    }
    toStringEdit(data = {}) {
        let obj = new RulesModel().fromJsonEdit(data);
        return JSON.stringify(obj);
    }
    toFormData(obj = {}) {
        let data = new FormData();
        data.append(
            "jobApplicationRuleSaveRequest ",
            new RulesModel().toString(obj)
        );
        return data;
    }
    toFormDataEdit(obj = {}) {
        let data = new FormData();
        data.append(
            "jobApplicationRuleUpdateRequest",
            new RulesModel().toStringEdit(obj)
        );
        return data;
    }

    validation() {
        return Yup.object().shape({
            ruleName: Yup.string()
                .matches(englishLang, "PLease type in English")
                .required("Required"),
            ruleNameBn: Yup.string()
                .matches(banglaLang, "Please type in Bangla")
                .typeError(REQUIRED)
                .required("Required"),
            ruleValidFrom: Yup.string().required("Required"),

            // isReligionSpecificTeacherForReligionSubject: Yup.boolean().oneOf(
            //     [true],
            //     "You need to accept the terms and conditions"
            // ),
            // isPhysicalEducationTeacherGenderSpecificOnly: Yup.boolean().oneOf(
            //     [true],
            //     "You need to accept the terms and conditions"
            // ),
            // isAgeFlexibleForIndexHolder: Yup.boolean().oneOf(
            //     [true],
            //     "You need to accept the terms and conditions"
            // ),

            areaStatusList: Yup.array().of(
                Yup.object().shape({
                    areaStatusId: Yup.number().required("Required"),
                    percentageFemale: Yup.number().required("Required"),
                })
            ),
            educationLevelWisePriorityList: Yup.array().of(
                Yup.object().shape({
                    educationLevelId: Yup.number().required("Required"),
                    orderIndex: Yup.number().required("Required"),
                })
            ),
            // geographicalPositionNoQuotaList: Yup.array().of(
            //     Yup.object().shape({
            //         geographicalPositionId: Yup.number().required("Required"),
            //     })
            // ),
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

export const Rules = new RulesModel();
