import React from "react";
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
import CertifiedApplicantsForm from "./CertifiedApplicantsForm";
import { CertifiedApplicant } from "./CertifiedApplicant";

const CertifiedApplicantsPreviousUploadingList = () => {
    const dispatch = useDispatch();

    const { loading } = useSelector(selectApi);

    const cardProps = {
        title: "নতুন নিবন্ধিত শিক্ষক যোগ করুন",
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
                <Link to="/portal/certified-applicants/upload-progress-list">
                    <Button variant="light" className="f-right mr-10">
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        ফাইল আপলোডের তালিকা
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
                        initialValues={CertifiedApplicant}
                        validationSchema={CertifiedApplicant.validation()}
                        onSubmit={(values, { resetForm }) => {
                            let request = new FormData();
                            request.append("applicantFile", values.file);
                            request.append(
                                "educationalQualificationFile",
                                values.educationFile
                            );

                            dispatch(
                                callApi({
                                    operationId: UrlBuilder.ntrcaApi(
                                        `certified-applicant/upload?examBatchId=${values?.examBatchId}`
                                    ),
                                    parameters: {
                                        method: "POST",
                                        body: request,
                                        hasFile: true,
                                    },
                                })
                            );
                        }}
                    >
                        {(props) => {
                            return <CertifiedApplicantsForm {...props} />;
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default CertifiedApplicantsPreviousUploadingList;
