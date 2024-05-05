import { Form, Formik } from "formik/dist/index";
import { Button, Col, Row } from "@themesberg/react-bootstrap";
import { useEffect, useState } from "react";
import {
    InputField,
    InputSelectApi,
    InputSelect,
    InputDatePicker,
} from "components/form";
import { UrlBuilder } from "helpers/UrlBuilder";
import SimpleAccordion from "components/accordion/SimpleAccordion";
import { useDispatch, useSelector } from "react-redux";
import { callApi, selectApi, clearState } from "reducers/apiSlice";
import ProgressBar from "react-topbar-progress-indicator";
import ErrorMessage from "components/text/ErrorMessage";
import InputSelectMultiLabelApi from "components/form/InputSelectMultiLabelApi";
import { faSave, faSearch, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Yup from "yup";

const NotificationFilter = ({ onSubmit }) => {
    const { loading } = useSelector(selectApi);

    const seenOption = [
        {
            id: "true",
            msg: "Viewed",
        },
        {
            id: "false",
            msg: "Not Viewed",
        },
    ];

    return (
        <SimpleAccordion
            title="Click here for Advanced search"
            expanded={false}
        >
            <Formik
                initialValues={{
                    // isSeen: "",
                    isSeen: false,
                }}
                enableReinitialize={true}
                onSubmit={(values, { resetForm }) => {
                    onSubmit(values);

                    // reset form
                    // resetForm();
                }}
            >
                {({ values, setFieldValue, handleSubmit }) => {
                    return (
                        <Form>
                            {loading && <ProgressBar />}

                            <Row>
                                <Col md={6} className="mb-10">
                                    <InputSelect
                                        label="Viewed/Not Viewed"
                                        name="isSeen"
                                        data={seenOption}
                                        value="id"
                                        text="msg"
                                        type="text"
                                        // defaultSelect={true}
                                    />
                                </Col>

                                <Col
                                    md={12}
                                    className="mb-0 mt-10 border-top pt-15"
                                >
                                    <Button
                                        variant=""
                                        className="f-right btn-color"
                                        type="submit"
                                    >
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            className="me-2"
                                        />
                                        Search
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    );
                }}
            </Formik>
        </SimpleAccordion>
    );
};

export default NotificationFilter;
