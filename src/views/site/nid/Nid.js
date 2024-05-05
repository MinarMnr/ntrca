import * as Yup from "yup";

class NidModel {
  /**
   * Model properties
   */
  constructor() {
    this.rollNo = "";
    this.examBatchId = "";
    this.nidNew = "";
    this.feedbackOption = 0;
  }

  /**
   * Get model instance from json
   */
  fromJson(data = {}) {
    let obj = new NidModel();
    if (data.id !== undefined && data.id) {
      obj.id = data.id;
    }
    obj.rollNo = data.rollNo ?? "";
    obj.examBatchId = data.examBatchId ?? "";
    obj.nidNew = data.nidNew ?? "";

    return obj;
  }

  /**
   * Get string from model instance
   */
  toString(data = {}) {
    let obj = new NidModel().fromJson(data);
    return JSON.stringify(obj);
  }

  /**
   * Validator schema
   */
  validator() {
    return Yup.object().shape({
      rollNo: Yup.string().required(),
      examBatchId: Yup.string().required(),
    });
  }
}

export const Nid = new NidModel();
