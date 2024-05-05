import { Form } from "@themesberg/react-bootstrap";
import { useField } from "formik/dist/index";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../reducers/apiSlice";

const InputSelectApi = ({
  label,
  operationId,
  required,
  storeName,
  readOnly,
  value,
  text,
  onChange,
  otherText = "",
  ...props
}) => {
  const dispatch = useDispatch();

  const [field, meta] = useField(props);

  const storeNameWithField = storeName + field?.name;

  const { [storeNameWithField]: items = { data: {} } } = useSelector(selectApi);


  useEffect(() => {
    if (operationId) {
      dispatch(
        callApi({
          operationId: operationId,
          output: storeNameWithField,
          storeName: storeNameWithField || "select",
        })
      );
    }
  }, [dispatch, operationId, storeNameWithField]);

  if (onChange !== undefined || null) {
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
            <option value="" key="">
              নির্বাচন করুন {label}
            </option>
            {items.data !== undefined &&
              items.data.length > 0 &&
              items.data.map(
                (item, key) =>
                  (key == 0 &&
                    (item[text] == "None" || item[text] == "কোনোটিই নয়")) || (
                    <option value={item[value]} key={key}>
                      {item[text]?.replace(/_/g, " ")}{" "}
                      {otherText != "" && item[otherText]
                        ? -item[otherText]
                        : ""}
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
        {label !== undefined && (
          <Form.Label>
            {label}{" "}
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
          className={`form-control ${
            meta.touched && meta.error ? "is-invalid" : ""
          }`}
        >
          <option value="" key="">
            নির্বাচন করুন {label}
          </option>
          {items.data !== undefined &&
            items.data.length > 0 &&
            items.data.map(
              (item, key) =>
                (key == 0 &&
                  (item[text] == "None" || item[text] == "কোনোটিই নয়")) || (
                  <option value={item[value]} key={key}>
                    {item[text]}
                    {otherText != "" && item[otherText] ? -item[otherText] : ""}
                  </option>
                )
            )}
        </Form.Select>
        <div className="invalid-feedback">{meta.error}</div>
      </Form.Group>
    </>
  );
};

export default InputSelectApi;
