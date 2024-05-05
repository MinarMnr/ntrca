import * as Yup from "yup";

const SUPPORTED_FORMATS = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
];

const FILE_SIZE = 50000000; // 50mb

class CertifiedApplicantModel {
    constructor() {
        this.file = "";
        this.examBatchId = "";
        this.educationFile = "";
        this.educationQualification = "";
    }

    fromJson(data = {}) {
        let obj = new CertifiedApplicantModel();
        obj.file = data.file;
        obj.educationFile = data.educationFile;
        obj.educationQualification = data.educationQualification;
        return obj;
    }

    toString(data = {}) {
        let obj = new CertifiedApplicantModel().fromJson(data);
        return JSON.stringify(obj);
    }

    toFormData(obj = {}) {
        let data = new FormData();
        data.append("file", obj?.file ?? null);
        data.append("educationFile", obj?.educationFile ?? null);
        data.append(
            "educationQualification",
            obj?.educationQualification ?? null
        );
        return data;
    }

    validation() {
        return Yup.object().shape({
            examBatchId: Yup.string().required("Required"),
            file: Yup.mixed()
                .required("File is a required field")
                .test("fileFormat", "Unsupported Format", (value) => {
                    return value && SUPPORTED_FORMATS.includes(value.type);
                })
                .test(
                    "fileSize",
                    `File too large. Max file size is ${FILE_SIZE} kb`,
                    (value) => value && value.size <= FILE_SIZE
                ),
            educationFile: Yup.mixed()
                .required("File is a required field")
                .test("fileFormat", "Unsupported Format", (value) => {
                    return value && SUPPORTED_FORMATS.includes(value.type);
                })
                .test(
                    "fileSize",
                    `File too large. Max file size is ${FILE_SIZE} kb`,
                    (value) => value && value.size <= FILE_SIZE
                ),
        });
    }
}

export const CertifiedApplicant = new CertifiedApplicantModel();
