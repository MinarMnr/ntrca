import React from 'react';
import { Link } from "react-router-dom";
import { Field, Form } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { InputField, InputSelect, InputTextArea } from "../form";
import ErrorMessage from "../text/ErrorMessage";

const ReviewFrom = ({ values, reviewData, confirmClose, setSubmitting }) => {
  return (
    <Form>
      <Row>
        <Col md={12} className="mb-10">
          <InputTextArea
            label="Reason For Rejection"
            name="reviewNote"
            type="text"
          />
          <ErrorMessage fieldName="reviewNote" />
        </Col>

        <Col md={6} className="mb-10">
          <InputSelect
            label="Send To"
            name="reviewerId"
            data={reviewData}
            text="name"
            value="id"
          />
        </Col>
        <Col md={12} className="mb-10 mt-10">
          <Button variant="" className="f-right btn-color" type="submit">
            <FontAwesomeIcon icon={faSave} className="me-2" /> Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ReviewFrom;
