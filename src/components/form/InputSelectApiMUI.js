import { FormGroup, MenuItem, Select } from "@mui/material";
import { useField } from "formik/dist/index";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../reducers/apiSlice";
const InputSelectApiMUI = ({
  label,
  required,
  operationId,
  storeName,
  value,
  text,
  onChange,
  isDisabled = false,
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
            onChange={onChange}
            className={`form-control ${
              meta.touched && meta.error ? "is-invalid" : ""
            }`}
            disabled={isDisabled}
          >
            <MenuItem value="" key="">
              নির্বাচন করুন {label}
            </MenuItem>
            {items.data !== undefined &&
              items.data.length > 0 &&
              items.data.map((item, key) => {
                <MenuItem value={item[value]} key={key}>
                  {item[text]}
                </MenuItem>;
              })}
          </Select>
          <div className="invalid-feedback"> {meta.error}</div>
        </FormGroup>
      </>
    );
  }

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
          <MenuItem value="">নির্বাচন করুন {label}</MenuItem>
          {items.data !== undefined &&
            items.data.length > 0 &&
            items.data.map((item, key) => {
              return (
                <MenuItem value={item[value]} key={key}>
                  {item[text]}
                </MenuItem>
              );
            })}
        </Select>
        <div className="invalid-feedback">{meta.error}</div>
      </FormGroup>
    </>
  );
};
export default InputSelectApiMUI;
