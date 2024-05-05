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

const ErequisitionCircularListFiltering = () => {
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
                                <Col md={6} className="mb-10">
                                    <InputSelect
                                        label="প্রতিষ্ঠানের ধরন"
                                        name="type"
                                        // required={true}
                                        type="text"
                                        value="id"
                                        text="name"
                                        data={[
                                            {
                                                id: 1,
                                                name: "স্কুল",
                                            },
                                            {
                                                id: 2,
                                                name: "কলেজ",
                                            },
                                            {
                                                id: 3,
                                                name: "মাদরাসা",
                                            },
                                        ]}
                                    />
                                    <ErrorMessage fieldName="division" />
                                </Col>

                                {/* <Col md={6} className="mb-10">
                                    <InputField
                                        label="প্রকাশের তারিখ"
                                        name="pbDate"
                                        type="date"
                                        placeholder=""
                                    />
                                    <ErrorMessage fieldName="registration" />
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
                                </Col>
                            </Row>
                        </Form>
                    </>
                );
            }}
        </Formik>
    );
};

export default ErequisitionCircularListFiltering;
