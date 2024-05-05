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
import PoliceVerificationForm from "./PoliceVerificationForm";
import { FieldArray, Field } from "formik/dist/index";
import { InputField, InputSelect } from "../../../../components/form";

import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

const PoliceVerificationAdd = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector(selectApi);

    const cardProps = {
        title: "পুলিশ ভেরিফিকেশনের আবেদন করুন",
        headerSlot: () => (
            <>
                <Link to="/portal/settings/police-verification">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        পুলিশ ভেরিফিকেশনের তালিকা দেখুন
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
                        initialValues={{
                            file: "",
                        }}
                        // validationSchema={Subject.validation()}
                        onSubmit={(data, { resetForm }) => {
                            // dispatch(
                            //     callApi({
                            //         operationId:
                            //             UrlBuilder.ntrcaApi("subject/save"),
                            //         output: "designation_save",
                            //         parameters: {
                            //             method: "POST",
                            //             body: Subject.toString(data),
                            //             header: {
                            //                 "Content-Type":
                            //                     "application/json",
                            //             },
                            //         },
                            //     })
                            // );
                        }}
                    >
                        {(props) => {
                            return (
                                <PoliceVerificationForm
                                    {...props}
                                    data={data}
                                />
                            );
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default PoliceVerificationAdd;
