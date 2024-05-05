import { useField } from "formik/dist/index";
import React from 'react';




const InputDate = ({label,  ...props}) => {
  
  const [field, meta] = useField(props);

  
  return (
    <>
      {label !== undefined &&
      <label className="form-label">{label}</label>
      }
      <input {...field} type="date" onChange={props.Onchange}   className={`form-control ${meta.touched && meta.error ? 'is-invalid' : ''}`}/>
    </>
  );
  
};

export default InputDate;