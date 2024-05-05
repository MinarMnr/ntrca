class ReviewerModel {
  constructor() {
    this.reviewNote = "";
    this.reviewerId = "";
  }

  fromJson(data = {}) {
    let obj = new FormData();
    obj.reviewNote = data.reviewNote;
    obj.reviewerId = data.reviewerId;
    return obj;
  }

  toString(data = {}) {
    let obj = new ReviewerModel().fromJson(data);
    return JSON.stringify(obj);
  }
}

export const Reviewer = new ReviewerModel();
