import React, { useEffect } from "react";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../components/card";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import { callApi, selectApi } from "../../../reducers/apiSlice";
import moment from "moment";
import { setToastAlert } from "reducers/toastAlertSlice";
import { CertifiedApplicantEdit } from "./CertifiedApplicantEdit";
import CertifiedApplicantsEditForm from "./CertifiedApplicantsEditForm";

const CertifiedApplicantsEdit = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    /**
     * Get loading indicator and data from 'selectApi' state
     */
    const {
        loading,
        details = {
            data: {},
        },
    } = useSelector(selectApi);

    const cardProps = {
        title: "নতুন নিবন্ধিত শিক্ষক আপডেট ",
        headerSlot: () => (
            <>
                <Link to="/portal/certified-applicants/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        শিক্ষক পদে নিবন্ধিত তালিকা দেখুন
                    </Button>
                </Link>
            </>
        ),
    };

    /**
     * Get data through api call by dispatching 'callApi'.
     */
    useEffect(() => {
        dispatch(
            callApi({
                operationId: UrlBuilder.ntrcaApi(
                    `certified-applicant/details/${props.match.params.id}/${props.match.params.examRefId}`
                ),
                output: "details",
                storeName: "certifiedApplicant",
            })
        );
    }, [dispatch, props.match.params.id, props.match.params.examRefId]);

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white">
                <Card.Body>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={CertifiedApplicantEdit.fromJson(
                            details?.data
                        )}
                        enableReinitialize={true}
                        validationSchema={CertifiedApplicantEdit.validator()}
                        onSubmit={(values, { resetForm }) => {
                            /**
                             * Save data through POST api by dispatching 'callApi'.
                             */
                            dispatch(
                                callApi({
                                    operationId: UrlBuilder.ntrcaApi(
                                        `certified-applicant/update/${props.match.params.id}/${props.match.params.examRefId}`
                                    ),
                                    parameters: {
                                        method: "PUT",
                                        body: CertifiedApplicantEdit.toString(
                                            values
                                        ),
                                        header: {
                                            "Content-Type": "application/json",
                                        },
                                    },
                                })
                            );
                            //resetForm();
                        }}
                    >
                        {(props) => {
                            return (
                                <CertifiedApplicantsEditForm
                                    {...props}
                                    formType="edit"
                                />
                            );
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default CertifiedApplicantsEdit;
