import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useField } from "formik/dist/index";
export default function BasicTextFields({label, ...props }) {
    const [field, meta,onChangeEvent] = useField(props);
    const onChangeFile = (event) => {
        const { target: { name, value } } = event;
        onChangeEvent(value);
    };
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic"  variant="outlined" onChange={onChangeFile}   
            className={`form-control ${
                meta.touched && meta.error ? "is-invalid" : ""
              }`} {...props} {...field}/>
        </Box>
    );
}