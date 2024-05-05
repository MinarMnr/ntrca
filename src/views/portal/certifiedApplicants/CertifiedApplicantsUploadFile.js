import React from "react";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Container, Table } from "@themesberg/react-bootstrap";
import { Formik } from "formik/dist/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../components/card";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import { callApi, selectApi } from "../../../reducers/apiSlice";
import CertifiedApplicantsForm from "./CertifiedApplicantsForm";
import { CertifiedApplicant } from "./CertifiedApplicant";
import CertifiedApplicantsUploadFileForm from "./CertifiedApplicantsUploadFileForm";
import { useEffect } from "react";
import moment from "moment";

const CertifiedApplicantsUploadFile = (props) => {
    const dispatch = useDispatch();
    const {
        loading,
        details = {
            data: {},
        },
    } = useSelector(selectApi);
    const cardProps = {
        title: "নতুন নিবন্ধিত শিক্ষক ফাইল আপডেট ",
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
                {/* <Link to="/portal/certified-applicants/upload-progress-list">
                    <Button variant="light" className="f-right mr-10">
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        ফাইল আপলোডের তালিকা
                    </Button>
                </Link> */}
            </>
        ),
    };

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

    var parentId = props.match.params.id;

    var examRefId = props.match.params.examRefId;

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            <Card border="white">
                <Card.Body>
                    <div>
                        <div className="row details-page">
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>আবেদনকারীর নাম</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.applicantName}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>রোল নম্বর</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.rollNo}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>নিবন্ধন নম্বর</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.registrationNo}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>বাবার নাম</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.fatherName}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>মায়ের নাম</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.motherName}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>এনআইডি</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.nid}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>ব্যাচ নম্বর</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.examBatch}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>পদ</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.designationName}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>বিষয়ের নাম</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.subjectName}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>জেন্ডার</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.gender}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>ধর্ম</b>
                                            </td>
                                            <td className="border-0">
                                                {" "}
                                                {details?.data?.religion}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>যোগাযোগের নম্বর</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.mobileNo}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>জন্ম তারিখ</b>
                                            </td>
                                            <td className="border-0">
                                                {moment(
                                                    details?.data?.dob
                                                ).format("DD-MM-Y")}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>জেলা</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.district}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>উপজেলা</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.thana}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>ডাকঘর</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.postOffice}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    {loading && <ProgressBar />}
                    <Formik
                        initialValues={CertifiedApplicant}
                        // validationSchema={CertifiedApplicant.validation()}
                        onSubmit={(values, { resetForm }) => {
                            let request = new FormData();

                            request.append(
                                "applicantWithEducationalQualificationsFile",
                                values.educationQualification
                            );

                            dispatch(
                                callApi({
                                    operationId: UrlBuilder.ntrcaApi(
                                        `certified-applicant/update/${props.match.params.id}/${props.match.params.examRefId}`
                                    ),
                                    parameters: {
                                        method: "POST",
                                        body: request,
                                        hasFile: true,
                                    },
                                })
                            );
                            resetForm();
                        }}
                    >
                        {(props) => {
                            return (
                                <CertifiedApplicantsUploadFileForm
                                    {...props}
                                    parentId={parentId}
                                    examRefId={examRefId}
                                />
                            );
                        }}
                    </Formik>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default CertifiedApplicantsUploadFile;
