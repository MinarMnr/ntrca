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
import InputDate from "components/form/InputDate";
import EnglishNumberToBangla from "helpers/EnglishNumberToBangla";

const BatchForm = ({ values }) => {
    const today = new Date();
    let year = today.getFullYear() + 10;
    let arr = [];

    for (let i = 10; i > -10; i--) {
        let y = {
            id: year,
            name: EnglishNumberToBangla(year),
        };
        arr.push(y);
        year--;
    }

    return (
        <Form>
            <Row>
                <Col md={4} className="mb-10">
                    <InputField
                        label="ব্যাচের নাম (ইংরেজিতে)"
                        name="examName"
                        required={true}
                        type="text"
                        placeholder="ব্যাচের নাম লিখুন (ইংরেজিতে) "
                    />
                    <ErrorMessage fieldName="examName" />
                </Col>
                <Col md={4} className="mb-10">
                    <InputField
                        label="ব্যাচের নাম (বাংলায়)"
                        name="examNameBn"
                        required={true}
                        type="text"
                        placeholder="ব্যাচের নাম লিখুন (বাংলায়)"
                    />
                    <ErrorMessage fieldName="examNameBn" />
                </Col>
                <Col md={4} className="mb-10">
                    <InputField
                        label="ব্যাচ নং (ইংরেজিতে)"
                        name="examBatch"
                        required={true}
                        type="number"
                        placeholder=" ব্যাচ নং"
                    />
                    <ErrorMessage fieldName="examBatch" />
                </Col>
                <Col md={4} className="mb-10">
                    <InputSelect
                        label="বছর"
                        name="examYear"
                        value="id"
                        type="text"
                        text="name"
                        required={true}
                        data={arr}
                    />
                    {/* <InputField
                        label="বছর"
                        name="examYear"
                        required={true}
                        type="number"
                        placeholder="ব্যাচের সাল "
                    /> */}
                    <ErrorMessage fieldName="examYear" />
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
                    <Link to="/portal/settings/batch/list">
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

export default BatchForm;
