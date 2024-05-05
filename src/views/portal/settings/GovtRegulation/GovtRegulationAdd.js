import React from "react";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { callApi, selectApi } from "../../../../reducers/apiSlice";

import { FieldArray, Field } from "formik/dist/index";
import { InputField, InputSelect } from "../../../../components/form";

import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { govtRegulation } from "./GovtRegulation";
import GovtReglationForm from "./GovtRegulationForm";

const GovtRegulationAdd = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector(selectApi);

    const cardProps = {
        title: "নতুন নীতিমালা যোগ করুন",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/govt-regulation/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        নীতিমালার তালিকা দেখুন
                    </Button>
                </Link>
            </>
        ),
    };

    let data = [{}];

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={govtRegulation}
                        validationSchema={govtRegulation.validation()}
                        onSubmit={(data, { resetForm }) => {
                            dispatch(
                                callApi({
                                    operationId: UrlBuilder.ntrcaApi(
                                        "govt-regulation/save"
                                    ),
                                    output: "govtRegulation_save",
                                    parameters: {
                                        method: "POST",
                                        body: govtRegulation.toString(data),
                                        header: {
                                            "Content-Type": "application/json",
                                        },
                                    },
                                })
                            );
                        }}
                    >
                        {(props) => {
                            return <GovtReglationForm {...props} />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default GovtRegulationAdd;
