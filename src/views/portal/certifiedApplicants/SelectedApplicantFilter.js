import React from "react";
import { Field, Form, Formik } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap/lib/esm/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";

import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { selectApi } from "reducers/apiSlice";
import { useSelector } from "react-redux";
import ProgressBar from "react-topbar-progress-indicator";

import { UrlBuilder } from "helpers/UrlBuilder";
import ErrorMessage from "components/text/ErrorMessage";
import InputSelectApi from "components/form/InputSelectApi";

const SelectedApplicantFilter = ({ onSubmit }) => {
    const { loading } = useSelector(selectApi);

    return (
        <Formik
            initialValues={{
                jobApplicationCircularId: "",
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
                                
                                <Col md={6} className="mb-10">
                                    <label class="form-label">
                                    গণ বিজ্ঞপ্তি
                                    </label>
                                    <InputSelectApi
                                        name="jobApplicationCircularId"
                                        operationId={UrlBuilder.ntrcaApi(
                                            `admin/job-application-circular/all`
                                        )}
                                        storeName="regulations"
                                        value="id"
                                        text="circularTitle"
                                        type="text"
                                        // required={true}
                                    />
                                    <ErrorMessage fieldName="jobApplicationCircularId" />
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

                                    {/* <Button
                                        variant="white"
                                        className="f-right m-10  btn-primary"
                                        type="submit"
                                    >
                                        Genarate Report
                                    </Button> */}
                                    {/* <span className="f-right m-10">
                                        {" "}
                                        <input
                                            type="checkbox"
                                            checked={true}
                                            required={true}
                                        />{" "}
                                        All
                                    </span> */}
                                </Col>
                            </Row>
                        </Form>
                    </>
                );
            }}
        </Formik>
    );
};

export default SelectedApplicantFilter;
