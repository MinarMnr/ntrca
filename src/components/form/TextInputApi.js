import { Form } from "@themesberg/react-bootstrap";
import { useField } from "formik/dist/index";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../reducers/apiSlice";

const TextInputApi = ({
  label,
  operationId,
  required,
  storeName,
  readOnly,
  valueKey,
  onChange,
  ...props
}) => {
  const dispatch = useDispatch();

  const [field, meta] = useField(props);

  const { [storeName]: storeData = { data: {} } } = useSelector(selectApi);

  const numericValue = storeData.data[valueKey];

  useEffect(() => {
    if (numericValue !== undefined && onChange) {
      onChange(numericValue);
    }
  }, [numericValue, onChange]);

  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <Form.Group>
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
        <input
          type="number" // Use type "number" for numeric input
          //disabled={readOnly}
          {...props}
          {...field}
          onChange={onChange}
          className={`form-control ${
            meta.touched && meta.error ? "is-invalid" : ""
          }`}
          //value={numericValue !== undefined ? numericValue : ""} // Set the numeric value directly
          //   defaultValue={numericValue !== undefined ? numericValue : ""}
        />
        {isLoading ? <p>Loading...</p> : null}
        <div className="invalid-feedback">{meta.error}</div>
      </Form.Group>
    </>
  );
};

export default TextInputApi;
