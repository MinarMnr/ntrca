import React from "react";
import { useSelector } from "react-redux";
import { selectErrorMessage } from "../../reducers/errorMessageSlice";

const ErrorMessage = ({ fieldName }) => {
  const { datas } = useSelector(selectErrorMessage);

  return (
    <>
      {fieldName !== undefined && fieldName !== null && datas !== undefined ? (
        <p className="text-danger mt-3 mb-0">{datas[fieldName]}</p>
      ) : (
        ""
      )}
    </>
  );
};

export default ErrorMessage;
