import React from "react";
import { Field, Form, Formik } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap/lib/esm/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { faSearch, faUndo } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";
import InputSelectApi from "components/form/InputSelectApi";
import { useSelector } from "react-redux";
import { selectApi } from "reducers/apiSlice";
import ProgressBar from "react-topbar-progress-indicator";

const RegulationFilter = ({ onSubmit, fromPage }) => {
    const { loading } = useSelector(selectApi);
    return (
        <Formik
            initialValues={{
                govtRegulationId: "",
                educationLevelId: "",
                instituteTypeId: "",
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
                                        label="নীতিমালা"
                                        name="govtRegulationId"
                                        operationId={UrlBuilder.ntrcaApi(
                                            `govt-regulation/all`
                                        )}
                                        storeName="regulations"
                                        value="id"
                                        text="govtRegulationNameBn"
                                        type="number"
                                    />
                                </Col>
                                <Col md={3} className="mb-10">
                                    <InputSelectApi
                                        label="প্রতিষ্ঠানের ধরন"
                                        name="instituteTypeId"
                                        operationId={UrlBuilder.commonApi(
                                            `institute-type/all`
                                        )}
                                        storeName="instituteTypeName"
                                        value="id"
                                        text="instituteTypeNameBn"
                                        type="number"
                                    />
                                </Col>

                                <Col md={3} className="mb-10">
                                    <InputSelectApi
                                        label="প্রতিষ্ঠানের স্তর"
                                        name="educationLevelId"
                                        operationId={UrlBuilder.ntrcaApi(
                                            `govt-regulation-recruitment-post-subject-level-grade/education-level/all`
                                        )}
                                        storeName="educationLevelName"
                                        value="id"
                                        text="educationLevelNameBn"
                                        type="number"
                                    />
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

export default RegulationFilter;
