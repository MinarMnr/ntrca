import * as React from "react";
import { Link } from "react-router-dom";
import { Form } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import moment from "moment";

const PayCodeForm = ({ setFieldValue, values }) => {
    return (
        <Form>
            <Row>
                <Col md={6} className="mb-10">
                    <InputField
                        label="পেকোড নাম"
                        name="payCodeName"
                        required={true}
                        type="text"
                        placeholder="Enter Pay code Name"
                    />
                    <ErrorMessage fieldName="payCodeName" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputField
                        label="পেকোড নাম (বাংলা)"
                        name="payCodeNameBn"
                        type="text"
                        placeholder="Enter  Pay Code (BN)"
                    />
                    <ErrorMessage fieldName="payCodeNameBn" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputField
                        label="বর্ণনা"
                        name="payCodeDescription"
                        type="text"
                        placeholder="Enter Pay Code Description"
                    />
                    <ErrorMessage fieldName="payCodeDescription" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputField
                        label="বর্ণনা (বাংলা)"
                        name="payCodeDescriptionBn"
                        type="text"
                        placeholder="Enter Pay Code Description Bn"
                    />
                    <ErrorMessage fieldName="payCodeDescriptionBn" />
                </Col>
                <Col md={12} className="mb-10 mt-10">
                    <Button
                    
                        variant=""
                        className="f-right btn-color"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                        Submit
                    </Button>
                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="reset"
                    >
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> Reset
                    </Button>
                    <Link to="/portal/settings/pay-code">
                        <Button
                            variant="white"
                            className="f-right mr-10"
                            type="cancle"
                        >
                            <FontAwesomeIcon icon={faTimes} className="me-2" />{" "}
                            Cancel
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Form>
    );
};

export default PayCodeForm;
