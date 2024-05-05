import React, { useState } from "react";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../../components/card";
import { UrlBuilder } from "../../../../helpers/UrlBuilder";
import { callApi, selectApi, setState } from "../../../../reducers/apiSlice";
import ApplicationApplyForm from "./ApplicationApplyForm";
import { Step, Stepper } from "react-form-stepper";
import { useHistory } from "react-router-dom";
import { ApplyModel } from "./ApplicationApplyModel";
import { selectToastAlert, setToastAlert } from "reducers/toastAlertSlice";
import { useEffect } from "react";
import { AuthUser } from "helpers/AuthUser";
import { ScrollToFieldError } from "helpers/ScrollToFieldError";
import { AttachmentModel } from "./ApplicationAttachmentModel";
import ApplicationAttachmentForm from "./ApplicationAttachmentForm";
import ApplicationPreviewForm from "./ApplicationPreviewForm";

const ApplicationPreview = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    var circularId = props.match.params.id;
    var nid = AuthUser.getUserName();

    const {
        loading,
        details = {
            data: {},
        },
    } = useSelector(selectApi);
    const { type } = useSelector(selectToastAlert);

    useEffect(() => {
        if (type === "success") {
            history.push(`/portal/circular/applicant/list`);
        }
    });

    useEffect(() => {
        dispatch(
            callApi({
                operationId:
                    circularId &&
                    UrlBuilder.ntrcaApi(
                        `job-application/final-details/${nid}/${circularId}`
                    ),
                output: "details",
                storeName: "jobApplicationDetails",
            })
        );
    }, [dispatch, circularId]);

    const cardProps = {
        title: "আবেদন করুন",
    };

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <div className="row">
                        <div className="col-md-12">
                            <Stepper activeStep={0} nonLinear={true}>
                                <Step
                                    className="bg-primary"
                                    label="প্রথম ধাপ"
                                    onClick={() =>
                                        history.push(
                                            `/portal/ntrca-application/apply/${circularId}`
                                        )
                                    }
                                />
                                <Step
                                    className="bg-primary"
                                    label="দ্বিতীয় ধাপ"
                                    onClick={() =>
                                        history.push(
                                            `/portal/ntrca-application/institute/add/${circularId}`
                                        )
                                    }
                                />
                                <Step
                                    className="bg-primary"
                                    label="তৃতীয় ধাপ"
                                    onClick={() =>
                                        history.push(
                                            `/portal/ntrca-application/attachment/add/${circularId}`
                                        )
                                    }
                                />

                                <Step
                                    className={`${
                                        props.match.path ==
                                        "/portal/ntrca-application/preview/:id"
                                            ? "bg-success"
                                            : "bg-primary"
                                    }`}
                                    label="চতুর্থ ধাপ"
                                    onClick={() =>
                                        history.push(
                                            `/portal/ntrca-application/preview/${circularId}`
                                        )
                                    }
                                />
                            </Stepper>
                        </div>
                    </div>
                    <Formik
                        initialValues={{ isAgreed: details?.data?.isAgreed }}
                        enableReinitialize={true}
                        // validationSchema={AttachmentModel.validator(
                        //     details?.data
                        // )}
                        onSubmit={(values, { resetForm }) => {
                            let request = {
                                id: details?.data?.id,
                                isAgreed: values?.isAgreed,
                            };

                            if (values?.isAgreed != true) {
                                dispatch(
                                    setToastAlert({
                                        type: "error",
                                        message:
                                            "সকল তথ্য সঠিক এই মৰ্মে সম্মতি প্রদান করুন",
                                    })
                                );
                            } else if (!details?.data?.id) {
                                dispatch(
                                    setToastAlert({
                                        type: "error",
                                        message: "Error",
                                    })
                                );
                            } else {
                                dispatch(
                                    callApi({
                                        operationId: UrlBuilder.ntrcaApi(
                                            `job-application/final-submit`
                                        ),
                                        parameters: {
                                            method: "PUT",
                                            body: JSON.stringify(request),
                                        },
                                    })
                                );
                            }
                        }}
                    >
                        {(props) => {
                            return (
                                <>
                                    <ScrollToFieldError />
                                    {details?.data && (
                                        <ApplicationPreviewForm
                                            {...props}
                                            // jobApplicationId={
                                            //     details?.data?.id
                                            // }
                                            details={details}
                                            circularId={circularId}
                                        />
                                    )}
                                </>
                            );
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default ApplicationPreview;
