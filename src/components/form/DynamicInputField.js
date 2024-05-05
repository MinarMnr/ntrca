import React, { useState, useEffect } from "react";

const DynamicInputField = ({ label, name, type, defaultValue, disabled }) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      {label && (
        <label className="form-label">
          {label}
          {label && disabled && <abbr style={{ color: "red" }} className="req">*</abbr>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`form-control`}
      />
    </div>
  );
};

export default DynamicInputField;
