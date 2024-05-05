import { TextField } from "@mui/material";
import { useField } from "formik/dist/index";
import React from "react";

const InputFieldMUI = ({ label, required, isDisabled = false, ...props }) => {
  const [field, meta, onChangeEvent] = useField(props);
  const onChangeFile = (val) => {
    onChangeEvent(val);
  };
  return (
    <>
      {label !== undefined && (
        <label className="form-label">
          {label}{" "}
          {required && (
            <abbr style={{ color: "red" }} className="req">
              *
            </abbr>
          )}
        </label>
      )}
      <TextField
        onChange={(e) => {
          if (onChangeEvent !== undefined) {
            onChangeFile(e.target.files[0]);
          }
        }}
        {...field}
        {...props}
        sx={{ border: "0" }}
        variant="standard"
        className={`form-control ${meta.touched && meta.error ? "is-invalid" : ""
          }`}
        disabled={isDisabled}
      />
      <div className="invalid-feedback">{meta.error}</div>
    </>
  );
};

export default InputFieldMUI;
