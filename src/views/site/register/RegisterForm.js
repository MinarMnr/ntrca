import { Card } from "@themesberg/react-bootstrap";
import { DefaultCard } from "components/card";
import React from "react";
import { Form } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { InputField, InputSelect } from "../../../components/form";
import ErrorMessage from "../../../components/text/ErrorMessage";
import "./Register.scss";
import { faEye, faSave, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputSelectApi from "components/form/InputSelectApi";
import { UrlBuilder } from "helpers/UrlBuilder";
import InputDatePicker from "components/form/InputDatePicker";

//import { FaEye, FaEyeSlash } from "react-icons/fa";
const RegisterForm = ({ values, setFieldValue }) => {
  const [inputType, setInputType] = React.useState("password");
  const [reInputType, setReInputType] = React.useState("password");

  // const showPassword = () => {
  //   let checkbox = document.getElementById("myCheck");
  //   if (checkbox.checked == true) {
  //     setInputType("text");
  //   } else {
  //     setInputType("password");
  //   }
  // };

  const [showPass, setShowPass] = React.useState(false);

  const handleShowPassword = () => {
    if (!showPass) {
      setInputType("text");
    } else {
      setInputType("password");
    }
    setShowPass(!showPass);
  };

  const [ReShowPass, setReShowPass] = React.useState(false);

  const handleReWriteShowPassword = () => {
    if (!ReShowPass) {
      setReInputType("text");
    } else {
      setReInputType("password");
    }
    setReShowPass(!ReShowPass);
  };

  return (
    <Form>
      <Row>
        <Col md={12} className="mb-15">
          <InputSelectApi
            label="ব্যাচ নং"
            name="examBatchId"
            operationId={UrlBuilder.ntrcaApi(`exam/all`)}
            //operationId={UrlBuilder.commonApi("division/all")}
            storeName="exam"
            value="id"
            text="examNameBn"
            type="number"
            required={true}
          />

          {/* <InputSelect
            label="Batch"
            name="batch"
            type="text"
            value="name"
            data={batchData}
            className={`registerinput`}
            text="name"
           
          /> */}
          {/* <InputField
            label="Batch"
            name="batch"
            required={true}
            type="text"
            placeholder="Enter Batch Number"
          />
          <ErrorMessage fieldName="batch" /> */}
        </Col>
        <Col md={6} className="mb-15">
          <InputField
            label="Roll"
            name="rollNo"
            type="text"
            required={true}
            placeholder="Enter Roll Number"
          />
          <ErrorMessage fieldName="rollNo" />
        </Col>
        <Col md={6} className="mb-15">
          <InputField
            label="Registration Number"
            name="registrationNo"
            type="text"
            required={true}
            placeholder="Enter Registration Number"
          />
          <ErrorMessage fieldName="registrationNo" />
        </Col>

        <Col md={6} className="mb-15">
          <label>
            Date of Birth
            <span className="text-danger">*</span>
          </label>
          <InputDatePicker
            // showTime={true}
            name="dob"
            setField={setFieldValue}
            dataValue={values?.dob}
          />
          <ErrorMessage fieldName="dob" />
        </Col>
        <Col md={6} className="mb-15">
          <InputField
            label="Email"
            name="email"
            type="email"
            // required={true}
            placeholder="Enter Email Address"
          />
          <ErrorMessage fieldName="email" />
        </Col>
        <Col md={6} className="mb-15">
          <InputField
            label="Password"
            name="password"
            type={inputType}
            required={true}
            placeholder="Enter Password"
          />
          <ErrorMessage fieldName="password" />
        </Col>
        {/* <Col md={1} className="mb-15 d-flex align-items-center">
          <span className="fw-bold" onClick={handleShowPassword}>
            {showPass ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
        </Col> */}
        <Col md={6} className="mb-15">
          <InputField
            label="Re-Type Password"
            name="confirmPassword"
            type={reInputType}
            required={true}
            placeholder="Enter Password"
          />
          <ErrorMessage fieldName="confirmPassword" />
        </Col>

        {/* <Col md={1} className="mb-15 d-flex align-items-center">
          <span className="fw-bold" onClick={handleReWriteShowPassword}>
            {ReShowPass ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
        </Col> */}

        {/* <Col md={6} className="mb-15">
          <label className="text-muted">Show Password</label>
          <input type="checkbox" id="myCheck" onClick={showPassword} />
        </Col> */}

        <Button variant="" className="btn-md btn-theme btn-block" type="submit">
          <span className="fw-bold">Register</span>
        </Button>
      </Row>
    </Form>
  );
};

export default RegisterForm;
