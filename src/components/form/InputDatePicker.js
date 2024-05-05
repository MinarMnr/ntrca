import React, { useState } from "react";
import { useField } from "formik/dist/index";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputDatePicker = ({
  dataValue,
  setField,
  disabled = false,
  showTime = false,
  label,
  ...props
}) => {
  const [field, meta] = useField(props);
  const [data, setData] = useState("");
  const { name } = { ...props };
  const [status, setStatus] = useState(true);

  let setValue = "";
  if (data === "" && status === false) {
    setValue = "";
  } else if (data === "" && dataValue === "" && status === true) {
    setValue = "";
  } else if (dataValue === "" && status === true) {
    setValue = "";
  } else {
    setValue = showTime
      ? moment(dataValue).format("DD/MM/yyyy  h:mm a")
      : moment(dataValue).format("DD/MM/yyyy");
  }

  const handleBlur = () => {
    if (data === "" || moment(data, "DD/MM/yyyy", true).isValid()) {
      setStatus(false);
      return;
    }
    setStatus(true);
  };

  return (
    <>
      {label !== undefined ? (
        <label className="form-label">
          {label}
          <abbr style={{ color: "red" }} className="req">
            *
          </abbr>
        </label>
      ) : (
        <label className="form-label">{label} </label>
      )}
      <DatePicker
        disabled={disabled}
        dateFormat={showTime ? "dd/MM/yyyy h:mm aa" : "dd/MM/yyyy"} 
        selected={data}
        dropdownMode="select"
        showMonthDropdown
        showYearDropdown
        adjustDateOnChange
        showTimeSelect={showTime ? true : false}
        onChange={(date) => {
          setData(date == null ? "" : date);
          if (date == null) {
            setField(`${name}`, "");
          } else {
            showTime
              ? setField(`${name}`, moment(date).format("YYYY-MM-DD HH:mm"))
              : setField(`${name}`, moment(date).format("YYYY-MM-DD"));
          }
          setStatus(false);
        }}
        onBlur={handleBlur}
        placeholderText={showTime ? "DD/MM/YYYY HH:MM" : "DD/MM/YYYY"}
        value={setValue === "Invalid date" ? "" : setValue}
        isClearable={disabled === true ? false : true}
        
        className={`form-control ${status ? "" : ""}`}
      />

      {meta.error && <div className="no-fill-warning text-danger">{meta.error}</div>}
    </>
  );
};

export default InputDatePicker;
