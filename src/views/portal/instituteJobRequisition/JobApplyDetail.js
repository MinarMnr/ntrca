import { faEdit, faList, faFileAlt } from "@fortawesome/free-solid-svg-icons";
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
import { FieldArray } from "formik/dist/index";
import InputSelectApi from "components/form/InputSelectApi";
import { InputSelect } from "components/form";
import InputDatePicker from "components/form/InputDatePicker";
import InputFieldNumber from "components/form/InputFieldNumber";

const JobApplyDetail = (props) => {
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

    const postType = [
        {
            id: "MPO",
            name: "MPO",
        },
        {
            id: "NON_MPO",
            name: "NON_MPO",
        },
    ];

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
                storeName: "instituteJobRequisition",
            })
        );
    }, [dispatch, props.match.params.id]);

    /**
     * cardProps must need to pass into DefaultCard component.
     * headerSlot: this is a placeholder for action buttons on card header.
     *
     * @type {{headerSlot: (function(): *), title: string}}
     */
    const cardProps = {
        title: "সাবমিটেড ই-রিকুইজিশন বিস্তারিত",
        headerSlot: () => (
            <>
                <Link to="/portal/submitted/job-requisition-list">
                    <Button
                        variant="link"
                        className="f-right btn-sm p-5 btn-color"
                    >
                        <FontAwesomeIcon icon={faList} className="me-2" />
                        সাবমিটেড ই-রিকুইজিশন তালিকা
                    </Button>
                </Link>
            </>
        ),
    };

    return (
        <DefaultCard className="mb-50" {...cardProps}>
            {loading && <ProgressBar />}
            <Card border="white" className="table-wrapper">
                <Card.Body>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-20 card-subtitle h6">
                                <div className="text-right mb-15"></div>
                                <div className="table-responsive">
                                    {/* <table className="table table-striped table-bordered table-hover text-center">
                                        <tbody>
                                            <tr>
                                                <td style={{ width: "100%" }}>
                                                    <b>বর্তমান USER : </b>
                                                    <b>
                                                        {
                                                            details?.data
                                                                ?.currentApproverReviewerRoleName
                                                        }
                                                    </b>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" details-page">
                        <div className="row">
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>স্মারক নং</b>
                                            </td>
                                            <td className="border-0">
                                                {details?.data?.memorandumNo}
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
                                                <b>মিটিং তারিখ</b>
                                            </td>
                                            <td className="border-0">
                                                {moment(
                                                    details?.data
                                                        ?.dateOfRequisition
                                                ).format("DD-MM-YYYY")}
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
                                                <b>কার্য বিবরণী</b>
                                            </td>
                                            {details?.data?.encloserUrl && (
                                                <td className="border-0">
                                                    <a
                                                        target="_blank"
                                                        href={`${UrlBuilder.fileServerApi(
                                                            details?.data
                                                                ?.encloserUrl
                                                        )}`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faFileAlt}
                                                        />
                                                    </a>
                                                </td>
                                            )}
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-lg-6">
                                <Table className="table table-responsive table-striped table-hover mb-15">
                                    <tbody>
                                        <tr>
                                            <td className="border-0 td-width">
                                                <b>ট্রান্সেকশন নাম্বার</b>
                                            </td>
                                            <td>
                                                {details?.data
                                                    ?.paymentTransactionNumber ??
                                                    "N/A"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <Table className="table table-responsive table-striped table-hover mb-15">
                                <tbody>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>পেমেন্ট স্ট্যাটাস</b>
                                        </td>
                                        <td
                                            className={`text-center bolder ${
                                                details?.data?.paymentStatus ===
                                                "Unpaid"
                                                    ? "bg-warning"
                                                    : "bg-success"
                                            } text-white p-10`}
                                        >
                                            <b>
                                                {details?.data?.paymentStatus}
                                            </b>
                                        </td>
                                        {/* {details?.data?.encloserUrl && (
                                                <td className="border-0">
                                                    <a
                                                        target="_blank"
                                                        href={`${UrlBuilder.fileServerApi(
                                                            details?.data
                                                                ?.encloserUrl
                                                        )}`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faFileAlt}
                                                        />
                                                    </a>
                                                </td>
                                            )} */}
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    <div className="row">
                        <div className="contentBox-modified">
                            <div className="section-header-custom">
                                <h5 className="m-10 text-white">
                                    আবেদনের বিস্তারিত বিবরণ
                                </h5>
                            </div>
                            <div className="contentBoxBody mt-20"></div>

                            <div className="contentBoxBody">
                                <table className="table table-responsive table-striped text-center">
                                    <thead>
                                        <tr className="custom-table-header text-center">
                                            <th>#</th>
                                            <th>প্রতিষ্ঠানের ধরন</th>
                                            <th>পদবি</th>
                                            <th>শিক্ষার স্তর</th>
                                            <th>বিষয়</th>
                                            <th>প্রার্থীর ধরন</th>
                                            <th>পদের ধরন</th>
                                            <th>পদবির অবস্থা</th>
                                            <th>আবেদিত পদের সংখ্যা</th>
                                            <th>শূন্য পদের সংখ্যা</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {details?.data?.instituteJobRequisitionDetailList?.map(
                                            (item, index) => (
                                                <tr key={item + index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {item?.levelNameBn ??
                                                            "N/A"}
                                                    </td>
                                                    <td>
                                                        {item?.designationNameBn ??
                                                            "N/A"}
                                                    </td>
                                                    <td>
                                                        {item?.educationLevelNameBn ??
                                                            "N/A"}
                                                    </td>
                                                    <td>
                                                        {item?.subjectNameBn ??
                                                            "N/A"}
                                                    </td>
                                                    <td>
                                                        {item?.quotaName ??
                                                            "N/A"}
                                                    </td>
                                                    <td>
                                                        {item?.jobType ?? "N/A"}
                                                    </td>
                                                    <td>
                                                        {item?.designationStatus ??
                                                            "N/A"}
                                                    </td>
                                                    <td>
                                                        {item?.numberOfRequestedSeat ??
                                                            "N/A"}
                                                    </td>
                                                    <td>
                                                        {item?.numberOfVacantSeat ??
                                                            "N/A"}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <Table className="table table-responsive table-striped table-hover mb-15">
                                <tbody>
                                    <tr>
                                        <td className="border-0 td-width">
                                            <b>
                                                সরকার কর্তৃক মোট অনুমোদিত পোস্ট
                                            </b>
                                        </td>
                                        <td className="border-0">
                                            50
                                            {/* {details?.data?.title} */}
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
                                            <b>
                                                কর্মরত এমপিও পুরুষ শিক্ষকের
                                                সংখ্যা
                                            </b>
                                        </td>
                                        <td className="border-0">
                                            30
                                            {/* {details?.data
                                                        ?.instituteTypeList
                                                        ?.length > 0 &&
                                                        details?.data?.instituteTypeList.map(
                                                            (item) => {
                                                                return (
                                                                    <ol>
                                                                        {
                                                                            item?.instituteTypeName??
                                                                "N/A"
                                                                        }
                                                                    </ol>
                                                                );
                                                            }
                                                        )} */}
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
                                            <b>
                                                কর্মরত এমপিও মহিলা শিক্ষকের
                                                সংখ্যা
                                            </b>
                                        </td>
                                        <td className="border-0">
                                            10
                                            {/* {
                                                        details?.data
                                                            ?.applicationFee
                                                    } */}
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
                                            <b>মোট এমপিও শূন্য পদের সংখ্যা</b>
                                        </td>
                                        <td className="border-0">
                                            10
                                            {/* {
                                                        details?.data
                                                            ?.feePaymentValidityHour
                                                    } */}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="contentBox-modified">
                            <div className="section-header-custom">
                                <h5 className="m-10 text-white">
                                    অনুমোদনের বিস্তারিত বিবরণ
                                </h5>
                            </div>
                            {/* <div className="contentBoxBody">
                                <div className="contentBoxBody mt-20"></div>
                                <div className="table-responsive">
                                    <table className="table table-responsive table-striped text-center">
                                        <thead>
                                            <tr>
                                                <th>ক্রঃনঃ</th>
                                                <th> প্রেরক</th>
                                                <th>প্রাপ্তির তারিখ</th>
                                              //<th>মূল্যায়নের বিলম্বিত দিন</th> 
                                                <th>অনুমোদনের তারিখ</th>
                                                <th>অনুমোদনের অবস্থা</th>
                                                <th> মন্তব্য</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span>1</span>
                                                </td>
                                                <td> Institute Head</td>
                                                <td> 18/02/2023</td>
                                                <td> 24/02/2023</td>
                                                <td>Forwarded</td>
                                                <td>Everything Ok</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> */}
                            <div className="contentBoxBody">
                                <div className="contentBoxBody mt-20"></div>
                                <table className="table table-responsive table-striped text-center">
                                    <thead>
                                        <tr className="custom-table-header text-center">
                                            <th>#</th>
                                            <th>পর্যবেক্ষকের নাম </th>
                                            <th>প্রাপ্তির তারিখ </th>
                                            <th>রিভিউ তারিখ </th>
                                            <th>রিভিউ স্ট্যাটাস </th>
                                            <th>কমেন্ট </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {details?.data ? (
                                            details?.data
                                                ?.instituteJobRequisitionReviews
                                                ?.length > 0 ? (
                                                details?.data?.instituteJobRequisitionReviews.map(
                                                    (item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                {item?.reviewerRoleName ??
                                                                    "N/A"}
                                                            </td>
                                                            <td>
                                                                {moment(
                                                                    item?.receivedDate ??
                                                                        "N/A"
                                                                ).format(
                                                                    "DD-MM-YYYY"
                                                                )}
                                                            </td>
                                                            <td>
                                                                {moment(
                                                                    item?.reviewDate ??
                                                                        "N/A"
                                                                ).format(
                                                                    "DD-MM-YYYY"
                                                                )}
                                                            </td>
                                                            <td>
                                                                {item?.reviewStatus ??
                                                                    "N/A"}
                                                            </td>
                                                            <td>
                                                                {item?.reviewComment ??
                                                                    "N/A"}
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td colSpan={6}>
                                                        <b>
                                                            তথ্য পাওয়া যায়নি
                                                        </b>
                                                    </td>
                                                </tr>
                                            )
                                        ) : (
                                            <tr>
                                                <td colSpan={6}>
                                                    <b>তথ্য পাওয়া যায়নি</b>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </DefaultCard>
    );
};

export default JobApplyDetail;
