import React from "react";
import { useField } from "formik/dist/index";

const InputFieldFile = ({ label, ...props }) => {
  const [field, meta, onChangeEventFile] = useField(props);
  const onChangeFile = (val) => {
    onChangeEventFile(val);
  };

  return (
    <>
      {label !== undefined && <label className='form-label'>{label}</label>}
      <input
        onChange={(e) => {
          onChangeFile(e.target.files[0]);
        }}
        {...props}
        {...field}
        className={`form-control ${
          meta.touched && meta.error ? "is-invalid" : ""
        }`}
      />
      <div className='invalid-feedback'>{meta.error}</div>
    </>
  );
};

export default InputFieldFile;
