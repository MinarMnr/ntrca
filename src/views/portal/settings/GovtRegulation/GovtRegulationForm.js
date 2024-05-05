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
// import { InputField, InputSelect } from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import InputDatePicker from "components/form/InputDatePicker";
import EnglishNumberToBangla from "helpers/EnglishNumberToBangla";
import InputSelectApi from "components/form/InputSelectApi";
import { UrlBuilder } from "helpers/UrlBuilder";

const GovtReglationForm = ({ values, setFieldValue }) => {
    let year = new Date().getFullYear() + 27;
    let arr = [];
    for (let i = 50; i > 0; i--) {
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
                <Col md={6} className="mb-10">
                    <InputField
                        label="নীতিমালার নাম (ইংরেজিতে)"
                        name="govtRegulationName"
                        required={true}
                        type="text"
                        placeholder="নীতিমালার নাম লিখুন (ইংরেজিতে) "
                    />
                    <ErrorMessage fieldName="govtRegulationName" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputField
                        label="নীতিমালার নাম (বাংলায়)"
                        name="govtRegulationNameBn"
                        required={true}
                        type="text"
                        placeholder="নীতিমালার নাম লিখুন (বাংলায়)"
                    />
                    <ErrorMessage fieldName="govtRegulationNameBn" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputSelectApi
                        label="অধিদপ্তর নাম"
                        name="directorateId"
                        required={true}
                        operationId={UrlBuilder.commonApi(
                            "directorate-combination/all"
                        )}
                        storeName="directorateCombinationNameBn"
                        type="text"
                        value="id"
                        text="directorateCombinationNameBn"
                    />
                    <ErrorMessage fieldName="levelId" />
                </Col>
                <Col md={6} className="mb-10">
                    <InputSelect
                        label="বছর"
                        name="regulationYear"
                        value="id"
                        type="text"
                        text="name"
                        required={true}
                        data={arr}
                    />

                    <ErrorMessage fieldName="regulationYear" />
                </Col>

                <Col md={6} className="mb-10">
                    <label>
                        কার্যকর তারিখ
                        <span className="text-danger">*</span>
                    </label>
                    <InputDatePicker
                        name="regulationValidFrom"
                        setField={setFieldValue}
                        dataValue={values?.regulationValidFrom}
                    />
                    <ErrorMessage fieldName="regulationValidFrom" />
                </Col>
                <Col md={6} className="mb-10">
                    <label>
                        কার্যকারিতার মেয়াদ<span className="text-danger">*</span>
                    </label>
                    <InputDatePicker
                        name="regulationValidTo"
                        setField={setFieldValue}
                        dataValue={values?.regulationValidTo}
                    />
                    <ErrorMessage fieldName="regulationValidTo" />
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
                    <Link to="/portal/settings/govt-regulation/list">
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

export default GovtReglationForm;
