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
import { selectToastAlert } from "reducers/toastAlertSlice";
import { useEffect } from "react";
import { AuthUser } from "helpers/AuthUser";
import { ScrollToFieldError } from "helpers/ScrollToFieldError";

const ApplicationApply = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    var circularId = props.match.params.id;
    var nid = AuthUser.getUserName();

    const {
        loading,
        details1 = {
            data: {},
        },
    } = useSelector(selectApi);
    const { type } = useSelector(selectToastAlert);

    useEffect(() => {
        if (type === "success") {
            history.push(
                `/portal/ntrca-application/institute/add/${circularId}`
            );
        }
    });

    useEffect(() => {
        if (!details1?.data?.examBatchId) {
            dispatch(
                setState({
                    output: "loading",
                    data: false,
                })
            );
        }
    }, [dispatch, details1?.data?.examBatchId]);

    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `job-application/step-one-details/${nid}/${circularId}`
                ),
                output: "details1",
                storeName: "apply1",
            })
        );
    }, [nid, circularId]);

    const cardProps = {
        title: "আবেদন করুন",
        headerSlot: () => (
            <>
                <Link to="/portal/circular/applicant/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color ml-10"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        গণ বিজ্ঞপ্তির তালিকা
                    </Button>
                </Link>
            </>
        ),
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
                                    className={`${
                                        props.match.path ==
                                        "/portal/ntrca-application/apply/:id"
                                            ? "bg-success"
                                            : "bg-primary"
                                    }`}
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
                                    className="bg-primary"
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
                        initialValues={ApplyModel.fromJson(
                            details1?.data,
                            circularId
                        )}
                        enableReinitialize={true}
                        validationSchema={ApplyModel.validator()}
                        onSubmit={(values, { resetForm }) => {
                            if (details1?.data?.recordStatus == null) {
                                dispatch(
                                    callApi({
                                        operationId: UrlBuilder.ntrcaApi(
                                            "job-application/step-one-save"
                                        ),
                                        output: "data",
                                        parameters: {
                                            method: "POST",
                                            body: ApplyModel.toString(
                                                values,
                                                circularId
                                            ),
                                            //hasFile: true,
                                        },
                                    })
                                );
                            } else {
                                dispatch(
                                    callApi({
                                        operationId: UrlBuilder.ntrcaApi(
                                            "job-application/step-one-update"
                                        ),
                                        output: "data",
                                        parameters: {
                                            method: "PUT",
                                            body: ApplyModel.toString(
                                                values,
                                                circularId
                                            ),
                                            //hasFile: true,
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
                                    <ApplicationApplyForm
                                        {...props}
                                        circularId={circularId}
                                    />
                                </>
                            );
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default ApplicationApply;
