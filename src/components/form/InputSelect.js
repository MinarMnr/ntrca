import React from "react";
import { Form } from "@themesberg/react-bootstrap";
import { useField } from "formik/dist/index";

const InputSelect = ({
  label,
  data,
  value,
  text,
  readOnly,
  required,
  labelSelect,
  otherText = "",
  onChange,
  isRequired = false,
  ...props
}) => {
  const [field, meta] = useField(props);

  if (onChange !== undefined || null) {
    return (
      <>
        <Form.Group>
          {label !== undefined && required !== undefined ? (
            <label className="form-label">
              {label}
              <abbr style={{ color: "red" }} className="req">
                *
              </abbr>
            </label>
          ) : (
            label !== undefined && <label className="form-label">{label}</label>
          )}
          <Form.Select
            disabled={readOnly}
            {...field}
            onChange={onChange}
            required={isRequired}
            className={`form-control ${meta.error ? "is-invalid" : ""}`}
          >
            <option value="" key="">
              নির্বাচন করুন {label}
            </option>
            {data !== undefined &&
              data.length > 0 &&
              data.map(
                (item, key) =>
                  (key == 0 && item[text] == "None") || (
                    <option value={item[value]} key={key}>
                      {item[text]} {otherText != "" && -item[otherText]}
                    </option>
                  )
              )}
          </Form.Select>
          <div className="invalid-feedback">{meta.error}</div>
        </Form.Group>
      </>
    );
  }
  return (
    <>
      <Form.Group>
        {label !== undefined && required !== undefined ? (
          <label className="form-label">
            {label}
            <abbr style={{ color: "red" }} className="req">
              *
            </abbr>
          </label>
        ) : (
          label !== undefined && <label className="form-label">{label}</label>
        )}

        <Form.Select
          disabled={readOnly}
          {...field}
          required={isRequired}
          className={`form-control ${meta.error ? "is-invalid" : ""}`}
        >
          <option value="" key="">
            নির্বাচন করুন
            {/* Select {labelSelect ?? label} */}
          </option>
          {data !== undefined &&
            data.length > 0 &&
            data.map(
              (item, key) =>
                (key == 0 && item[text] == "None") || (
                  <option value={item[value]} key={key}>
                    {item[text]}
                    {otherText != "" && -item[otherText]}
                  </option>
                )
            )}
        </Form.Select>
        <div className="invalid-feedback">{meta.error}</div>
      </Form.Group>
    </>
  );
};

export default InputSelect;
