import moment from "moment";
import * as Yup from "yup";
import JobRecommendationType from "../../../constants/JobRecommendationType";
const mobileRegEx = /^(?:\+88|0088)?(01[3-9]\d{8})$/;
const nidRegEx = /^[0-9](\d{9}|\d{12}|\d{16})$/;
const birthRegRegEx = /^[0-9]\d{16}$/;
//const banglaLang = /^[\u0980-\u09FF\s]{1,50}$/i;
const banglaLang = /^[\p{sc=Bengali},()\-\s]+$/u;
const PHOTO_SIZE = 160 * 1024;
const FILE_SIZE = 5242880; // 5 MB = 5242880 Bytes
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
class RegisterModel {
  /**
   * Model properties
   */
  constructor() {
    this.rollNo = "";
    this.registrationNo = "";
    this.dob = "";
    this.email = "";
    this.examBatchId = "";
    this.password = "";
    this.confirmPassword = "";
  }

  /**
   * Get model instance from json
   */
  fromJson(data = {}) {
    let obj = new RegisterModel();
    if (data.id !== undefined && data.id) {
      obj.id = data.id;
    }
    obj.rollNo = data.rollNo ?? "";
    obj.registrationNo = data.registrationNo ?? "";
    obj.dob = data.dob ?? "";
    obj.email = data.email ?? "";
    obj.examBatchId = data.examBatchId ?? "";
    obj.password = data.password ?? "";
    obj.confirmPassword = data.confirmPassword ?? "";

    return obj;
  }

  /**
   * Get string from model instance
   */
  toString(data = {}) {
    let obj = new RegisterModel().fromJson(data);
    return JSON.stringify(obj);
  }

  /**
   * Validator schema
   */
  validator() {
    return Yup.object().shape({
      rollNo: Yup.string().required("Required"),
      registrationNo: Yup.string().required("Required"),
      email: Yup.string().email("Email address Invalid! "),
      examBatchId: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
      dob: Yup.string().test(
        "dateOfBirth",
        "date of birth must be less then or equal today Date",
        (value) => {
          return value <= moment(new Date()).format("YYYY-MM-DD");
        }
      ),
    });
  }
}

export const Register = new RegisterModel();
