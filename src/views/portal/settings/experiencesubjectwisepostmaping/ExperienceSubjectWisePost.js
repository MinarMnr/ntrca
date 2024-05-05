import * as Yup from "yup";

class ExperienceSubjectWisePost {
    constructor() {
        this.instituteTypeId = "";
        this.educationLevelId = "";
        this.postId = "";
        this.subjectId = "";
    }

    fromJson(data = {}) {
        let obj = new ExperienceSubjectWisePost();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }
        obj.instituteTypeId = data.instituteTypeId ?? "";
        obj.educationLevelId = data.educationLevelId ?? "";
        obj.postId = data.postId ?? "";
        obj.subjectId = data.subjectId ? data.subjectId : 1;

        return obj;
    }

    toString(data = {}) {
        let obj = new ExperienceSubjectWisePost().fromJson(data);
        return JSON.stringify(obj);
    }

    validation() {
        return Yup.object().shape({
            instituteTypeId: Yup.string().required("Required"),
            educationLevelId: Yup.string().required("Required"),
            postId: Yup.string().required("Required"),
            //subjectId: Yup.string().required("Required"),
        });
    }
}

export const ExperienceSubjectWisePostConstructor =
    new ExperienceSubjectWisePost();
