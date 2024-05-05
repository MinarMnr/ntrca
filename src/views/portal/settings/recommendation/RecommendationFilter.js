import React from "react";
import { Field, Form, Formik } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap/lib/esm/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { faSearch, faUndo } from "@fortawesome/free-solid-svg-icons";
import { selectApi } from "reducers/apiSlice";
import { useSelector } from "react-redux";
import ProgressBar from "react-topbar-progress-indicator";
import InputSelectApi from "components/form/InputSelectApi";

const RecommendationFilter = ({ onSubmit }) => {
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
                // console.log(values);
                return (
                    <>
                        <Form>
                            {loading && <ProgressBar />}
                            <Row>
                                <Col md={6} className="m-10 p-10">
                                    <InputSelectApi
                                        label="গণবিজ্ঞপ্তি"
                                        name="jobApplicationCircularId"
                                        type="number"
                                        value="id"
                                        operationId={UrlBuilder.ntrcaApi(
                                            "admin/job-application-circular/all"
                                        )}
                                        storeName="jobApplicationCircularId"
                                        text="circularTitle"
                                    />
                                </Col>

                                {/* <Col md={2} className="mb-10">
                                    <InputSelectApi
                                        label="পদের ধরন"
                                        name="designationId"
                                        type="number"
                                        value="id"
                                        operationId={
                                            values?.jobApplicationCircularId
                                                ? UrlBuilder.ntrcaApi(
                                                      `designation/all?jobApplicationCircularId=${values?.jobApplicationCircularId}`
                                                  )
                                                : UrlBuilder.ntrcaApi(
                                                      "designation/all"
                                                  )
                                        }
                                        storeName="designation"
                                        text="designationNameBn"
                                        // onChange={checkData(
                                        //     index
                                        // )}
                                    />
                                </Col>
                                <Col md={2} className="mb-10">
                                    <InputSelectApi
                                        label="বিষয় ধরন"
                                        name="subjectId"
                                        type="number"
                                        value="id"
                                        operationId={
                                            values?.jobApplicationCircularId
                                                ? UrlBuilder.ntrcaApi(
                                                      `subject/all?jobApplicationCircularId=${values?.jobApplicationCircularId}`
                                                  )
                                                : UrlBuilder.ntrcaApi(
                                                      "subject/all"
                                                  )
                                        }
                                        storeName="subjectAll"
                                        text="subjectNameBn"
                                    />
                                </Col> */}

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

export default RecommendationFilter;
