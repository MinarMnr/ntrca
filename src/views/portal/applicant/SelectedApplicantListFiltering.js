import React from "react";
import { Field, Form, Formik } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap/lib/esm/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
// import InputComboBoxApi from "../../../components/form/InputComboBoxApi";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { AuthUser } from "../../../helpers/AuthUser";

// import SimpleAccordion from "../../../components/accordion/SimpleAccordion";
// import { InputField } from "../../../components/form";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../components/form";
import ErrorMessage from "../../../components/text/ErrorMessage";
import InputSelectApi from "components/form/InputSelectApi";
import { useSelector } from "react-redux";
import { selectApi } from "reducers/apiSlice";
import ProgressBar from "react-topbar-progress-indicator";

const SelectedApplicantListFiltering = ({ onSubmit }) => {
    const { loading } = useSelector(selectApi);
    return (
        <Formik
            initialValues={{
                instituteId: "",
                jobType: "",
                designationId: "",
                subjectId: "",
                batchId: "",
                eiinNo: "",
                rollNo: "",
                applicantName: "",
            }}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
                let body = { ...values };
                onSubmit(body);
            }}
        >
            {({ values, errors, handleSubmit }) => {
                return (
                    <>
                        <Form>
                            {loading && <ProgressBar />}
                            <Row>
                                <Col md={4} className="mb-10">
                                    <InputField
                                        label="আবেদনকারীর নাম"
                                        name="applicantName"
                                        type="text"
                                        placeholder="আবেদনকারীর নাম"
                                    />
                                    <ErrorMessage fieldName="applicantName" />
                                </Col>

                                <Col md={4} className="mb-10">
                                    <InputField
                                        label="প্রতিষ্ঠানের আইডি"
                                        name="instituteId"
                                        type="number"
                                        placeholder="প্রতিষ্ঠানের আইডি লিখুন"
                                    />
                                    <ErrorMessage fieldName="instituteId" />
                                </Col>
                                <Col md={4} className="mb-10">
                                    <InputField
                                        label="প্রতিষ্ঠানের EIIN"
                                        name="eiinNo"
                                        type="number"
                                        placeholder="প্রতিষ্ঠানের EIIN লিখুন"
                                    />
                                    <ErrorMessage fieldName="eiinNo" />
                                </Col>

                                <Col md={4} className="mb-10">
                                    <InputField
                                        label="রোল নম্বর"
                                        name="rollNo"
                                        type="text"
                                        placeholder="রোল নম্বর"
                                    />
                                    <ErrorMessage fieldName="rollNo" />
                                </Col>

                                <Col md={4} className="mb-10">
                                    <InputSelectApi
                                        label="ব্যাচ"
                                        name="batchId"
                                        operationId={UrlBuilder.ntrcaApi(
                                            `exam/all`
                                        )}
                                        storeName="batch"
                                        value="id"
                                        text="examNameBn"
                                        type="number"
                                    />
                                    <ErrorMessage fieldName="batchId" />
                                </Col>

                                <Col md={4} className="mb-10">
                                    <InputSelectApi
                                        label="বিষয়ের নাম"
                                        name="subjectId"
                                        operationId={UrlBuilder.ntrcaApi(
                                            `subject/all`
                                        )}
                                        storeName="subject"
                                        value="id"
                                        text="subjectNameBn"
                                        type="number"
                                    />
                                    <ErrorMessage fieldName="subjectId" />
                                </Col>

                                <Col md={4} className="mb-10">
                                    <InputSelectApi
                                        label="পদবি"
                                        name="designationId"
                                        operationId={UrlBuilder.ntrcaApi(
                                            `designation/all`
                                        )}
                                        storeName="designation"
                                        value="id"
                                        text="designationNameBn"
                                        type="number"
                                    />
                                    <ErrorMessage fieldName="designationId" />
                                </Col>
                                <Col md={4} className="mb-10">
                                    <InputSelect
                                        label="পদের ধরন"
                                        name="jobType"
                                        type="text"
                                        value="id"
                                        text="name"
                                        data={[
                                            {
                                                id: "MPO",
                                                name: "MPO",
                                            },
                                            {
                                                id: "NON_MPO",
                                                name: "NON MPO",
                                            },
                                        ]}
                                    />
                                    <ErrorMessage fieldName="jobType" />
                                </Col>

                                <Col md={12} className="mb-10 border-bottom">
                                    <Button
                                        variant="white"
                                        className="f-right m-10"
                                        type="submit"
                                    >
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            className="me-2"
                                        />
                                        অনুসন্ধান করুন
                                    </Button>

                                    {/* {roles[1] === "admin" && (
                                        <Button
                                            variant="success"
                                            className="f-right m-10"
                                            type="submit"
                                            disabled={!clickedData}
                                        >
                                            <FontAwesomeIcon
                                                icon={faSearch}
                                                className="me-2"
                                            />
                                            Call for PV
                                        </Button>
                                    )} */}
                                </Col>
                            </Row>
                        </Form>
                    </>
                );
            }}
        </Formik>
    );
};

export default SelectedApplicantListFiltering;
