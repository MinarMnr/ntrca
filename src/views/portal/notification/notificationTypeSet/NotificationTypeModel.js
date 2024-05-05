import * as Yup from "yup";
import moment from "moment";
const banglaLang = /^[\p{sc=Bengali}\s]+$/u;
class NotificationTypeModel {
  constructor() {
    this.appModuleId = 13;
    this.notificationMessage = "";
    this.notificationMessageBn = "";
    this.notificationActionName = "";
    this.isEmailNotification = false;
    this.isPushNotification = false;
    this.isSMSNotification = false;
  }

  fromJson(data = {}) {
    let obj = new NotificationTypeModel();
    if (data.id !== undefined && data.id) {
      obj.id = data.id;
    }

    obj.appModuleId = obj.appModuleId;
    obj.notificationMessage = data.notificationMessage;
    obj.notificationMessageBn = data.notificationMessageBn;
    obj.notificationActionName = data.notificationActionName;
    obj.isEmailNotification = data.isEmailNotification;
    obj.isPushNotification = data.isPushNotification;
    obj.isSMSNotification = data.isSMSNotification;

    return obj;
  }

  toString(data = {}) {
    let obj = new NotificationTypeModel().fromJson(data);
    return JSON.stringify(obj);
  }

  validation() {
    return Yup.object().shape({
      notificationActionName: Yup.string().required("Required"),
      //notificationMessage: Yup.string().required("Required"),
      // notificationMessageBn: Yup.string().matches(
      //   banglaLang,
      //   "Please Type in Bangla"
      // ),
    });
  }
}

export const NotificationType = new NotificationTypeModel();
