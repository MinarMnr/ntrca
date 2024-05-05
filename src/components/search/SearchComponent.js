import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi } from "../../reducers/apiSlice";
import { useField, FieldArray } from "formik/dist/index";

export default function ComboBox({
  operationId,
  storeName,
  title,
  value,
  onChange,
  name,
  setField,
  allValue,
  isMultiple,
  formType = "add",
  ...props
}) {
  const dispatch = useDispatch();
  const [field] = useField(props);
  const { [storeName]: items = { data: {} } } = useSelector(selectApi);

  React.useEffect(() => {
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
  var optionList = [];
  if (items.data !== undefined && items.data.length > 0) {
    optionList = items.data;
  }

  const [inputValue, setInputValue] = React.useState("");

  const myOption = optionList.filter((item) => {
    return item.id === allValue[`${name}`];
  });
  var multipleValueBind = [];
  if (
    formType === "edit" &&
    isMultiple &&
    allValue[`${name}`] !== undefined &&
    allValue[`${name}`] !== null &&
    JSON.parse(allValue[`${name}`]).length > 0
  ) {
    // Do not compare type check --- MnR
    JSON.parse(allValue[`${name}`]).map((item1) => {
      multipleValueBind.push(
        optionList.find((item) => {
          return item.id == item1;
        })
      );
    });
  }
  const defaultProps = {
    options: optionList,
    getOptionLabel: (option) => option[`${title}`] || "",
    inputValue: inputValue,
  };

  return (
    <>
      {optionList.length > 0 ? (
        (formType === "edit" && myOption.length > 0) ||
        (isMultiple && multipleValueBind.length > 0) ? (
          <Autocomplete
            {...defaultProps}
            defaultValue={isMultiple === true ? multipleValueBind : myOption[0]}
            multiple={isMultiple ? true : false}
            onChange={(e, value) => {
              if (value !== null) {
                if (isMultiple && value.length > 0) {
                  let newValue = [];

                  value.forEach((item, index) => {
                    newValue.push(`${item.id}` || "");
                  });
                  setField(`${name}`, JSON.stringify(newValue));
                } else {
                  isMultiple !== true && setField(`${name}`, value && value.id);
                }
              }
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id={name}
            renderInput={(params) => (
              <TextField {...field} onChange={onChange} {...params} />
            )}
          />
        ) : formType === "add" ? (
          <Autocomplete
            {...defaultProps}
            //value={isMultiple === true ? multipleValueBind : myOption[0]}
            defaultValue={isMultiple === true ? multipleValueBind : myOption[0]}
            multiple={isMultiple ? true : false}
            onChange={(e, value) => {
              if (isMultiple) {
                let newValue = [];

                value.forEach((item, index) => {
                  newValue.push(`${item.id}` || "");
                });
                setField(`${name}`, JSON.stringify(newValue));
              } else {
                setField(`${name}`, value && value.id);
              }
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="combo-box-demo"
            renderInput={(params) => (
              <TextField {...field} onChange={onChange} {...params} />
            )}
          />
        ) : (
          <select className="form-control">
            <label>Select {name}</label>
            <option>No Option</option>
          </select>
        )
      ) : (
        <select className="form-control">
          <label>Select {name}</label>
          <option>No Option</option>
        </select>
      )}
    </>
  );
}
