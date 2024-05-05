import * as Yup from "yup";
import moment from "moment";

// const SUPPORTED_FORMATS = [
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     "application/vnd.ms-excel",
// ];
const SUPPORTED_FORMATS = ["application/pdf"];

const FILE_SIZE = 500000; // 500kb

const SUPPORTED_FORMATS_IMAGE = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
];

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

class TeacherRejoiningModel {
    /**
     * Model properties
     */
    constructor() {
        this.employeeNameBn = "";
        this.employeeName = "";
        this.fathersName = "";
        this.mothersName = "";
        this.gender = "";
        this.nationality = "";
        this.nid = "";
        this.birthRegNo = "";
        this.dateOfBirth = "";
        this.mobile = "";
        this.email = "";
        this.designationName = "";
        this.designationCode = "";
        this.subject = "";
        this.subjectCode = "";
        this.instituteName = "";
        this.activeInstituteId = "";
        this.ntrcaExamRollNumber = "";
        this.ntrcaExamBatch = "";
        this.employeeTypeStatus = "";
        this.religionInfo = "";
        this.isNtrca = true;
        this.joiningType = "RE_JOINING";
        this.designationStatus = "",
        this.educationLevelId = "",
        this.ntrcaStartJoiningDate = "",
        this.ntrcaLastJoiningDate = "",
        this.ntrcaJobCircularId = "",
        this.instituteTypeId = ""
    }

    /**
     * Get model instance from json
     */
    fromJson(data = {}) {
        let obj = new TeacherRejoiningModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }
        obj.employeeNameBn = data.employeeNameBn ?? "";
        obj.employeeName = data.employeeName ?? "";
        obj.fathersName = data.fathersName ?? "";
        obj.mothersName = data.mothersName ?? "";
        obj.gender = data.gender ?? "";
        obj.nationality = data.nationality ?? "";
        obj.birthRegNo = data.birthRegNo ?? "";
        obj.nid = data.nid ?? "";
        obj.dateOfBirth = data.dateOfBirth ?? "";
        obj.mobile = data.mobile ?? "";
        obj.email = data.email ?? "";
        obj.designationName = data.designationName ?? "";
        obj.designationCode = data.designationCode ?? "";
        obj.subjectName = data.subjectName ?? "";
        obj.subject = data.subject ?? "";
        obj.subjectCode = data?.subjectCode ?? "";
        obj.instituteName = data.instituteName ?? "";
        obj.activeInstituteId = data.activeInstituteId ?? "";
        obj.ntrcaExamRollNumber = data.ntrcaExamRollNumber ?? "";
        obj.ntrcaExamBatch = data.ntrcaExamBatch ?? "";
        obj.religionInfo = data.religionInfo ?? "";
        obj.isNtrca = data.isNtrca ?? "";
        obj.joiningType = data.joiningType ?? "RE_JOINING";
        obj.designationStatus = data.designationStatus ?? "";
        obj.educationLevelId = data.educationLevelId ?? "";
        obj.ntrcaStartJoiningDate = data.ntrcaStartJoiningDate ?? "";
        obj.ntrcaLastJoiningDate = data.ntrcaLastJoiningDate ?? "";
        obj.ntrcaJobCircularId = data.ntrcaJobCircularId ?? "";
        obj.instituteTypeId = data.instituteTypeId ?? "";
        // obj.employeeImage = data.employeeImage ?? "";
        // obj.nidCopy = data.nidCopy ?? "";
        // obj.joiningLetter = data.joiningLetter ?? "";
        return obj;
    }

    /**
     * Get string from model instance
     */
    toString(data = {}) {
        let obj = new TeacherRejoiningModel().fromJson(data);
        return JSON.stringify(obj);
    }

    toFormData(obj = {}) {
        let data = new FormData();

        data.append("nid", obj.nid);
        data.append(
            "dateOfBirth",
            moment(obj.dateOfBirth).format("YYYY-MM-DD")
        );
        data.append("ntrcaExamRollNumber", obj.ntrcaExamRollNumber);
        data.append("ntrcaExamBatch", obj.ntrcaExamBatch);
        data.append("employeeName", obj.employeeName);
        data.append("employeeNameBn", obj.employeeNameBn);
        data.append("fathersName", obj.fathersName);
        data.append("mothersName", obj.mothersName);
        data.append("gender", obj.gender);
        data.append("nationality", obj.nationality);
        data.append("birthRegNo", obj.birthRegNo);
        data.append("mobile", obj.mobile);
        data.append("email", obj.email);
        data.append("positionType", "GENERAL");
        data.append("designationName", obj.designationName);
        data.append("designationCode", obj.designationCode);
        data.append("subject", obj?.subject);
        data.append("subjectCode", obj.subjectCode);
        data.append("religionInfo", obj.religionInfo);
        data.append("isNtrca", obj.isNtrca);
        data.append("joiningType", obj.joiningType);
        data.append("designationStatus", obj.designationStatus);
        data.append("educationLevelId", obj.educationLevelId);
        // data.append("ntrcaStartJoiningDate", obj.ntrcaStartJoiningDate);
        data.append(
            "ntrcaStartJoiningDate",
            moment(obj.ntrcaStartJoiningDate).format("YYYY-MM-DD")
        );
        // data.append("ntrcaLastJoiningDate", obj.ntrcaLastJoiningDate);
        data.append(
            "ntrcaLastJoiningDate",
            moment(obj.ntrcaLastJoiningDate).format("YYYY-MM-DD")
        );
        data.append("ntrcaJobCircularId", obj.ntrcaJobCircularId);
        data.append("instituteTypeId", obj.instituteTypeId);
        // data.append(
        //     "selectedDate",
        //     moment(obj.selectedDate).format("YYYY-MM-DD")
        // );
        data.append(
            "joiningDate",
            moment(obj.joiningDate).format("YYYY-MM-DD")
        );

        data.append("employeeTypeStatus", "TEACHING_EMPLOYEE");
        data.append("joiningTime", obj.joiningTime);
        data.append("activeInstituteId", obj.activeInstituteId);
        data.append("instituteName", obj.instituteName);
        // data.append("employeeImage.file", obj?.employeeImage);
        data.append("joiningLetter.file", obj.joiningLetter);
        // data.append("nidCopy.file", obj.nidCopy);

        return data;
    }

    /**
     * Validator schema
     */
    validator() {
        return Yup.object().shape({
            employeeName: Yup.string().required("Employee Name is required"),
            email: Yup.string()
                .email("Must be a valid email")
                .max(50)
                .required("Email is required"),
            mobile: Yup.string()
                .required("Mobile is Required")
                .matches(phoneRegExp, "Mobile number is not valid")
                .min(11, "Too short")
                .max(11, "Too long"),
            // birthRegNo: Yup.string()
            //     .required("Birth Registration Number is Required")
            //     .matches(phoneRegExp, 'Birth Registration number is not valid')
            //     .min(17, "Too short")
            //     .max(17, "Too long"),
            joiningTime: Yup.string().required("Joining Time Required"),
            instituteName: Yup.string().required("Institute Name Required"),
            // employeeImage: Yup.string().required("Employee Image Required"),
            joiningLetter: Yup.mixed()
                .required("Joining Letter is a required field")
                .test("fileFormat", "Unsupported Format", (value) => {
                    return value && SUPPORTED_FORMATS.includes(value.type);
                })
                .test(
                    "fileSize",
                    `File too large. Max file size is ${FILE_SIZE} kb`,
                    (value) => value && value.size <= FILE_SIZE
                ),
            // nidCopy: Yup.mixed()
            //     .required("Nid Copy is a required field")
            //     .test("fileFormat", "Unsupported Format", (value) => {
            //         return (
            //             value && SUPPORTED_FORMATS_IMAGE.includes(value.type)
            //         );
            //     })
            //     .test(
            //         "fileSize",
            //         `File too large. Max file size is ${FILE_SIZE} kb`,
            //         (value) => value && value.size <= FILE_SIZE
            //     ),
            // employeeImage: Yup.mixed()
            //     .required("Employee Image is required")
            //     .test(
            //         "fileSize",
            //         "File too large",
            //         (value) => value && value.size <= FILE_SIZE
            //     )
            //     .test(
            //         "fileFormat",
            //         "Unsupported Format",
            //         (value) =>
            //             value && SUPPORTED_FORMATS_IMAGE.includes(value.type)
            //     ),
        });
    }
}

export const TeacherRejoining = new TeacherRejoiningModel();
