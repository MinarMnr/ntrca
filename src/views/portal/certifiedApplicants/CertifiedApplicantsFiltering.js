import React from "react";
import { Field, Form, Formik } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap/lib/esm/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import { faSearch, faUndo } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
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

const CertifiedApplicantsFiltering = ({ onSubmit, fromPage }) => {
    const { loading } = useSelector(selectApi);
    return (
        <Formik
            initialValues={{
                divisionId: "",
                districtId: "",
                thanaId: "",
                examId: "",
                lastUploaded: "",
            }}
            enableReinitialize={true}
            validationSchema={Yup.object().shape({})}
            onSubmit={(values, { resetForm }) => {
                onSubmit(values);

                // reset form
                // resetForm();
            }}
        >
            {({ values, setFieldValue, handleSubmit }) => {
                return (
                    <>
                        <Form>
                            {loading && <ProgressBar />}

                            <Row>
                                <Col md={3} className="mb-10">
                                    <InputSelectApi
                                        label="Division"
                                        name="divisionId"
                                        operationId={UrlBuilder.commonApi(
                                            "division/all"
                                        )}
                                        storeName="division"
                                        value="id"
                                        text="divisionName"
                                        type="text"
                                        // defaultSelect={true}
                                        defaultValue={values?.divisionId ?? ""}
                                    />
                                </Col>
                                <Col md={3} className="mb-10">
                                    <InputSelectApi
                                        label="District"
                                        name="districtId"
                                        operationId={
                                            values.divisionId
                                                ? UrlBuilder.commonApi(
                                                      `district/all?divisionId=${values.divisionId}`
                                                  )
                                                : ""
                                        }
                                        storeName="district"
                                        value="id"
                                        text="districtName"
                                        // defaultSelect={true}
                                        defaultValue={values?.districtId ?? ""}
                                    />
                                </Col>

                                <Col md={3} className="mb-10">
                                    <InputSelectApi
                                        label="Thana"
                                        name="thanaId"
                                        operationId={
                                            values.districtId
                                                ? UrlBuilder.commonApi(
                                                      `thana/all?districtId=${values.districtId}`
                                                  )
                                                : ""
                                        }
                                        storeName="thana"
                                        value="id"
                                        text="thanaName"
                                        // defaultSelect={true}
                                    />
                                </Col>

                                <Col md={3} className="mb-10">
                                    <InputSelectApi
                                        label="ব্যাচ"
                                        name="examId"
                                        operationId={UrlBuilder.ntrcaApi(
                                            `exam/all`
                                        )}
                                        storeName="exam"
                                        value="id"
                                        text="examNameBn"
                                        // defaultSelect={true}
                                    />
                                </Col>
                                {/* <Col md={3} className="mb-10">
                                    <InputField
                                        label="নিবন্ধন"
                                        name="registration"
                                        type="number"
                                        placeholder="নিবন্ধন নম্বর লিখুন"
                                    />
                                    <ErrorMessage fieldName="registration" />
                                </Col> */}
                                <Col md={3} className="mb-10">
                                    <InputField
                                        label="রোল"
                                        name="rollNo"
                                        type="number"
                                        placeholder="রোল লিখুন"
                                    />
                                    <ErrorMessage fieldName="roll" />
                                </Col>
                                <Col md={3} className="mb-10">
                                    <InputField
                                        label="আবেদনকারীর নাম"
                                        name="applicantName"
                                        type="text"
                                        placeholder="এখানে নাম লিখুন"
                                    />
                                    <ErrorMessage fieldName="roll" />
                                </Col>
                                <Col md={3} className="mb-10">
                                    <InputSelect
                                        label="সর্বশেষ নিবন্ধিত শিক্ষকের তালিকা"
                                        name="lastUploaded"
                                        // required={true}
                                        type="text"
                                        value="id"
                                        text="name"
                                        data={[
                                            {
                                                id: "TRUE",
                                                name: "সর্বশেষ নিবন্ধিত শিক্ষকের তালিকা",
                                            },
                                            // {
                                            //     id: "FALSE",
                                            //     name: "না",
                                            // },
                                        ]}
                                        defaultValue={values?.lastUploaded}
                                    />
                                    <ErrorMessage fieldName="lastUploaded" />
                                </Col>

                                <Col md={12} className="mb-10 border-bottom">
                                    <Button
                                        variant="white btn-primary"
                                        className="f-right m-10"
                                        type="submit"
                                    >
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            className="me-2"
                                        />
                                        অনুসন্ধান করুন
                                    </Button>
                                    <Button
                                        variant="white"
                                        className="f-right m-10"
                                        type="reset"
                                    >
                                        <FontAwesomeIcon
                                            icon={faUndo}
                                            className="me-2"
                                        />{" "}
                                        রিসেট
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </>
                );
            }}
        </Formik>
    );
};

export default CertifiedApplicantsFiltering;
