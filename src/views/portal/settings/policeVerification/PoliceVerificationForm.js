import React from "react";
import {
    faSave,
    faTimes,
    faUndo,
    faPlusSquare,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { Form } from "formik/dist/index";
import { Link } from "react-router-dom";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../../components/form";
import { FieldArray, Field } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";
// import { InputField, InputSelect } from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";

const PoliceVerificationForm = ({ values }) => {
    return (
        <Form>
            <Row>
                <Col md={6} className="mb-10">
                    <InputField
                        label="আবেদন আইডি"
                        name="applicationid"
                        type="number"
                        placeholder=" আবেদন আইডি"
                    />
                    <ErrorMessage fieldName="applicationid" />
                </Col>

                <Col md={6} className="mb-10">
                    <InputField
                        label="এনক্লোজার ফাইল"
                        name="file"
                        type="file"
                        placeholder=" এনক্লোজার ফাইল"
                    />
                    <ErrorMessage fieldName="file" />
                </Col>

                <Col md={12} className="mb-10 mt-10">
                    <Button
                        variant=""
                        className="f-right btn-color"
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faSave} className="me-2" />{" "}
                        সাবমিট করুন
                    </Button>
                    <Button
                        variant="white"
                        className="f-right mr-10"
                        type="reset"
                    >
                        <FontAwesomeIcon icon={faUndo} className="me-2" /> রিসেট
                    </Button>
                    <Link to="/portal/choice/list">
                        <Button
                            variant="white"
                            className="f-right mr-10"
                            type="cancle"
                        >
                            <FontAwesomeIcon icon={faTimes} className="me-2" />{" "}
                            বাতিল করুন
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Form>
    );
};

export default PoliceVerificationForm;
