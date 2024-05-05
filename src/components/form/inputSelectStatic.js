import React from "react";
import { Form } from "@themesberg/react-bootstrap";
import { useField } from "formik/dist/index";

const InputSelectStatic = ({
  label,
  data,
  value,
  text,
  onChange,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Form.Group>
        {label !== undefined && <Form.Label>{label}</Form.Label>}
        <Form.Select
          {...field}
          onChange={onChange}
          className={`form-control ${
            meta.touched && meta.error ? "is-invalid" : ""
          }`}
        >
          <option defaultValue key="">
            নির্বাচন করুন {label}
          </option>
          {data !== undefined &&
            data.length > 0 &&
            data.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
        </Form.Select>
        <div className="invalid-feedback">{meta.error}</div>
      </Form.Group>
    </>
  );
};

export default InputSelectStatic;
