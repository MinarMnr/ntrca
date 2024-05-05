import { useField } from "formik/dist/index";
import React from "react";

const InputField = ({ label, required, ...props }) => {
  const [field, meta, onChangeEvent] = useField(props);

  const onChangeFile = (val) => {
    onChangeEvent(val);
  };
  return (
    <>
      {label !== undefined && required !== undefined ? (
        <label className="form-label">
          {label}
          <abbr style={{ color: "red" }} class="req">
            *
          </abbr>
        </label>
      ) : (
        <label className="form-label">{label} </label>
      )}
      <input
        onChange={(e) => {
          if (onChangeEvent !== undefined) {
            onChangeFile(e.target.files[0]);
          }
        }}
        {...props}
        {...field}
        className={`form-control ${meta.error ? "is-invalid" : ""}`}
        onWheel={(event) => {
          props.type == "number" ? event.currentTarget.blur() : "";
        }}
      />
      <div className="invalid-feedback">{meta.error}</div>
    </>
  );
};

export default InputField;
