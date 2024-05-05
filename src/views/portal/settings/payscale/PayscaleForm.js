import * as React from "react";
import { Link } from "react-router-dom";
import { Field, Form } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes, faUndo } from "@fortawesome/free-solid-svg-icons";
import { InputField, InputSelect } from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";

const PayscaleForm = () => {
    return (
        <Form>
            <Row>
                <Col md={6} className="mb-10">
                    <InputField
                        label="Pay Scale Name"
                        name="payScaleName"
                        required={true}
                        type="text"
                        placeholder="Pay Scale Name"
                    />
                    <ErrorMessage fieldName="payScaleName" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputField
                        label="Effective From"
                        name="effectiveFrom"
                        required={true}
                        type="date"
                        placeholder="Effective From"
                    />
                    <ErrorMessage fieldName="effectiveFrom" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputField
                        label="Effective To"
                        name="effectiveTo"
                        required={true}
                        type="date"
                        placeholder="Effective To"
                    />
                    <ErrorMessage fieldName="effectiveTo" />
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
                    <Link to="/portal/settings/pay-scale">
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

export default PayscaleForm;
