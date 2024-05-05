import React from "react";
import { Field, Form, Formik } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap/lib/esm/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome/index";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
// import InputComboBoxApi from "../../../../components/form/InputComboBoxApi";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { AuthUser } from "../../../../helpers/AuthUser";

// import SimpleAccordion from "../../../../components/accordion/SimpleAccordion";
// import { InputField } from "../../../../components/form";
import {
    InputField,
    InputSelect,
    InputTextArea,
} from "../../../../components/form";
import ErrorMessage from "../../../../components/text/ErrorMessage";

const BatchFiltering = () => {
    return (
        <Formik
            initialValues={{
                //   instituteId: AuthUser.getInstituteId(),
                applicant_level: 4,
                applicant_subject: 6,

            }}
            // validationSchema={Yup.object().shape({
            //   instituteId: Yup.number()
            //     .typeError("Institute should be numeric value.")
            //     .required("Institute is a required field!"),
            // })}
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
                            <Row>
                                <Col md={3} className="mb-10">
                                    <InputSelect
                                        label="ব্যাচ"
                                        name="applicant_batch"
                                        type="text"
                                        value="id"
                                        text="name"
                                        data={[
                                            {
                                                id: 1,
                                                name: "১১ তম",
                                            },
                                            {
                                                id: 2,
                                                name: "১২ তম",
                                            },
                                            {
                                                id: 1,
                                                name: "১৩ তম",
                                            },
                                            {
                                                id: 2,
                                                name: "১৪ তম",
                                            },
                                            {
                                                id: 1,
                                                name: "১৫ তম",
                                            },
                                            {
                                                id: 2,
                                                name: "১৬ তম",
                                            },

                                        ]}
                                    />
                                    <ErrorMessage fieldName="applicant_batch" />
                                </Col>
                                <Col md={3} className="mb-10">
                                    <InputSelect
                                        label="বছর"
                                        name="year"
                                        value="id"
                                        type="text"
                                        text="name"
                                        data={[
                                            {
                                                id: 1,
                                                name: "২০২০",
                                            },
                                            {
                                                id: 2,
                                                name: "২০২১",
                                            },


                                        ]}
                                    />
                                    <ErrorMessage fieldName="year" />
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
                                </Col>
                            </Row>
                        </Form>
                    </>
                );
            }}
        </Formik>
    );
};

export default BatchFiltering;
