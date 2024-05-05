import React from "react";
import { useField } from "formik/dist/index";
import { Form } from "@themesberg/react-bootstrap";

const InputTextArea = ({
  label,
  required = false,
  readOnly = false,
  isDisabled = false,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Form.Group className="mb-3">
        {label !== undefined && (
          <label className="form-label">
            {label}
            {required && (
              <abbr style={{ color: "red" }} className="req">
                *
              </abbr>
            )}
          </label>
        )}
        <Form.Control
          as="textarea"
          rows="3"
          {...field}
          readOnly={readOnly}
          disabled={isDisabled}
          className={`form-control ${
            meta.touched && meta.error ? "is-invalid" : ""
          }`}
        />
        <div className="invalid-feedback">{meta.error}</div>
      </Form.Group>
    </>
  );
};

export default InputTextArea;
