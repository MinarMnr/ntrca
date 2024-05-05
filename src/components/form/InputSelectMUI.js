import { FormGroup, MenuItem, Select } from "@mui/material";
import { useField } from "formik/dist/index";
import React from "react";

const InputSelectMUI = ({
  label,
  required,
  data,
  value,
  text,
  onChange,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <FormGroup>
        {label !== undefined && (
          <label>
            {label}{" "}
            {required && (
              <abbr style={{ color: "red" }} className="req">
                *
              </abbr>
            )}
          </label>
        )}
        <Select
          {...field}
          sx={{ backgroundColor: "white", border: "0" }}
          variant="standard"
          className={`form-control ${
            meta.touched && meta.error ? "is-invalid" : ""
          }`}
        >
          <MenuItem value="" key="">
            নির্বাচন করুন {label}
          </MenuItem>
          {data !== undefined &&
            data.length > 0 &&
            data.map((item, key) => (
              <MenuItem value={item[value]} key={key}>
                {item[text]}
              </MenuItem>
            ))}
        </Select>
        <div className="invalid-feedback">{meta.error}</div>
      </FormGroup>
    </>
  );
};

export default InputSelectMUI;
