import * as Yup from "yup";
import moment from "moment";

class PayScaleModel {
    constructor() {
        this.payScaleName = "";
        this.effectiveFrom = "";
        this.effectiveTo = "";
    }

    fromJson(data = {}) {
        let obj = new PayScaleModel();
        if (data.id !== undefined && data.id) {
            obj.id = data.id;
        }

        obj.payScaleName = data.payScaleName;
        obj.effectiveFrom = data.effectiveFrom;
        obj.effectiveTo = data.effectiveTo;
        return obj;
    }

    toString(data = {}) {
        let obj = new PayScaleModel().fromJson(data);
        return JSON.stringify(obj);
    }

    validation() {
        return Yup.object().shape({
            effectiveFrom: Yup.date().required("Required"),
            effectiveTo: Yup.string()
        .required("Required")
        .when("effectiveFrom", (effectiveFrom) => {
          if (effectiveFrom) {
            return Yup.date()
              .min(effectiveFrom, "Expiry Date must be after Effective Date")
              .typeError("End Date is required");
          }
        }),
            payScaleName: Yup.string().required("Required"),
        });
    }
}

export const PayScale = new PayScaleModel();
