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

const ReplaceApplicantListFiltering = () => {
    const [clickedData, setClickedData] = React.useState(false);
    let roles = AuthUser.getRoles();

    return (
        <Formik
            initialValues={{
                //   instituteId: AuthUser.getInstituteId(),
                choose: 2,
                division: 4,
                district: 6,
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
                                    <InputField
                                        label="আবেদন আইডি"
                                        name="applicantID"
                                        type="number"
                                        placeholder="৩২২০৫৩৮৪"
                                    />
                                    <ErrorMessage fieldName="applicantID" />
                                </Col>
                                <Col md={12} className="mb-10 border-bottom">
                                    <Button
                                        variant="white"
                                        className="f-right m-10"
                                        type="submit"
                                        onClick={() => setClickedData(true)}
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

export default ReplaceApplicantListFiltering;
