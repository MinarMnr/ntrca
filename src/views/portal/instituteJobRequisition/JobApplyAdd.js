import React, { useEffect } from "react";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../components/card";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import { callApi, selectApi } from "../../../reducers/apiSlice";
import JobApplyForm from "./JobApplyForm";
import { JobApply } from "./JobApply";
import { selectToastAlert, setToastAlert } from "reducers/toastAlertSlice";

const JobApplyAdd = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        loading,
        details = {
            data: {},
        },
    } = useSelector(selectApi);
    const { type } = useSelector(selectToastAlert);

    var circularId = props?.match?.params?.id;
    var circularName = props?.match.params?.name;

    const cardProps = {
        title: `${circularName}`,
        headerSlot: () => (
            <>
                <Link to="/portal/job-requisition-list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        ই-রিকুইজিশন তালিকা
                    </Button>
                </Link>
            </>
        ),
    };

    useEffect(() => {
        if (type === "success") {
            history.push(`/portal/submitted/job-requisition-list`);
        }
    });

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={JobApply}
                        validationSchema={JobApply.validation()}
                        onSubmit={(values, { resetForm }) => {
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
                                            `institute-job-requisition/save`
                                        ),
                                        output: "details",
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
                            return (
                                <JobApplyForm
                                    {...props}
                                    formType="add"
                                    circularId={circularId}
                                    circularName={circularName}
                                />
                            );
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default JobApplyAdd;
