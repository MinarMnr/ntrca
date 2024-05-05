import { faEdit, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Table } from "@themesberg/react-bootstrap";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "react-topbar-progress-indicator";
import { DefaultCard } from "../../../components/card";
import { callApi, selectApi } from "../../../reducers/apiSlice";
import { UrlBuilder } from "../../../helpers/UrlBuilder";
import moment from "moment";
import { Col, Row } from "@themesberg/react-bootstrap";

const CertifiedApplicantsDetail = (props) => {
    /**
     * useDispatch: dispatch actions
     */
    const dispatch = useDispatch();

    /**
     * Get loading indicator and data from 'selectApi' state
     */
    const {
        loading,
        details = {
            data: {},
        },
    } = useSelector(selectApi);

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

    /**
     * cardProps must need to pass into DefaultCard component.
     * headerSlot: this is a placeholder for action buttons on card header.
     *
     * @type {{headerSlot: (function(): *), title: string}}
     */
    const cardProps = {
        title: "শিক্ষক পদে আবেদনকারীর বিবরণ",
        headerSlot: () => (
            <>
                <Link to="/portal/certified-applicants/list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        শিক্ষক পদে নিবন্ধিত তালিকা
                    </Button>
                </Link>
            </>
        ),
    };

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            {loading && <ProgressBar />}
            <Card border="white" className="table-wrapper ">
                <Card.Body>
                    <div className="container-fluid ">
                        <div className="row details-page">
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>আবেদনকারীর নাম</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.applicantName ??
                                                    "N/A"}
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
                                                {details?.data?.rollNo ?? "N/A"}
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
                                                {details?.data
                                                    ?.registrationNo ?? "N/A"}
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
                                                {details?.data?.fatherName ??
                                                    "N/A"}
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
                                                {details?.data?.motherName ??
                                                    "N/A"}
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
                                                {details?.data?.nid ?? "N/A"}
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
                                                <b>ব্যাচ নাম</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.examNameBn ??
                                                    details?.data?.examName ??
                                                    "N/A"}
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
                                                {details?.data?.gender ?? "N/A"}
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
                                                <b>পদবির নাম</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data
                                                    ?.designationName ?? "N/A"}
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
                                                <b>পদবির কোড</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data
                                                    ?.designationCode ?? "N/A"}
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
                                                {details?.data?.subjectName ??
                                                    "N/A"}
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
                                                <b>বিষয়ের কোড</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.subjectCode ??
                                                    "N/A"}
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
                                                {details?.data?.religion ??
                                                    "N/A"}
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
                                                {details?.data?.mobileNo ??
                                                    "N/A"}
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
                                                ).format("DD-MM-Y") ?? "N/A"}
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
                                                {details?.data?.district ??
                                                    "N/A"}
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
                                                {details?.data?.thana ?? "N/A"}
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
                                                {details?.data?.postOffice ??
                                                    "N/A" ??
                                                    "N/A"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="table-responsive">
                                    <table className="table text-center">
                                        <thead>
                                            <tr>
                                                <th>Examination Name</th>
                                                <th>Board/Institute</th>
                                                <th>Group/Subject/Degree</th>
                                                <th>Result</th>
                                                <th>Year</th>
                                                <th>Roll</th>
                                                <th>Duration (years)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {details?.data
                                                ?.educationalQualificationList &&
                                            details?.data
                                                ?.educationalQualificationList
                                                .length > 0 ? (
                                                details?.data?.educationalQualificationList.map(
                                                    (item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                {item?.educationDegreeName ??
                                                                    "N/A"}
                                                            </td>
                                                            <td>
                                                                {item?.boardOrInstitute ??
                                                                    "N/A"}
                                                            </td>
                                                            <td>
                                                                {item?.groupOrSubject ??
                                                                    "N/A"}
                                                            </td>
                                                            <td>
                                                                {item?.examGrade ??
                                                                    "N/A"}
                                                                <br />(
                                                                {item?.scoringMethodName ??
                                                                    "N/A"}
                                                                )
                                                            </td>
                                                            <td>
                                                                {item?.passingYear ??
                                                                    "N/A"}
                                                            </td>
                                                            <td>
                                                                {item?.educationDegreeRoll ??
                                                                    "N/A"}
                                                            </td>
                                                            <td>
                                                                {item?.duration ??
                                                                    "N/A"}
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td colSpan={7}>
                                                        <b>No Data Found</b>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 
                    <hr />
                    <Link to={"/portal/certified-applicants/add"}>
                        <Button
                            variant=""
                            className="f-right btn-orange"
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faEdit} className="me-2" />
                            Edit Detail
                        </Button>
                    </Link> */}
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default CertifiedApplicantsDetail;
