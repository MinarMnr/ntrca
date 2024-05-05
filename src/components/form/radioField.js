import React from 'react';
import {useField} from "formik/dist/index";
import { Form } from '@themesberg/react-bootstrap';

const RadioField = ({data, value, text, onChange, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <>
      {
        data.map((item, index) => {
          if (index === 0) {
            return <Form.Check type="radio" {...props} {...field}
                               key={index}
                               id={props.name + index}
                               value={item[value]}
                               label={item[text]}
                               onChange={onChange}
            />
          }
          return <Form.Check type="radio" {...props} {...field}
                             key={index}
                             value={item[value]}
                             label={item[text]}
                             onChange={onChange}/>
        })
      }
      <div className="invalid-feedback">{meta.error}</div>
    </>
  );
  
};

export default RadioField;