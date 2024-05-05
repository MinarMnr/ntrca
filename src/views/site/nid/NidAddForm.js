import { Card } from "@themesberg/react-bootstrap";
import { DefaultCard } from "components/card";
import React, { useEffect, useState } from "react";
import { Field, Form } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { InputField, InputSelect } from "../../../components/form";
import ErrorMessage from "../../../components/text/ErrorMessage";
import { faEye, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/index";
import InputSelectApi from "components/form/InputSelectApi";
import { UrlBuilder } from "helpers/UrlBuilder";
import OtpField from "react-otp-field";

const NidAddForm = ({ values, setFieldValue, errorMsg }) => {
  const [feedbackOption, setFeedbackOption] = useState(null);
  const [nidDigit, setNidDigit] = useState(0);
  const [value, setValue] = useState("");

  useEffect(() => {
    setFeedbackOption(nidDigit);
    setFieldValue("nidNew", "");
    setValue("");
  }, [nidDigit]);
  useEffect(() => {
    setFieldValue("nidNew", value);
  }, [value]);

  const setArray = (itm) => {
    setFieldValue("nidNew", "");
    setNidDigit(itm);
  };

  return (
    <Form>
      <Row>
        <Col md={6} className="mb-15">
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

        <Col lg={12} md={12} className="mb-10">
          <label>
            NID <span></span>
            <abbr style={{ color: "red" }} className="req">
              *
            </abbr>
          </label>
          <div role="group" aria-labelledby="my-radio-group">
            <label className="pr-2">
              <Field
                type="radio"
                name="feedbackOption"
                value="10"
                onClick={() => setArray(10)}
              />
              10 digit
            </label>
            <label className="px-2">
              <Field
                type="radio"
                name="feedbackOption"
                value="13"
                onClick={() => setArray(13)}
              />
              13 digit
            </label>
            <label className="px-2">
              <Field
                type="radio"
                name="feedbackOption"
                value="17"
                onClick={() => setArray(17)}
              />
              17 digit
            </label>
          </div>
          <div className="list-error-message mt-15">
            {errorMsg ? (
              <span>
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="me-2"
                />
                NID is a required field
              </span>
            ) : null}
          </div>
          {feedbackOption > 0 ? (
            <>
              <OtpField
                value={value}
                onChange={setValue}
                numInputs={feedbackOption}
                onChangeRegex={/^([0-9]{0,})$/}
                autoFocus
                isTypeNumber
                inputProps={{ className: "otp-field__input", disabled: false }}
              />
            </>
          ) : null}
          <ErrorMessage fieldName="nidNew" />
        </Col>

        <Button variant="" className="btn-md btn-theme btn-block" type="submit">
          <span className="fw-bold">Add Nid</span>
        </Button>
      </Row>
    </Form>
  );
};

export default NidAddForm;
