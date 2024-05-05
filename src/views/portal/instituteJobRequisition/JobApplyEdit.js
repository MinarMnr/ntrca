import React, { useEffect } from "react";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../components/card";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import { callApi, selectApi } from "../../../reducers/apiSlice";
import JobApplyForm from "./JobApplyForm";
import { JobApply } from "./JobApply";
import { setToastAlert } from "reducers/toastAlertSlice";

const JobApplyEdit = (props) => {
    const dispatch = useDispatch();

    const {
        details = {
            data: {},
        },
        loading,
    } = useSelector(selectApi);

    const id = props.match.params.id;

    /**
     * Get data through api call by dispatching 'callApi'.
     */
    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `institute-job-requisition/details/${props.match.params.id}`
                ),
                output: "details",
                storeName: "details",
            })
        );
    }, [dispatch, props.match.params.id]);

    const cardProps = {
        title: "সাবমিটেড ই-রিকুইজিশন",
        headerSlot: () => (
            <>
                <Link to="/portal/submitted/job-requisition-list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        সাবমিটেড ই রিকুইজিশন তালিকা
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
                    <Formik
                        initialValues={JobApply.fromJson(details?.data)}
                        enableReinitialize={true}
                        validationSchema={JobApply.editValidation()}
                        onSubmit={(values, { resetForm }) => {
                            console.log("values", values);
                            let request = JobApply.toFormData(values);
                            request.append("file", values.file);

                            let check = true;

                            values?.instituteJobRequisitionDetailList.map(
                                (item, index) => {
                                    if (
                                        item.designationId == "" ||
                                        item.quotaId == "" ||
                                        item.jobType == "" ||
                                        item.subjectId == ""
                                    ) {
                                        check = false;
                                        return;
                                    }
                                }
                            );

                            if (!check) {
                                dispatch(
                                    setToastAlert({
                                        type: "error",
                                        message:
                                            "পদবি/বিষয়/প্রার্থীর ধরন/পদবির ধরন নির্বাচন করুন",
                                    })
                                );
                            } else {
                                dispatch(
                                    callApi({
                                        operationId: UrlBuilder.ntrcaApi(
                                            `institute-job-requisition/update`
                                        ),
                                        parameters: {
                                            method: "POST",
                                            body: request,
                                            hasFile: true,
                                        },
                                    })
                                );
                            }
                        }}
                    >
                        {(props) => {
                            return <JobApplyForm {...props} formType="edit" />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default JobApplyEdit;
