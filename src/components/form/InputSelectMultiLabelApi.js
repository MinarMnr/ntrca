import { Form } from "@themesberg/react-bootstrap";
import { useField } from "formik/dist/index";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../reducers/apiSlice";

const InputSelectMultiLabelApi = ({
  label,
  operationId,
  required,
  storeName,
  value,
  text,
  altText,
  readOnly,
  onChange,
  ...props
}) => {
  const dispatch = useDispatch();

  const [field, meta] = useField(props);

  const { [storeName]: items = { data: {} } } = useSelector(selectApi);

  useEffect(() => {
    if (operationId) {
      dispatch(
        callApi({
          operationId: operationId,
          output: storeName,
          storeName: storeName || "select",
        })
      );
    }
  }, [dispatch, operationId]);

  if (onChange !== undefined) {
    return (
      <>
        <Form.Group>
          {/* {label !== undefined &&
                    <Form.Label>{label}</Form.Label>
                    } */}
          {label !== undefined && (
            <Form.Label>
              {label}
              {required && (
                <abbr style={{ color: "red" }} className="req">
                  *
                </abbr>
              )}
            </Form.Label>
          )}
          <Form.Select
            disabled={readOnly}
            {...field}
            onChange={onChange}
            className={`form-control ${
              meta.touched && meta.error ? "is-invalid" : ""
            }`}
          >
            <option value={""} key="">
              নির্বাচন করুন {label}
            </option>
            {items.data !== undefined &&
              items.data.length > 0 &&
              items.data.map((item, key) => (
                <option value={item[value]} key={key}>
                  {item[text].concat(" - ").concat(item[altText])}
                </option>
              ))}
          </Form.Select>
          <div className="invalid-feedback">{meta.error}</div>
        </Form.Group>
      </>
    );
  }

  return (
    <>
      <Form.Group>
        {label !== undefined && <Form.Label>{label}</Form.Label>}
        <Form.Select
          disabled={readOnly}
          {...field}
          className={`form-control ${
            meta.touched && meta.error ? "is-invalid" : ""
          }`}
        >
          <option defaultValue key="">
            নির্বাচন করুন {label}
          </option>
          {items.data !== undefined &&
            items.data.length > 0 &&
            items.data.map((item, key) => (
              <option value={item[value]} key={key}>
                {item[text[0]]}{" "}
              </option>
            ))}
        </Form.Select>
        <div className="invalid-feedback">{meta.error}</div>
      </Form.Group>
    </>
  );
};

export default InputSelectMultiLabelApi;
