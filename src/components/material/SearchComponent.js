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
  selectType = "single",
  actionTable = "",
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
    return actionTable == ""
      ? item.id === allValue[`${name}`]
      : item.id === allValue[`${actionTable}`];
  });

  const multipleValueBind = [];

  if (
    formType === "edit" &&
    isMultiple &&
    actionTable == "" &&
    allValue[`${name}`] !== undefined &&
    allValue[`${name}`] !== null &&
    allValue[`${name}`].length > 0
  ) {
    var all =
      typeof allValue[`${name}`] == "string"
        ? JSON.parse(allValue[`${name}`])
        : allValue[`${name}`];

    all.map((item1) => {
      multipleValueBind.push(
        optionList.find((item) => {
          return item.id == item1.id; // Do not compare type check --- MnR
        })
      );
    });
  } else if (
    formType === "edit" &&
    isMultiple &&
    actionTable != "" &&
    allValue[`${actionTable}`] !== undefined &&
    allValue[`${actionTable}`] !== null &&
    allValue[`${actionTable}`].length > 0
  ) {
    var all =
      typeof allValue[`${actionTable}`] == "string"
        ? JSON.parse(allValue[`${actionTable}`])
        : allValue[`${actionTable}`];

    all.map((item1) => {
      multipleValueBind.push(
        optionList.find((item) => {
          return item.id == item1.id; // Do not compare type check --- MnR
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
                  if (selectType == "single") {
                    value.forEach((item, index) => {
                      newValue.push(`${item.id}` || "");
                    });
                  } else {
                    value.forEach((item, index) => {
                      newValue.push(item);
                    });
                  }

                  setField(`${name}`, JSON.stringify(newValue));
                } else {
                  isMultiple !== true
                    ? setField(`${name}`, value && value.id)
                    : setField(`${name}`, value);
                }
              }
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id={name}
            renderInput={(params) => (
              <TextField
                {...field}
                onChange={onChange}
                {...params}
                placeholder={props.placeHolder}
              />
            )}
          />
        ) : (formType === "edit" && myOption.length == 0) ||
          (isMultiple && multipleValueBind.length == 0) ? (
          <Autocomplete
            {...defaultProps}
            defaultValue={isMultiple === true ? multipleValueBind : myOption[0]}
            multiple={isMultiple ? true : false}
            onChange={(e, value) => {
              if (value !== null) {
                if (isMultiple && value.length > 0) {
                  let newValue = [];
                  if (selectType == "single") {
                    value.forEach((item, index) => {
                      newValue.push(`${item.id}` || "");
                    });
                  } else {
                    value.forEach((item, index) => {
                      newValue.push(item);
                    });
                  }
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
              <TextField
                {...field}
                onChange={onChange}
                {...params}
                placeholder={props.placeHolder}
              />
            )}
          />
        ) : formType === "add" ? (
          <Autocomplete
            {...defaultProps}
            //value={isMultiple === true ? multipleValueBind : myOption[0]}
            //defaultValue={isMultiple === true ? multipleValueBind : myOption[0]}
            multiple={isMultiple ? true : false}
            onChange={(e, value) => {
              if (isMultiple) {
                let newValue = [];

                if (selectType == "single") {
                  value.forEach((item, index) => {
                    newValue.push(`${item.id}` || "");
                  });
                } else {
                  value.forEach((item, index) => {
                    newValue.push(item);
                  });
                }
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
              <TextField
                {...field}
                onChange={onChange}
                {...params}
                placeholder={props.placeHolder}
              />
            )}
          />
        ) : (
          <select className="form-control">
            <label>Select {name}</label>
            <option>No Option1</option>
          </select>
        )
      ) : (
        <select className="form-control">
          <label>Select {name}</label>
          <option>No Option2</option>
        </select>
      )}
    </>
  );
}
