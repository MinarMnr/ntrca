import { useField } from "formik/dist/index";
import React from "react";
import "./form.scss";

const InputFieldNumber = ({
  label,
  customWidth = "w-70",
  alignment = "text-center",
  isDisabled = false,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      {label !== undefined && <label className="form-label">{label}</label>}
      <input
        disabled={isDisabled}
        // type="number"
        style={{
          display: "inline-block",
        }}
        {...props}
        {...field}
        className={`${customWidth} ${alignment} form-control  ${
          meta.touched && meta.error ? "is-invalid" : ""
        }`}
      />
      <div className="invalid-feedback">{meta.error}</div>
    </>
  );
};

export default InputFieldNumber;
